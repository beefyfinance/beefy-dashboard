import styled from 'styled-components';

import { Palette } from '../../constants/Palette';

const Metrics = styled.nav`
	position: relative;
	width: 80%;
	max-width: 80rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-wrap: wrap;
	padding: 3rem 0;
`;
const Link = styled.a`
	text-decoration: none;
	color: ${Palette.black};

	&:hover {
		text-decoration: underline;
	}
`;

const Metric = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	user-select: none;
	background-color: ${Palette.gray[0]};
	border: 1px solid ${Palette.gray[1]};

	min-width: 7rem;
	margin: 0 1rem 1rem 0;
	padding: 0.25rem 1rem 0.75rem 0.5rem;

	&.sm {
		min-width: 5rem;
		margin: 0 1rem 1rem 0;
		padding: 0.5rem 0.5rem 0.75rem 0.5rem;
	}

	&.lg {
		min-width: 10rem;
		margin: 0 2rem 2rem 0;
		padding: 1rem 2rem 1.5rem 1rem;
	}
`;

const MetricName = styled.div`
	font-size: 1rem;
	font-weight: 400;
	color: ${Palette.gray[6]};

	${Metric}.sm & {
		font-size: 0.9rem;
	}

	${Metric}.lg & {
		font-size: 1.2rem;
	}
`;

const MetricValue = styled.div`
	font-weight: 700;
	font-size: 2rem;
	margin: 0.5rem 0;

	${Metric}.sm & {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0.25rem 0 0.5rem;
	}

	${Metric}.lg & {
		font-size: 3rem;
	}
`;

export { Metrics, Metric, MetricName, MetricValue, Link };
