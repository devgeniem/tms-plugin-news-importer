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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixXQUEzQjs7QUFFQSxVQUFLWCxhQUFhLENBQUNPLFFBQWQsQ0FBd0IsNEJBQXhCLEtBQTBEUCxhQUFhLENBQUNPLFFBQWQsQ0FBd0IsbUJBQXhCLENBQS9ELEVBQStHO0FBQzNHRCxRQUFBQSxZQUFZLENBQUNLLFdBQWIsQ0FBMEIsUUFBMUI7QUFDQUwsUUFBQUEsWUFBWSxDQUFDRyxHQUFiLENBQWtCLFNBQWxCLEVBQTZCSCxZQUFZLENBQUNDLFFBQWIsQ0FBdUIsUUFBdkIsSUFBb0MsT0FBcEMsR0FBOEMsTUFBM0U7QUFDQUQsUUFBQUEsWUFBWSxDQUFDVixJQUFiLENBQW1CLGFBQW5CLEVBQWtDVSxZQUFZLENBQUNDLFFBQWIsQ0FBdUIsUUFBdkIsSUFBb0MsT0FBcEMsR0FBOEMsTUFBaEY7QUFDQTtBQUNIOztBQUVERCxNQUFBQSxZQUFZLENBQUNNLFdBQWIsQ0FBMEJULFFBQTFCO0FBQ0g7Ozs7OztBQWdCTCxJQUFJdEIsSUFBSjs7Ozs7Ozs7Ozs7O0FDL0ZBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUFnQyxtQkFBTyxDQUFFLHVEQUFGLENBQVA7O0FBQ0FBLG1CQUFPLENBQUUsMkNBQUYsQ0FBUCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS8uL2Fzc2V0cy9zY3JpcHRzL25ld3MuanMiLCJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS8uL2Fzc2V0cy9zdHlsZXMvcHVibGljLnNjc3M/NDAwMiIsIndlYnBhY2s6Ly93b3JkcHJlc3MtcGx1Z2luLWJvaWxlcnBsYXRlL2V4dGVybmFsIHZhciBcImpRdWVyeVwiIiwid2VicGFjazovL3dvcmRwcmVzcy1wbHVnaW4tYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd29yZHByZXNzLXBsdWdpbi1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dvcmRwcmVzcy1wbHVnaW4tYm9pbGVycGxhdGUvLi9hc3NldHMvc2NyaXB0cy9wdWJsaWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMjEuIEdlbmllbSBPeVxuICovXG5cbi8qKlxuICogTmV3cyBKUyBjb250cm9sbGVyLlxuICovXG5cbi8vIFVzZSBqUXVlcnkgYXMgJCB3aXRoaW4gdGhpcyBmaWxlIHNjb3BlLlxuY29uc3QgJCA9IGpRdWVyeTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4vKipcbiAqIENsYXNzIE5ld3NcbiAqL1xuY2xhc3MgTmV3cyB7XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZSBkb20gZWxlbWVudHMgZm9yIHVzZSBpbiB0aGUgY2xhc3MncyBtZXRob2RzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNhY2hlKCkge1xuICAgICAgICB0aGlzLmV4b3ZlQ29udGVudCA9ICQoICcudG9waWNhbC1jb250ZW50JyApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vZGlmeSBuZXdzIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBtb2RpZnlOZXdzRWxlbWVudHMoKSB7XG4gICAgICAgIGlmICggISB0aGlzLmV4b3ZlQ29udGVudC5sZW5ndGggKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4b3ZlQ29udGVudC5maW5kKCAnLnByb2Nlc3MtYWNjb3JkaW9uX19oZWFkaW5nLCAuYWNjb3JkaW9uX19oZWFkaW5nJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCggdGhpcyApLmFkZENsYXNzKCAnanMtdG9nZ2xlLWUnICk7XG4gICAgICAgIH0gKTtcblxuICAgICAgICB0aGlzLmV4b3ZlQ29udGVudC5maW5kKCAndXNlJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgeGxpbmtIcmVmID0gJCggdGhpcyApLmF0dHIoICd4bGluazpocmVmJyApO1xuICAgICAgICAgICAgJCggdGhpcyApLmF0dHIoICd4bGluazpocmVmJywgYCR7ZXhvdmVEYXRhLnVybFByZWZpeH0ke3hsaW5rSHJlZn1gICk7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGFyZ2V0IGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBDbGljayBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgICB0b2dnbGUoIGV2ZW50ICkge1xuICAgICAgICBjb25zdCB0b2dnbGVUcmlnZ2VyID0gJCggZXZlbnQuY3VycmVudFRhcmdldCApO1xuICAgICAgICBjb25zdCBhcmlhRXhwYW5kZWRTdGF0ZSA9IHRvZ2dsZVRyaWdnZXIuYXR0ciggJ2FyaWEtZXhwYW5kZWQnICkgPT09ICdmYWxzZSc7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdHlwZW9mIHRvZ2dsZVRyaWdnZXIuZGF0YSggJ2R1cmF0aW9uJyApICE9PSB1bmRlZmluZWQgPyB0b2dnbGVUcmlnZ2VyLmRhdGEoICdkdXJhdGlvbicgKSA6IDQwMDtcblxuICAgICAgICBsZXQgdG9nZ2xlVGFyZ2V0ID0gJCggJyMnICsgdG9nZ2xlVHJpZ2dlci5hdHRyKCAnYXJpYS1jb250cm9scycgKSApO1xuXG4gICAgICAgIGlmICggISB0b2dnbGVUYXJnZXQubGVuZ3RoICYmIHRvZ2dsZVRyaWdnZXIuaGFzQ2xhc3MoICdhY2NvcmRpb24taGVhZGluZycgKSApIHtcbiAgICAgICAgICAgIHRvZ2dsZVRhcmdldCA9IHRvZ2dsZVRyaWdnZXIuY2xvc2VzdCggJy5hY2NvcmRpb25fX2l0ZW0nICkuZmluZCggJy5hY2NvcmRpb25fX2NvbnRlbnQnICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRvZ2dsZVRhcmdldC5oYXNDbGFzcyggJ2lzLWhpZGRlbicgKSApIHtcbiAgICAgICAgICAgIHRvZ2dsZVRhcmdldC5jc3MoICdkaXNwbGF5JywgJ25vbmUnICk7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQucmVtb3ZlQ2xhc3MoICdpcy1oaWRkZW4nICk7XG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVUcmlnZ2VyLmF0dHIoICdhcmlhLWV4cGFuZGVkJywgYXJpYUV4cGFuZGVkU3RhdGUgKTtcbiAgICAgICAgdG9nZ2xlVHJpZ2dlci50b2dnbGVDbGFzcyggJ2lzLWFjdGl2ZScgKTtcblxuICAgICAgICBpZiAoIHRvZ2dsZVRyaWdnZXIuaGFzQ2xhc3MoICdwcm9jZXNzLWFjY29yZGlvbl9faGVhZGluZycgKSB8fCB0b2dnbGVUcmlnZ2VyLmhhc0NsYXNzKCAnYWNjb3JkaW9uLWhlYWRpbmcnICkgKSB7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQudG9nZ2xlQ2xhc3MoICdhY3RpdmUnICk7XG4gICAgICAgICAgICB0b2dnbGVUYXJnZXQuY3NzKCAnZGlzcGxheScsIHRvZ2dsZVRhcmdldC5oYXNDbGFzcyggJ2FjdGl2ZScgKSA/ICdibG9jaycgOiAnbm9uZScgKTtcbiAgICAgICAgICAgIHRvZ2dsZVRhcmdldC5hdHRyKCAnYXJpYS1oaWRkZW4nLCB0b2dnbGVUYXJnZXQuaGFzQ2xhc3MoICdhY3RpdmUnICkgPyAnZmFsc2UnIDogJ3RydWUnICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVUYXJnZXQuc2xpZGVUb2dnbGUoIGR1cmF0aW9uICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgKCBlICkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWNoZSgpO1xuICAgICAgICAgICAgdGhpcy5tb2RpZnlOZXdzRWxlbWVudHMoKTtcbiAgICAgICAgICAgICQoICcuanMtdG9nZ2xlLWUnICkub24oICdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB9ICk7XG4gICAgfVxufVxuXG5uZXcgTmV3cygpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogUHVibGljIHNjcmlwdHMuXG4gKi9cblxucmVxdWlyZSggJ3N0eWxlcy9wdWJsaWMuc2NzcycgKTtcbnJlcXVpcmUoICcuL25ld3MuanMnICk7XG4iXSwibmFtZXMiOlsiJCIsImpRdWVyeSIsIk5ld3MiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2FjaGUiLCJtb2RpZnlOZXdzRWxlbWVudHMiLCJvbiIsInRvZ2dsZSIsImJpbmQiLCJleG92ZUNvbnRlbnQiLCJsZW5ndGgiLCJmaW5kIiwiZWFjaCIsImFkZENsYXNzIiwieGxpbmtIcmVmIiwiYXR0ciIsImV4b3ZlRGF0YSIsInVybFByZWZpeCIsImV2ZW50IiwidG9nZ2xlVHJpZ2dlciIsImN1cnJlbnRUYXJnZXQiLCJhcmlhRXhwYW5kZWRTdGF0ZSIsImR1cmF0aW9uIiwiZGF0YSIsInVuZGVmaW5lZCIsInRvZ2dsZVRhcmdldCIsImhhc0NsYXNzIiwiY2xvc2VzdCIsImNzcyIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJzbGlkZVRvZ2dsZSIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9