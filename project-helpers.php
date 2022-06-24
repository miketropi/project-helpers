<?php
/*
  Plugin Name: Project Helpers
  Plugin URI: https://akismet.com/
  Description: #
  Version: 1.0.0
  Author: #Beplus
  Author URI: #
  License: GPLv2 or later
  Text Domain: project-helpers
*/

{
  /**
   * Define
   */
  define('PH_VERSION', '1.0.0');
  define('PH_URI', plugin_dir_url(__FILE__));
  define('PH_DIR', plugin_dir_path(__FILE__));
}

{
  /**
   * Inc
   */
  require(PH_DIR . '/inc/static.php');
  require(PH_DIR . '/inc/helpers.php');
  require(PH_DIR . '/inc/hooks.php');
  require(PH_DIR . '/inc/ajax.php');
  require(PH_DIR . '/inc/shortcodes.php');
}