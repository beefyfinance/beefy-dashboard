import React from 'react';
import { Metric, MetricValue, MetricName, Link } from './style';

export default function BaseMetric({ name, value, link }) {
	return (
		<Metric className="lg">
			<MetricValue>{value}</MetricValue>
			<MetricName>
				<Link href={link} target="_blank" rel="noreferrer">
					{name}
				</Link>
			</MetricName>
		</Metric>
	);
}
