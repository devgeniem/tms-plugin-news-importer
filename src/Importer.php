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

        if ( empty( $news ) ) {
            return [];
        }

        $ids = [];

        foreach ( $news as $item ) {
            $object    = new ImportObjectData( $item );
            $object_id = $object->get_id() ?: null;

            if ( empty( $object_id ) ) {
                continue;
            }

            $ids[] = $object_id;
        }

        $existing_posts = new \WP_Query( [
            'meta_query'     => [
                [
                    'key'   => 'drupal_post_id',
                    'value' => $ids,
                ],
            ],
            'lang'           => [
                'fi',
                'en',
            ],
            'posts_per_page' => -1,
        ] );

        $existing_posts_data = [];

        if ( $existing_posts->have_posts() ) {
            foreach ( $existing_posts->posts as $item ) {
                $drupal_post_id                         = get_post_meta( $item->ID, 'drupal_post_id', true ) ?: '';
                $existing_posts_data[ $drupal_post_id ] = $item->ID;
            }
        }

        return [
            'api_posts'      => $news,
            'existing_posts' => $existing_posts_data,
        ];
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

        $this->last_import_time    = get_option( 'tampere_news_last_import_time' ) ?: null;
        $this->current_import_time = date( 'Y-m-d H:i:s' );

        foreach ( $news['api_posts'] as $object ) {
            $object                 = new ImportObjectData( $object );
            $object_id              = $object->get_id();
            $post_modified_date     = $object->get_changed_time();
            $post_modified_date_gmt = ( new \DateTime( $post_modified_date ) )->format( 'Y-m-d H:i:s' );

            if (
                ! empty( $this->last_import_time )
                && $this->last_import_time > $post_modified_date_gmt
                && array_key_exists( $object_id, $news['existing_posts'] )
            ) {
                continue;
            }

            $list[ $object_id ] = $this->create_importable_object( $object );
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

        foreach ( $list as $key => $item ) {

            $id = $item->import();
            if ( empty( $id ) ) {
                ( new Logger() )->error( 'Oopi error: Unable to import post ' . $key );
                continue;
            }

            $this->insert_post( $id );
        }

        update_option( 'tampere_news_last_import_time', $this->current_import_time );
    }

    /**
     * Create importable object.
     *
     * @param object @import_object
     *
     * @return PostImportable
     */
    public function create_importable_object( object $import_object ) : PostImportable {
        $post_date     = $import_object->get_created_time();
        $post_date_gmt = ( new \DateTime( $post_date ) )->format( 'Y-m-d H:i:s' );

        $post_modified_date     = $import_object->get_changed_time();
        $post_modified_date_gmt = ( new \DateTime( $post_modified_date ) )->format( 'Y-m-d H:i:s' );

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
                'post_title'        => $import_object->get_title(),
                'post_name'         => sanitize_title( $import_object->get_title() ),
                'post_type'         => 'post',
                'post_content'      => $import_object->get_content(),
                'post_excerpt'      => $import_object->get_lead_text(),
                'post_date_gmt'     => $post_date_gmt,
                'post_modified_gmt' => $post_modified_date_gmt,
                'post_status'       => 'private',
            ]
        ) );

        $wp_site_id = serialize( $import_object->get_target_sites() );

        $post->set_meta(
            [
                [
                    'key'   => 'drupal_post_id',
                    'value' => $import_object->get_id(),
                ],
                [
                    'key'   => 'wp_site_id',
                    'value' => $wp_site_id,
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
        $target_site       = unserialize( get_post_meta( $id, 'wp_site_id', true ) );
        $drupal_post_id    = get_post_meta( $id, 'drupal_post_id', true );
        $image_url         = get_post_meta( $id, 'image_url', true );
        $post_lang         = pll_get_post_language( $id );


        foreach ( $target_site as $site ) {
            switch_to_blog( $site );

            $post_id_in_target_site = new \WP_Query( [
                'meta_query'     => [
                    [
                        'key'   => 'drupal_post_id',
                        'value' => $drupal_post_id,
                    ],
                ],
                'posts_per_page' => '1',
                'fields'         => 'ids',
            ] );
    
            $post_id_in_target_site = ! empty( $post_id_in_target_site->posts[0] ) ? $post_id_in_target_site->posts[0] : 0;
    
            $post_id = wp_insert_post( [
                'ID'           => $post_id_in_target_site,
                'post_title'   => $post_in_main_site->post_title,
                'post_content' => $post_in_main_site->post_content,
                'post_excerpt' => $post_in_main_site->post_excerpt,
                'post_date'    => $post_in_main_site->post_date,
                'post_status'  => 'publish',
                'meta_input'   => [
                    'drupal_post_id' => $drupal_post_id,
                    'wp_site_id'     => $site,
                    'image_url'      => $image_url,
                ],
            ] );
    
            if ( empty( $post_id ) || $post_id instanceof \WP_Error ) {
                ( new Logger() )->error( 'Error creating or updating a post in site ' . $target_site . 'with drupal id ' . $drupal_post_id );
            }
    
            pll_set_post_language( $post_id, $post_lang );

            if ( ! empty( $image_url ) ) {
                $this->generate_featured_image( $image_url, $post_id );
            }
    
            restore_current_blog();
        }
    }

    /**
     * Generate featured image.
     *
     * @param string $image_url
     *
     * @param int $post_id
     *
     * @return void
     */
    private function generate_featured_image( string $image_url, int $post_id ) : void {
        $basic_auth_key = env( 'TAMPERE_API_AUTH' );
        $context        = stream_context_create(
            [
                "http" => [
                    "header" => 'Authorization: Basic ' . base64_encode( $basic_auth_key ),
                ],
            ]
        );

        $image_data = file_get_contents( $image_url, false, $context );
        $filename   = basename( $image_url );
        $upload_dir = wp_upload_dir();
        $file       = wp_mkdir_p( $upload_dir['path'] ) ? $upload_dir['path'] . '/' . $filename : $upload_dir['basedir'] . '/' . $filename;

        file_put_contents( $file, $image_data );

        $wp_filetype = wp_check_filetype( $filename, null );
        $attachment  = [
            'post_mime_type' => $wp_filetype['type'],
            'post_title'     => sanitize_file_name( $filename ),
            'post_content'   => '',
            'post_status'    => 'inherit',
        ];
        $attach_id   = wp_insert_attachment( $attachment, $file, $post_id );

        require_once( ABSPATH . 'wp-admin/includes/image.php' );

        $attach_data = wp_generate_attachment_metadata( $attach_id, $file );

        wp_update_attachment_metadata( $attach_id, $attach_data );
        set_post_thumbnail( $post_id, $attach_id );
    }
}
