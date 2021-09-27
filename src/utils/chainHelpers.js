const vaultEndpoints = {
	56: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/bsc_pools.js',
	128: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/heco_pools.js',
	137: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/polygon_pools.js',
	250: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/fantom_pools.js',
	43114: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/avalanche_pools.js',
	1666600000: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/harmony_pools.js',
	42161: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/arbitrum_pools.js',
};

const apps = {
	56: 'https://app.beefy.finance/#/bsc',
	128: 'https://app.beefy.finance/#/heco',
	137: 'https://app.beefy.finance/#/polygon',
	250: 'https://app.beefy.finance/#/fantom',
	43114: 'https://app.beefy.finance/#/avax',
	1666600000: 'https://app.beefy.finance/#/harmony',
	42161: 'https://app.beefy.finance/#/arbitrum'
};

const explorers = {
	56: 'https://bscscan.com',
	128: 'https://hecoinfo.com/',
	137: 'https://polygonscan.com',
	250: 'https://ftmscan.com',
	43114: 'https://cchain.explorer.avax.network',
	1666600000: 'https://explorer.harmony.one',
	42161: 'https://arbiscan.io',
};

const rewardTokens = {
	56: 'BNB',
	128: 'HT',
	137: 'MATIC',
	250: 'FTM',
	43114: 'AVAX',
	1666600000: 'ONE',
	42161: 'ETH',
};

const treasuryLinks = {
	56: 'https://bscscan.com/address/0x4a32de8c248533c28904b24b4cfcfe18e9f2ad01',
	128: 'https://hecoinfo.com/address/0xf4859A3f36fBcA24BF8299bf56359fB441b03034',
	137: 'https://polygonscan.com/address/0x09EF0e7b555599A9F810789FfF68Db8DBF4c51a0',
	250: 'https://ftmscan.com/address/0xe6CcE165Aa3e52B2cC55F17b1dBC6A8fe5D66610',
	43114: 'https://cchain.explorer.avax.network/address/0xA3e3Af161943CfB3941B631676134bb048739727',
	1666600000: 'https://explorer.harmony.one/address/0xadb9ddfa24e326dc9d337561f6c7ba2a6ecec697',
	42161: 'https://arbiscan.io/address/0xc3a4fdcba79DB04b4C3e352b1C467B3Ba909D84A',
};

const stakedLinks = {
	56: 'https://bscscan.com/token/0xCa3F508B8e4Dd382eE878A314789373D80A5190A?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
	128: 'https://hecoinfo.com/token/0x765277eebeca2e31912c9946eae1021199b39c61?a=0x5f7347fedfD0b374e8CE8ed19Fc839F59FB59a3B',
	137: 'https://polygonscan.com/token/0xfbdd194376de19a88118e84e279b977f165d01b8?a=0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2',
	250: 'https://ftmscan.com/token/0xd6070ae98b8069de6b494332d1a1a81b6179d960?a=0x7fB900C14c9889A559C777D016a885995cE759Ee',
	43114: 'https://cchain.explorer.avax.network/address/0xA3e3Af161943CfB3941B631676134bb048739727/tokens',
	1666600000: 'https://explorer.harmony.one/address/0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8?activeTab=0',
	42161: 'https://arbiscan.io/token/0x99c409e5f62e4bd2ac142f17cafb6810b8f0baae?a=0x48f4634c8383af01bf71aefbc125eb582eb3c74d',
};

const buyLinks = {
	56: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	128: 'https://ht.mdex.com/#/swap?inputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a&outputCurrency=0x765277eebeca2e31912c9946eae1021199b39c61',
	137: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	250: 'https://spookyswap.finance/swap?inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75&outputCurrency=0xd6070ae98b8069de6B494332d1A1a81B6179D960',
	43114: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	1666600000: 'https://multichain.xyz/',
	42161: 'https://multichain.xyz/',
};

export function getChainAppLink(chainId) {
	return apps[chainId];
}

export function getChainExplorerLink(chainId) {
	return explorers[chainId];
}

export function getChainRewardTokenSymbol(chainId) {
	return rewardTokens[chainId];
}

export function getChainTreasuryLink(chainId) {
	return treasuryLinks[chainId];
}

export function getChainStakedLink(chainId) {
	return stakedLinks[chainId];
}

export function getChainBuyLink(chainId) {
	return buyLinks[chainId];
}

export function getChainVaultEndpoint(chainId) {
	return vaultEndpoints[chainId];
}