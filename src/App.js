import {useEffect} from 'react';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import ContextProvider from './components/Context/ContextProvider';
import NavBar from './components/NavBar/NavBar';
import Metrics from './components/Metrics/Metrics';
import Vaults from './components/Vaults/Vaults';

let web3Modal
let provider;

const providerOptions = {
	walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: 'https://bsc-dataseed.binance.org',
        128: 'https://http-mainnet.hecochain.com',
        137: 'https://rpc-mainnet.maticvigil.com',
        250: 'https://rpc.ftm.tools',
        43114: 'https://api.avax.network/ext/bc/C/rpc',
        1666600000: 'https://api.harmony.one',
        42161: 'https://arb1.arbitrum.io/rpc',
        42220: 'https://forno.celo.org',
        1285: 'https://rpc.moonriver.moonbeam.network',
        25: 'https://evm-cronos.crypto.org',
      },
    },
  },
};

const inject = async () => {
  if (window.ethereum) {    
    window.web3 = new Web3(window.ethereum);   
    window.ethereum.enable();    
    return true;
  
  } else {  
    try {
      web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
      });
    
      provider = await web3Modal.connect();
      window.web3 = new Web3(provider);
      
      return true;
    } catch (err) {
      console.error(err);
    }
  }

  return false;
}

function App() {
	useEffect(() => {
		const initialize = async () => {
			const injected = await inject();

			if (!injected) {
				alert("web3 object not found");
				return;
			}			
		}

		initialize();
	}, []);

	return (
		<ContextProvider>
			<NavBar />
			<Metrics />
			<Vaults />
		</ContextProvider>
	);
}
export default App;
