<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsImporter;

/**
 * Class NewsImporterPlugin
 *
 * @package TMS\Plugin\NewsImporter
 */
final class NewsImporterPlugin {

    /**
     * Holds the singleton.
     *
     * @var NewsImporterPlugin
     */
    protected static $instance;

    /**
     * Current plugin version.
     *
     * @var string
     */
    protected $version = '';

    /**
     * Get the instance.
     *
     * @return NewsImporterPlugin
     */
    public static function get_instance() : NewsImporterPlugin {
        return self::$instance;
    }

    /**
     * The plugin directory path.
     *
     * @var string
     */
    protected $plugin_path = '';

    /**
     * The plugin root uri without trailing slash.
     *
     * @var string
     */
    protected $plugin_uri = '';

    /**
     * Get the version.
     *
     * @return string
     */
    public function get_version() : string {
        return $this->version;
    }

    /**
     * Get the plugin directory path.
     *
     * @return string
     */
    public function get_plugin_path() : string {
        return $this->plugin_path;
    }

    /**
     * Get the plugin directory uri.
     *
     * @return string
     */
    public function get_plugin_uri() : string {
        return $this->plugin_uri;
    }

    /**
     * Initialize the plugin by creating the singleton.
     *
     * @param string $version     The current plugin version.
     * @param string $plugin_path The plugin path.
     */
    public static function init( $version = '', $plugin_path = '' ) {
        if ( empty( self::$instance ) ) {
            self::$instance = new self( $version, $plugin_path );
        }
    }

    /**
     * Get the plugin instance.
     *
     * @return Plugin
     */
    public static function plugin() {
        return self::$instance;
    }

    /**
     * Initialize the plugin functionalities.
     *
     * @param string $version     The current plugin version.
     * @param string $plugin_path The plugin path.
     */
    protected function __construct( $version = '', $plugin_path = '' ) {
        $this->version     = $version;
        $this->plugin_path = $plugin_path;
        $this->plugin_uri  = plugin_dir_url( $plugin_path ) . basename( $this->plugin_path );

        $this->hooks();
        $this->init_cli_commands();
    }

    /**
     * Add plugin hooks and filters.
     */
    protected function hooks() {
        \add_action( 'init', \Closure::fromCallable( [ $this, 'init_classes' ] ), 0 );
        \add_action(
            'wp_enqueue_scripts',
            \Closure::fromCallable( [ $this, 'enqueue_public_scripts' ] )
        );
        \add_filter( 'the_content', \Closure::fromCallable( [ $this, 'maybe_remove_autop' ] ), 9 );
    }

    /**
     * Init classes
     */
    protected function init_classes() {
        // bail early if not main site
        // news fetching and importing is done via main site only
        if ( ! is_main_site() ) {
            return;
        }

        ( new Cron() )->hooks();
    }

    /**
     * Enqueue public side scripts if they exist.
     */
    protected function enqueue_public_scripts() {
        if ( ! is_singular( 'post' ) || empty( get_field( 'drupal_post_id', get_the_ID() ) ) ) {
            return;
        }

        $css_path = $this->plugin_path . '/assets/dist/public.css';

        if ( file_exists( $css_path ) ) {
            \wp_enqueue_style(
                'exove-css',
                $this->plugin_uri . '/assets/dist/public.css',
                [],
                filemtime( $css_path ),
                'all'
            );
        }
        
        $js_path = $this->plugin_path . '/assets/dist/public.js';

        if ( file_exists( $js_path ) ) {
            \wp_register_script(
                'exove-js',
                $this->plugin_uri . '/assets/dist/public.js',
                [ 'jquery' ],
                filemtime( $js_path ),
                true
            );

            $url_prefix = defined( 'WP_ENV' ) && WP_ENV && WP_ENV === 'production'
                        ? 'https://www.tampere.fi'
                        : 'https://staging.tampere.fi';

            $localized_data = [
                'urlPrefix' => $url_prefix,
            ];

            \wp_localize_script( 'exove-js', 'exoveData', $localized_data );

            \wp_enqueue_script( 'exove-js' );
        }
    }

    /**
     * Maybe remove autop from news.
     *
     * @param string $content Post content.
     *
     * @return string
     */
    protected function maybe_remove_autop( string $content ) : string {
        if ( ! is_singular( 'post' ) || empty( get_field( 'drupal_post_id', get_the_ID() ) ) ) {
            return $content;
        }

        remove_filter( 'the_content', 'wpautop' );

        return $content;
    }

    /**
     * Add the WP CLI commands.
     *
     * @return void
     */
    protected function init_cli_commands() : void {
        if ( ( defined( 'WP_CLI' ) && WP_CLI ) ) {
            \WP_CLI::add_command(
                'news import',
                function() {
                    ( new Importer() )->import_posts();
                }
            );
        }
    }
}
