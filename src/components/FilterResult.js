import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import SwitchBoardUnit from './SwitchBoardUnit';

const FilterResultContainer = styled.div`
  position: relative;
`;
const FilterResultContainerInner = styled.div`
  padding: 0 48px;
`;

export default () => {
  

  return <FilterResultContainer>
    <SwitchBoardUnit />
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}