import axios from "axios";
import {getChainVaultEndpoint} from './chainHelpers';

const getVaults = async (chainId) => {
  console.log("get vaults on chain ", chainId);
  if (!chainId) return [];
  try {
    const vaultEndpoint = getChainVaultEndpoint(chainId);
    const response = await axios.get(vaultEndpoint);
    const data = response.data;
    let vaults = "[" + data.substring(data.indexOf("\n") + 1);
    vaults = eval(vaults);
    return vaults;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { getVaults };
