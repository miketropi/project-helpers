<?php 
/**
 * Shortcode template
 */


$name_opts = 'products_water_pump_buying_guide_' . implode('_', explode(',', $atts['product_cats']));
// var_dump(get_option($name_opts));
?>
<div id="WaterPumpBuyingGuide" data-product-cats="<?php echo $atts['product_cats'] ?>" data-name-option="<?php echo $name_opts; ?>">
  <!-- React render -->
</div> <!-- #WaterPumpBuyingGuide -->