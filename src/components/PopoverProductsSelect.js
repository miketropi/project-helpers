import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import useOuterClick from '../libs/useOuterClick';

const PopoverProductsSelectContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const SelectContainer = styled.div`
  background: white;
  border-radius: 3px;
  overflow: hidden;
  position: absolute;
  z-index: 9;
  top: calc(100% + 5px);
  min-width: 180px;
  z-index: 9;
  border: solid 1px #eee;
  box-shadown: 3px 3px 4px -1px rgb(1 1 1 / 5%);
  display: ${ props => (props.status == true ? 'block' : 'none') };

  ul {
    margin: 0;
    padding: 0;
    max-height: 300px;
    overflow: auto;

    li {
      list-style: none;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.5em;
      cursor: pointer;

      &:hover {
        background: #1d68f5;
        color: white;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }
`

export default ({ children, products, onSelect }) => {
  const [show, setShow] = useState(false);
  const innerRef = useOuterClick(ev => {
    setShow(false);
  });

  const updateShow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShow(!show)
  }

  const _onSelect = value => {
    setShow(false);
    onSelect(value);
  }

  return <PopoverProductsSelectContainer ref={ innerRef }>
    <span onClick={ updateShow }>
      { children }
    </span>
    <SelectContainer status={ show }>
      <ul>
        {
          products.length > 0 &&
          products.map(p => { 
            return <li key={ p.ID } onClick={ e => { _onSelect(p.ID) } }>
              { p.shortname } (#{ p.ID })
            </li>
          })
        }
      </ul>
    </SelectContainer>
  </PopoverProductsSelectContainer>
}