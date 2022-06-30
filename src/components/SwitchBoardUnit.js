import styled from 'styled-components';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
const SwitchBoardUnitContainer = styled.div`

  ${ props => props.transformFilterScreen ? `
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #D8D8D8;
  ` : `` }

  .switch-board-unit-container__inner {
    position: absolute;
    top: 20px;
    right: 52px;
    display: flex;
    padding: 4px;
    border-radius: 50px;
    border: 1px solid #DBDBDB; 
    z-index: 9;
    background: white;

    &.transform-filter-screen__true {
      position: initial;
      display: inline-block;
    }
  }
  
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
  const { unitActive, switchUnit, transformFilterScreen } = useWPBG_Context();
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

  return <SwitchBoardUnitContainer transformFilterScreen={ transformFilterScreen }>
    <div className={ ['switch-board-unit-container__inner', transformFilterScreen ? 'transform-filter-screen__true' : ''].join(' ') }>
      {
        switchItems.map(item => <button 
          className={ ((unitActive == item.value) ? '__active' : '') } 
          key={ item.value } 
          onClick={ e => {
          e.preventDefault();
          switchUnit(item.value)
        } } >{ item.label }</button>)
      }
    </div>
  </SwitchBoardUnitContainer>
}