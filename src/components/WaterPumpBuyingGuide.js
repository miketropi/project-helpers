/**
 * water-pump-buying-guide
 */
import React from 'react';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
import FilterBar from './FilterBar';
import FilterResult from './FilterResult';
import styled from 'styled-components';

const WaterPumpBuyingGuideContainerInner = styled.div`
  width: 1376px;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #D2D9EC;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;
`

export default () => {
  const { products, terms, updateFilter, currentFilter, resultData } = useWPBG_Context();
  const onFilter = (value) => {
    updateFilter(value)
  }

  return <div id="WaterPumpBuyingGuideContainer" className="water-pump-buying-guide-container">
    { JSON.stringify(resultData) }
    <WaterPumpBuyingGuideContainerInner>
      <FilterBar terms={ terms } totalProduct={ products.length } defaultActive={ currentFilter } onChange={ onFilter } />
      <FilterResult />
    </WaterPumpBuyingGuideContainerInner>
  </div>
} 