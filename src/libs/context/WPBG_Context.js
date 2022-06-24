import React, { createContext, useContext, useState, useEffect } from 'react';
import { get_products_water_pump_buying_guide } from '../api';

const WPBG_Context = createContext();
const SECTION_BOARD = [
  {
    label: '50 L/min',
    unit: 10,
  },
  {
    label: '60 L/min',
    unit: 20,
  },
  {
    label: '80 L/min',
    unit: 20,
  },
  {
    label: '100 L/min',
    unit: 50,
  },
  {
    label: '150 L/min',
    unit: 50,
  },
  {
    label: '200 L/min',
    unit: 200,
  },
  {
    label: '400 L/min',
    unit: 100,
  },
]

const WPBG_Provider = ({ children, product_cats }) => {
  const [terms, setTerms] = useState([])
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [board, setBoard] = useState(SECTION_BOARD);

  useEffect(() => {
    const _getProducts = async () => {
      const { data } = await get_products_water_pump_buying_guide(product_cats.split(','));
      setProducts([...data.products]);
      setTerms([...data.filter_terms]);
    }

    _getProducts();
  }, []);

  const updateFilter = (value) => {
    setCurrentFilter(value);
  }

  const value = {
    welcome: 'hi...!',
    terms,
    products,
    currentFilter, updateFilter,
    board,
  }

  return <WPBG_Context.Provider value={ value }>
    { children }
  </WPBG_Context.Provider>
}

const useWPBG_Context = () => {
  return useContext(WPBG_Context);
}

export { WPBG_Provider, useWPBG_Context };