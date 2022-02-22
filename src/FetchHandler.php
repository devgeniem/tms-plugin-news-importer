<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsFetcher;

use TMS\Theme\Base\Logger;

/**
 * NewsFetcher FetchHandler
 *
 * @package TMS\Plugin\NewsFetcher
 */
final class FetchHandler {

    /**
     * This holds the news to be created or updated.
     *
     * @var array
     */
    private $news = [];

    /**
     * Constructor
     */
    public function __construct() {
        $this->news = $this->get_news();
        $this->create_or_update_news();
    }

    /**
     * Get news.
     *
     * @return array
     */
    private function get_news() : array {
        return [];
    }

    /**
     * Create or update news.
     *
     * @return void
     */
    private function create_or_update_news() : void {
        return;
    }
}
