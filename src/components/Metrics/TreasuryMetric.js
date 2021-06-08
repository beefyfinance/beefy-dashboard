import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { VaultsContext } from '../Context/ContextProvider';
import BaseMetric from './BaseMetric';

function TreasuryMetric({ token, tokenName, link }) {
	const { treasury } = useContext(VaultsContext);
	const { t } = useTranslation();

  return <BaseMetric name={t("Metric-Treasury", { token: tokenName })} value={treasury[token]} link={link} />;
}

export default TreasuryMetric;
