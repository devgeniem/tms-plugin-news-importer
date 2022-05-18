/*
 *  Copyright (c) 2021. Geniem Oy
 */

/**
 * News JS controller.
 */

// Use jQuery as $ within this file scope.
const $ = jQuery; // eslint-disable-line no-unused-vars

/**
 * Class News
 */
class News {

    /**
     * Cache dom elements for use in the class's methods
     *
     * @return {void}
     */
    cache() {
        this.exoveContent = $( '.topical-content' );
    }

    /**
     * Modify news elements.
     *
     * @return {void}
     */
    modifyNewsElements() {
        if ( ! this.exoveContent.length ) {
            return;
        }

        this.exoveContent.find( '.process-accordion__heading, .accordion__heading' ).each( function() {
            $( this ).addClass( 'js-toggle-e' );
        } );

        this.exoveContent.find( 'use' ).each( function() {
            const xlinkHref = $( this ).attr( 'xlink:href' );
            $( this ).attr( 'xlink:href', `${exoveData.urlPrefix}${xlinkHref}` );
        } );
    }

    /**
     * Toggle target element
     *
     * @param {Object} event Click event object.
     *
     * @return {void}
     */
     toggle( event ) {
        const toggleTrigger = $( event.currentTarget );
        const ariaExpandedState = toggleTrigger.attr( 'aria-expanded' ) === 'false';
        const duration = typeof toggleTrigger.data( 'duration' ) !== undefined ? toggleTrigger.data( 'duration' ) : 400;

        let toggleTarget = $( '#' + toggleTrigger.attr( 'aria-controls' ) );

        if ( ! toggleTarget.length && toggleTrigger.hasClass( 'accordion-heading' ) ) {
            toggleTarget = toggleTrigger.closest( '.accordion__item' ).find( '.accordion__content' );
        }

        if ( toggleTarget.hasClass( 'is-hidden' ) ) {
            toggleTarget.css( 'display', 'none' );
            toggleTarget.removeClass( 'is-hidden' );
        }

        toggleTrigger.attr( 'aria-expanded', ariaExpandedState );
        toggleTrigger.toggleClass( 'is-active' );

        if ( toggleTrigger.hasClass( 'process-accordion__heading' ) || toggleTrigger.hasClass( 'accordion-heading' ) ) {
            toggleTarget.toggleClass( 'active' );
            toggleTarget.css( 'display', toggleTarget.hasClass( 'active' ) ? 'block' : 'none' );
            toggleTarget.attr( 'aria-hidden', toggleTarget.hasClass( 'active' ) ? 'false' : 'true' );
            return;
        }

        toggleTarget.slideToggle( duration );
    }

    /**
     * Constructor
     *
     * @return {void}
     */
    constructor() {
        document.addEventListener( 'DOMContentLoaded', ( e ) => {
            this.cache();
            this.modifyNewsElements();
            $( '.js-toggle-e' ).on( 'click', this.toggle.bind( this ) );
        } );
    }
}

new News();
