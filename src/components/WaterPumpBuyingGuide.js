/**
 * water-pump-buying-guide
 */
import React, { Fragment } from 'react';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
import FilterBar from './FilterBar';
import FilterResult from './FilterResult';
import styled from 'styled-components';
import SwitchBoardUnit from './SwitchBoardUnit';
import SwitchMode from './SwitchMode';

const WaterPumpBuyingGuideContainerInner = styled.div`
  width: 1376px;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #D2D9EC;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;

  @media(max-width: 1376px) {
    border-radius: 0;
  }
`

const FilterResultWrap = styled.div`
  position: relative;
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
  const { 
    products, 
    terms, 
    updateFilter, 
    currentFilter, 
    resultData, 
    onSave, 
    loading, 
    admin_logged_in, 
    transformFilterScreen } = useWPBG_Context();

  const onFilter = (value) => {
    updateFilter(value)
  }

  return <div id="WaterPumpBuyingGuideContainer" className="water-pump-buying-guide-container">
    {/* { JSON.stringify(resultData) } */}
    <WaterPumpBuyingGuideContainerInner>
      <FilterBar terms={ terms } totalProduct={ products.length } defaultActive={ currentFilter } onChange={ onFilter } />
      <FilterResultWrap>

        {
          <Fragment>
            <SwitchBoardUnit />
            {
              admin_logged_in == 1 && transformFilterScreen != true &&
              <AdminTools>
                <SwitchMode />
                <ButtonSave onClick={ onSave } isLoading={ loading }>{ loading ? 'Saving...' : 'Save' }</ButtonSave>
              </AdminTools>
            }
          </Fragment>
        }

        <FilterResult />
      </FilterResultWrap>
    </WaterPumpBuyingGuideContainerInner>
  </div>
} 