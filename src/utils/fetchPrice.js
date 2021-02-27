import axios from 'axios';
import { Client } from '@bandprotocol/bandchain.js';

const endpoints = {
  bakery:    'https://api.beefy.finance/bakery/price',
  bakeryLp:  'https://api.beefy.finance/bakery/lps',
  bandchain: 'https://poa-api.bandchain.org',
  bdollarLp: 'https://api.beefy.finance/bdollar/lps',
  boltLp:    'https://api.beefy.finance/bolt/lps',
  cafeLp:    'https://api.beefy.finance/cafe/lps',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
  jetfuelLp: 'https://api.beefy.finance/jetfuel/lps',
  kebabLp:   'https://api.beefy.finance/kebab/lps',
  monsterLp: 'https://api.beefy.finance/monster/lps',
  narwhalLp: 'https://api.beefy.finance/narwhal/lps',
  nyanswopLp:'https://api.beefy.finance/nyanswop/lps',
  pancake:   'https://api.beefy.finance/pancake/price',
  pancakeLp: 'https://api.beefy.finance/pancake/lps',
  ramenLp:   'https://api.beefy.finance/ramen/lps',
  thugs:     'https://api.beefy.finance/thugs/tickers',
  thugsLp:   'https://api.beefy.finance/thugs/lps',
  spongeLp:  'https://api.beefy.finance/sponge/lps',
};

const CACHE_TIMEOUT = 30 * 60 * 1000;
const cache = {};

const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const WBNB_BUSD = `${WBNB}_${BUSD}`

function isCached({ oracle, id }) {
  if (`${oracle}-${id}` in cache) {
    return cache[`${oracle}-${id}`].t + CACHE_TIMEOUT > Date.now();
  }
  return false;
}

function getCachedPrice({ oracle, id }) {
  return cache[`${oracle}-${id}`].price;
}

function addToCache({ oracle, id, price }) {
  cache[`${oracle}-${id}`] = { price: price, t: Date.now() };
}

const fetchBand = async id => {
  try {
    const bandchain = new Client(endpoints.bandchain);
    const price = await bandchain.getReferenceData([id]);
    return price[0].rate;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchCoingecko = async id => {
  try {
    const response = await axios.get(endpoints.coingecko, {
      params: { ids: id, vs_currencies: 'usd' },
    });
    return response.data[id].usd;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchPancake = async id => {
  try {
    const response = await axios.get(endpoints.pancake);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchThugs = async id => {
  try {
    const response = await axios.get(endpoints.thugs);
    const ticker = response.data[id];
    const bnb = response.data[WBNB_BUSD]['last_price'];

    let price = 0;

    const pair = id.split('_');
    if (pair[0] === WBNB && pair[1] === BUSD) {
      price = bnb;
    } else if (pair[0] === WBNB) {
      price = bnb / ticker['last_price'];
    } else {
      price = bnb * ticker['last_price'];
    }

    return price;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchLP = async (id, endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const oracleLpEndpoints = {
  "bakery": endpoints.bakery,
  "bakery-lp": endpoints.bakeryLp,
  "bdollar-lp": endpoints.bdollarLp,
  "jetfuel-lp": endpoints.jetfuelLp,
  "monster-lp": endpoints.monsterLp,
  "narwhal-lp": endpoints.narwhalLp,
  "nyanswop-lp": endpoints.nyanswopLp,
  "pancake-lp": endpoints.pancakeLp,
  "thugs-lp": endpoints.thugsLp,
  "kebab-lp": endpoints.kebabLp,
  "sponge-lp": endpoints.spongeLp,
  "bolt-lp": endpoints.boltLp,
  "cafe-lp": endpoints.cafeLp,
  "ramen-lp": endpoints.ramenLp
};

export const fetchPrice = async ({ oracle, id }) => {
  if (oracle === undefined) {
    console.error('Undefined oracle');
    return 0;
  }
  if (id === undefined) {
    console.error('Undefined pair');
    return 0;
  }

  if (isCached({ oracle, id })) {
    return getCachedPrice({ oracle, id });
  }

  let price = 0;
  switch (oracle) {
    case 'band':
      price = await fetchBand(id);
      break;

    case 'coingecko':
      price = await fetchCoingecko(id);
      break;

    case 'pancake':
      price = await fetchPancake(id);
      break;

    case 'thugs':
      price = await fetchThugs(id);
      break;

    default: price = 0;
  }

  if (price === 0 && oracleLpEndpoints[oracle]) {
    price = await fetchLP(id, oracleLpEndpoints[oracle]);
  }

  addToCache({ oracle, id, price });
  return price;
};
