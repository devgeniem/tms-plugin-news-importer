<?php
/**
 * Plugin Name: TMS News Importer
 * Plugin URI: https://github.com/devgeniem/tms-plugin-news-importer
 * Description: Import news from tampere.fi api.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Author: Geniem Oy
 * Author URI: https://geniem.com
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: tms-plugin-news-importer
 * Domain Path: /languages
 */

use TMS\Plugin\NewsImporter\NewsImporterPlugin;

// If not on the main site, bail.
if ( ! is_main_site() ) {
    return;
}

// Check if Composer has been initialized in this directory.
// Otherwise we just use global composer autoloading.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Get the plugin version.
$plugin_data    = get_file_data( __FILE__, [ 'Version' => 'Version' ], 'plugin' );
$plugin_version = $plugin_data['Version'];

$plugin_path = __DIR__;

// Initialize the plugin.
NewsImporterPlugin::init( $plugin_version, $plugin_path );

if ( ! function_exists( 'tms_plugin_news_importer' ) ) {
    /**
     * Get the tms-plugin-news-importer plugin instance.
     *
     * @return NewsImporterPlugin
     */
    function tms_plugin_news_importer() : NewsImporterPlugin {
        return NewsImporterPlugin::plugin();
    }
}
