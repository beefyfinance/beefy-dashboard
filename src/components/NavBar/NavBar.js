import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Nav, NavBtn, NavLogo, NavName, NavSection} from './style';
import {VaultsContext} from '../Context/ContextProvider';
import {getChainAppLink} from '../../utils/chainHelpers';

export default function NavBar() {
    const { t } = useTranslation();
	const { chainId } = useContext(VaultsContext);
	const appLink = getChainAppLink(chainId);

    return (
		<Nav>
			<NavSection>
				<NavLogo src='/img/beefy.svg' />
        <NavName href='https://dashboard.beefy.finance'>dashboard</NavName>
			</NavSection>
			<NavSection>
				<NavBtn href={appLink} target="_blank" rel="noreferrer">{t("LaunchApp")}</NavBtn>
			</NavSection>
		</Nav>
	);
}
