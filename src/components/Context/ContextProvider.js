import { createContext, useState, useEffect } from 'react';
import { ethers, utils, BigNumber } from 'ethers';

import BeefyVault from '../../abis/BeefyVault.json';
import ERC20 from '../../abis/ERC20.json';

import vaults from '../../data/vaults';
import addr from '../../data/addresses';

import { fetchPrice } from '../../utils/fetchPrice';
import getRewardsReceived from '../../utils/getRewardsReceived';
import { getDailyEarnings } from '../../utils/getDailyEarnings';
import { formatTvl } from '../../utils/format';

export const VaultsContext = createContext(null);

const fetchVaultTvl = async ({ vault, signer }) => {
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

const fetchUnclaimedRewards = async ({ signer, setUnclaimedRewards }) => {
  const rewards = await fetchBalance({ token: addr.WBNB, address: addr.RewardPool, signer });
  setUnclaimedRewards(Number(utils.formatEther(rewards)).toFixed(2));
};

const fetchRewardsReceived = async ({ setTotalRewards }) => {
  const rewards = await getRewardsReceived();
  setTotalRewards(Number(rewards).toFixed(2));
};

const fetchStakedBifi = async ({ provider, signer, setStakedBifi }) => {
  const values = await fetchBalance({ token: addr.BIFI, address: addr.RewardPool, signer });
  const stakedBifi = Number(utils.formatEther(values));
  const percentage = stakedBifi / (80000 - 6000) * 100;
  setStakedBifi(`${percentage.toFixed(2)} %`);
};

const fetchBifiPrice = async ({ setBifiPrice, setMarketCap }) => {
  const price = await fetchPrice({ oracle: 'thugs', id: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c_0xCa3F508B8e4Dd382eE878A314789373D80A5190A' });
  const mcap = formatTvl((80000 - 6000) * price);
  setBifiPrice(`$${price.toFixed(2)}`);
  setMarketCap(mcap);
};

const fetchDailyEarnings = async ({setDailyEarnings}) => {
  let earnings = await getDailyEarnings() || 0;
  setDailyEarnings(earnings.toFixed(2));
 };

// const fetchCowllectorBalance = async ({ provider, setCowllectorBalance }) => {
// 	const balance = await provider.getBalance(addr.Cowllector);
// 	setCowllectorBalance(Number(utils.formatEther(balance)).toFixed(2));
// };

const ContextProvider = ({ children }) => {
  const [ vaultCount, setVaultCount ] = useState(0);
  const [ globalTvl, setGlobalTvl ] = useState(BigNumber.from(0));
  const [ treasury, setTreasury ] = useState({ BIFI: 0, WBNB: 0 });
  const [ unclaimedRewards, setUnclaimedRewards ] = useState(0);
  const [ totalRewards, setTotalRewards ] = useState('loading...');
  const [ stakedBifi, setStakedBifi ] = useState(0);
  const [ bifiPrice, setBifiPrice ] = useState(0);
  const [ marketCap, setMarketCap ] = useState(0);
  const [ dailyEarnings, setDailyEarnings ] = useState(0);
  // const [ cowllectorBalance, setCowllectorBalance ] = useState(0);

  useEffect(() => { 
    // FIXME: is there a safer way to fetch the provider?
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setVaultCount(vaults.length);
    fetchGlobalTvl({ signer, setGlobalTvl });
    fetchTreasuryBalance({ signer, setTreasury });
    fetchUnclaimedRewards({ signer, setUnclaimedRewards });
    fetchRewardsReceived({ setTotalRewards });
    fetchStakedBifi({ provider, signer, setStakedBifi });
    fetchBifiPrice({ setBifiPrice, setMarketCap });
    fetchDailyEarnings({ setDailyEarnings });
    // fetchCowllectorBalance({ provider, setCowllectorBalance });
  }, []);

  return (
    <VaultsContext.Provider
      value={{
        vaults,
        vaultCount,
        globalTvl,
        treasury,
        unclaimedRewards,
        totalRewards,
        dailyEarnings,
        stakedBifi,
        bifiPrice,
        marketCap,

        // cowllectorBalance,
      }}
    >
      {children}
    </VaultsContext.Provider>
  );
};

export default ContextProvider;
