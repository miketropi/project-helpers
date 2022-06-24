<?php 
/**
 * Helpers
 */

function ph_get_products_by_terms($term_ids = []) {
  $args = apply_filters('ph_get_products_by_terms_args_filter', [
    'post_type' => 'product',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => 'meta_value_num',
    'order' => 'ASC',
    'tax_query' => [
      [
        'taxonomy' => 'product_cat',
        'field' => 'term_id',
        'terms' => $term_ids,
      ]
    ],
    'meta_query' => [
      [
        'key' => 'buying_guide_enable',
        'value' => true,
        'compare' => '==',
      ]
    ]
  ]);

  return get_posts($args);
} 

function ph_get_product_terms_data_filter($term_ids = []) {
  $args = [
    'taxonomy' => 'product_cat',
    'hide_empty' => false,
    'include' => implode(',', $term_ids),
  ];
  $result = get_terms($args);
  
  return array_map(function($term) {
    $term->subtitle = get_field('subtitle_cat_prd', $term->taxonomy . '_' . $term->term_id);
    return $term;
  }, $result);
}

add_action('init', function() {
  if(isset($_GET['dev'])) {
    // $terms = ph_get_product_terms_data_filter([643,644,645,288]);
    // var_dump($terms);
    
    // foreach($products as $p) {
    //   //var_dump($p);
    //   //update_field('buying_guide_enable', true, $p->ID);
    // }
  }
});