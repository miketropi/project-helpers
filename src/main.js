/**
 * Project helpers script
 */
import water_pump_buying_guide from './libs/water-pump-buying-guide';

;((w, $) => {
  'use strict';

  const ready = () => {
    water_pump_buying_guide();
  }

  $(ready);

})(window, jQuery);  