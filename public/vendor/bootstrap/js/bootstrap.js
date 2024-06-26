/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error(
    "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.",
  );
}

(function ($) {
  const version = $.fn.jquery.split(' ')[0].split('.');
  if (
    (version[0] < 2 && version[1] < 9) ||
    (version[0] == 1 && version[1] == 9 && version[2] < 1) ||
    version[0] >= 4
  ) {
    throw new Error(
      "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0",
    );
  }
})(jQuery);

(function () {
  const _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (obj) {
          return typeof obj;
        }
      : function (obj) {
          return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  const _createClass = (function () {
    function defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    }
    return call && (typeof call === 'object' || typeof call === 'function')
      ? call
      : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        `Super expression must either be null or a function, not ${typeof superClass}`,
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Util = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    let transition = false;

    const MAX_UID = 1000000;

    const TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend',

      // shoutout AngusCroll (https://goo.gl/pxwQGp)
    };
    function toType(obj) {
      return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
    }

    function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }
          return undefined;
        },
      };
    }

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      const el = document.createElement('bootstrap');

      for (const name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return {
            end: TransitionEndEvent[name],
          };
        }
      }

      return false;
    }

    function transitionEndEmulator(duration) {
      const _this = this;

      let called = false;

      $(this).one(Util.TRANSITION_END, () => {
        called = true;
      });

      setTimeout(() => {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();

      $.fn.emulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {
      TRANSITION_END: 'bsTransitionEnd',

      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        let selector = element.getAttribute('data-target');
        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          const $selector = $(selector);
          return $selector.length > 0 ? selector : null;
        } catch (error) {
          return null;
        }
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      },
      typeCheckConfig: function typeCheckConfig(
        componentName,
        config,
        configTypes,
      ) {
        for (const property in configTypes) {
          if (configTypes.hasOwnProperty(property)) {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType =
              value && isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(
                `${componentName.toUpperCase()}: ` +
                  `Option "${property}" provided type "${valueType}" ` +
                  `but expected type "${expectedTypes}".`,
              );
            }
          }
        }
      },
    };

    setTransitionEndSupport();

    return Util;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Alert = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'alert';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.alert';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 150;

    const Selector = {
      DISMISS: '[data-dismiss="alert"]',
    };

    const Event = {
      CLOSE: `close${EVENT_KEY}`,
      CLOSED: `closed${EVENT_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Alert = (function () {
      function Alert(element) {
        _classCallCheck(this, Alert);

        this._element = element;
      }

      // getters

      // public

      Alert.prototype.close = function close(element) {
        element = element || this._element;

        const rootElement = this._getRootElement(element);
        const customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      Alert.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Alert.prototype._getRootElement = function _getRootElement(element) {
        const selector = Util.getSelectorFromElement(element);
        let parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest(`.${ClassName.ALERT}`)[0];
        }

        return parent;
      };

      Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(
        element,
      ) {
        const closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      };

      Alert.prototype._removeElement = function _removeElement(element) {
        const _this2 = this;

        $(element).removeClass(ClassName.SHOW);

        if (
          !Util.supportsTransitionEnd() ||
          !$(element).hasClass(ClassName.FADE)
        ) {
          this._destroyElement(element);
          return;
        }

        $(element)
          .one(Util.TRANSITION_END, (event) =>
            _this2._destroyElement(element, event),
          )
          .emulateTransitionEnd(TRANSITION_DURATION);
      };

      Alert.prototype._destroyElement = function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      };

      // static

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          const $element = $(this);
          let data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
      ]);

      return Alert;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DISMISS,
      Alert._handleDismiss(new Alert()),
    );

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Button = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'button';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.button';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus',
    };

    const Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn',
    };

    const Event = {
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
      FOCUS_BLUR_DATA_API:
        `focus${EVENT_KEY}${DATA_API_KEY} ` + `blur${EVENT_KEY}${DATA_API_KEY}`,

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Button = (function () {
      function Button(element) {
        _classCallCheck(this, Button);

        this._element = element;
      }

      // getters

      // public

      Button.prototype.toggle = function toggle() {
        let triggerChangeEvent = true;
        let addAriaPressed = true;
        const rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          const input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (
                input.checked &&
                $(this._element).hasClass(ClassName.ACTIVE)
              ) {
                triggerChangeEvent = false;
              } else {
                const activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (
                input.hasAttribute('disabled') ||
                rootElement.hasAttribute('disabled') ||
                input.classList.contains('disabled') ||
                rootElement.classList.contains('disabled')
              ) {
                return;
              }
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute(
            'aria-pressed',
            !$(this._element).hasClass(ClassName.ACTIVE),
          );
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      Button.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // static

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
      ]);

      return Button;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
      .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
        event.preventDefault();

        let button = event.target;

        if (!$(button).hasClass(ClassName.BUTTON)) {
          button = $(button).closest(Selector.BUTTON);
        }

        Button._jQueryInterface.call($(button), 'toggle');
      })
      .on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
        const button = $(event.target).closest(Selector.BUTTON)[0];
        $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
      });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Carousel = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'carousel';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.carousel';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 600;
    const ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
    const ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
    const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    const Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true,
    };

    const DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean',
    };

    const Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right',
    };

    const Event = {
      SLIDE: `slide${EVENT_KEY}`,
      SLID: `slid${EVENT_KEY}`,
      KEYDOWN: `keydown${EVENT_KEY}`,
      MOUSEENTER: `mouseenter${EVENT_KEY}`,
      MOUSELEAVE: `mouseleave${EVENT_KEY}`,
      TOUCHEND: `touchend${EVENT_KEY}`,
      LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item',
    };

    const Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Carousel = (function () {
      function Carousel(element, config) {
        _classCallCheck(this, Carousel);

        this._items = null;
        this._interval = null;
        this._activeElement = null;

        this._isPaused = false;
        this._isSliding = false;

        this.touchTimeout = null;

        this._config = this._getConfig(config);
        this._element = $(element)[0];
        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      }

      // getters

      // public

      Carousel.prototype.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      };

      Carousel.prototype.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      Carousel.prototype.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (
          $(this._element).find(Selector.NEXT_PREV)[0] &&
          Util.supportsTransitionEnd()
        ) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      Carousel.prototype.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this,
            ),
            this._config.interval,
          );
        }
      };

      Carousel.prototype.to = function to(index) {
        const _this3 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        const activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, () => _this3.to(index));
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        const direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      Carousel.prototype.dispose = function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      };

      // private

      Carousel.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Carousel.prototype._addEventListeners = function _addEventListeners() {
        const _this4 = this;

        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, (event) => _this4._keydown(event));
        }

        if (this._config.pause === 'hover') {
          $(this._element)
            .on(Event.MOUSEENTER, (event) => _this4.pause(event))
            .on(Event.MOUSELEAVE, (event) => _this4.cycle(event));
          if ('ontouchstart' in document.documentElement) {
            // if it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $(this._element).on(Event.TOUCHEND, () => {
              _this4.pause();
              if (_this4.touchTimeout) {
                clearTimeout(_this4.touchTimeout);
              }
              _this4.touchTimeout = setTimeout(
                (event) => _this4.cycle(event),
                TOUCHEVENT_COMPAT_WAIT + _this4._config.interval,
              );
            });
          }
        }
      };

      Carousel.prototype._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
          default:
        }
      };

      Carousel.prototype._getItemIndex = function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };

      Carousel.prototype._getItemByDirection = function _getItemByDirection(
        direction,
        activeElement,
      ) {
        const isNextDirection = direction === Direction.NEXT;
        const isPrevDirection = direction === Direction.PREV;
        const activeIndex = this._getItemIndex(activeElement);
        const lastItemIndex = this._items.length - 1;
        const isGoingToWrap =
          (isPrevDirection && activeIndex === 0) ||
          (isNextDirection && activeIndex === lastItemIndex);

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        const delta = direction === Direction.PREV ? -1 : 1;
        const itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1
          ? this._items[this._items.length - 1]
          : this._items[itemIndex];
      };

      Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(
        relatedTarget,
        eventDirectionName,
      ) {
        const targetIndex = this._getItemIndex(relatedTarget);
        const fromIndex = this._getItemIndex(
          $(this._element).find(Selector.ACTIVE_ITEM)[0],
        );
        const slideEvent = $.Event(Event.SLIDE, {
          relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex,
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      };

      Carousel.prototype._setActiveIndicatorElement =
        function _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            $(this._indicatorsElement)
              .find(Selector.ACTIVE)
              .removeClass(ClassName.ACTIVE);

            const nextIndicator =
              this._indicatorsElement.children[this._getItemIndex(element)];

            if (nextIndicator) {
              $(nextIndicator).addClass(ClassName.ACTIVE);
            }
          }
        };

      Carousel.prototype._slide = function _slide(direction, element) {
        const _this5 = this;

        const activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        const activeElementIndex = this._getItemIndex(activeElement);
        const nextElement =
          element ||
          (activeElement && this._getItemByDirection(direction, activeElement));
        const nextElementIndex = this._getItemIndex(nextElement);
        const isCycling = Boolean(this._interval);

        let directionalClassName = void 0;
        let orderClassName = void 0;
        let eventDirectionName = void 0;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        const slideEvent = this._triggerSlideEvent(
          nextElement,
          eventDirectionName,
        );
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        const slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex,
        });

        if (
          Util.supportsTransitionEnd() &&
          $(this._element).hasClass(ClassName.SLIDE)
        ) {
          $(nextElement).addClass(orderClassName);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement)
            .one(Util.TRANSITION_END, () => {
              $(nextElement)
                .removeClass(`${directionalClassName} ${orderClassName}`)
                .addClass(ClassName.ACTIVE);

              $(activeElement).removeClass(
                `${ClassName.ACTIVE} ${orderClassName} ${directionalClassName}`,
              );

              _this5._isSliding = false;

              setTimeout(() => $(_this5._element).trigger(slidEvent), 0);
            })
            .emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      };

      // static

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config = $.extend({}, Default, $(this).data());

          if (
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
            'object'
          ) {
            $.extend(_config, config);
          }

          const action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error(`No method named "${action}"`);
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        const selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        const target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        const config = $.extend({}, $(target).data(), $(this).data());
        const slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
      ]);

      return Carousel;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DATA_SLIDE,
      Carousel._dataApiClickHandler,
    );

    $(window).on(Event.LOAD_DATA_API, () => {
      $(Selector.DATA_RIDE).each(function () {
        const $carousel = $(this);
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Collapse = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'collapse';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.collapse';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 600;

    const Default = {
      toggle: true,
      parent: '',
    };

    const DefaultType = {
      toggle: 'boolean',
      parent: 'string',
    };

    const Event = {
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed',
    };

    const Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height',
    };

    const Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Collapse = (function () {
      function Collapse(element, config) {
        _classCallCheck(this, Collapse);

        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $.makeArray(
          $(
            `[data-toggle="collapse"][href="#${element.id}"],` +
              `[data-toggle="collapse"][data-target="#${element.id}"]`,
          ),
        );
        const tabToggles = $(Selector.DATA_TOGGLE);
        for (let i = 0; i < tabToggles.length; i++) {
          const elem = tabToggles[i];
          const selector = Util.getSelectorFromElement(elem);
          if (selector !== null && $(selector).filter(element).length > 0) {
            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      }

      // getters

      // public

      Collapse.prototype.toggle = function toggle() {
        if ($(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      Collapse.prototype.show = function show() {
        const _this6 = this;

        if (
          this._isTransitioning ||
          $(this._element).hasClass(ClassName.SHOW)
        ) {
          return;
        }

        let actives = void 0;
        let activesData = void 0;

        if (this._parent) {
          actives = $.makeArray(
            $(this._parent).children().children(Selector.ACTIVES),
          );
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        const startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        const dimension = this._getDimension();

        $(this._element)
          .removeClass(ClassName.COLLAPSE)
          .addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $(this._triggerArray)
            .removeClass(ClassName.COLLAPSED)
            .attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        const complete = function complete() {
          $(_this6._element)
            .removeClass(ClassName.COLLAPSING)
            .addClass(ClassName.COLLAPSE)
            .addClass(ClassName.SHOW);

          _this6._element.style[dimension] = '';

          _this6.setTransitioning(false);

          $(_this6._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        const capitalizedDimension =
          dimension[0].toUpperCase() + dimension.slice(1);
        const scrollSize = `scroll${capitalizedDimension}`;

        $(this._element)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = `${this._element[scrollSize]}px`;
      };

      Collapse.prototype.hide = function hide() {
        const _this7 = this;

        if (
          this._isTransitioning ||
          !$(this._element).hasClass(ClassName.SHOW)
        ) {
          return;
        }

        const startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        const dimension = this._getDimension();

        this._element.style[dimension] = `${
          this._element.getBoundingClientRect()[dimension]
        }px`;

        Util.reflow(this._element);

        $(this._element)
          .addClass(ClassName.COLLAPSING)
          .removeClass(ClassName.COLLAPSE)
          .removeClass(ClassName.SHOW);

        if (this._triggerArray.length) {
          for (let i = 0; i < this._triggerArray.length; i++) {
            const trigger = this._triggerArray[i];
            const selector = Util.getSelectorFromElement(trigger);
            if (selector !== null) {
              const $elem = $(selector);
              if (!$elem.hasClass(ClassName.SHOW)) {
                $(trigger)
                  .addClass(ClassName.COLLAPSED)
                  .attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        const complete = function complete() {
          _this7.setTransitioning(false);
          $(_this7._element)
            .removeClass(ClassName.COLLAPSING)
            .addClass(ClassName.COLLAPSE)
            .trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(TRANSITION_DURATION);
      };

      Collapse.prototype.setTransitioning = function setTransitioning(
        isTransitioning,
      ) {
        this._isTransitioning = isTransitioning;
      };

      Collapse.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      };

      // private

      Collapse.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Collapse.prototype._getDimension = function _getDimension() {
        const hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      Collapse.prototype._getParent = function _getParent() {
        const _this8 = this;

        const parent = $(this._config.parent)[0];
        const selector = `[data-toggle="collapse"][data-parent="${this._config.parent}"]`;

        $(parent)
          .find(selector)
          .each((i, element) => {
            _this8._addAriaAndCollapsedClass(
              Collapse._getTargetFromElement(element),
              [element],
            );
          });

        return parent;
      };

      Collapse.prototype._addAriaAndCollapsedClass =
        function _addAriaAndCollapsedClass(element, triggerArray) {
          if (element) {
            const isOpen = $(element).hasClass(ClassName.SHOW);

            if (triggerArray.length) {
              $(triggerArray)
                .toggleClass(ClassName.COLLAPSED, !isOpen)
                .attr('aria-expanded', isOpen);
            }
          }
        };

      // static

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        const selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          const $this = $(this);
          let data = $this.data(DATA_KEY);
          const _config = $.extend(
            {},
            Default,
            $this.data(),
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
              'object' && config,
          );

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
      ]);

      return Collapse;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DATA_TOGGLE,
      function (event) {
        if (!/input|textarea/i.test(event.target.tagName)) {
          event.preventDefault();
        }

        const $trigger = $(this);
        const selector = Util.getSelectorFromElement(this);
        $(selector).each(function () {
          const $target = $(this);
          const data = $target.data(DATA_KEY);
          const config = data ? 'toggle' : $trigger.data();
          Collapse._jQueryInterface.call($target, config);
        });
      },
    );

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  })(jQuery);

  /* global Popper */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Dropdown = (function ($) {
    /**
     * Check for Popper dependency
     * Popper - https://popper.js.org
     */
    if (typeof Popper === 'undefined') {
      throw new Error(
        'Bootstrap dropdown require Popper.js (https://popper.js.org)',
      );
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'dropdown';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.dropdown';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
    const SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
    const TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
    const ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
    const ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
    const RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
    const REGEXP_KEYDOWN = new RegExp(
      `${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE}`,
    );

    const Event = {
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      CLICK: `click${EVENT_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
      KEYDOWN_DATA_API: `keydown${EVENT_KEY}${DATA_API_KEY}`,
      KEYUP_DATA_API: `keyup${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
    };

    const Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)',
    };

    const AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
    };

    const Default = {
      placement: AttachmentMap.BOTTOM,
      offset: 0,
      flip: true,
    };

    const DefaultType = {
      placement: 'string',
      offset: '(number|string)',
      flip: 'boolean',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Dropdown = (function () {
      function Dropdown(element, config) {
        _classCallCheck(this, Dropdown);

        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      }

      // getters

      // public

      Dropdown.prototype.toggle = function toggle() {
        if (
          this._element.disabled ||
          $(this._element).hasClass(ClassName.DISABLED)
        ) {
          return;
        }

        const parent = Dropdown._getParentFromElement(this._element);
        const isActive = $(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        const relatedTarget = {
          relatedTarget: this._element,
        };
        const showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        }

        let element = this._element;
        // for dropup with alignment we use the parent as popper container
        if ($(parent).hasClass(ClassName.DROPUP)) {
          if (
            $(this._menu).hasClass(ClassName.MENULEFT) ||
            $(this._menu).hasClass(ClassName.MENURIGHT)
          ) {
            element = parent;
          }
        }
        this._popper = new Popper(element, this._menu, this._getPopperConfig());

        // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if (
          'ontouchstart' in document.documentElement &&
          !$(parent).closest(Selector.NAVBAR_NAV).length
        ) {
          $('body').children().on('mouseover', null, $.noop);
        }

        this._element.focus();
        this._element.setAttribute('aria-expanded', true);

        $(this._menu).toggleClass(ClassName.SHOW);
        $(parent)
          .toggleClass(ClassName.SHOW)
          .trigger($.Event(Event.SHOWN, relatedTarget));
      };

      Dropdown.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;
        if (this._popper !== null) {
          this._popper.destroy();
        }
        this._popper = null;
      };

      Dropdown.prototype.update = function update() {
        this._inNavbar = this._detectNavbar();
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      };

      // private

      Dropdown.prototype._addEventListeners = function _addEventListeners() {
        const _this9 = this;

        $(this._element).on(Event.CLICK, (event) => {
          event.preventDefault();
          event.stopPropagation();
          _this9.toggle();
        });
      };

      Dropdown.prototype._getConfig = function _getConfig(config) {
        const elementData = $(this._element).data();
        if (elementData.placement !== undefined) {
          elementData.placement =
            AttachmentMap[elementData.placement.toUpperCase()];
        }

        config = $.extend(
          {},
          this.constructor.Default,
          $(this._element).data(),
          config,
        );

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      };

      Dropdown.prototype._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          const parent = Dropdown._getParentFromElement(this._element);
          this._menu = $(parent).find(Selector.MENU)[0];
        }
        return this._menu;
      };

      Dropdown.prototype._getPlacement = function _getPlacement() {
        const $parentDropdown = $(this._element).parent();
        let { placement } = this._config;

        // Handle dropup
        if (
          $parentDropdown.hasClass(ClassName.DROPUP) ||
          this._config.placement === AttachmentMap.TOP
        ) {
          placement = AttachmentMap.TOP;
          if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }
        return placement;
      };

      Dropdown.prototype._detectNavbar = function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
      };

      Dropdown.prototype._getPopperConfig = function _getPopperConfig() {
        const popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: {
              offset: this._config.offset,
            },
            flip: {
              enabled: this._config.flip,
            },
          },

          // Disable Popper.js for Dropdown in Navbar
        };
        if (this._inNavbar) {
          popperConfig.modifiers.applyStyle = {
            enabled: !this._inNavbar,
          };
        }
        return popperConfig;
      };

      // static

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config =
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
            'object'
              ? config
              : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (
          event &&
          (event.which === RIGHT_MOUSE_BUTTON_WHICH ||
            (event.type === 'keyup' && event.which !== TAB_KEYCODE))
        ) {
          return;
        }

        const toggles = $.makeArray($(Selector.DATA_TOGGLE));
        for (let i = 0; i < toggles.length; i++) {
          const parent = Dropdown._getParentFromElement(toggles[i]);
          const context = $(toggles[i]).data(DATA_KEY);
          const relatedTarget = {
            relatedTarget: toggles[i],
          };

          if (!context) {
            continue;
          }

          const dropdownMenu = context._menu;
          if (!$(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (
            event &&
            ((event.type === 'click' &&
              /input|textarea/i.test(event.target.tagName)) ||
              (event.type === 'keyup' && event.which === TAB_KEYCODE)) &&
            $.contains(parent, event.target)
          ) {
            continue;
          }

          const hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          // if this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support
          if ('ontouchstart' in document.documentElement) {
            $('body').children().off('mouseover', null, $.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(dropdownMenu).removeClass(ClassName.SHOW);
          $(parent)
            .removeClass(ClassName.SHOW)
            .trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        let parent = void 0;
        const selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      };

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        if (
          !REGEXP_KEYDOWN.test(event.which) ||
          (/button/i.test(event.target.tagName) &&
            event.which === SPACE_KEYCODE) ||
          /input|textarea/i.test(event.target.tagName)
        ) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        const parent = Dropdown._getParentFromElement(this);
        const isActive = $(parent).hasClass(ClassName.SHOW);

        if (
          (!isActive &&
            (event.which !== ESCAPE_KEYCODE ||
              event.which !== SPACE_KEYCODE)) ||
          (isActive &&
            (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE))
        ) {
          if (event.which === ESCAPE_KEYCODE) {
            const toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        const items = $(parent).find(Selector.VISIBLE_ITEMS).get();

        if (!items.length) {
          return;
        }

        let index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
        {
          key: 'DefaultType',
          get: function get() {
            return DefaultType;
          },
        },
      ]);

      return Dropdown;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
      .on(
        Event.KEYDOWN_DATA_API,
        Selector.DATA_TOGGLE,
        Dropdown._dataApiKeydownHandler,
      )
      .on(
        Event.KEYDOWN_DATA_API,
        Selector.MENU,
        Dropdown._dataApiKeydownHandler,
      )
      .on(
        `${Event.CLICK_DATA_API} ${Event.KEYUP_DATA_API}`,
        Dropdown._clearMenus,
      )
      .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
        event.preventDefault();
        event.stopPropagation();
        Dropdown._jQueryInterface.call($(this), 'toggle');
      })
      .on(Event.CLICK_DATA_API, Selector.FORM_CHILD, (e) => {
        e.stopPropagation();
      });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Modal = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'modal';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.modal';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 300;
    const BACKDROP_TRANSITION_DURATION = 150;
    const ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    const Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true,
    };

    const DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean',
    };

    const Event = {
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      FOCUSIN: `focusin${EVENT_KEY}`,
      RESIZE: `resize${EVENT_KEY}`,
      CLICK_DISMISS: `click.dismiss${EVENT_KEY}`,
      KEYDOWN_DISMISS: `keydown.dismiss${EVENT_KEY}`,
      MOUSEUP_DISMISS: `mouseup.dismiss${EVENT_KEY}`,
      MOUSEDOWN_DISMISS: `mousedown.dismiss${EVENT_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show',
    };

    const Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      NAVBAR_TOGGLER: '.navbar-toggler',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Modal = (function () {
      function Modal(element, config) {
        _classCallCheck(this, Modal);

        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._originalBodyPadding = 0;
        this._scrollbarWidth = 0;
      }

      // getters

      // public

      Modal.prototype.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      Modal.prototype.show = function show(relatedTarget) {
        const _this10 = this;

        if (this._isTransitioning) {
          return;
        }

        if (
          Util.supportsTransitionEnd() &&
          $(this._element).hasClass(ClassName.FADE)
        ) {
          this._isTransitioning = true;
        }

        const showEvent = $.Event(Event.SHOW, {
          relatedTarget,
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(
          Event.CLICK_DISMISS,
          Selector.DATA_DISMISS,
          (event) => _this10.hide(event),
        );

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, () => {
          $(_this10._element).one(Event.MOUSEUP_DISMISS, (event) => {
            if ($(event.target).is(_this10._element)) {
              _this10._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(() => _this10._showElement(relatedTarget));
      };

      Modal.prototype.hide = function hide(event) {
        const _this11 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        const transition =
          Util.supportsTransitionEnd() &&
          $(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        const hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.SHOW);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          $(this._element)
            .one(Util.TRANSITION_END, (event) => _this11._hideModal(event))
            .emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      };

      Modal.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window, document, this._element, this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      Modal.prototype.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      };

      // private

      Modal.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      Modal.prototype._showElement = function _showElement(relatedTarget) {
        const _this12 = this;

        const transition =
          Util.supportsTransitionEnd() &&
          $(this._element).hasClass(ClassName.FADE);

        if (
          !this._element.parentNode ||
          this._element.parentNode.nodeType !== Node.ELEMENT_NODE
        ) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        const shownEvent = $.Event(Event.SHOWN, {
          relatedTarget,
        });

        const transitionComplete = function transitionComplete() {
          if (_this12._config.focus) {
            _this12._element.focus();
          }
          _this12._isTransitioning = false;
          $(_this12._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog)
            .one(Util.TRANSITION_END, transitionComplete)
            .emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      };

      Modal.prototype._enforceFocus = function _enforceFocus() {
        const _this13 = this;

        $(document)
          .off(Event.FOCUSIN) // guard against infinite focus loop
          .on(Event.FOCUSIN, (event) => {
            if (
              document !== event.target &&
              _this13._element !== event.target &&
              !$(_this13._element).has(event.target).length
            ) {
              _this13._element.focus();
            }
          });
      };

      Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
        const _this14 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();
              _this14.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      Modal.prototype._setResizeEvent = function _setResizeEvent() {
        const _this15 = this;

        if (this._isShown) {
          $(window).on(Event.RESIZE, (event) => _this15.handleUpdate(event));
        } else {
          $(window).off(Event.RESIZE);
        }
      };

      Modal.prototype._hideModal = function _hideModal() {
        const _this16 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._isTransitioning = false;
        this._showBackdrop(() => {
          $(document.body).removeClass(ClassName.OPEN);
          _this16._resetAdjustments();
          _this16._resetScrollbar();
          $(_this16._element).trigger(Event.HIDDEN);
        });
      };

      Modal.prototype._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      Modal.prototype._showBackdrop = function _showBackdrop(callback) {
        const _this17 = this;

        const animate = $(this._element).hasClass(ClassName.FADE)
          ? ClassName.FADE
          : '';

        if (this._isShown && this._config.backdrop) {
          const doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, (event) => {
            if (_this17._ignoreBackdropClick) {
              _this17._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this17._config.backdrop === 'static') {
              _this17._element.focus();
            } else {
              _this17.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop)
            .one(Util.TRANSITION_END, callback)
            .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.SHOW);

          const callbackRemove = function callbackRemove() {
            _this17._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (
            Util.supportsTransitionEnd() &&
            $(this._element).hasClass(ClassName.FADE)
          ) {
            $(this._backdrop)
              .one(Util.TRANSITION_END, callbackRemove)
              .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      };

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

      Modal.prototype._adjustDialog = function _adjustDialog() {
        const isModalOverflowing =
          this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = `${this._scrollbarWidth}px`;
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = `${this._scrollbarWidth}px`;
        }
      };

      Modal.prototype._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      Modal.prototype._checkScrollbar = function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      Modal.prototype._setScrollbar = function _setScrollbar() {
        const _this18 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

          // Adjust fixed content padding
          $(Selector.FIXED_CONTENT).each((index, element) => {
            const actualPadding = $(element)[0].style.paddingRight;
            const calculatedPadding = $(element).css('padding-right');
            $(element)
              .data('padding-right', actualPadding)
              .css(
                'padding-right',
                `${parseFloat(calculatedPadding) + _this18._scrollbarWidth}px`,
              );
          });

          // Adjust navbar-toggler margin
          $(Selector.NAVBAR_TOGGLER).each((index, element) => {
            const actualMargin = $(element)[0].style.marginRight;
            const calculatedMargin = $(element).css('margin-right');
            $(element)
              .data('margin-right', actualMargin)
              .css(
                'margin-right',
                `${parseFloat(calculatedMargin) + _this18._scrollbarWidth}px`,
              );
          });

          // Adjust body padding
          const actualPadding = document.body.style.paddingRight;
          const calculatedPadding = $('body').css('padding-right');
          $('body')
            .data('padding-right', actualPadding)
            .css(
              'padding-right',
              `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`,
            );
        }
      };

      Modal.prototype._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        $(Selector.FIXED_CONTENT).each((index, element) => {
          const padding = $(element).data('padding-right');
          if (typeof padding !== 'undefined') {
            $(element)
              .css('padding-right', padding)
              .removeData('padding-right');
          }
        });

        // Restore navbar-toggler margin
        $(Selector.NAVBAR_TOGGLER).each((index, element) => {
          const margin = $(element).data('margin-right');
          if (typeof margin !== 'undefined') {
            $(element).css('margin-right', margin).removeData('margin-right');
          }
        });

        // Restore body padding
        const padding = $('body').data('padding-right');
        if (typeof padding !== 'undefined') {
          $('body').css('padding-right', padding).removeData('padding-right');
        }
      };

      Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        const scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        const scrollbarWidth =
          scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      };

      // static

      Modal._jQueryInterface = function _jQueryInterface(
        config,
        relatedTarget,
      ) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config = $.extend(
            {},
            Modal.Default,
            $(this).data(),
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
              'object' && config,
          );

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
      ]);

      return Modal;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DATA_TOGGLE,
      function (event) {
        const _this19 = this;

        let target = void 0;
        const selector = Util.getSelectorFromElement(this);

        if (selector) {
          target = $(selector)[0];
        }

        const config = $(target).data(DATA_KEY)
          ? 'toggle'
          : $.extend({}, $(target).data(), $(this).data());

        if (this.tagName === 'A' || this.tagName === 'AREA') {
          event.preventDefault();
        }

        var $target = $(target).one(Event.SHOW, (showEvent) => {
          if (showEvent.isDefaultPrevented()) {
            // only register focus restorer if modal will actually get shown
            return;
          }

          $target.one(Event.HIDDEN, () => {
            if ($(_this19).is(':visible')) {
              _this19.focus();
            }
          });
        });

        Modal._jQueryInterface.call($(target), config, this);
      },
    );

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const ScrollSpy = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'scrollspy';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.scrollspy';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
      offset: 10,
      method: 'auto',
      target: '',
    };

    const DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)',
    };

    const Event = {
      ACTIVATE: `activate${EVENT_KEY}`,
      SCROLL: `scroll${EVENT_KEY}`,
      LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
    };

    const Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
    };

    const OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const ScrollSpy = (function () {
      function ScrollSpy(element, config) {
        const _this20 = this;

        _classCallCheck(this, ScrollSpy);

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = `${this._config.target} ${Selector.NAV_LINKS},${this._config.target} ${Selector.LIST_ITEMS},${this._config.target} ${Selector.DROPDOWN_ITEMS}`;
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;

        $(this._scrollElement).on(Event.SCROLL, (event) =>
          _this20._process(event),
        );

        this.refresh();
        this._process();
      }

      // getters

      // public

      ScrollSpy.prototype.refresh = function refresh() {
        const _this21 = this;

        const autoMethod =
          this._scrollElement !== this._scrollElement.window
            ? OffsetMethod.POSITION
            : OffsetMethod.OFFSET;

        const offsetMethod =
          this._config.method === 'auto' ? autoMethod : this._config.method;

        const offsetBase =
          offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        const targets = $.makeArray($(this._selector));

        targets
          .map((element) => {
            let target = void 0;
            const targetSelector = Util.getSelectorFromElement(element);

            if (targetSelector) {
              target = $(targetSelector)[0];
            }

            if (target) {
              const targetBCR = target.getBoundingClientRect();
              if (targetBCR.width || targetBCR.height) {
                // todo (fat): remove sketch reliance on jQuery position/offset
                return [
                  $(target)[offsetMethod]().top + offsetBase,
                  targetSelector,
                ];
              }
            }
            return null;
          })
          .filter((item) => item)
          .sort((a, b) => a[0] - b[0])
          .forEach((item) => {
            _this21._offsets.push(item[0]);
            _this21._targets.push(item[1]);
          });
      };

      ScrollSpy.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      };

      // private

      ScrollSpy.prototype._getConfig = function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          let id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = `#${id}`;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      };

      ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window
          ? this._scrollElement.pageYOffset
          : this._scrollElement.scrollTop;
      };

      ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
        return (
          this._scrollElement.scrollHeight ||
          Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
          )
        );
      };

      ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window
          ? window.innerHeight
          : this._scrollElement.getBoundingClientRect().height;
      };

      ScrollSpy.prototype._process = function _process() {
        const scrollTop = this._getScrollTop() + this._config.offset;
        const scrollHeight = this._getScrollHeight();
        const maxScroll =
          this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          const target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
          return;
        }

        if (
          this._activeTarget &&
          scrollTop < this._offsets[0] &&
          this._offsets[0] > 0
        ) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (let i = this._offsets.length; i--; ) {
          const isActiveTarget =
            this._activeTarget !== this._targets[i] &&
            scrollTop >= this._offsets[i] &&
            (this._offsets[i + 1] === undefined ||
              scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      ScrollSpy.prototype._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        let queries = this._selector.split(',');
        queries = queries.map(
          (selector) =>
            `${selector}[data-target="${target}"],${selector}[href="${target}"]`,
        );

        const $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link
            .closest(Selector.DROPDOWN)
            .find(Selector.DROPDOWN_TOGGLE)
            .addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE);
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          $link
            .parents(Selector.NAV_LIST_GROUP)
            .prev(`${Selector.NAV_LINKS}, ${Selector.LIST_ITEMS}`)
            .addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target,
        });
      };

      ScrollSpy.prototype._clear = function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      };

      // static

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config =
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
              'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
      ]);

      return ScrollSpy;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(window).on(Event.LOAD_DATA_API, () => {
      const scrollSpys = $.makeArray($(Selector.DATA_SPY));

      for (let i = scrollSpys.length; i--; ) {
        const $spy = $(scrollSpys[i]);
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Tab = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'tab';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.tab';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 150;

    const Event = {
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    };

    const ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show',
    };

    const Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      DATA_TOGGLE:
        '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Tab = (function () {
      function Tab(element) {
        _classCallCheck(this, Tab);

        this._element = element;
      }

      // getters

      // public

      Tab.prototype.show = function show() {
        const _this22 = this;

        if (
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
            $(this._element).hasClass(ClassName.ACTIVE)) ||
          $(this._element).hasClass(ClassName.DISABLED)
        ) {
          return;
        }

        let target = void 0;
        let previous = void 0;
        const listElement = $(this._element).closest(
          Selector.NAV_LIST_GROUP,
        )[0];
        const selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          previous = $.makeArray($(listElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        const hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element,
        });

        const showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous,
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, listElement);

        const complete = function complete() {
          const hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this22._element,
          });

          const shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous,
          });

          $(previous).trigger(hiddenEvent);
          $(_this22._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      Tab.prototype.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      };

      // private

      Tab.prototype._activate = function _activate(
        element,
        container,
        callback,
      ) {
        const _this23 = this;

        const active = $(container).find(Selector.ACTIVE)[0];
        const isTransitioning =
          callback &&
          Util.supportsTransitionEnd() &&
          active &&
          $(active).hasClass(ClassName.FADE);

        const complete = function complete() {
          return _this23._transitionComplete(
            element,
            active,
            isTransitioning,
            callback,
          );
        };

        if (active && isTransitioning) {
          $(active)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.SHOW);
        }
      };

      Tab.prototype._transitionComplete = function _transitionComplete(
        element,
        active,
        isTransitioning,
        callback,
      ) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          const dropdownChild = $(active.parentNode).find(
            Selector.DROPDOWN_ACTIVE_CHILD,
          )[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.SHOW);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (
          element.parentNode &&
          $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)
        ) {
          const dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement)
              .find(Selector.DROPDOWN_TOGGLE)
              .addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      };

      // static

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          const $this = $(this);
          let data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      _createClass(Tab, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
      ]);

      return Tab;
    })();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DATA_TOGGLE,
      function (event) {
        event.preventDefault();
        Tab._jQueryInterface.call($(this), 'show');
      },
    );

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  })(jQuery);

  /* global Popper */

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Tooltip = (function ($) {
    /**
     * Check for Popper dependency
     * Popper - https://popper.js.org
     */
    if (typeof Popper === 'undefined') {
      throw new Error(
        'Bootstrap tooltips require Popper.js (https://popper.js.org)',
      );
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'tooltip';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.tooltip';
    const EVENT_KEY = `.${DATA_KEY}`;
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const TRANSITION_DURATION = 150;
    const CLASS_PREFIX = 'bs-tooltip';
    const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

    const DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
    };

    const AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left',
    };

    const Default = {
      animation: true,
      template:
        '<div class="tooltip" role="tooltip">' +
        '<div class="arrow"></div>' +
        '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
    };

    const HoverState = {
      SHOW: 'show',
      OUT: 'out',
    };

    const Event = {
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      INSERTED: `inserted${EVENT_KEY}`,
      CLICK: `click${EVENT_KEY}`,
      FOCUSIN: `focusin${EVENT_KEY}`,
      FOCUSOUT: `focusout${EVENT_KEY}`,
      MOUSEENTER: `mouseenter${EVENT_KEY}`,
      MOUSELEAVE: `mouseleave${EVENT_KEY}`,
    };

    const ClassName = {
      FADE: 'fade',
      SHOW: 'show',
    };

    const Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow',
    };

    const Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual',

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Tooltip = (function () {
      function Tooltip(element, config) {
        _classCallCheck(this, Tooltip);

        // private
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null;

        // protected
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      }

      // getters

      // public

      Tooltip.prototype.enable = function enable() {
        this._isEnabled = true;
      };

      Tooltip.prototype.disable = function disable() {
        this._isEnabled = false;
      };

      Tooltip.prototype.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      Tooltip.prototype.toggle = function toggle(event) {
        if (event) {
          const dataKey = this.constructor.DATA_KEY;
          let context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(
              event.currentTarget,
              this._getDelegateConfig(),
            );
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      };

      Tooltip.prototype.dispose = function dispose() {
        clearTimeout(this._timeout);

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        if (this._popper !== null) {
          this._popper.destroy();
        }
        this._popper = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      };

      Tooltip.prototype.show = function show() {
        const _this24 = this;

        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        const showEvent = $.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          const isInTheDom = $.contains(
            this.element.ownerDocument.documentElement,
            this.element,
          );

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          const tip = this.getTipElement();
          const tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          const placement =
            typeof this.config.placement === 'function'
              ? this.config.placement.call(this, tip, this.element)
              : this.config.placement;

          const attachment = this._getAttachment(placement);
          this.addAttachmentClass(attachment);

          const container =
            this.config.container === false
              ? document.body
              : $(this.config.container);

          $(tip).data(this.constructor.DATA_KEY, this);

          if (
            !$.contains(this.element.ownerDocument.documentElement, this.tip)
          ) {
            $(tip).appendTo(container);
          }

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset,
              },
              flip: {
                behavior: this.config.fallbackPlacement,
              },
              arrow: {
                element: Selector.ARROW,
              },
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this24._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this24._handlePopperPlacementChange(data);
            },
          });

          $(tip).addClass(ClassName.SHOW);

          // if this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
          if ('ontouchstart' in document.documentElement) {
            $('body').children().on('mouseover', null, $.noop);
          }

          const complete = function complete() {
            if (_this24.config.animation) {
              _this24._fixTransition();
            }
            const prevHoverState = _this24._hoverState;
            _this24._hoverState = null;

            $(_this24.element).trigger(_this24.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this24._leave(null, _this24);
            }
          };

          if (
            Util.supportsTransitionEnd() &&
            $(this.tip).hasClass(ClassName.FADE)
          ) {
            $(this.tip)
              .one(Util.TRANSITION_END, complete)
              .emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          } else {
            complete();
          }
        }
      };

      Tooltip.prototype.hide = function hide(callback) {
        const _this25 = this;

        const tip = this.getTipElement();
        const hideEvent = $.Event(this.constructor.Event.HIDE);
        const complete = function complete() {
          if (_this25._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this25._cleanTipClass();
          _this25.element.removeAttribute('aria-describedby');
          $(_this25.element).trigger(_this25.constructor.Event.HIDDEN);
          if (_this25._popper !== null) {
            _this25._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.SHOW);

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (
          Util.supportsTransitionEnd() &&
          $(this.tip).hasClass(ClassName.FADE)
        ) {
          $(tip)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      Tooltip.prototype.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      };

      // protected

      Tooltip.prototype.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      Tooltip.prototype.addAttachmentClass = function addAttachmentClass(
        attachment,
      ) {
        $(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
      };

      Tooltip.prototype.getTipElement = function getTipElement() {
        return (this.tip = this.tip || $(this.config.template)[0]);
      };

      Tooltip.prototype.setContent = function setContent() {
        const $tip = $(this.getTipElement());
        this.setElementContent(
          $tip.find(Selector.TOOLTIP_INNER),
          this.getTitle(),
        );
        $tip.removeClass(`${ClassName.FADE} ${ClassName.SHOW}`);
      };

      Tooltip.prototype.setElementContent = function setElementContent(
        $element,
        content,
      ) {
        const { html } = this.config;
        if (
          (typeof content === 'undefined' ? 'undefined' : _typeof(content)) ===
            'object' &&
          (content.nodeType || content.jquery)
        ) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      Tooltip.prototype.getTitle = function getTitle() {
        let title = this.element.getAttribute('data-original-title');

        if (!title) {
          title =
            typeof this.config.title === 'function'
              ? this.config.title.call(this.element)
              : this.config.title;
        }

        return title;
      };

      // private

      Tooltip.prototype._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      Tooltip.prototype._setListeners = function _setListeners() {
        const _this26 = this;

        const triggers = this.config.trigger.split(' ');

        triggers.forEach((trigger) => {
          if (trigger === 'click') {
            $(_this26.element).on(
              _this26.constructor.Event.CLICK,
              _this26.config.selector,
              (event) => _this26.toggle(event),
            );
          } else if (trigger !== Trigger.MANUAL) {
            const eventIn =
              trigger === Trigger.HOVER
                ? _this26.constructor.Event.MOUSEENTER
                : _this26.constructor.Event.FOCUSIN;
            const eventOut =
              trigger === Trigger.HOVER
                ? _this26.constructor.Event.MOUSELEAVE
                : _this26.constructor.Event.FOCUSOUT;

            $(_this26.element)
              .on(eventIn, _this26.config.selector, (event) =>
                _this26._enter(event),
              )
              .on(eventOut, _this26.config.selector, (event) =>
                _this26._leave(event),
              );
          }

          $(_this26.element)
            .closest('.modal')
            .on('hide.bs.modal', () => _this26.hide());
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: '',
          });
        } else {
          this._fixTitle();
        }
      };

      Tooltip.prototype._fixTitle = function _fixTitle() {
        const titleType = _typeof(
          this.element.getAttribute('data-original-title'),
        );
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute(
            'data-original-title',
            this.element.getAttribute('title') || '',
          );
          this.element.setAttribute('title', '');
        }
      };

      Tooltip.prototype._enter = function _enter(event, context) {
        const dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(
            event.currentTarget,
            this._getDelegateConfig(),
          );
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[
            event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER
          ] = true;
        }

        if (
          $(context.getTipElement()).hasClass(ClassName.SHOW) ||
          context._hoverState === HoverState.SHOW
        ) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(() => {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      Tooltip.prototype._leave = function _leave(event, context) {
        const dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(
            event.currentTarget,
            this._getDelegateConfig(),
          );
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[
            event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER
          ] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(() => {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (const trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      Tooltip.prototype._getConfig = function _getConfig(config) {
        config = $.extend(
          {},
          this.constructor.Default,
          $(this.element).data(),
          config,
        );

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay,
          };
        }

        if (config.title && typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (config.content && typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      };

      Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
        const config = {};

        if (this.config) {
          for (const key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      Tooltip.prototype._cleanTipClass = function _cleanTipClass() {
        const $tip = $(this.getTipElement());
        const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      Tooltip.prototype._handlePopperPlacementChange =
        function _handlePopperPlacementChange(data) {
          this._cleanTipClass();
          this.addAttachmentClass(this._getAttachment(data.placement));
        };

      Tooltip.prototype._fixTransition = function _fixTransition() {
        const tip = this.getTipElement();
        const initConfigAnimation = this.config.animation;
        if (tip.getAttribute('x-placement') !== null) {
          return;
        }
        $(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      };

      // static

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config =
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
              'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
        {
          key: 'NAME',
          get: function get() {
            return NAME;
          },
        },
        {
          key: 'DATA_KEY',
          get: function get() {
            return DATA_KEY;
          },
        },
        {
          key: 'Event',
          get: function get() {
            return Event;
          },
        },
        {
          key: 'EVENT_KEY',
          get: function get() {
            return EVENT_KEY;
          },
        },
        {
          key: 'DefaultType',
          get: function get() {
            return DefaultType;
          },
        },
      ]);

      return Tooltip;
    })();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  })(jQuery);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-beta): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const Popover = (function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'popover';
    const VERSION = '4.0.0-beta';
    const DATA_KEY = 'bs.popover';
    const EVENT_KEY = `.${DATA_KEY}`;
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const CLASS_PREFIX = 'bs-popover';
    const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');

    const Default = $.extend({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template:
        '<div class="popover" role="tooltip">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-header"></h3>' +
        '<div class="popover-body"></div></div>',
    });

    const DefaultType = $.extend({}, Tooltip.DefaultType, {
      content: '(string|element|function)',
    });

    const ClassName = {
      FADE: 'fade',
      SHOW: 'show',
    };

    const Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body',
    };

    const Event = {
      HIDE: `hide${EVENT_KEY}`,
      HIDDEN: `hidden${EVENT_KEY}`,
      SHOW: `show${EVENT_KEY}`,
      SHOWN: `shown${EVENT_KEY}`,
      INSERTED: `inserted${EVENT_KEY}`,
      CLICK: `click${EVENT_KEY}`,
      FOCUSIN: `focusin${EVENT_KEY}`,
      FOCUSOUT: `focusout${EVENT_KEY}`,
      MOUSEENTER: `mouseenter${EVENT_KEY}`,
      MOUSELEAVE: `mouseleave${EVENT_KEY}`,

      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
    };
    const Popover = (function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(
          this,
          _Tooltip.apply(this, arguments),
        );
      }

      // overrides

      Popover.prototype.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      Popover.prototype.addAttachmentClass = function addAttachmentClass(
        attachment,
      ) {
        $(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
      };

      Popover.prototype.getTipElement = function getTipElement() {
        return (this.tip = this.tip || $(this.config.template)[0]);
      };

      Popover.prototype.setContent = function setContent() {
        const $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(`${ClassName.FADE} ${ClassName.SHOW}`);
      };

      // private

      Popover.prototype._getContent = function _getContent() {
        return (
          this.element.getAttribute('data-content') ||
          (typeof this.config.content === 'function'
            ? this.config.content.call(this.element)
            : this.config.content)
        );
      };

      Popover.prototype._cleanTipClass = function _cleanTipClass() {
        const $tip = $(this.getTipElement());
        const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      // static

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          let data = $(this).data(DATA_KEY);
          const _config =
            (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ===
            'object'
              ? config
              : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error(`No method named "${config}"`);
            }
            data[config]();
          }
        });
      };

      _createClass(Popover, null, [
        {
          key: 'VERSION',

          // getters

          get: function get() {
            return VERSION;
          },
        },
        {
          key: 'Default',
          get: function get() {
            return Default;
          },
        },
        {
          key: 'NAME',
          get: function get() {
            return NAME;
          },
        },
        {
          key: 'DATA_KEY',
          get: function get() {
            return DATA_KEY;
          },
        },
        {
          key: 'Event',
          get: function get() {
            return Event;
          },
        },
        {
          key: 'EVENT_KEY',
          get: function get() {
            return EVENT_KEY;
          },
        },
        {
          key: 'DefaultType',
          get: function get() {
            return DefaultType;
          },
        },
      ]);

      return Popover;
    })(Tooltip);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  })(jQuery);
})();
