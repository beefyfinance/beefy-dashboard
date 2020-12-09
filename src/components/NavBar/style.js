import styled from 'styled-components';

import { Palette } from '../../constants/Palette';

const Nav = styled.nav`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 80%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 0 1.5rem;
`;

const NavSection = styled.div`
  display: flex;
  align-items: self-end;
`;

const NavLogo = styled.img`
  width: 4rem;
  min-height: 3rem;
  margin-right: 2rem;
`;

const NavItem = styled.div`
  font-weight: 900;
  font-size: 1.4rem;
  text-decoration: none;
`;

const NavName = styled(NavItem)``;

const NavBtn = styled.a`
  cursor: pointer;
  padding: .5rem 1.5rem;
  background: ${Palette.green[0]};
  color: ${Palette.white};
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none !important;
  outline: none;

  &:hover {
    background-color: ${Palette.green[1]};
  }

  &:active {
    background-color: ${Palette.black};
  }
`;

export {
  Nav,
  NavSection,
  NavItem,
  NavLogo,
  NavName,
  NavBtn
};
