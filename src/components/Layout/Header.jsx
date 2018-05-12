import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

class MainHeader extends React.Component {
  render() {
    return (
      <SiteContainer>
        <Navigation />
      </SiteContainer>
    );
  }
}

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.brand};
  padding: 25px;

  @media screen and (max-width: 600px) {
    padding: 15px;
  }

  @media handheld, (min-height: 300px), (orientation: landscape) {
    padding: 15px;
  }
`;

export default MainHeader;
