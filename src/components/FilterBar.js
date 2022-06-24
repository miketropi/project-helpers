import React, { useState } from 'react';
import styled from 'styled-components';

const FilterBarContainer = styled.div`
  padding: 32px 48px;
  box-sizing: border-box;
  border-bottom: 1px solid #D2D9EC;
  background: #fafbfe;

  .__radio-face-ui {
    display: inline-block;
    width: 16px;
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
    
    &__item {
      list-style: none;
      display: flex;
      padding: 18px 14px;
      cursor: pointer;

      &:not(:last-child) {
        border-right: solid 1px #DBDBDB;
      }

      &.__active {

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

export default ({ terms, totalProduct, onChange, defaultActive }) => {
  const [active, setActive] = useState(defaultActive);

  const _onChange = (value) => {
    setActive(value)
    onChange(value);
  }

  return <FilterBarContainer>
    {/* { JSON.stringify(terms) } */}
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
  </FilterBarContainer>
}