/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/news.js":
/*!********************************!*\
  !*** ./assets/scripts/news.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 *  Copyright (c) 2021. Geniem Oy
 */

/**
 * News JS controller.
 */
// Use jQuery as $ within this file scope.
var $ = jQuery; // eslint-disable-line no-unused-vars

/**
 * Class News
 */

var News = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * @return {void}
   */
  function News() {
    var _this = this;

    _classCallCheck(this, News);

    document.addEventListener('DOMContentLoaded', function (e) {
      _this.cache();

      _this.modifyNewsElements();

      $('.js-toggle-e').on('click', _this.toggle.bind(_this));
    });
  }

  _createClass(News, [{
    key: "cache",
    value:
    /**
     * Cache dom elements for use in the class's methods
     *
     * @return {void}
     */
    function cache() {
      this.exoveContent = $('.topical-content');
    }
    /**
     * Modify news elements.
     *
     * @return {void}
     */

  }, {
    key: "modifyNewsElements",
    value: function modifyNewsElements() {
      if (!this.exoveContent.length) {
        return;
      }

      this.exoveContent.find('.process-accordion__heading, .accordion__heading').each(function () {
        $(this).addClass('js-toggle-e');
      });
      this.exoveContent.find('use').each(function () {
        var xlinkHref = $(this).attr('xlink:href');
        $(this).attr('xlink:href', "".concat(exoveData.urlPrefix).concat(xlinkHref));
      });
    }
    /**
     * Toggle target element
     *
     * @param {Object} event Click event object.
     *
     * @return {void}
     */

  }, {
    key: "toggle",
    value: function toggle(event) {
      var toggleTrigger = $(event.currentTarget);
      var ariaExpandedState = toggleTrigger.attr('aria-expanded') === 'false';
      var duration = _typeof(toggleTrigger.data('duration')) !== undefined ? toggleTrigger.data('duration') : 400;
      var toggleTarget = $('#' + toggleTrigger.attr('aria-controls'));

      if (!toggleTarget.length && toggleTrigger.hasClass('accordion-heading')) {
        toggleTarget = toggleTrigger.closest('.accordion__item').find('.accordion__content');
      }

      if (toggleTarget.hasClass('is-hidden')) {
        toggleTarget.css('display', 'none');
        toggleTarget.removeClass('is-hidden');
      }

      toggleTrigger.attr('aria-expanded', ariaExpandedState);
      toggleTrigger.toggleClass('is-active');

      if (toggleTrigger.hasClass('process-accordion__heading') || toggleTrigger.hasClass('accordion-heading')) {
        toggleTarget.toggleClass('active');
        toggleTarget.css('display', toggleTarget.hasClass('active') ? 'block' : 'none');
        toggleTarget.attr('aria-hidden', toggleTarget.hasClass('active') ? 'false' : 'true');
        return;
      }

      toggleTarget.slideToggle(duration);
    }
  }]);

  return News;
}();

new News();

/***/ }),

/***/ "./assets/styles/public.scss":
/*!***********************************!*\
  !*** ./assets/styles/public.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./assets/scripts/public.js ***!
  \**********************************/
/**
 * Public scripts.
 */
__webpack_require__(/*! styles/public.scss */ "./assets/styles/public.scss");

