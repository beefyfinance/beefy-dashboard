import { createContext, useState, useEffect } from "react";
import { ethers, utils, BigNumber } from "ethers";

import BeefyVault from "../../abis/BeefyVault.json";
import ERC20 from "../../abis/ERC20.json";

import addr from "../../data/addresses";

import { fetchPrice } from "../../utils/fetchPrice";
import { getHolders } from "../../utils/getHolders";
import { getEarnings } from "../../utils/getEarnings";
import { formatTvl } from "../../utils/format";
import { getVaults } from "../../utils/getVaults";

export const VaultsContext = createContext(null);

const fetchVaultTvl = async ({ vault, signer }) => {
  try {
    const vaultContract = new ethers.Contract(vault.earnedTokenAddress, BeefyVault, signer);
    const vaultBalance = await vaultContract.balance();

    const price = await fetchPrice({ oracle: vault.oracle, id: vault.oracleId });
    const normalizationFactor = 100000;
    const normalizedPrice = BigNumber.from(Math.round(price * normalizationFactor));
    const vaultBalanceInUsd = vaultBalance.mul(normalizedPrice);
    const result = vaultBalanceInUsd.div(normalizationFactor);

    const vaultObjTvl = utils.formatEther(result);
    vault.tvl = Number(vaultObjTvl).toFixed(2);

    return result;
  } catch (err) {
    console.log("error fetching price tvl:", vault.oracleId, vault.oracle);
    return 0;
  }
};

const fetchGlobalTvl = async ({ vaults, signer, setGlobalTvl }) => {
  let promises = [];
  vaults.forEach(vault => promises.push(fetchVaultTvl({ vault, signer })));
  await Promise.all(promises);

  let globalTvl = 0;

  const isUniqueEarnContract = (pool, index, pools) => {
    const earnContractAddress = pool.earnContractAddress;
    return pools.findIndex(p => p.earnContractAddress === earnContractAddress) === index;
  };

  vaults
    .filter(p => p.status === "active")
    .filter(isUniqueEarnContract)
    .forEach(({ tvl }) => {
      globalTvl += Number(tvl);
    });

  setGlobalTvl(globalTvl);
};

const fetchBalance = async ({ token, address, signer }) => {
  const contract = new ethers.Contract(token, ERC20, signer);
  return await contract.balanceOf(address);
};

const fetchTreasuryBalance = async ({ signer, setTreasury }) => {
  const values = await Promise.all([
    fetchBalance({ token: addr.BIFI, address: addr.Treasury, signer }),
    fetchBalance({ token: addr.WBNB, address: addr.Treasury, signer }),
  ]);

  setTreasury({
    BIFI: Number(utils.formatEther(values[0])).toFixed(2),
    WBNB: Number(utils.formatEther(values[1])).toFixed(2),
  });
};

const fetchStakedBifi = async ({ provider, signer, setStakedBifi }) => {
  const values = await fetchBalance({ token: addr.BIFI, address: addr.RewardPool, signer });
  const stakedBifi = Number(utils.formatEther(values));
  const percentage = (stakedBifi / (80000 - 4000)) * 100;
  setStakedBifi(`${percentage.toFixed(2)} %`);
};

const fetchBifiHolders = async ({ setBifiHolders }) => {
  const holders = (await getHolders()) || 0;
  setBifiHolders(holders);
};

const fetchBifiPrice = async ({ setBifiPrice, setMarketCap }) => {
  const price = await fetchPrice({ oracle: "tokens", id: "BIFI" });
  const mcap = formatTvl((80000 - 4000) * price);
  setBifiPrice(`$${price.toFixed(2)}`);
  setMarketCap(mcap);
};

const fetchEarnings = async ({ setDailyEarnings, setTotalEarnings }) => {
  let earnings = (await getEarnings()) || { daily: 0, total: 0 };
  if (!earnings.total) {
    earnings.total = 0;
  }
  if (typeof earnings.total === "string" || earnings.total instanceof String) {
    earnings.total = Number(earnings.total) / 1e18;
  }

  setDailyEarnings(earnings.daily.toFixed(2));
  setTotalEarnings(earnings.total.toFixed(2));
};

const fetchVaults = async setVaults => {
  setVaults(await getVaults());
};

const ContextProvider = ({ children }) => {
  const [vaultCount, setVaultCount] = useState(0);
  const [globalTvl, setGlobalTvl] = useState(BigNumber.from(0));
  const [treasury, setTreasury] = useState({ BIFI: 0, WBNB: 0 });
  const [stakedBifi, setStakedBifi] = useState(0);
  const [bifiHolders, setBifiHolders] = useState(0);
  const [bifiPrice, setBifiPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    fetchVaults(setVaults);
  }, []);

  useEffect(() => {
    // FIXME: is there a safer way to fetch the provider?
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setVaultCount(vaults.filter(vault => vault.status === "active").length);
    fetchGlobalTvl({ vaults, signer, setGlobalTvl });
    fetchTreasuryBalance({ signer, setTreasury });
    fetchStakedBifi({ provider, signer, setStakedBifi });
    fetchBifiHolders({ setBifiHolders });
    fetchBifiPrice({ setBifiPrice, setMarketCap });
    fetchEarnings({ setDailyEarnings, setTotalEarnings });
  }, [vaults]);

  return (
    <VaultsContext.Provider
      value={{
        vaults,
        vaultCount,
        globalTvl,
        treasury,
        dailyEarnings,
        totalEarnings,
        stakedBifi,
        bifiHolders,
        bifiPrice,
        marketCap,
      }}
    >
      {children}
    </VaultsContext.Provider>
  );
};

export default ContextProvider;
