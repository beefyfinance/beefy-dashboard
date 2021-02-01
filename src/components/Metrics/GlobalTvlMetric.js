import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { VaultsContext } from '../Context/ContextProvider';

import BaseMetric from './BaseMetric';
import { formatTvl } from '../../utils/format';

function GlobalTvlMetric({ link }) {
	const { globalTvl } = useContext(VaultsContext);
	const { t } = useTranslation();

	return <BaseMetric name={t("Metric-VaultsTVL")} value={formatTvl(Number(globalTvl))} link={link} />;
}

export default GlobalTvlMetric;
