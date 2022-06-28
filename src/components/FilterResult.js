import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import SwitchBoardUnit from './SwitchBoardUnit';
import SwitchMode from './SwitchMode';
import { useWPBG_Context } from '../libs/context/WPBG_Context';

const FilterResultContainer = styled.div`
  position: relative;
`;
const FilterResultContainerInner = styled.div`
  padding: 0 48px;
`;

const AdminTools = styled.div`
  position: absolute;
  top: 20px;
  left: 52px;
  z-index: 40;
  display: flex;
  align-items: center;
`;

const ButtonSave = styled.button`
  margin-left: 4px;
  height: 41px;
  line-height: normal;
  border-radius: 40px;
  padding: 0 20px;
  font-size: 12px;
  font-weight: 600;

  ${ props => props.isLoading ? `
  opacity: .5;
  pointer-events: none;
  background: gray;
  border-color: gray;
  ` : `` }
`;

export default () => {
  const { onSave, loading, admin_logged_in } = useWPBG_Context();
  
  return <FilterResultContainer>
    <SwitchBoardUnit />
    {
      admin_logged_in == 1 &&
      <AdminTools>
        <SwitchMode />
        <ButtonSave onClick={ onSave } isLoading={ loading }>{ loading ? 'Saving...' : 'Save' }</ButtonSave>
      </AdminTools>
    }
    
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}