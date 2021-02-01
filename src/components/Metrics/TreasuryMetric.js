import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { VaultsContext } from '../Context/ContextProvider';
import BaseMetric from './BaseMetric';

function TreasuryMetric({ token, link }) {
	const { treasury } = useContext(VaultsContext);
	const { t } = useTranslation();

	return <BaseMetric name={t('Metric-Treasury', { token })} value={treasury[token]} link={link} />;
}

export default TreasuryMetric;
