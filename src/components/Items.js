import React, { useState } from 'react';
import styled from 'styled-components';
import PopoverProductsSelect from './PopoverProductsSelect';
import ActionsPerRow from './ActionsPerRow';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
import { v4 as uuidv4 } from 'uuid';

const ItemsContainer = styled.div`
  width: 100%;

  .__edit {
    
    .row-inner {
      border: solid #eee;
      border-width: 1px 0;
    }
  }
`;

const RowContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;

  .row-inner {
    padding: 10px 0;
    display: flex;
    position: relative;
  }

  .__actions {
    display: none;
  }

  &:hover {

    .__actions {
      display: block;
    }
  }
`;

const ButtonAdd = styled.button`
  font-size: 13px;
  border-radius: 2px;
  width: 24px;
  height: 24px;
  min-width: auto;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`

const ProductItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 20px 4px 4px;
  border-radius: 100px;
  background: white;
  border: solid 1px #eee;
  min-width: 170px;

  .thumb {
    width: auto;
    height: 48px;
    border-radius: 48px;
    margin-right: 8px;
  }

  .__entry {

    h4 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      line-height: normal;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      margin: 0;
      line-height: normal;
    }
  }
`;

const ProductItem = ({ product }) => {
  const { unitActive } = useWPBG_Context();
  let unitText = unitActive == 'flow' ? `${ product.flow }L/min` : `${ product.pressure }kPa`;
  // let unitText = product.pressure

  return <ProductItemContainer>
    <img className="thumb" src={ product.thumbnail } alt={ `#${ product.shortname }` } />
    <div className="__entry">
      <h4>{ product.shortname }</h4>
      <p>{ unitText }</p>
    </div>
  </ProductItemContainer>
}

export default ({ data, onChange, mode, products }) => {
  const { unitActive } = useWPBG_Context();
  const [_data, set_Data] = useState(data);

  const onAdd = (ID, rowIndex, pos) => {
    let newData = { ..._data };
    let find = products.find( p => p.ID == ID );
    newData[unitActive][rowIndex].items.splice(pos, 0, {
      product: { ...find },
      space: 0,
    });

    set_Data(newData);
    onChange(newData);
  }

  const onAddRow = (rowIndex) => {
    let newData = { ..._data };
    console.log(newData, rowIndex)
    // newData[unitActive].splice(rowIndex + 1, 0, {
    //   _id: uuidv4(),
    //   items: []
    // })

    // set_Data(newData);
    // onChange(newData);
  }

  const onRemoveRow = (rowIndex) => {
    let r = confirm(`Are you sure you want to remove this row?`);
    if(r != true) return;

    let newData = { ..._data };
    newData[unitActive].splice(rowIndex, 1)

    set_Data(newData);
    onChange(newData);
  }

  return <ItemsContainer>
    <div className={ ['items-conatiner__inner', mode == 'edit' ? '__edit' : '__preview'].join(' ') }>
      { JSON.stringify(_data) }
      { unitActive }
      {
        _data[unitActive].map((row, _index) => {
          const { _id, items } = row;
          return <RowContainer key={ _id }>
            <div className="row-inner">
              {
                mode == 'edit' &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '4px', marginLeft: '-28px' }}>
                  <PopoverProductsSelect 
                    products={ products } 
                    onSelect={ value => {
                      onAdd(value, _index, 0);
                    } } >
                    <ButtonAdd>+</ButtonAdd>
                  </PopoverProductsSelect>
                </div>
              }

              {
                // JSON.stringify(items)
                items.length > 0 &&
                items.map(item => {
                  const { product, space } = item;
                  return <ProductItem product={ product } space={ space } key={ product.ID } />
                })
              }

              {
                // JSON.stringify(products)
              }

              {
                mode == 'edit' &&
                <div className="__actions">
                  {
                    _index == 0 && 
                    <ActionsPerRow onAdd={ e => { onAddRow(_index) } } />
                  }

                  {
                    _index > 0 && 
                    <ActionsPerRow onAdd={ e => { onAddRow(_index) } } onRemove={ e => { onRemoveRow(_index) } } />
                  }
                </div>
              }
            </div>
          </RowContainer>
        })
      }
    </div>
  </ItemsContainer>
}