const Web3 = require('web3');
const BigNumber = require('bignumber.js');

const { getTopicFromSignature, getTopicFromAddress, getValueFromData } = require('./topicHelpers');

const web3 = new Web3('https://bsc-dataseed.binance.org/');

const rewardPool = '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C';
const wbnb = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const rewardPoolCreationBlock = '1170074';

const getRewardsReceived = async () => {
	let result = new BigNumber(0);

	const transferTopic = getTopicFromSignature('Transfer(address,address,uint256)');
	const toTopic = getTopicFromAddress(rewardPool);
	const logs = await web3.eth.getPastLogs({
		fromBlock: rewardPoolCreationBlock,
		toBlock: 'latest',
		address: wbnb,
		topics: [ transferTopic, null, toTopic ]
	});

	for (let i = 0; i < logs.length; i++) {
		if (logs[i].blockNumber === rewardPoolCreationBlock && logs[i].transactionIndex < 3) {
			continue;
		}
		const value = getValueFromData(logs[i].data);
		result = result.plus(value);
	}

	const result1 = parseInt(result.toString()) / 1e18;
	return result1;
};

export default getRewardsReceived;
