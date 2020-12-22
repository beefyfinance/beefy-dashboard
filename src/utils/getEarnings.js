import axios from 'axios';

const earningsEndpoint = "https://api.beefy.finance/earnings"

const getEarnings = async () => {
  try {
    const response = await axios.get(earningsEndpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getEarnings };