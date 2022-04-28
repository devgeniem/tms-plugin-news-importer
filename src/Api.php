<?php
/**
 * Copyright (c) 2021 Geniem Oy.
 */

namespace TMS\Plugin\NewsImporter;

use TMS\Theme\Base\Logger;

/**
 * NewsImporter API
 *
 * @package TMS\Plugin\NewsImporter
 */
final class Api {

    /**
     * Get API base url
     *
     * @return string|null
     */
    protected function get_api_base_url() : ?string {
        return env( 'TAMPERE_API_URL' );
    }

    /**
     * Do an API request
     *
     * @param array  $params       Request query parameters.
     * @param array  $request_args Request args.
     * @param string $endpoint     Api endpoint.
     *
     * @return bool|mixed
     */
    public function do_request( array $params = [], array $request_args = [], $endpoint ) {
        $base_url = $this->get_api_base_url() . $endpoint;

        if ( empty( $base_url ) ) {
            return false;
        }

        $request_url = \add_query_arg(
            $params,
            sprintf(
                '%s/?',
                $base_url
            )
        );

        $response = \wp_remote_get( $request_url, $request_args );

        if ( 200 !== \wp_remote_retrieve_response_code( $response ) ) {
            ( new Logger() )->error( print_r( $response, true ) ); // phpcs:ignore
            return false;
        }

        return json_decode( \wp_remote_retrieve_body( $response ) );
    }

    /**
     * Is the API response valid.
     *
     * @param mixed $response API response body.
     *
     * @return bool
     */
    public function is_valid_response( $response ) : bool {
        return ! ( ! $response || empty( $response ) );
    }

    /**
     * Get all pages from API
     *
     * @param array  $params Query params.
     * @param string $lang_code Language code.
     *
     * @return array
     */
    public function get( array $params = [], $lang_code = 'fi' ) {
        $args = [
            'headers' => [
                'Content-Type' => 'application/vnd.api+json',
            ],
            'timeout' => 30,
        ];

        $basic_auth_key = env( 'TAMPERE_API_AUTH' );

        if ( ! empty( $basic_auth_key ) ) {
            $args['headers']['Authorization'] = 'Basic ' . base64_encode( $basic_auth_key ); // phpcs:ignore
        }

        $default_params = [
            'filter' => [ 
                'published' => [
                    'condition' => [
                        'path'  => 'status',
                        'value' => '1',
                    ],
                ],
                'publications' => [
                    'condition' => [
                        'path'     => 'field_cross_site_publications',
                        'operator' => 'IS%20NOT%20NULL',
                    ],
                ],
            ],
        ];

        $params = array_merge( $default_params, $params );

        $endpoint = $lang_code === 'fi' ? 'api/node/news_item' : 'en/api/node/news_item';

        return $this->do_get( [], $params, $args, $endpoint );
    }

    /**
     * Recursively get all pages from API.
     *
     * @param array  $data     Fetched persons.
     * @param array  $params   Query params.
     * @param array  $args     Request arguments.
     * @param string $endpoint Api endpoint.
     *
     * @return array
     */
    protected function do_get( array $data = [], array $params = [], array $args = [], $endpoint ) {
        $response = $this->do_request( $params, $args, $endpoint );

        if ( ! $this->is_valid_response( $response ) ) {
            return $data;
        }

        $data        = array_merge( $data, $response->data ?? [] );
        $query_parts = $this->get_link_query_parts(
            $response->links->next->href ?? ''
        );

        return empty( $query_parts )
            ? $data
            : $this->do_get( $data, $query_parts ?? [], $args );
    }

    /**
     * Get query params from link
     *
     * @param string $href Link.
     *
     * @return array
     */
    private function get_link_query_parts( string $href ) : array {
        $parts = wp_parse_url( $href );

        if ( ! isset( $parts['query'] ) ) {
            return [];
        }

        parse_str( $parts['query'], $query_parts );

        return $query_parts;
    }
}
