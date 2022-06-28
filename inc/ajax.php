<?php 
/**
 * Ajax
 * 
 */

function ph_ajax_get_products_water_pump_buying_guide() {
  $data = json_decode(file_get_contents("php://input"), true);
  $products = ph_get_products_by_terms($data['terms']);
  $filter_terms = ph_get_product_terms_data_filter($data['terms']);
  
  wp_send_json([
    'success' => true,
    'data' => get_option($data['nameOption']),
    'filter_terms' => $filter_terms,
    'products' => array_map(function($p) {
      $term =  get_the_terms($p->ID, 'product_cat');
      return [
        'ID' => $p->ID,
        'title' => $p->post_title,
        'thumbnail' => get_the_post_thumbnail_url($p->ID),
        'buying_guide_enable' => get_field('buying_guide_enable', $p->ID),
        'shortname' => get_field('short_name_prd', $p->ID),
        'flow' => floatval(get_field('flow_attr_prd', $p->ID)),
        'pressure' => floatval(get_field('pressure_attr_prd', $p->ID)),
        'type' => get_field('type_water_prd', $p->ID),
        'term' => $term,
      ];
    }, $products) 
  ]);
}

add_action('wp_ajax_ph_ajax_get_products_water_pump_buying_guide', 'ph_ajax_get_products_water_pump_buying_guide');
add_action('wp_ajax_nopriv_ph_ajax_get_products_water_pump_buying_guide', 'ph_ajax_get_products_water_pump_buying_guide');

function ph_ajax_save_products_water_pump_buying_guide() {
  $data = json_decode(file_get_contents("php://input"), true);
  update_option($data['nameOption'], $data['data']);
  
  wp_send_json([
    'success' => true,
  ]);
}

add_action('wp_ajax_ph_ajax_save_products_water_pump_buying_guide', 'ph_ajax_save_products_water_pump_buying_guide');
add_action('wp_ajax_nopriv_ph_ajax_save_products_water_pump_buying_guide', 'ph_ajax_save_products_water_pump_buying_guide');