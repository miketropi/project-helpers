import React, { createContext, useContext, useState, useEffect } from 'react';
import { get_products_water_pump_buying_guide } from '../api';

const WPBG_Context = createContext();
const SECTION_BOARD_FLOW = [
  {
    label: '50 L/min',
    from: 50,
    to: 59,
    width: '14.2%',
  },
  {
    label: '60 L/min',
    from: 60,
    to: 79,
    width: '14.2%',
  },
  {
    label: '80 L/min',
    from: 80,
    to: 99,
    width: '14.2%',
  },
  {
    label: '100 L/min',
    from: 100,
    to: 149,
    width: '14.2%',
  },
  {
    label: '150 L/min',
    from: 150,
    to: 199,
    width: '14.2%',
  },
  {
    label: '200 L/min',
    from: 200,
    to: 399,
    width: '14.2%',
  },
  {
    label: '400 L/min',
    from: 400,
    to: 500,
    width: '14.2%',
  },
];

const SECTION_BOARD_PRESSURE = [
  {
    label: '0 kPa',
    from: 0,
    to: 99,
    width: '10%',
  },
  {
    label: '100 kPa',
    from: 100,
    to: 199,
    width: '10%',
  },
  {
    label: '200 kPa',
    from: 200,
    to: 299,
    width: '10%',
  },
  {
    label: '300 kPa',
    from: 300,
    to: 399,
    width: '30%',
  },
  {
    label: '400 kPa',
    from: 400,
    to: 499,
    width: '10%',
  },
  {
    label: '500 kPa',
    from: 500,
    to: 599,
    width: '14.2%',
  },
  {
    label: '600 kPa',
    from: 600,
    to: 699,
    width: '14.2%',
  },
];

const WPBG_Provider = ({ children, product_cats }) => {
  const [modeEdit, setModeEdit] = useState(false);
  const [terms, setTerms] = useState([])
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [board, setBoard] = useState(SECTION_BOARD_FLOW);
  const [unitActive, setUnitActive] = useState('flow');

  useEffect(() => {
    const _getProducts = async () => {
      const { data } = await get_products_water_pump_buying_guide(product_cats.split(','));
      setProducts([...data.products]);
      setTerms([...data.filter_terms]);
    }

    _getProducts();
  }, []);

  useEffect(() => {
    if(unitActive == 'flow') {
      setBoard(SECTION_BOARD_FLOW);
    } else if(unitActive == 'pressure') {
      setBoard(SECTION_BOARD_PRESSURE);
    }
  }, [unitActive])

  const updateFilter = (value) => {
    setCurrentFilter(value);
  }

  const switchUnit = (unit) => {
    setUnitActive(unit)
  }

  const updateModeEdit = (status) => {
    setModeEdit(status)
  }

  const value = {
    welcome: 'hi...!',
    terms,
    products,
    currentFilter, updateFilter,
    board,
    unitActive, switchUnit,
    modeEdit, updateModeEdit, 
  }

  return <WPBG_Context.Provider value={ value }>
    { children }
  </WPBG_Context.Provider>
}

const useWPBG_Context = () => {
  return useContext(WPBG_Context);
}

export { WPBG_Provider, useWPBG_Context };