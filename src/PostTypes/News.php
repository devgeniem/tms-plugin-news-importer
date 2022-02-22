<?php
/**
 *  Copyright (c) 2021. Geniem Oy
 */

namespace TMS\Plugin\NewsFetcher\PostTypes;

use Geniem\ACF\Exception;
use Geniem\ACF\Group;
use Geniem\ACF\Field;
use Geniem\ACF\RuleGroup;
use TMS\Theme\Base\Logger;

/**
 * Class News
 *
 * @package TMS\Plugin\NewsFetcher\PostTypes
 */
class News {

    /**
     * This defines the slug of this post type.
     */
    public const SLUG = 'news-cpt';

    /**
     * This defines what is shown in the url. This can
     * be different than the slug which is used to register the post type.
     *
     * @var string
     */
    private $url_slug = '';

    /**
     * Define the CPT description
     *
     * @var string
     */
    private $description = '';

    /**
     * This is used to position the post type menu in admin.
     *
     * @var int
     */
    private $menu_order = 40;

    /**
     * This defines the CPT icon.
     *
     * @var string
     */
    private $icon = 'dashicons-image-filter';

    /**
     * Constructor
     */
    public function __construct() {
        // Make url slug translatable
        $this->url_slug = 'news';

        // Make possible description text translatable.
        $this->description = 'Uutiset tampere.fi:stä';

        add_action( 'init', \Closure::fromCallable( [ $this, 'register' ] ), 100, 0 );
    }

    /**
     * Add hooks and filters from this controller
     *
     * @return void
     */
    public function hooks() : void {
        add_filter(
            'use_block_editor_for_post_type',
            \Closure::fromCallable( [ $this, 'disable_gutenberg' ] ),
            10,
            2
        );
    }

    /**
     * This registers the post type.
     *
     * @return void
     */
    private function register() {
        $labels = [
            'name'                  => 'Uutiset',
            'singular_name'         => 'Uutinen',
            'menu_name'             => 'Uutiset',
            'name_admin_bar'        => 'Uutinen',
            'archives'              => 'Arkistot',
            'attributes'            => 'Ominaisuudet',
            'parent_item_colon'     => 'Vanhempi:',
            'all_items'             => 'Kaikki',
            'add_new_item'          => 'Lisää uusi',
            'add_new'               => 'Lisää uusi',
            'new_item'              => 'Uusi',
            'edit_item'             => 'Muokkaa',
            'update_item'           => 'Päivitä',
            'view_item'             => 'Näytä',
            'view_items'            => 'Näytä kaikki',
            'search_items'          => 'Etsi',
            'not_found'             => 'Ei löytynyt',
            'not_found_in_trash'    => 'Ei löytynyt roskakorista',
            'featured_image'        => 'Kuva',
            'set_featured_image'    => 'Aseta kuva',
            'remove_featured_image' => 'Poista kuva',
            'use_featured_image'    => 'Käytä kuvana',
            'insert_into_item'      => 'Aseta julkaisuun',
            'uploaded_to_this_item' => 'Lisätty tähän julkaisuun',
            'items_list'            => 'Listaus',
            'items_list_navigation' => 'Listauksen navigaatio',
            'filter_items_list'     => 'Suodata listaa',
        ];

        $args = [
            'label'               => $labels['name'],
            'description'         => '',
            'labels'              => $labels,
            'supports'            => [ 'title', 'revisions' ],
            'hierarchical'        => false,
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_position'       => $this->menu_order,
            'menu_icon'           => $this->icon,
            'show_in_admin_bar'   => true,
            'show_in_nav_menus'   => false,
            'can_export'          => true,
            'has_archive'         => false,
            'exclude_from_search' => false,
            'publicly_queryable'  => false,
            'capability_type'     => 'news',
            'query_var'           => true,
            'map_meta_cap'        => true,
            'show_in_rest'        => true,
        ];

        $args = apply_filters(
            'tms/post_type/' . static::SLUG . '/args',
            $args
        );

        register_post_type( static::SLUG, $args );
    }

    /**
     * Disable Gutenberg for this post type
     *
     * @param boolean $current_status The current Gutenberg status.
     * @param string  $post_type      The post type.
     *
     * @return boolean
     */
    protected function disable_gutenberg( bool $current_status, string $post_type ) : bool {
        return $post_type === static::SLUG ? false : $current_status; // phpcs:ignore
    }
}