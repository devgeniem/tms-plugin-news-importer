<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsFetcher;

use TMS\Theme\Base\Logger;

/**
 * NewsFetcher Cron
 *
 * @package TMS\Plugin\NewsFetcher
 */
final class Cron {

    /**
     * The cron hook name.
     */
    const CRON_HOOK = 'run_get_news_from_api';

    /**
     * Hooks
     */
    public function hooks() : void {
        // add_action( 'init', \Closure::fromCallable( [ $this, 'maybe_schedule_news_fetch' ] ) );
        add_action( 'init', \Closure::fromCallable( [ $this, 'init_fetch_handler' ] ) );
        // add_action( self::CRON_HOOK, \Closure::fromCallable( [ $this, 'init_fetch_handler' ] ) );
    }

    /**
     * This adds scheduled event.
     *
     * @return void
     */
    private function maybe_schedule_news_fetch() : void {

        // Schedule the event if it is not scheduled.
        if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
            wp_schedule_event( time(), 'twicedaily', self::CRON_HOOK );
        }
    }

    /**
     * Init fetch handler.
     *
     * @return void
     */
    private function init_fetch_handler() : void {
        new FetchHandler();
    }
}
