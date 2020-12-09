import { useState, useEffect } from 'react';
import ethers from 'ethers';

import BeefyVault from '../abis/BeefyVault.json';

const useVaultBalance = (vaultAddress) => {
	const [ balance, setBalance ] = useState(null);

	useEffect(() => {
		const getBalance = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const vaultContract = new ethers.Contract(vaultAddress, BeefyVault, signer);
			const balance = await vaultContract.balance();

			setBalance(balance.toString());
		};

		getBalance();
	}, []);

	return balance;
};

export default useVaultBalance;
