import React, { Fragment } from 'react';
import styled from 'styled-components';
import Board from './Board';

const FilterResultContainer = styled.div`
  position: relative;
`;
const FilterResultContainerInner = styled.div`
  padding: 0 48px;

  @media(max-width: 1278px) {
    padding: 0;
  }
`;

export default () => {
  
  return <FilterResultContainer>
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}