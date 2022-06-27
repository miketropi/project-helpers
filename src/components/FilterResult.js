import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import SwitchBoardUnit from './SwitchBoardUnit';
import SwitchMode from './SwitchMode';

const FilterResultContainer = styled.div`
  position: relative;
`;
const FilterResultContainerInner = styled.div`
  padding: 0 48px;
`;

export default () => {
  

  return <FilterResultContainer>
    <SwitchBoardUnit />
    <SwitchMode />
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}