__webpack_require__(/*! ./news.js */ "./assets/scripts/news.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixXQUEzQjs7QUFFQSxVQUFLWCxhQUFhLENBQUNPLFFBQWQsQ0FBd0IsNEJBQXhCLEtBQTBEUCxhQUFhLENBQUNPLFFBQWQsQ0FBd0IsbUJBQXhCLENBQS9ELEVBQStHO0FBQzNHRCxRQUFBQSxZQUFZLENBQUNLLFdBQWIsQ0FBMEIsUUFBMUI7QUFDQUwsUUFBQUEsWUFBWSxDQUFDRyxHQUFiLENBQWtCLFNBQWxCLEVBQTZCSCxZQUFZLENBQUNDLFFBQWIsQ0FBdUIsUUFBdkIsSUFBb0MsT0FBcEMsR0FBOEMsTUFBM0U7QUFDQUQsUUFBQUEsWUFBWSxDQUFDVixJQUFiLENBQW1CLGFBQW5CLEVBQWtDVSxZQUFZLENBQUNDLFFBQWIsQ0FBdUIsUUFBdkIsSUFBb0MsT0FBcEMsR0FBOEMsTUFBaEY7QUFDQTtBQUNIOztBQUVERCxNQUFBQSxZQUFZLENBQUNNLFdBQWIsQ0FBMEJULFFBQTFCO0FBQ0g7Ozs7OztBQWdCTCxJQUFJdEIsSUFBSjs7Ozs7Ozs7Ozs7O0FDL0ZBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUFnQyxtQkFBTyxDQUFFLHVEQUFGLENBQVA7O0FBQ0FBLG1CQUFPLENBQUUsMkNBQUYsQ0FBUCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS8uL2Fzc2V0cy9zY3JpcHRzL25ld3MuanMiLCJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS8uL2Fzc2V0cy9zdHlsZXMvcHVibGljLnNjc3MiLCJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS9leHRlcm5hbCB2YXIgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly93b3JkcHJlc3MtcGx1Z2luLWJvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dvcmRwcmVzcy1wbHVnaW4tYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93b3JkcHJlc3MtcGx1Z2luLWJvaWxlcnBsYXRlLy4vYXNzZXRzL3NjcmlwdHMvcHVibGljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDIxLiBHZW5pZW0gT3lcbiAqL1xuXG4vKipcbiAqIE5ld3MgSlMgY29udHJvbGxlci5cbiAqL1xuXG4vLyBVc2UgalF1ZXJ5IGFzICQgd2l0aGluIHRoaXMgZmlsZSBzY29wZS5cbmNvbnN0ICQgPSBqUXVlcnk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuLyoqXG4gKiBDbGFzcyBOZXdzXG4gKi9cbmNsYXNzIE5ld3Mge1xuXG4gICAgLyoqXG4gICAgICogQ2FjaGUgZG9tIGVsZW1lbnRzIGZvciB1c2UgaW4gdGhlIGNsYXNzJ3MgbWV0aG9kc1xuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjYWNoZSgpIHtcbiAgICAgICAgdGhpcy5leG92ZUNvbnRlbnQgPSAkKCAnLnRvcGljYWwtY29udGVudCcgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb2RpZnkgbmV3cyBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgbW9kaWZ5TmV3c0VsZW1lbnRzKCkge1xuICAgICAgICBpZiAoICEgdGhpcy5leG92ZUNvbnRlbnQubGVuZ3RoICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leG92ZUNvbnRlbnQuZmluZCggJy5wcm9jZXNzLWFjY29yZGlvbl9faGVhZGluZywgLmFjY29yZGlvbl9faGVhZGluZycgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoIHRoaXMgKS5hZGRDbGFzcyggJ2pzLXRvZ2dsZS1lJyApO1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgdGhpcy5leG92ZUNvbnRlbnQuZmluZCggJ3VzZScgKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHhsaW5rSHJlZiA9ICQoIHRoaXMgKS5hdHRyKCAneGxpbms6aHJlZicgKTtcbiAgICAgICAgICAgICQoIHRoaXMgKS5hdHRyKCAneGxpbms6aHJlZicsIGAke2V4b3ZlRGF0YS51cmxQcmVmaXh9JHt4bGlua0hyZWZ9YCApO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRhcmdldCBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgQ2xpY2sgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICAgdG9nZ2xlKCBldmVudCApIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlVHJpZ2dlciA9ICQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKTtcbiAgICAgICAgY29uc3QgYXJpYUV4cGFuZGVkU3RhdGUgPSB0b2dnbGVUcmlnZ2VyLmF0dHIoICdhcmlhLWV4cGFuZGVkJyApID09PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHR5cGVvZiB0b2dnbGVUcmlnZ2VyLmRhdGEoICdkdXJhdGlvbicgKSAhPT0gdW5kZWZpbmVkID8gdG9nZ2xlVHJpZ2dlci5kYXRhKCAnZHVyYXRpb24nICkgOiA0MDA7XG5cbiAgICAgICAgbGV0IHRvZ2dsZVRhcmdldCA9ICQoICcjJyArIHRvZ2dsZVRyaWdnZXIuYXR0ciggJ2FyaWEtY29udHJvbHMnICkgKTtcblxuICAgICAgICBpZiAoICEgdG9nZ2xlVGFyZ2V0Lmxlbmd0aCAmJiB0b2dnbGVUcmlnZ2VyLmhhc0NsYXNzKCAnYWNjb3JkaW9uLWhlYWRpbmcnICkgKSB7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQgPSB0b2dnbGVUcmlnZ2VyLmNsb3Nlc3QoICcuYWNjb3JkaW9uX19pdGVtJyApLmZpbmQoICcuYWNjb3JkaW9uX19jb250ZW50JyApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0b2dnbGVUYXJnZXQuaGFzQ2xhc3MoICdpcy1oaWRkZW4nICkgKSB7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQuY3NzKCAnZGlzcGxheScsICdub25lJyApO1xuICAgICAgICAgICAgdG9nZ2xlVGFyZ2V0LnJlbW92ZUNsYXNzKCAnaXMtaGlkZGVuJyApO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlVHJpZ2dlci5hdHRyKCAnYXJpYS1leHBhbmRlZCcsIGFyaWFFeHBhbmRlZFN0YXRlICk7XG4gICAgICAgIHRvZ2dsZVRyaWdnZXIudG9nZ2xlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cbiAgICAgICAgaWYgKCB0b2dnbGVUcmlnZ2VyLmhhc0NsYXNzKCAncHJvY2Vzcy1hY2NvcmRpb25fX2hlYWRpbmcnICkgfHwgdG9nZ2xlVHJpZ2dlci5oYXNDbGFzcyggJ2FjY29yZGlvbi1oZWFkaW5nJyApICkge1xuICAgICAgICAgICAgdG9nZ2xlVGFyZ2V0LnRvZ2dsZUNsYXNzKCAnYWN0aXZlJyApO1xuICAgICAgICAgICAgdG9nZ2xlVGFyZ2V0LmNzcyggJ2Rpc3BsYXknLCB0b2dnbGVUYXJnZXQuaGFzQ2xhc3MoICdhY3RpdmUnICkgPyAnYmxvY2snIDogJ25vbmUnICk7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQuYXR0ciggJ2FyaWEtaGlkZGVuJywgdG9nZ2xlVGFyZ2V0Lmhhc0NsYXNzKCAnYWN0aXZlJyApID8gJ2ZhbHNlJyA6ICd0cnVlJyApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlVGFyZ2V0LnNsaWRlVG9nZ2xlKCBkdXJhdGlvbiApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsICggZSApID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUoKTtcbiAgICAgICAgICAgIHRoaXMubW9kaWZ5TmV3c0VsZW1lbnRzKCk7XG4gICAgICAgICAgICAkKCAnLmpzLXRvZ2dsZS1lJyApLm9uKCAnY2xpY2snLCB0aGlzLnRvZ2dsZS5iaW5kKCB0aGlzICkgKTtcbiAgICAgICAgfSApO1xuICAgIH1cbn1cblxubmV3IE5ld3MoKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIFB1YmxpYyBzY3JpcHRzLlxuICovXG5cbnJlcXVpcmUoICdzdHlsZXMvcHVibGljLnNjc3MnICk7XG5yZXF1aXJlKCAnLi9uZXdzLmpzJyApO1xuIl0sIm5hbWVzIjpbIiQiLCJqUXVlcnkiLCJOZXdzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhY2hlIiwibW9kaWZ5TmV3c0VsZW1lbnRzIiwib24iLCJ0b2dnbGUiLCJiaW5kIiwiZXhvdmVDb250ZW50IiwibGVuZ3RoIiwiZmluZCIsImVhY2giLCJhZGRDbGFzcyIsInhsaW5rSHJlZiIsImF0dHIiLCJleG92ZURhdGEiLCJ1cmxQcmVmaXgiLCJldmVudCIsInRvZ2dsZVRyaWdnZXIiLCJjdXJyZW50VGFyZ2V0IiwiYXJpYUV4cGFuZGVkU3RhdGUiLCJkdXJhdGlvbiIsImRhdGEiLCJ1bmRlZmluZWQiLCJ0b2dnbGVUYXJnZXQiLCJoYXNDbGFzcyIsImNsb3Nlc3QiLCJjc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwic2xpZGVUb2dnbGUiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==