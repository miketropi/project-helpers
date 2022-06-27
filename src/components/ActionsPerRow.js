import React from 'react';
import styled from 'styled-components';

const ActionsPerRowContainer = styled.div`
  display: flex;  
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  line-height: 0;

  button {
    font-size: 9px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 2px 6px;
    height: 20px;
    line-height: normal;
    background: black;
    color: white;
    border: none;
    margin: 0 2px;
    opacity: .5;

    &:hover {
      opacity: 1;
    }
  }
`;

export default ({ onAdd, onRemove }) => {
  return <ActionsPerRowContainer>
    <div className="actions__inner">
      {
        onAdd != null &&
        <button onClick={ onAdd }>Add Row</button>
      }

      {
        onRemove != null &&
        <button onClick={ onRemove }>Remove Row</button>
      }
    </div>
  </ActionsPerRowContainer>
}