<?php
/**
 * Static
 */

function PH_enqueue_scripts() {
  wp_enqueue_style('project-helpers-style', PH_URI . '/dist/css/project-helpers.bundle.css', false, PH_VERSION);
  wp_enqueue_script('project-helpers-script', PH_URI . '/dist/project-helpers.bundle.js', ['jquery'], PH_VERSION, true);

  wp_localize_script('project-helpers-script', 'PH_PHP', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'lang' => [],
  ]);
}

add_action('wp_enqueue_scripts', 'PH_enqueue_scripts', 30);