<?php
/**
 * Shortcodes
 */

function PH_water_pump_buying_guide_func($atts = []) {
  $_atts = shortcode_atts([
    'product_cats' => '',
    'classes' => '',
  ], $atts);

  set_query_var('atts', $_atts);
  ob_start();
  load_template(PH_DIR . '/templates/water-pump-buying-guide.php', false);
  return ob_get_clean();
}

add_shortcode('water_pump_buying_guide', 'PH_water_pump_buying_guide_func');