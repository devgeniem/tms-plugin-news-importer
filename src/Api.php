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
     * @param array $params       Request query parameters.
     * @param array $request_args Request args.
     *
     * @return bool|mixed
     */
    public function do_request( array $params = [], array $request_args = [] ) {
        $base_url = $this->get_api_base_url();

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

        $response  = get_transient( 'sakka' );

        if ( $response ) {
            return $response;
        }

        $response = \wp_remote_get( $request_url, $request_args );
        if ( 200 !== \wp_remote_retrieve_response_code( $response ) ) {
            ( new Logger() )->error( print_r( $response, true ) ); // phpcs:ignore

            return false;
        }

        set_transient( 'sakka', json_decode( \wp_remote_retrieve_body( $response ) ), HOUR_IN_SECONDS * 2 );

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
     * @return array
     */
    public function get() {
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

        return $this->do_get( [], [], $args );
    }

    /**
     * Recursively get all pages from API.
     *
     * @param array $data   Fetched persons.
     * @param array $params Query params.
     * @param array $args   Request arguments.
     *
     * @return array
     */
    protected function do_get( array $data = [], array $params = [], array $args = [] ) {
        $response = $this->do_request( $params, $args );

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
