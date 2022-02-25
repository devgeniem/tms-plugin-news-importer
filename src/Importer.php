<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsImporter;

use TMS\Theme\Base\Logger;
use Geniem\Oopi\Attribute\Language;
use Geniem\Oopi\Importable\PostImportable;

/**
 * NewsImporter Importer
 *
 * @package TMS\Plugin\NewsImporter
 */
final class Importer {

    /**
     * Last import time.
     *
     * @var string
     */
    private $last_import_time = '';

    /**
     * Current import time.
     *
     * @var string
     */
    private $current_import_time = '';

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

    /**
     * Create list of importable news.
     *
     * @param array $news Array of news.
     *
     * @return array
     */
    private function create_importables_list( $news ) : array {
        $list = [];

        if ( empty( $news ) ) {
            return $list;
        }

        $this->last_import_time = get_option( 'tampere_news_last_import_time' ) ?: null;
        $this->current_import_time = date( 'Y-m-d H:i:s' );

        foreach ( $news as $object ) {

            $object        = new ImportObjectData( $object );
            $post_date     = $object->get_changed_time() ?: $object->get_created_time();
            $post_date_gmt = ( new \DateTime( $post_date ) )->format( 'Y-m-d H:i:s' );
    
            if ( ! empty( $this->last_import_time ) && $this->last_import_time > $post_date_gmt ) {
                continue;
            }

            $list[] = $this->create_importable_object( $object );
        }

        return $list;
    }

    /**
     * Import posts.
     *
     * @return void  
     */
    public function import_posts() : void {

        $news = $this->get_news();
        $list = $this->create_importables_list( $news );

        if ( empty( $list ) ) {
            return;
        }

        foreach ( $list as $item ) {
            $id = $this->run_oopi_import( $item );
            if ( empty( $id ) ) {
                continue;
            }

            $this->insert_post( $id );
        }

        update_option( 'tampere_news_last_import_time', $this->current_import_time );
    }

    /**
     * Run oopi import.
     *
     * @param PostImportable $post
     *
     * @return int
     */
    public function run_oopi_import( PostImportable $post ) : int {
        // Try to save the post.
        try {
            // If the data was invalid or errors occur while saving the post into the dabase, an exception is thrown.
            return $post->import();
        }
        catch ( \Geniem\Oopi\Exception\PostException $e ) {
            ( new Logger() )->error( $e->getMessage(), $e->getTraceAsString() );
        }
    }

    /**
     * Create importable object.
     *
     * @param object @import_object
     *
     * @return PostImportable
     */
    public function create_importable_object( object $import_object ) : PostImportable {
        $post_date     = $import_object->get_changed_time() ?: $import_object->get_created_time();
        $post_date_gmt = ( new \DateTime( $post_date ) )->format( 'Y-m-d H:i:s' );

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
                'post_status'   => 'private',
            ]
        ) );

        $post->set_meta(
            [
                [
                    'key'   => 'drupal_post_id',
                    'value' => $import_object->get_id(),
                ],
                [
                    'key'   => 'wp_site_id',
                    'value' => 32,
                ],
                [
                    'key'   => 'image_url',
                    'value' => $import_object->get_image(),
                ],
            ]
        );
        
        return $post;
    }

    /**
     * Insert post to site.
     *
     * @param int $id
     *
     * @return void 
     */
    public function insert_post( int $id ) : void {

        $post_in_main_site = get_post( $id );
        $target_site    = get_post_meta( $id, 'wp_site_id', true );
        $drupal_post_id = get_post_meta( $id, 'drupal_post_id', true );
        $image_url      = get_post_meta( $id, 'image_url', true );

        switch_to_blog( $target_site );

        $post_id_in_target_site = new \WP_Query( [
                'meta_query'    => [
                    [
                        'key'   => 'drupal_post_id',
                        'value' => $drupal_post_id
                    ]
                ],
                'posts_per_page' => '1',
                'fields'         => 'ids',
        ] );

        $post_id_in_target_site = ! empty( $post_id_in_target_site->posts[0] ) ? $post_id_in_target_site->posts[0] : 0;

        $post_id = wp_insert_post( [
            'ID'            => $post_id_in_target_site,
            'post_title'    => $post_in_main_site->post_title,
            'post_content'  => $post_in_main_site->post_content,
            'post_excerpt'  => $post_in_main_site->post_excerpt,
            'post_date'     => $post_in_main_site->post_date,
            'post_status'   => 'publish',
            'meta_input'   => [
                'drupal_post_id' => $drupal_post_id,
                'wp_site_id'     => $target_site,
                'image_url'      => $image_url,
            ],
        ] );

        if ( empty( $post_id ) || $post_id instanceof \WP_Error ) {
            ( new Logger() )->error( 'Error creating or updating a post in site ' . $target_site . 'with drupal id ' . $drupal_post_id );
        }

        restore_current_blog();
    }
}
