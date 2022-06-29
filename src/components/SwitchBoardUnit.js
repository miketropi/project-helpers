import styled from 'styled-components';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
const SwitchBoardUnitContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 52px;
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
      background: #195FF5;
      color: white;
    }
  }
`;

export default () => {
  const { unitActive, switchUnit } = useWPBG_Context();
  const switchItems = [
    {
      label: 'Flow',
      value: 'flow'
    },
    {
      label: 'Pressure',
      value: 'pressure'
    }
  ]

  return <SwitchBoardUnitContainer>
    {
      switchItems.map(item => <button 
        className={ ((unitActive == item.value) ? '__active' : '') } 
        key={ item.value } 
        onClick={ e => {
        e.preventDefault();
        switchUnit(item.value)
      } } >{ item.label }</button>)
    }
  </SwitchBoardUnitContainer>
}