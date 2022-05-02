<?php
/**
 * Import object data.
 */

namespace TMS\Plugin\NewsImporter;

use Symfony\Component\DomCrawler\Crawler;

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
        return $this->object_data->id
               ? $this->object_data->langcode . '_' . $this->object_data->id
               : '';
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
        return empty( $this->object_data->field_body )
               ? ''
               : $this->handle_links( $this->object_data->field_body->processed );
    }

    /**
     * Get image.
     *
     * @return string
     */
    public function get_image() {
        $image = $this->object_data->field_main_image->field_media_image ?: null;

        return empty( $image ) ? '' : $image->image_full_url;
    }

    /**
     * Get target sites.
     *
     * @return array
     */
    public function get_target_sites() {
        $sites = $this->object_data->field_cross_site_publications;

        if ( empty( $sites ) ) {
            return [];
        }

        $target_sites = [];

        foreach ( $sites as $site ) {
            $target_sites[] = $site->field_site_id;
        }

        return $target_sites;
    }

    /**
     * Get writing_credits
     *
     * @return string
     */
    public function get_writing_credits() {
        return $this->object_data->field_author ?: '';
    }

    /**
     * Get image_credits
     *
     * @return string
     */
    public function get_image_credits() {
        return $this->object_data->field_main_image->field_author ?: '';
    }

    /**
     * Handle links
     *
     * @param string $content Article content.
     *
     * @return string
     */
    private function handle_links( string $content ) : string {
        $nodes       = new Crawler( $content );
        $replace_map = [];

        $nodes->filter( 'a' )->each( function ( Crawler $link ) use ( &$replace_map ) {
            $href = $link->attr( 'href' );

            if ( ! isset( parse_url( $href )['host'] ) ) {
                $replace_map[ $link->attr( 'href' ) ] = "https://www.tampere.fi${href}";
            }
        } );

        if ( ! empty( $replace_map ) ) {
            foreach ( $replace_map as $find => $replace ) {
                $content = str_replace( $find, $replace, $content );
            }
        }

        return $content;
    }
}
