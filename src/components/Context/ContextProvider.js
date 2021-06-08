import { createContext, useState, useEffect } from "react";
import { ethers, utils } from "ethers";

import ERC20 from "../../abis/ERC20.json";

import addresses from "../../data/addresses";

import useWeb3 from "../../hooks/useWeb3";
import { fetchPrice } from "../../utils/fetchPrice";
import { getHolders } from "../../utils/getHolders";
import { getEarnings } from "../../utils/getEarnings";
import { formatTvl } from "../../utils/format";
import { getVaults } from "../../utils/getVaults";
import { fetchVaultsTvl } from "../../utils/fetchChainVaults";

export const VaultsContext = createContext(null);

const fetchGlobalTvl = async ({ vaults, web3, chainId, setGlobalTvl }) => {
  await fetchVaultsTvl({ vaults, web3, chainId });

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

const fetchTreasuryBalance = async ({ signer, chainId, setTreasury }) => {
  if (!chainId) return;
  const addr = addresses[chainId.toString()];
  const values = await Promise.all([
    fetchBalance({ token: addr.BIFI, address: addr.Treasury, signer }),
    fetchBalance({ token: addr.WBNB, address: addr.Treasury, signer })
  ]);

  setTreasury({
    BIFI: Number(utils.formatEther(values[0])).toFixed(2),
    WBNB: Number(utils.formatEther(values[1])).toFixed(2)
  });
};

const fetchStakedBifi = async ({ signer, chainId, setStakedBifi }) => {
  if (!chainId) return;
  const addr = addresses[chainId.toString()];
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

  setDailyEarnings(earnings.daily?.toFixed(2) ?? 0);
  setTotalEarnings(earnings.total?.toFixed(2) ?? 0);
};

const ContextProvider = ({ children }) => {
  const [vaultCount, setVaultCount] = useState(0);
  const [globalTvl, setGlobalTvl] = useState(0);
  const [treasury, setTreasury] = useState({ BIFI: 0, WBNB: 0 });
  const [stakedBifi, setStakedBifi] = useState(0);
  const [bifiHolders, setBifiHolders] = useState(0);
  const [bifiPrice, setBifiPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [vaults, setVaults] = useState([]);
  const { provider, signer, chainId, web3 } = useWeb3();

  provider?.provider?.on("chainChanged", () => window.location.reload());

  useEffect(() => {
    getVaults(chainId).then((vaults) => setVaults(vaults));
  }, [chainId]);

  useEffect(() => {
    setVaultCount(vaults.filter(vault => vault.status === "active").length);
    fetchGlobalTvl({ vaults, web3, chainId, setGlobalTvl });
    fetchTreasuryBalance({ signer, chainId, setTreasury });
    fetchStakedBifi({ signer, chainId, setStakedBifi });
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
        chainId
      }}
    >
      {children}
    </VaultsContext.Provider>
  );
};

export default ContextProvider;
