const axios = require('axios');

export const request = async (action, data) => {
  return await axios({
    method: 'POST',
    url: `${ PH_PHP.ajax_url }?action=${ action }`,
    headers: { 'Content-Type': 'application/json' },
    data
  });
}

export const get_products_water_pump_buying_guide = async (terms) => {
  return await request('ph_ajax_get_products_water_pump_buying_guide', {
    terms,
  })
} 