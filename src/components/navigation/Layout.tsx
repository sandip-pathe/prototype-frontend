import styled from 'styled-components';
import Map from '../map/Map';
import ActionMenu from './actionMenu/ActionMenu';
import Nav from './Nav';

type Props = {};

const Layout = (props: Props) => {
  return (
    <StyledAppWrapper>
      <ActionMenu />
      <Map />
      <StyledNavWrapper>
        <Nav />
      </StyledNavWrapper>
    </StyledAppWrapper>
  );
};

const StyledAppWrapper = styled.div`
  position: relative;
`;

const StyledNavWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export default Layout;
