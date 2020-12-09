import { useEffect } from 'react';

import Web3 from "web3";
import Web3Modal from "web3modal";
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
        1: 'https://bsc-dataseed.binance.org/',
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
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
