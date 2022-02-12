const vaultEndpoints = {
	56: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/bsc_pools.js',
	128: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/heco_pools.js',
	137: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/polygon_pools.js',
	250: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/fantom_pools.js',
	43114: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/avalanche_pools.js',
	1666600000: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/harmony_pools.js',
	42161: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/arbitrum_pools.js',
	42220: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/celo_pools.js',
	1285: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/moonriver_pools.js',
	25: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/cronos_pools.js',
	122: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/fuse_pools.js',
	1088: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/metis_pools.js',
	1313161554: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/aurora_pools.js',
	1285: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/features/configure/vault/moonbeam_pools.js',
};

const apps = {
	56: 'https://app.beefy.finance/#/bsc',
	128: 'https://app.beefy.finance/#/heco',
	137: 'https://app.beefy.finance/#/polygon',
	250: 'https://app.beefy.finance/#/fantom',
	43114: 'https://app.beefy.finance/#/avax',
	1666600000: 'https://app.beefy.finance/#/harmony',
	42161: 'https://app.beefy.finance/#/arbitrum',
	42220: 'https://app.beefy.finance/#/celo',
	1285: 'https://app.beefy.finance/#/moonriver',
	25: 'https://app.beefy.finance/#/cronos',
	122: 'https://app.beefy.finance/#/fuse',
	1088: 'https://app.beefy.finance/#/metis',
	1313161554: 'https://app.beefy.finance/#/aurora',
	1284:  'https://app.beefy.finance/#/moonbeam',
};

const explorers = {
	56: 'https://bscscan.com',
	128: 'https://hecoinfo.com/',
	137: 'https://polygonscan.com',
	250: 'https://ftmscan.com',
	43114: 'https://snowtrace.io',
	1666600000: 'https://explorer.harmony.one',
	42161: 'https://arbiscan.io',
	42220: 'https://explorer.celo.org',
	1285: 'https://moonriver.moonscan.io',
	25: 'https://cronoscan.com/',
	122: 'https://explorer.fuse.io/',
	1088: 'https://andromeda-explorer.metis.io/',
	1313161554: 'https://explorer.mainnet.aurora.dev/',
	1284: 'https://moonscan.io/'
};

const rewardTokens = {
	56: 'BNB',
	128: 'HT',
	137: 'MATIC',
	250: 'FTM',
	43114: 'AVAX',
	1666600000: 'ONE',
	42161: 'ETH',
	42220: 'CELO',
	1285: 'MOVR',
	25: 'CRO',
	122: 'FUSE',
	1088: 'METIS',
	1313161554: 'ETH',
	1284: 'GLMR',
};

const treasuryLinks = {
	56: 'https://bscscan.com/address/0x4a32de8c248533c28904b24b4cfcfe18e9f2ad01',
	128: 'https://hecoinfo.com/address/0xf4859A3f36fBcA24BF8299bf56359fB441b03034',
	137: 'https://polygonscan.com/address/0x09EF0e7b555599A9F810789FfF68Db8DBF4c51a0',
	250: 'https://ftmscan.com/address/0xe6CcE165Aa3e52B2cC55F17b1dBC6A8fe5D66610',
	43114: 'https://snowtrace.io/address/0xA3e3Af161943CfB3941B631676134bb048739727',
	1666600000: 'https://explorer.harmony.one/address/0xadb9ddfa24e326dc9d337561f6c7ba2a6ecec697',
	42161: 'https://arbiscan.io/address/0xc3a4fdcba79DB04b4C3e352b1C467B3Ba909D84A',
	42220: 'https://explorer.celo.org/address/0xd9F2Da642FAA1307e4F70a5E3aC31b9bfe920eAF',
	1285: 'https://moonriver.moonscan.io/address/0xB6Fb58eea08b5539f371A744bb9Ef86283F1B3c2',
	25: 'https://cronoscan.com/address/0x3f385082Ee3dFf58ca0a6a7fe44Ea0B5d6b4168E',
	122: 'https://explorer.fuse.io/address/0x922f8807E781739DDefEe51df990457B522cBCf5',
	1088: 'https://andromeda-explorer.metis.io/address/0x0f9602B7E7146a9BaE16dB948281BebDb7C2D095/',
	1313161554: 'https://explorer.mainnet.aurora.dev/address/0x8c2d54BA94f4638f1bb91f623F378B66d6023324/',
	1284: 'https://moonscan.io/address/0x3E7F60B442CEAE0FE5e48e07EB85Cfb1Ed60e81A',

};

