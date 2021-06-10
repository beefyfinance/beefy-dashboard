import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { Metrics } from './style';

import GlobalTvlMetric from './GlobalTvlMetric';
import TreasuryMetric from './TreasuryMetric';
import GenericMetric from './GenericMetric';
import { VaultsContext } from "../Context/ContextProvider";

const rewardTokens = {
  56: "BNB", 137: "MATIC"
};

const treasuryLinks = {
  56: "https://bscscan.com/address/0x4a32de8c248533c28904b24b4cfcfe18e9f2ad01",
  137: "https://polygonscan.com/address/0x09EF0e7b555599A9F810789FfF68Db8DBF4c51a0"
};

const stakedLinks = {
  56: "https://bscscan.com/token/0xCa3F508B8e4Dd382eE878A314789373D80A5190A?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics",
  137: "https://polygonscan.com/address/0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2"
};

export default function NavBar() {
	const { t } = useTranslation();
	const { chainId } = useContext(VaultsContext);
	return (
		<Metrics>
			<GlobalTvlMetric link="https://app.beefy.finance/" />
			<GenericMetric
				name={t("Metric-ActiveVaults")}
				metric="vaultCount"
				link="https://app.beefy.finance/"
			/>
      {chainId === 56 ?
        <GenericMetric
          name={t("Metric-DailyRewards")}
          metric="dailyEarnings"
          link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
        /> : ""}
      {chainId === 56 ?
        <GenericMetric
          name={t("Metric-TotalRewards")}
          metric="totalEarnings"
          link="https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=0x453D4Ba9a2D594314DF88564248497F7D74d6b2C#tokenAnalytics"
        /> : ""}
			<GenericMetric
				name={t("Metric-BIFIStaked")}
				metric="stakedBifi"
				link={stakedLinks[chainId]}
			/>
			{chainId === 56 ?
				<GenericMetric
					name={t("Metric-BIFIHolders")}
					metric="bifiHolders"
				/> : ""}
      <TreasuryMetric
        token="BIFI"
        tokenName="BIFI"
        link={treasuryLinks[chainId]}
      />
      <TreasuryMetric
        token="WBNB"
        tokenName={rewardTokens[chainId]}
        link={treasuryLinks[chainId]}
      />
			<GenericMetric
				name={t("Metric-BIFIPrice")}
				metric="bifiPrice"
				link="https://1inch.exchange/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B/BIFI/BUSD/?network=56"
			/>
			<GenericMetric
				name={t("Metric-MarketCap")}
				metric="marketCap"
				link="https://coinmarketcap.com/currencies/beefy-finance/"
			/>
		</Metrics>
	);
}
