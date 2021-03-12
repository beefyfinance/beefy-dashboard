import axios from "axios";
import { apiCacheTime } from "./apiCacheTime";

const getEarnings = async () => {
  try {
    const response = await axios.get(`https://api.beefy.finance/earnings?_=${apiCacheTime()}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getEarnings };