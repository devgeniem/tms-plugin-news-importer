<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsImporter;

/**
 * NewsImporter Cron
 *
 * @package TMS\Plugin\NewsImporter
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

        add_action( 'init', \Closure::fromCallable( [ $this, 'maybe_schedule_news_import' ] ) );
        add_action( self::CRON_HOOK, \Closure::fromCallable( [ $this, 'init_import_handler' ] ) );
    }

    /**
     * This adds scheduled event.
     *
     * @return void
     */
    private function maybe_schedule_news_import() : void {

        // Schedule the event if it is not scheduled.
        if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
            wp_schedule_event( time(), 'twicedaily', self::CRON_HOOK );
        }
    }

    /**
     * Init import handler.
     *
     * @return void
     */
    private function init_import_handler() : void {
        ( new Importer() )->import_posts();
    }
}
