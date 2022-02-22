<?php
/**
 * Plugin Name: tms-plugin-news-feed
 * Plugin URI: https://github.com/devgeniem/tms-plugin-news-feed
 * Description: Fetch news from tampere.fi api
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Author: Geniem Oy
 * Author URI: https://geniem.com
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: tms-plugin-news-feed
 * Domain Path: /languages
 */

use TMS\Plugin\NewsFeed\NewsFeedPlugin;

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
NewsFeedPlugin::init( $plugin_version, $plugin_path );

if ( ! function_exists( 'tms_plugin_news_feed' ) ) {
    /**
     * Get the tms-plugin-news-feed plugin instance.
     *
     * @return NewsFeedPlugin
     */
    function tms_plugin_news_feed() : NewsFeedPlugin {
        return NewsFeedPlugin::plugin();
    }
}
