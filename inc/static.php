<?php
/**
 * Static
 */

function PH_enqueue_scripts() {
  $__dev = true;
  $__version = $__dev ? rand(9, 99999) : PH_VERSION;

  wp_enqueue_style('project-helpers-style', PH_URI . '/dist/css/project-helpers.bundle.css', false, $__version);
  wp_enqueue_script('project-helpers-script', PH_URI . '/dist/project-helpers.bundle.js', ['jquery'], $__version, true);

  wp_localize_script('project-helpers-script', 'PH_PHP', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'admin_logged_in' => current_user_can('administrator'),
    'lang' => [],
  ]);
}

add_action('wp_enqueue_scripts', 'PH_enqueue_scripts', 30);