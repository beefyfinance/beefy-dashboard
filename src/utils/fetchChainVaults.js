import { MultiCall } from "eth-multicall";
import BeefyVault from "../abis/BeefyVault.json";
import BigNumber from "bignumber.js";
import { fetchPrice } from "./fetchPrice";

const MULTICALLS = {
  56: "0xB94858b0bB5437498F5453A16039337e5Fdc269C",
  128: "0x2776CF9B6E2Fa7B33A37139C3CB1ee362Ff0356e",
  137: "0xC3821F0b56FA4F4794d5d760f94B812DE261361B",
  250: "0xC9F6b1B53E056fd04bE5a197ce4B2423d456B982",
  43114: "0x6FfF95AC47b586bDDEea244b3c2fe9c4B07b9F76",
  1666600000: "0xBa5041B1c06e8c9cFb5dDB4b82BdC52E41EA5FC5",
  42161: "0x13aD51a6664973EbD0749a7c84939d973F247921",
  42220: "0xa9E6E271b27b20F65394914f8784B3B860dBd259",
  1285: "0x55f46144bC62e9Af4bAdB71842B62162e2194E90",
  25: "0x13aD51a6664973EbD0749a7c84939d973F247921",
};

const multicallAddress = (chainId) => MULTICALLS[chainId];

export const fetchVaultsTvl = async ({ vaults, web3, chainId }) => {
  try {
    const multicall = new MultiCall(web3, multicallAddress(chainId));
    const balanceCalls = [];
    vaults.forEach(vault => {
      const vaultContract = new web3.eth.Contract(BeefyVault, vault.earnedTokenAddress);
      balanceCalls.push({
        balance: vaultContract.methods.balance()
      });
    });
    const res = await multicall.all([balanceCalls]);
    const balances = res[0].map(v => new BigNumber(v.balance));

    for (let i = 0; i < vaults.length; i++) {
      const vault = vaults[i];
      const vaultBal = balances[i];

      let tokenPrice = 0;
      try {
        tokenPrice = await fetchPrice({ oracle: vault.oracle, id: vault.oracleId });
      } catch (err) {
        console.log("error fetching price tvl:", vault.oracleId, vault.oracle);
      }

      let tvl = vaultBal.times(tokenPrice).dividedBy(10 ** (vault.tokenDecimals ?? 18));
      if (tvl.isNaN()) {
        tvl = new BigNumber(0);
      }
      vault.tvl = tvl.toFixed(2);
    }
  } catch (err) {
    console.log("error fetching vaults tvl", err);
  }
};
