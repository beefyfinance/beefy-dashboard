import { useContext } from 'react';
import { VaultsContext } from '../Context/ContextProvider';

import BaseMetric from './BaseMetric';

function GenericMetric({ name, metric, link }) {
	const context = useContext(VaultsContext);

	return <BaseMetric name={name} value={`${context[metric]}`} link={link} />;
}

export default GenericMetric;
