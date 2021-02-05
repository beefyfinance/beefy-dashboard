import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Nav,
	NavSection,
	NavLogo,
  NavName,
  NavBtn
} from './style';

export default function NavBar() {
    const { t } = useTranslation();
    return (
		<Nav>
			<NavSection>
				<NavLogo src='/img/beefy.svg' />
        <NavName href='https://dashboard.beefy.finance'>dashboard</NavName>
			</NavSection>
			<NavSection>
				<NavBtn href='https://app.beefy.finance' target="_blank" rel="noreferrer">{t("LaunchApp")}</NavBtn>
			</NavSection>
		</Nav>
	);
}
