/**
 * water_pump_buying_guide
 */
import { createRoot } from 'react-dom/client';
import { WPBG_Provider } from './context/WPBG_Context';
import WaterPumpBuyingGuide from '../components/WaterPumpBuyingGuide';

export default () => {
  const elem = document.getElementById('WaterPumpBuyingGuide');
  const name_option = elem.dataset.nameOption;
  const product_cats = elem.dataset.productCats;
  const root = createRoot(elem);
  if(!root) return;

  root.render(<WPBG_Provider product_cats={ product_cats } name_option={ name_option }>
    <WaterPumpBuyingGuide />
  </WPBG_Provider>);
}