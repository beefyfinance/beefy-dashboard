import React from 'react';
import {
  Nav,
	NavSection,
	NavLogo,
  NavName,
  NavBtn
} from './style';

export default function NavBar() {
	return (
		<Nav>
			<NavSection>
				<NavLogo src='/img/beefy.svg' />
        <NavName href='https://dashboard.beefy.finance'>dashboard</NavName>
			</NavSection>
			<NavSection>
				<NavBtn href='https://app.beefy.finance' target="_blank" rel="noreferrer">Launch App</NavBtn>
			</NavSection>
		</Nav>
	);
}
