<?php
/**
 * Plugin Name: TMS News Fetcher
 * Plugin URI: https://github.com/devgeniem/tms-plugin-news-fetcher
 * Description: Fetch news from tampere.fi api and import/update news.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Author: Geniem Oy
 * Author URI: https://geniem.com
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: tms-plugin-news-fetcher
 * Domain Path: /languages
 */

use TMS\Plugin\NewsFetcher\NewsFetcherPlugin;

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
NewsFetcherPlugin::init( $plugin_version, $plugin_path );

if ( ! function_exists( 'tms_plugin_news_fetcher' ) ) {
    /**
     * Get the tms-plugin-news-fetcher plugin instance.
     *
     * @return NewsFetcherPlugin
     */
    function tms_plugin_news_fetcher() : NewsFetcherPlugin {
        return NewsFetcherPlugin::plugin();
    }
}
