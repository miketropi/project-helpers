import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useOuterClick from '../libs/useOuterClick';

const PopoverProductConfigContainer = styled.div`
  position: relative;
  transform: translateX(${ props => props.space ? `${ props.space }px` : '0px' });

  ${ props => props.show ? `
  z-index: 9;
  ` : `` }

  &:hover {
    z-index: 9;
  }
`;

const ConfigContainer = styled.div`
  position: absolute;
  left: 0; 
  top: calc(100% + 4px);
  width: 240px;
  padding: 10px;
  background: white;
  z-index: 9;
  border: solid 1px #eee;
  border-radius: 4px;
  display: ${ props => props.show ? 'block' : 'none' };
  font-size: 11px;
  font-weight: 600;
  box-shadow: 1px 1px 2px 1px rgb(1 1 1 / 5%);
  transform: translateX(${ props => props.space ? `${ props.space }px` : '0px' });

  h4 {
    font-size: 11px;
    line-height: 1.5em;
    margin-bottom: 1em;
    font-weight: bold;
    color: black;
  }

  button {
    font-size: 11px;
    padding: 8px 10px;
    line-height: normal;
    float: right;
    background: black;
    border: none;
  }

  fieldset {
    padding: 4px 10px;

    legend {
      margin: 0;
      font-size: 10px;
      color: black;
      text-transform: uppercase;
    }
  }
`;

export default ({ data, children, onChange, onRemove, extra, space__ }) => {
  const [show, setShow] = useState(false);
  const [space, setSpace] = useState(data.space);

  const innerRef = useOuterClick(ev => {
    setShow(false);
  });

  const _onChange = (e) => {
    let newData = { ...data };
    newData.space = e.target.value;
    setSpace(e.target.value);
    onChange(newData);
  }

  return <PopoverProductConfigContainer ref={ innerRef } space={ space__ } show={ show }>
    <div 
      onClick={ e => setShow(!show) } 
      style={{ cursor: 'pointer' }}>
      { children }
    </div>
    { extra }
    <ConfigContainer show={ show } space={ space__ * -1 } >
      <h4>{ data.product.shortname } (#{ data.product.ID })</h4>
      <fieldset>
        <legend>Left Space ({ space })</legend>
        <input 
          type="range" 
          min="0" 
          max="1300" 
          step="1" 
          className="input-slider" 
          value={ space }
          onChange={ _onChange }></input>
      </fieldset>
      <hr />
      <button className="btn" onClick={ onRemove }>Remove</button>
    </ConfigContainer>
  </PopoverProductConfigContainer>
}