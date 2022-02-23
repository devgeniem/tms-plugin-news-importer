<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsImporter;

use TMS\Theme\Base\Logger;
use Geniem\Oopi\Attribute\Language;
use Geniem\Oopi\Importable\PostImportable;

/**
 * NewsImporter ImportController
 *
 * @package TMS\Plugin\NewsImporter
 */
final class ImportController {

    private static $last_import_time = '';

    private static $current_import_time = '';

    /**
     * Constructor
     */
    public function __construct() {

        $news = $this->get_news();
        $importables_list = $this->create_importables_list( $news );

        $this->run_imports( $importables_list );
    }

    /**
     * Get news.
     *
     * @return array
     */
    private function get_news() : array {
        $api  = new Api();
        $news = $api->get();
        return $news;
    }

    private function create_importables_list() {
        $list = [];

        if ( empty( $this->news ) ) {
            return $list;
        }

        self::$last_import_time = get_option( 'tampere_news_last_import_time' ) ?: null;
        self::$current_import_time = date( 'Y-m-d H:i:s' );

        foreach ( $this->news as $object ) {
            $object = self::create_importable_object( new ImportObjectData( $object ) );
            
            if ( empty( $object ) ) {
                continue;
            }

            $list[ $object['site_id'] ][] = $object;
        }

        return $list;
    }

    private function run_imports( array $list ) {

        if ( empty( $list ) ) {
            return;
        }

        foreach ( $list as $key => $item ) {
            if ( intval( $key ) === get_main_site_id() ) {
                foreach ( $item as $post ) {
                    $this->import_post( $post['post'] );
                }
                continue;
            }

            switch_to_blog( $key );
            foreach ( $item as $post ) {
                $this->import_post( $post['post'] );
            }
        }

        restore_current_blog();

        update_option( 'tampere_news_last_import_time', self::$current_import_time );
    }

    private function import_post( $post ) {
        // Try to save the post.
        try {
            // If the data was invalid or errors occur while saving the post into the dabase, an exception is thrown.
            $post->import();
        }
        catch ( \Geniem\Oopi\Exception\PostException $e ) {
            // For this example we just dump and log the errors.
            foreach ( $e->get_errors() as $scope => $errors ) {
                foreach ( $errors as $error ) {
                    $message = $error['message'];
                    $data    = $error['data'];

                    var_dump( $data ); // phpcs:ignore
                    error_log( "Importer error in $scope: " . $message ); // phpcs:ignore
                }
            }
        }
    }

    public static function create_importable_object( object $import_object ) {
        $post_date     = $import_object->get_changed_time() ?: $import_object->get_created_time();
        $post_date_gmt = ( new \DateTime( $post_date ) )->format( 'Y-m-d H:i:s' );

        if ( ! empty( self::$last_import_time ) && self::$last_import_time > $post_date_gmt ) {
            return [];
        }

        $lang_code = $import_object->get_langcode() ?: 'fi';

        // The unique id for the post.
        $oopi_id = $import_object->get_id() . '_' . $lang_code;

        // Create a post object.
        $post = new PostImportable( $oopi_id );

        // In this example this post is an english version
        $post->set_language( new Language( $post, $lang_code, $oopi_id ) );

        // Set the basic post data as an associative array and cast it to object.
        $post->set_post( new \WP_Post(
            (object) [
                'post_title'    => $import_object->get_title(),
                'post_name'     => sanitize_title( $import_object->get_title() ),
                'post_type'     => 'post',
                'post_content'  => $import_object->get_content(),
                'post_excerpt'  => $import_object->get_lead_text(),
                'post_date_gmt' => $post_date_gmt,
            ]
        ) );


        // Postmeta data as key-value pairs.
        $post->set_meta(
            [
                [
                    'key'   => 'drupal_post_id',
                    'value' => $import_object->get_id(),
                ],
                [
                    'key'   => 'drupal_site_id',
                    'value' => 'tbd',
                ],
                [
                    'key'   => 'image_url',
                    'value' => $import_object->get_image(),
                ],
            ]
        );

        return [
            'site_id' => 1, //@TODO: Replace with actual site id,
            'post'    => $post,
        ];
    }
}
