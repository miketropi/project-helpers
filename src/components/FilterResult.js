import React from 'react';
import styled from 'styled-components';
import Board from './Board';

const FilterResultContainer = styled.div``;
const FilterResultContainerInner = styled.div`
  padding: 0 48px;
`;

export default () => {
  

  return <FilterResultContainer>
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}