import React, { useRef, useEffect, useState } from 'react';
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
    z-index: 20;
  }

  .top-board-label {
    top: 0;
    background: #8FA9E3;
    border-radius: 0 0 4px 4px;
  }

  .bottom-board-label {
    bottom: 0;
    background: #714228;
    border-radius: 4px 4px 0 0;
  }

  .__start-label, 
  .__end-label {
    position: absolute;
    left: 0;
    top: -30px;
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
  ${ props => props.isLimitScreen ? `
  overflow: auto;
  ` : `` }

  .result-summary-container__inner {
    width: 1278px; 
    min-width: 1278px; 
    max-width: 1278px; 
    position: relative;
  }
`;

const FlowItemsContainer = styled.div`
  padding: 5px 0 20px;
  position: relative;
  z-index: 20;

  @media(max-width: 768px) {
    padding-top: 42px;
  }
`;

const PressureItemsContainer = styled.div`
  padding: 82px 0 10px;
  position: relative;
  z-index: 19;
`

export default () => {
  const { 
    board, 
    unitActive, 
    resultData, 
    setResultData, 
    modeEdit, 
    products, 
    isLimitScreen } = useWPBG_Context();
  
  const [scrollPos, setScrollPos] = useState(0);
  const [labelPos, setLabelPos] = useState({});
  const trackingScroll = useRef(null);
  const innerScroll = useRef(null);

  useEffect(() => {
    trackingScroll.current.addEventListener('scroll', e => {
      // console.log(trackingScroll.current.scrollLeft);
      if(trackingScroll.current?.scrollLeft) {
        setScrollPos(trackingScroll.current.scrollLeft)
      }
    })
  }, [])

  const calcPosLabelTags = (pos) => {
    let wrapWidth = innerScroll.current.clientWidth;
    return {
      leftLabelPos: pos,
      rightLabelPos: (wrapWidth - (trackingScroll.current.clientWidth + pos)) * -1,
    }
  }

  useEffect(() => {
    if(isLimitScreen == true) {
      const pos = calcPosLabelTags(scrollPos);
      setLabelPos({
        ...labelPos,
        ...pos
      });
    } else {
      setLabelPos({
        leftLabelPos: 0,
        rightLabelPos: 0
      })
    }
    
  }, [scrollPos, isLimitScreen])

  const onUpdateResultData = (data, type) => {
    let newResultData = { ...resultData };
    newResultData[type] = data;

    setResultData(newResultData);
  }

  return <BoardContainer boarsItem={ board.length }>
    <div className="top-board-label">Clean Water</div>
    
    <ResultSummaryContainer ref={ trackingScroll } mode={ modeEdit } isLimitScreen={ isLimitScreen }>
      <div className="result-summary-container__inner" ref={ innerScroll }>
        <PressureItemsContainer>
          <Items 
            data={ resultData.clean_water } 
            mode={ modeEdit } 
            onChange={ values => {
              onUpdateResultData(values, 'clean_water');
            } } 
            products={ products.filter(p => p.type == 'clean water') } />
        </PressureItemsContainer>
        <BoardLineColor>
          <span className="__start-label" style={{ transform: `translateX(${ labelPos?.leftLabelPos }px)` }}>Low { unitActive }</span>
          <span className="__end-label" style={{ transform: `translateX(${ labelPos?.rightLabelPos }px)` }}>High { unitActive }</span>
          <UnitBar />
        </BoardLineColor>
        <FlowItemsContainer>
          <Items 
            data={ resultData.dirty_water } 
            mode={ modeEdit } 
            onChange={ values => {
              onUpdateResultData(values, 'dirty_water');
            } } 
            products={ products.filter(p => p.type == 'dirty water') } />
        </FlowItemsContainer>

        <div className="board-grid-background">
          {
            board.length > 0 &&
            board.map((item, _index) => {
              let style = item?.width ? { width: `${ item.width }` } : {};
              return <div className="board__item" key={ _index } style={ style }></div>
            })
          }
        </div>
      </div>
    </ResultSummaryContainer>

    <div className="bottom-board-label">Dirty Water</div>
  </BoardContainer>
}