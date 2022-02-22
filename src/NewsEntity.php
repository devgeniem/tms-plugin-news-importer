<?php
/**
 * Offer entity
 */

namespace TMS\Plugin\NewsFetcher;

/**
 * Class NewsEntity
 */
class NewsEntity {

    /**
     * Entity data
     *
     * @var mixed
     */
    protected $entity_data;

    /**
     * Entity constructor.
     *
     * @param mixed $entity_data Entity data.
     */
    public function __construct( $entity_data ) {
        $this->entity_data = $entity_data;
    }

    /**
     * Get title
     *
     * @return string|null
     */
    public function get_title() {
        return $this->title;
    }

    /**
     * Get created time.
     *
     * @return string|null
     */
    public function get_created_time() {
        return $this->created;
    }

    /**
     * Get changed time.
     *
     * @return string|null
     */
    public function get_changed_time() {
        return $this->changed;
    }

    /**
     * Get lead text.
     *
     * @return string|null
     */
    public function get_lead_text() {
        return $this->field_lead;
    }
}