import axios from 'axios';

const dailyEarningsEndpoint = "https://api.beefy.finance/earnings"

const getDailyEarnings = async () => {
  try {
    const response = await axios.get(dailyEarningsEndpoint);
    return response.data["dailyEarnings"];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getDailyEarnings };