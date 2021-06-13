import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Metrics} from './style';
import GlobalTvlMetric from './GlobalTvlMetric';
import TreasuryMetric from './TreasuryMetric';
import GenericMetric from './GenericMetric';
import {VaultsContext} from '../Context/ContextProvider';
import {
	getChainAppLink,
	getChainBuyLink,
	getChainRewardTokenSymbol,
	getChainStakedLink,
	getChainTreasuryLink,
} from '../../utils/chainHelpers';

export default function NavBar() {
	const { t } = useTranslation();
	const { chainId } = useContext(VaultsContext);
	const appLink = getChainAppLink(chainId);
	const stakedLink = getChainStakedLink(chainId);
	const treasuryLink = getChainTreasuryLink(chainId);
	const rewardTokenSymbol = getChainRewardTokenSymbol(chainId);
	const buyLink = getChainBuyLink(chainId);

	return (
		<Metrics>
			<GlobalTvlMetric link={appLink}/>
			<GenericMetric
				name={t('Metric-ActiveVaults')}
				metric="vaultCount"
				link={appLink}
			/>
			{chainId === 56 ?
				<GenericMetric
					name={t('Metric-DailyRewards')}
					metric="dailyEarnings"
					link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
				/> : ''}
			{chainId === 56 ?
				<GenericMetric
					name={t('Metric-TotalRewards')}
					metric="totalEarnings"
					link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
				/> : ''}
			<GenericMetric
				name={t('Metric-BIFIStaked')}
				metric="stakedBifi"
				link={stakedLink}
			/>
			{chainId === 56 ?
				<GenericMetric
					name={t('Metric-BIFIHolders')}
					metric="bifiHolders"
				/> : ''}
			<TreasuryMetric
				token="BIFI"
				tokenName="BIFI"
				link={treasuryLink}
			/>
			<TreasuryMetric
				token="WBNB"
				tokenName={rewardTokenSymbol}
				link={treasuryLink}
			/>
			<GenericMetric
				name={t('Metric-BIFIPrice')}
				metric="bifiPrice"
				link={buyLink}
			/>
			<GenericMetric
				name={t('Metric-MarketCap')}
				metric="marketCap"
				link="https://coinmarketcap.com/currencies/beefy-finance/"
			/>
		</Metrics>
	);
}
