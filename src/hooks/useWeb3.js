import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3 from "web3";

export function useWeb3() {
  // FIXME: is there a safer way to fetch the provider?
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [chainId, setChainId] = useState(provider.network?.chainId);
  const web3 = new Web3(provider.provider);

  useEffect(() => {
    if (!chainId) {
      provider.getNetwork().then(network => {
        setChainId(network.chainId);
      });
    }
  });

  return { provider, signer, chainId, web3 };
}

export default useWeb3;
