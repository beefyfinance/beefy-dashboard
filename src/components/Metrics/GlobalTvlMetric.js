import { useContext } from 'react';
import { VaultsContext } from '../Context/ContextProvider';

import BaseMetric from './BaseMetric';
import { formatTvl } from '../../utils/format';

function GlobalTvlMetric({ link }) {
	const { globalTvl } = useContext(VaultsContext);

	return <BaseMetric name="Vaults TVL" value={formatTvl(Number(globalTvl))} link={link} />;
}

export default GlobalTvlMetric;
