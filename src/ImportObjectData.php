<?php
/**
 * Import object data.
 */

namespace TMS\Plugin\NewsImporter;

/**
 * Class ImportObjectData
 */
class ImportObjectData {

    /**
     * Data
     *
     * @var mixed
     */
    protected $object_data;

    /**
     * Object constructor.
     *
     * @param mixed $object_data Object data.
     */
    public function __construct( $object_data ) {
        $this->object_data = $object_data;
    }

    /**
     * Get id
     *
     * @return string
     */
    public function get_id() {
        return $this->object_data->id ?: '';
    }

    /**
     * Get langcode
     *
     * @return string
     */
    public function get_langcode() {
        return $this->object_data->langcode ?: '';
    }

    /**
     * Get title
     *
     * @return string
     */
    public function get_title() {
        return $this->object_data->title ?: '';
    }

    /**
     * Get created time.
     *
     * @return string
     */
    public function get_created_time() {
        return $this->object_data->created ?: '';
    }

    /**
     * Get changed time.
     *
     * @return string
     */
    public function get_changed_time() {
        return $this->object_data->changed ?: '';
    }

    /**
     * Get lead text.
     *
     * @return string
     */
    public function get_lead_text() {
        return $this->object_data->field_lead ?: '';
    }

    /**
     * Get news content.
     *
     * @return string
     */
    public function get_content() {
        return empty( $this->object_data->field_body ) ? '' : $this->object_data->field_body->processed;
    }

    /**
     * Get image.
     *
     * @return string
     */
    public function get_image() {
        return $this->object_data->field_main_image->links->self->href ?: '';
    }
}
