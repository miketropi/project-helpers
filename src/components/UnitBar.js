import React from 'react';
import styled from 'styled-components';
import { useWPBG_Context } from '../libs/context/WPBG_Context';

const UnitBarContainer = styled.div`
  display: flex;

  .unit-bar__item {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s ease;
    -webkit-transition: .3s ease;

    .__label-unit {
      padding-left: 12px;
      padding-top: 6px;
      font-size: 13px;
      color: #707689;
      width: 100%;
    }
    
    &:not(:last-child) {
      border-right: 1px dashed #D8D8D8;
    }
  }
`;

export default () => {
  const { board, unitActive } = useWPBG_Context();

  return <UnitBarContainer>
    {
      board.length > 0 &&
      board.map((item, _index) => {
        let style = item?.width ? { width: `${ item.width }` } : {};
        return <div className="unit-bar__item" key={ _index } style={ style }>
          <span className="__label-unit">{ item.label }</span>
        </div>
      })
    }
  </UnitBarContainer>
}