import axios from "axios";

const vaultsEndpoint =
  "https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/";

const chainVaults = {
  56: "bsc_pools.js",
  137: "polygon_pools.js"
};

const getVaults = async (chainId) => {
  console.log("get vaults on chain ", chainId);
  if (!chainId) return [];
  try {
    const response = await axios.get(vaultsEndpoint + chainVaults[chainId]);
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
