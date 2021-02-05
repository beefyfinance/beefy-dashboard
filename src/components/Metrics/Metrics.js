import React from 'react';
import { useTranslation } from 'react-i18next';
import { Metrics } from './style';

import GlobalTvlMetric from './GlobalTvlMetric';
import TreasuryMetric from './TreasuryMetric';
import GenericMetric from './GenericMetric';

export default function NavBar() {
	const { t } = useTranslation();
	return (
		<Metrics>
			<GlobalTvlMetric link="https://app.beefy.finance/" />
			<GenericMetric
				name={t("Metric-ActiveVaults")}
				metric="vaultCount"
				link="https://app.beefy.finance/"
			/>
			<GenericMetric
				name={t("Metric-DailyRewards")}
				metric="dailyEarnings"
				link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
			/>
			<GenericMetric
				name={t("Metric-TotalRewards")}
				metric="totalEarnings"
				link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
			/>
			<GenericMetric
				name={t("Metric-BIFIStaked")}
				metric="stakedBifi"
				link="https://bscscan.com/token/0xCa3F508B8e4Dd382eE878A314789373D80A5190A?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#writeContract"
			/>
			<GenericMetric
				name={t("Metric-BIFIHolders")}
				metric="bifiHolders"
			/>
			<TreasuryMetric
				token="BIFI"
				link="https://bscscan.com/token/0xca3f508b8e4dd382ee878a314789373d80a5190a?a=0x4a32de8c248533c28904b24b4cfcfe18e9f2ad01"
				/>
			<TreasuryMetric
				token="WBNB"
				link="https://bscscan.com/token/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c?a=0x4a32de8c248533c28904b24b4cfcfe18e9f2ad01"
				/>
			<GenericMetric
				name={t("Metric-BIFIPrice")}
				metric="bifiPrice"
				link="https://streetswap.vip/#/swap?outputCurrency=0xca3f508b8e4dd382ee878a314789373d80a5190a"
			/>
			<GenericMetric
				name={t("Metric-MarketCap")}
				metric="marketCap"
				link="https://streetswap.vip/#/swap?outputCurrency=0xca3f508b8e4dd382ee878a314789373d80a5190a"
			/>
		</Metrics>
	);
}
