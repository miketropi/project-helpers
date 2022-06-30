import React, { useState } from 'react';
import styled from 'styled-components';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
import MobilePopup from './MobilePopup';
import { RiArrowRightSLine } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const FilterBarContainer = styled.div`
  padding: 32px 48px;
  box-sizing: border-box;
  border-bottom: 1px solid #D2D9EC;
  background: #fafbfe;
  border-radius: 4px 4px 0 0;

  @media(max-width: 768px) {
    padding: 16px;
  }

  .__radio-face-ui {
    display: inline-block;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border-radius: 16px;
    border: 1px solid #CBCFD8;
    margin-right: 10px;
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 10px;
      background: white;
    }
  }

  .filter-list {
    margin: 0;
    padding: 0;
    display: flex;
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    background: white;
    overflow: hidden;
    
    &__item {
      list-style: none;
      display: flex;
      padding: 18px 14px;
      cursor: pointer;
      transition: .3s ease;

      &:not(:last-child) {
        border-right: solid 1px #DBDBDB;
      }

      &.__active {
        background: #F9FBFF;
        box-shadow: inset 0px -5px 0px #0949d2;

        .__radio-face-ui {
          border-color: #ACC2F1;

          &:after {
            background: #0949D2;
          }
        }
      }
    }

    &__entry {
      
      label {
        display: block;
        font-weight: 800;
        font-size: 16px;
        color: #0F1729;
        line-height: normal;
      }

      span {
        font-size: 14px;
        color: #505050;
      }
    }
  }
`;

const MobileFilterSelector = styled.div`
  width: 343px;
  max-width: 100%;
  background: white;
  border: 1px solid #DBDBDB;
  border-radius: 4px;
  margin: 0 auto;
  padding: 16px 12px;
  color: #0F1729;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileFilterSelect = styled.ul`
  margin: 0;
  padding: 0;

  li.filter-item {
    list-style: none;
    padding: 12px;
    line-height: normal;
    font-size: 16px;
    color: #0F1729;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &.__active {
      background: #f5f5f5;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #DBDBDB;
    }

    .__item-entry {
      line-height: normal;

      label {
        display: block;
        font-size: 14px;
        color: #444444;
      }

      span {
        font-size: 14px;
        font-weight: 400;
        color: #505050;
      }
    }

    svg {
      fill: #7C765A;
      margin-right: 10px;
      transform: scale(1.4);
    }
  }
`;

export default ({ terms, totalProduct, onChange, defaultActive }) => {
  const { transformFilterScreen, currentFilter } = useWPBG_Context();
  const [active, setActive] = useState(defaultActive);
  const [modalShow, setModalShow] = useState(false);

  const _onChange = (value) => {
    setActive(value);
    onChange(value);
  }

  const _onChangeFilterMobi = (value) => {
    setActive(value);
    setModalShow(false);
    onChange(value);
  }

  return <FilterBarContainer>
    {
      transformFilterScreen == true &&
      <div>
        <MobileFilterSelector onClick={ e => setModalShow(!modalShow) }>
          <span>
            { currentFilter == 'all' 
              ? 'All Products' 
              : terms.find(t => t.slug == currentFilter).name }
          </span>
          <MdOutlineKeyboardArrowDown size="1.5em" color="#7C765A" />
        </MobileFilterSelector>
        <MobilePopup 
          title={ 'Applications' } 
          show={ modalShow }
          onClose={ () => {
            setModalShow(false);
          } }>
          <MobileFilterSelect>
            <li 
              className={ ['filter-item', (active == 'all' ? '__active' : '')].join(' ') } 
              key="mobile_filter_all" 
              onClick={ e => _onChangeFilterMobi('all') }>
              <div className={ ['__item-entry'].join(' ') }>
                <label>All Products</label>
                <span>({ totalProduct })</span>
              </div>
              <RiArrowRightSLine />
            </li>
            {
              terms.length > 0 && 
              terms.map(item => {
                return <li 
                  className={ ['filter-item', (active == item.slug ? '__active' : '')].join(' ') } 
                  key={ `mobile_filter_${ item.term_id }` }
                  onClick={ e => _onChangeFilterMobi(item.slug) }>
                  <div className="__item-entry">
                    <label>{ item.name }</label>
                    <span>{ item.subtitle }</span>
                  </div>
                  <RiArrowRightSLine />
                </li>
              })
            }
          </MobileFilterSelect>
        </MobilePopup>
      </div>
    }

    {
      transformFilterScreen == false &&
      <ul className="filter-list">
        <li 
          className={ ['filter-list__item', (active == 'all' ? '__active' : '')].join(' ') } 
          key={ '_all_' } 
          style={{ width: '8%' }} 
          onClick={ e => _onChange('all') }>
          <span className="__radio-face-ui"></span>
          <div className="filter-list__entry">
            <label>All</label>
            <span>({ totalProduct })</span>
          </div>
        </li>
        {
          terms.length > 0 && 
          terms.map(item => {
            return <li 
              className={ ['filter-list__item', (active == item.slug ? '__active' : '')].join(' ') } 
              key={ item.term_id } 
              style={{ width: '23%' }} 
              onClick={ e => _onChange(item.slug) }>
              <span className="__radio-face-ui"></span>
              <div className="filter-list__entry">
                <label>{ item.name }</label>
                <span>{ item.subtitle }</span>
              </div>
            </li>
          })
        }
      </ul>
    }
    
  </FilterBarContainer>
}