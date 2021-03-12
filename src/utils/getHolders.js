import axios from 'axios';
import { apiCacheTime } from "./apiCacheTime";

const getHolders = async () => {
  try {
    const response = await axios.get(`https://api.beefy.finance/holders?_=${apiCacheTime()}`);
    return response.data["holderCount"];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getHolders };