import { useWPBG_Context } from '../libs/context/WPBG_Context';
import styled from 'styled-components';
import UnitBar from './UnitBar';
import Items from './Items';

const BoardContainer = styled.div`
  position: relative;

  .top-board-label,
  .bottom-board-label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 4px 12px;
    line-height: normal;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: .3s ease;
  }

  .top-board-label {
    top: 0;
    background: #714228;
    border-radius: 0 0 4px 4px;
  }

  .bottom-board-label {
    bottom: 0;
    background: #8FA9E3;
    border-radius: 4px 4px 0 0;
  }

  .__start-label, 
  .__end-label {
    position: absolute;
    left: 0;
    transform: translateY(-120%);
    color: white;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 12px;
    line-height: normal;
    border-radius: 4px;
  }

  .__start-label {
    background: #71D154;
  }

  .__end-label {
    right: 0;
    left: auto;
    background: #DE6867;
  }

  .board-grid-background {
    position: absolute;
    z-index: 1;
    display: flex;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    .board__item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      transition: .3s ease;
      -webkit-transition: .3s ease;

      .__label-unit {
        padding-left: 12px;
        padding-top: 26px;
        font-size: 13px;
        color: #707689;
        width: 100%;
      }
      
      &:not(:last-child) {
        border-right: 1px dashed #D8D8D8;
      }
    }
  }
`;

const BoardLineColor = styled.div`
  position: relative; 
  width: 100%;
  height: 4px;
  background-image: linear-gradient(to right, #7dd866, #99cf56, #b0c64c, #c2bd47, #d1b348, #daa949, #e09f4d, #e59653, #e68b58, #e67f5e, #e37565, #de6c6c);
  margin: 35px 0;
`;

const ResultSummaryContainer = styled.div`
  position: relative;
  z-index: 4;
`;

const FlowItemsContainer = styled.div`
  padding: 82px 0 10px;
`;

const PressureItemsContainer = styled.div`
  padding: 5px 0 20px;
`

export default () => {
  const { board, unitActive, resultData, setResultData, modeEdit, products } = useWPBG_Context();

  const onUpdateResultData = (data, type) => {
    let newResultData = {...resultData};
    newResultData[type] = data;

    setResultData(newResultData);
  }

  return <BoardContainer boarsItem={ board.length }>
    <div className="top-board-label">Dirty Water</div>
    
    <ResultSummaryContainer>
      <FlowItemsContainer>
        <Items 
          data={ resultData.dirty_water } 
          mode={ modeEdit } 
          onChange={ values => {
            onUpdateResultData(values, 'dirty_water');
          } } 
          products={ products.filter(p => p.type == 'dirty water') } />
      </FlowItemsContainer>
      <BoardLineColor>
        <span className="__start-label">Low { unitActive }</span>
        <span className="__end-label">Hight { unitActive }</span>
        <UnitBar />
      </BoardLineColor>
      <PressureItemsContainer>
        <Items 
          data={ resultData.clean_water } 
          mode={ modeEdit } 
          onChange={ values => {
            onUpdateResultData(values, 'clean_water');
          } } 
          products={ products.filter(p => p.type == 'clean water') } />
      </PressureItemsContainer>
    </ResultSummaryContainer>
    
    <div className="board-grid-background">
    {
      board.length > 0 &&
      board.map((item, _index) => {
        let style = item?.width ? { width: `${ item.width }` } : {};
        return <div className="board__item" key={ _index } style={ style }></div>
      })
    }
    </div>
    <div className="bottom-board-label">Dirty Water</div>
  </BoardContainer>
}