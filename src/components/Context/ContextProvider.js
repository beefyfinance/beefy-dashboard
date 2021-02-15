import { createContext, useState, useEffect } from 'react';
import { ethers, utils, BigNumber } from 'ethers';

import BeefyVault from '../../abis/BeefyVault.json';
import ERC20 from '../../abis/ERC20.json';

import vaults from '../../data/vaults';
import addr from '../../data/addresses';

import { fetchPrice } from '../../utils/fetchPrice';
import { getHolders } from '../../utils/getHolders';
import { getEarnings } from '../../utils/getEarnings';
import { formatTvl } from '../../utils/format';

export const VaultsContext = createContext(null);

const fetchVaultTvl = async ({ vault, signer }) => {
  try {
    const vaultContract = new ethers.Contract(vault.contract, BeefyVault, signer);
    const vaultBalance = await vaultContract.balance();
  
    
    const price = await fetchPrice({ oracle: vault.oracle, id: vault.oracleId });
    const normalizationFactor = 1000000000;
    const normalizedPrice = BigNumber.from(Math.round(price * normalizationFactor));
    const vaultBalanceInUsd = vaultBalance.mul(normalizedPrice);
    const result = vaultBalanceInUsd.div(normalizationFactor);
  
    const vaultObjTvl = utils.formatEther(result);
    vault.tvl = Number(vaultObjTvl).toFixed(2);
  
    return result;
  } catch (err) {

    console.log('error fetching price tvl:', vault.oracleId);
    return 0;
  }
};

const fetchGlobalTvl = async ({ signer, setGlobalTvl }) => {
  let promises = [];
  vaults.forEach((vault) => promises.push(fetchVaultTvl({ vault, signer })));
  const values = await Promise.all(promises);

  const totalTvl = values.reduce((acc, curr) => acc.add(curr));
  setGlobalTvl(utils.formatEther(totalTvl));
};

const fetchBalance = async ({ token, address, signer }) => {
  const contract = new ethers.Contract(token, ERC20, signer);
  return await contract.balanceOf(address);
};

const fetchTreasuryBalance = async ({ signer, setTreasury }) => {
  const values = await Promise.all([
    fetchBalance({ token: addr.BIFI, address: addr.Treasury, signer }),
    fetchBalance({ token: addr.WBNB, address: addr.Treasury, signer })
  ]);

  setTreasury({
    BIFI: Number(utils.formatEther(values[0])).toFixed(2),
    WBNB: Number(utils.formatEther(values[1])).toFixed(2)
  });
};

const fetchStakedBifi = async ({ provider, signer, setStakedBifi }) => {
  const values = await fetchBalance({ token: addr.BIFI, address: addr.RewardPool, signer });
  const stakedBifi = Number(utils.formatEther(values));
  const percentage = stakedBifi / (80000 - 4000) * 100;
  setStakedBifi(`${percentage.toFixed(2)} %`);
};

const fetchBifiHolders = async({ setBifiHolders }) => {
  const holders = await getHolders() || 0;
  setBifiHolders(holders);
};

const fetchBifiPrice = async ({ setBifiPrice, setMarketCap }) => {
  const price = await fetchPrice({ oracle: 'pancake', id: 'BIFI' });
  const mcap = formatTvl((80000 - 4000) * price);
  setBifiPrice(`$${price.toFixed(2)}`);
  setMarketCap(mcap);
};

const fetchEarnings = async ({ setDailyEarnings, setTotalEarnings }) => {
  let earnings = await getEarnings() || { daily: 0, total: 0 };
  if(!earnings.total){ earnings.total = 0; }

  setDailyEarnings(earnings.daily.toFixed(2));
  setTotalEarnings(earnings.total.toFixed(2));
};

const ContextProvider = ({ children }) => {
  const [ vaultCount, setVaultCount ] = useState(0);
  const [ globalTvl, setGlobalTvl ] = useState(BigNumber.from(0));
  const [ treasury, setTreasury ] = useState({ BIFI: 0, WBNB: 0 });
  const [ stakedBifi, setStakedBifi ] = useState(0);
  const [ bifiHolders, setBifiHolders ] = useState(0);
  const [ bifiPrice, setBifiPrice ] = useState(0);
  const [ marketCap, setMarketCap ] = useState(0);
  const [ dailyEarnings, setDailyEarnings ] = useState(0);
  const [ totalEarnings, setTotalEarnings ] = useState(0);

  useEffect(() => { 
    // FIXME: is there a safer way to fetch the provider?
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setVaultCount(vaults.length);
    fetchGlobalTvl({ signer, setGlobalTvl });
    fetchTreasuryBalance({ signer, setTreasury });
    fetchStakedBifi({ provider, signer, setStakedBifi });
    fetchBifiHolders({ setBifiHolders });
    fetchBifiPrice({ setBifiPrice, setMarketCap });
    fetchEarnings({ setDailyEarnings, setTotalEarnings });
  }, []);

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
