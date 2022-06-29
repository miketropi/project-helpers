import React, { createContext, useContext, useState, useEffect } from 'react';
import { get_products_water_pump_buying_guide, save } from '../api';
import SECTION_BOARD_FLOW from '../data/unit-flow';
import SECTION_BOARD_PRESSURE from '../data/unit-pressure';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive'

const WPBG_Context = createContext();

const RESULT_BOARD_DATA_INIT = {
  dirty_water: {
    flow: [
      {
        _id: uuidv4(),
        items: [],
      },
    ],
    pressure: [
      {
        _id: uuidv4(),
        items: [],
      },
    ],
  },
  clean_water: {
    flow: [
      {
        _id: uuidv4(),
        items: [],
      },
    ],
    pressure: [
      {
        _id: uuidv4(),
        items: [],
      },
    ],
  },
}

const WPBG_Provider = ({ children, product_cats, name_option }) => {
  const [modeEdit, setModeEdit] = useState('preview');
  const [terms, setTerms] = useState([])
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [board, setBoard] = useState(SECTION_BOARD_FLOW);
  const [unitActive, setUnitActive] = useState('flow');
  const [resultData, setResultData] = useState(RESULT_BOARD_DATA_INIT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const _getProducts = async () => {
      const { data } = await get_products_water_pump_buying_guide(product_cats.split(','), name_option);
      setProducts([...data.products]);
      setTerms([...data.filter_terms]);

      if( data.data ) {
        setResultData(data.data) // 🍌🍌🍌
      }
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

  const onSave = async () => {
    // console.log(resultData);
    setLoading(true);
    const result = await save(resultData, name_option);
    setLoading(false);
    console.log(result)
  }

  const value = {
    welcome: 'hi...!',
    admin_logged_in: parseInt(PH_PHP.admin_logged_in),
    isLimitScreen: useMediaQuery({ query: '(max-width: 1376px)' }),
    transformFilterScreen: useMediaQuery({ query: '(max-width: 1090px)' }),
    terms,
    products,
    currentFilter, updateFilter,
    board,
    unitActive, switchUnit,
    modeEdit, updateModeEdit, 
    resultData, setResultData,
    onSave, loading
  }

  return <WPBG_Context.Provider value={ value }>
    { children }
  </WPBG_Context.Provider>
}

const useWPBG_Context = () => {
  return useContext(WPBG_Context);
}

export { WPBG_Provider, useWPBG_Context };