import styled from 'styled-components';
import { useWPBG_Context } from '../libs/context/WPBG_Context';

const SwitchModeContainer = styled.div`
  display: flex;
  padding: 4px;
  border-radius: 50px;
  border: 1px solid #DBDBDB; 
  z-index: 9;
  background: white;

  button {
    width: 65px;
    background: white;
    height: 31px;
    text-align: center;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    font-weight: 500;
    padding: 0;
    color: #505050;
    line-height: normal;
    transition: .3s ease;

    &.__active {
      background: black;
      color: white;
    }
  }
`;

export default () => {
  const { modeEdit, updateModeEdit } = useWPBG_Context();
  const switchItems = [
    {
      label: 'Edit',
      value: 'edit'
    },
    {
      label: 'Preview',
      value: 'preview'
    }
  ];

  return <SwitchModeContainer>
    {
      switchItems.map(item => <button 
        className={ ((modeEdit == item.value) ? '__active' : '') } 
        key={ item.value } 
        onClick={ e => {
        e.preventDefault();
        updateModeEdit(item.value)
      } } >{ item.label }</button>)
    }
  </SwitchModeContainer>
}