const stakedLinks = {
	56: 'https://bscscan.com/token/0xCa3F508B8e4Dd382eE878A314789373D80A5190A?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
	128: 'https://hecoinfo.com/token/0x765277eebeca2e31912c9946eae1021199b39c61?a=0x5f7347fedfD0b374e8CE8ed19Fc839F59FB59a3B',
	137: 'https://polygonscan.com/token/0xfbdd194376de19a88118e84e279b977f165d01b8?a=0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2',
	250: 'https://ftmscan.com/token/0xd6070ae98b8069de6b494332d1a1a81b6179d960?a=0x7fB900C14c9889A559C777D016a885995cE759Ee',
	43114: 'https://snowtrace.io/token/0xd6070ae98b8069de6b494332d1a1a81b6179d960?a=0x86d38c6b6313c5A3021D68D1F57CF5e69197592A',
	1666600000: 'https://explorer.harmony.one/address/0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8?activeTab=0',
	42161: 'https://arbiscan.io/token/0x99c409e5f62e4bd2ac142f17cafb6810b8f0baae?a=0x48f4634c8383af01bf71aefbc125eb582eb3c74d',
	42220: 'https://explorer.celo.org/address/0x2D250016E3621CfC50A0ff7e5f6E34bbC6bfE50E/tokens',
	1285: 'https://moonriver.moonscan.io/token/0x173fd7434B8B50dF08e3298f173487ebDB35FD14?a=0x4Aabd0d73181325DD1609Ce696eF048702DE7153',
	25: 'https://cronos.crypto.org/explorer/address/0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF',
	122: 'https://explorer.fuse.io/address/0x107Dbf9c9C0EF2Df114159e5C7DC2baf7C444cFF',
	1088: 'https://andromeda-explorer.metis.io/address/0x2a30C5e0d577108F694d2A96179cd73611Ee069b/',
	1313161554: 'https://explorer.mainnet.aurora.dev/address/0xE6ab45f5e93FA377D0c4cC097187Ab7256c2AEBf/',
	1284: 'https://moonscan.io/address/0x1198f78efd67DFc917510aaA07d49545f4B24f11',
};

const buyLinks = {
	56: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	128: 'https://ht.mdex.com/#/swap?inputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a&outputCurrency=0x765277eebeca2e31912c9946eae1021199b39c61',
	137: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	250: 'https://spookyswap.finance/swap?inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75&outputCurrency=0xd6070ae98b8069de6B494332d1A1a81B6179D960',
	43114: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
	1666600000: 'https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8',
	42161: 'https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x99C409E5f62E4bd2AC142f17caFb6810B8F0BAAE',
	42220: 'https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
	1285: 'https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x173fd7434B8B50dF08e3298f173487ebDB35FD14',
	25: 'https://multichain.xyz/',
	122: 'https://app.fuse.fi/#/swap',
	1088: 'https://netswap.io/#/swap?inputCurrency=0xe6801928061cdbe32ac5ad0634427e140efd05f9',
	1313161554: '',
	1284: 'https://app.beamswap.io/exchange/swap?inputCurrency=0x595c8481c48894771ce8fade54ac6bf59093f9e8&outputCurrency=0xacc15dc74880c9944775448304b263d191c6077f'
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