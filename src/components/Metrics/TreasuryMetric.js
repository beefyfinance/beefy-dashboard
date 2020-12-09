import { useContext } from 'react';
import { VaultsContext } from '../Context/ContextProvider';
import BaseMetric from './BaseMetric';

function TreasuryMetric({ token, link }) {
	const { treasury } = useContext(VaultsContext);

	return <BaseMetric name={`Treasury (${token})`} value={treasury[token]} link={link} />;
}

export default TreasuryMetric;
