import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PopoverProductsSelect from './PopoverProductsSelect';
import ActionsPerRow from './ActionsPerRow';
import { useWPBG_Context } from '../libs/context/WPBG_Context';
import { v4 as uuidv4 } from 'uuid';
import PopoverProductConfig from './PopoverProductConfig';

const ItemsContainer = styled.div`
  width: 100%;

  .__edit {
    
    .row-inner {
      padding: 10px 0;
      border: solid #eee;
      border-width: 1px 0;
      background: -moz-linear-gradient(left,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 49%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 49%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 49%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */
    }
  }
`;

const RowContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;

  .row-inner {
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
  
  min-width: 170px;
  margin-left: ${ props => props.space ? `${ props.space }px` : '0px' };
  filter: ${ props => props.disableUI ? 'grayscale(1)' : 'none' };
  opacity: ${ props => props.disableUI ? '.3' : '1' };
  transition: opacity .3s ease;

  ${ props => props.filterActive ? `
  background: #F1F5FF;
  border: 1px solid #195ff5;
  ` : `
  background: white;
  border: solid 1px #E9E9E9;
  ` }

  ${ props => props.productRemoved ? `
  background: #e5e5e5;
  filter: grayscale(1);
  opacity: .5;
  ` : `` }

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
      white-space: nowrap;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      margin: 0;
      line-height: normal;
      white-space: nowrap;
    }
  }
`;

const AddItemAfterContainer = styled.div`
  position: absolute;
  right: 0;
  top: -27px;
  transform: translateX(50%);
  opacity: .4;
  z-index: 9;

  &:hover {
    opacity: 1;
  }
`

const ProductItem = ({ product, space }) => {
  const { unitActive, currentFilter, products } = useWPBG_Context();

  let findProduct = products.find(p => p.ID == product.ID);
  let _p = findProduct ? findProduct : product;
  let unitText = unitActive == 'flow' ? `${ _p.flow } L/min` : `${ _p.pressure } kPa`;

  const findTerm = _p.term.filter( t => {
    return t.slug == currentFilter
  } );

  const productRemoved = findProduct ? false : true;

  const disableUI = currentFilter == 'all' ? false : (findTerm.length > 0 ? false : true);
  const filterActive = currentFilter == 'all' ? false : true;

  return <ProductItemContainer space={ space } disableUI={ disableUI } filterActive={ filterActive } productRemoved={ productRemoved }>
    <img className="thumb" src={ _p.thumbnail } alt={ `#${ _p.shortname }` } />
    <div className="__entry">
      <h4>{ _p.shortname } { productRemoved ? `[remove]` : '' }</h4>
      <p>{ unitText }</p>
    </div>
  </ProductItemContainer>
}

export default ({ data, onChange, mode, products }) => {
  const { unitActive } = useWPBG_Context();
  const [_data, set_Data] = useState(data);

  useEffect(() => {
    set_Data({ ...data })
  }, [data])

  const onAdd = (ID, rowIndex, pos) => {
    let newData = { ..._data };
    let find = products.find( p => p.ID == ID );
    newData[unitActive][rowIndex].items.splice(pos, 0, {
      _id: uuidv4(),
      product: { ...find },
      space: 0,
    });

    set_Data(newData);
    onChange(newData);
  }

  const onAddRow = (rowIndex) => {
    let newData = { ..._data };
    newData[unitActive].splice(rowIndex + 1, 0, {
      _id: uuidv4(),
      items: []
    })

    set_Data(newData);
    onChange(newData);
  }

  const onRemoveRow = (rowIndex) => {
    let r = confirm(`Are you sure you want to remove this row?`);
    if(r != true) return;

    let newData = { ..._data };
    newData[unitActive].splice(rowIndex, 1)

    set_Data(newData);
    onChange(newData);
  }

  const onUpdateItemProduct = (values, _rowIndex, _itemIndex) => {
    let newData = { ..._data };
    newData[unitActive][_rowIndex].items[_itemIndex] = values;

    set_Data(newData);
    onChange(newData);
  }

  const onRemoveItemProduct = (_rowIndex, _itemIndex) => {
    let r = confirm(`Are you sure you want to remove this item?`);
    if(r != true) return;

    let newData = { ..._data };
    newData[unitActive][_rowIndex].items.splice(_itemIndex, 1);

    set_Data(newData);
    onChange(newData);
  }

  return <ItemsContainer>
    {/* { JSON.stringify(_data[unitActive]) } */}
    <div className={ ['items-conatiner__inner', mode == 'edit' ? '__edit' : '__preview'].join(' ') }>
      {
        _data[unitActive].map((row, _rowIndex) => {
          const { _id, items } = row;
          return <RowContainer key={ _id }>
            <div className="row-inner">
              {
                mode == 'edit' &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '4px', marginLeft: '-28px' }}>
                  <PopoverProductsSelect 
                    products={ products } 
                    onSelect={ value => {
                      onAdd(value, _rowIndex, 0);
                    } } >
                    <ButtonAdd>+</ButtonAdd>
                  </PopoverProductsSelect>
                </div>
              }

              {
                // JSON.stringify(items)
                items.length > 0 &&
                items.map((item, _productIndex) => {
                  const { product, space, _id } = item;
                  return (mode == 'edit' 
                    ? <PopoverProductConfig 
                      key={ `config_${ _id }` } 
                      data={ item }
                      onChange={ value => {
                        onUpdateItemProduct(value, _rowIndex, _productIndex);
                      } } 
                      onRemove={ () => {
                        onRemoveItemProduct(_rowIndex, _productIndex)
                      } }
                      extra={ <AddItemAfterContainer>
                        <PopoverProductsSelect 
                          products={ products } 
                          onSelect={ value => {
                            onAdd(value, _rowIndex, _productIndex + 1);
                          } } >
                          <ButtonAdd>+</ButtonAdd>
                        </PopoverProductsSelect>
                      </AddItemAfterContainer> }>
                        <ProductItem 
                          product={ product } 
                          space={ space } 
                          key={ _id } />
                      </PopoverProductConfig> 
                    : <ProductItem 
                      product={ product } 
                      space={ space } 
                      key={ _id } />)
                })
              }

              {
                // JSON.stringify(products)
              }

              {
                mode == 'edit' &&
                <div className="__actions">
                  {
                    _rowIndex == 0 && 
                    <ActionsPerRow onAdd={ e => { onAddRow(_rowIndex) } } />
                  }

                  {
                    _rowIndex > 0 && 
                    <ActionsPerRow onAdd={ e => { onAddRow(_rowIndex) } } onRemove={ e => { onRemoveRow(_rowIndex) } } />
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