import { useWPBG_Context } from '../libs/context/WPBG_Context';
import styled from 'styled-components';

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

  .board__inner {
    display: flex;

    .board__item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 565px;
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
  position: absolute;
  top: calc(50% - 2px);
  width: 100%;
  height: 4px;
  background-image: linear-gradient(to right, #7dd866, #99cf56, #b0c64c, #c2bd47, #d1b348, #daa949, #e09f4d, #e59653, #e68b58, #e67f5e, #e37565, #de6c6c);
`;

export default () => {
  const { board, unitActive } = useWPBG_Context();

  return <BoardContainer boarsItem={ board.length }>
    <div className="top-board-label">Dirty Water</div>
    <BoardLineColor>
      <span className="__start-label">Low { unitActive }</span>
      <span className="__end-label">Hight { unitActive }</span>
    </BoardLineColor>
    <div className="board__inner">
    {
      board.length > 0 &&
      board.map((item, _index) => {
        let style = item?.width ? { width: `${ item.width }` } : {};
        return <div className="board__item" key={ _index } style={ style }>
          <span className="__label-unit">{ item.label }</span>
        </div>
      })
    }
    </div>
    <div className="bottom-board-label">Dirty Water</div>
  </BoardContainer>
}