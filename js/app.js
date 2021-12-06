(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _tabsTools = _interopRequireDefault(require("./components/tabsTools"));

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _tabsIDO = _interopRequireDefault(require("./components/tabsIDO"));

var _tabsINFO = _interopRequireDefault(require("./components/tabsINFO"));

var _tabsPools = _interopRequireDefault(require("./components/tabsPools"));

var _popup = _interopRequireDefault(require("./components/popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
(function ($) {
  // When DOM is ready
  $(function () {
    _accordion["default"].init();

    _tabs["default"].init();

    _tabsTools["default"].init();

    _tabsIDO["default"].init();

    _tabsINFO["default"].init();

    _tabsPools["default"].init();

    _popup["default"].init();
  });
})(jQuery);

},{"./components/accordion":2,"./components/popup":3,"./components/tabs":4,"./components/tabsIDO":5,"./components/tabsINFO":6,"./components/tabsPools":7,"./components/tabsTools":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_TITLE = 'accordion__title';
var CLASS_CONTENT = 'accordion__content';
var CLASS_ACTIVE = 'active';
var CLASS_ACCORDION_ALL = 'accordion_all';
var ACCORDION = document.getElementsByClassName('accordion');

var accordion = function () {
  var accordionInit = function accordionInit() {
    var _loop = function _loop(item) {
      var contentAccordion = ACCORDION[item].getElementsByClassName(CLASS_CONTENT);
      var titleAccordion = ACCORDION[item].getElementsByClassName(CLASS_TITLE);

      if (ACCORDION[item].classList.contains(CLASS_ACCORDION_ALL)) {
        (function () {
          var showAllAccordion = function showAllAccordion(toggle) {
            var currentAccordion = document.getElementById(toggle);
            currentAccordion.classList.toggle(CLASS_ACTIVE);
          };

          for (var i = 0; i < titleAccordion.length; i += 1) {
            titleAccordion[i].addEventListener('click', function () {
              showAllAccordion(this.dataset.accordion);
              this.classList.toggle(CLASS_ACTIVE);
            });
          }
        })();
      } else {
        (function () {
          var showAccordion = function showAccordion(toggle) {
            var currentAccordion = document.getElementById(toggle);

            if (currentAccordion.classList.contains(CLASS_ACTIVE)) {
              currentAccordion.classList.remove(CLASS_ACTIVE);
            } else {
              for (var i = 0; i < contentAccordion.length; i += 1) {
                contentAccordion[i].classList.remove(CLASS_ACTIVE);
              }

              currentAccordion.classList.add(CLASS_ACTIVE);
            }
          };

          var _loop2 = function _loop2(i) {
            titleAccordion[i].addEventListener('click', function (_ref) {
              var target = _ref.target;
              showAccordion(target.dataset.accordion);

              if (target.classList.contains(CLASS_ACTIVE)) {
                titleAccordion[i].classList.remove(CLASS_ACTIVE);
              } else {
                for (var j = 0; j < titleAccordion.length; j += 1) {
                  titleAccordion[j].classList.remove(CLASS_ACTIVE);
                }

                titleAccordion[i].classList.add(CLASS_ACTIVE);
              }
            });
          };

          for (var i = 0; i < titleAccordion.length; i += 1) {
            _loop2(i);
          }
        })();
      }
    };

    for (var item = 0; item < ACCORDION.length; item += 1) {
      _loop(item);
    }
  };

  var init = function init() {
    if (ACCORDION.length > 0) {
      accordionInit();
    }
  };

  return {
    init: init
  };
}();

var _default = accordion;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var POPUP_SHOW = document.querySelectorAll('.js-show-popup');
var POPUPS = document.querySelectorAll('[data-popup]');
var OVERLAY = document.querySelector('.js-overlay');
var BODY = document.querySelector('body');
var CLOSE_BTN = document.querySelectorAll('.js-popup-close');
var CLASS_ACTIVE = 'active';
var CLASS_OVERFLOW = 'overflow';

var popups = function () {
  if (!POPUPS.length) return;

  function fadeOut(el) {
    var changeOpasity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -0.8;
    if (!el) return;
    requestAnimationFrame(function anim() {
      var opacity = +window.getComputedStyle(el).opacity;

      if (opacity <= 0) {
        el.style.opacity = 0;
        el.style.display = 'none';
        el.classList.remove(CLASS_ACTIVE);
        return;
      }

      el.style.opacity = opacity + changeOpasity;
      if (opacity > 0) requestAnimationFrame(anim);
    });
  }

  function fadeIn(el) {
    var changeOpasity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.8;
    if (!el) return;
    el.style.display = 'block';
    el.classList.add(CLASS_ACTIVE);
    requestAnimationFrame(function anim() {
      var opacity = +window.getComputedStyle(el).opacity;

      if (opacity >= 1) {
        el.style.opacity = 1;
        return;
      }

      el.style.opacity = opacity + changeOpasity;
      if (opacity < 1) requestAnimationFrame(anim);
    });
  }

  var hidePopup = function hidePopup() {
    fadeOut(OVERLAY);
    BODY.classList.remove(CLASS_OVERFLOW);
    POPUPS.forEach(function (popup) {
      return fadeOut(popup);
    });
  };

  var showPopup = function showPopup(target) {
    fadeIn(OVERLAY);
    BODY.classList.add(CLASS_OVERFLOW);
    var currentPopup = document.querySelector("[data-popup=\"".concat(target, "\"]"));
    fadeIn(currentPopup);
  };

  var showPopupInit = function showPopupInit() {
    if (POPUP_SHOW.length) {
      POPUP_SHOW.forEach(function (opener) {
        opener.addEventListener('click', function () {
          showPopup(this.dataset.trigger);
        });
      });
    }

    if (OVERLAY) {
      OVERLAY.addEventListener('click', function () {
        hidePopup();
      });
    }

    if (CLOSE_BTN.length) {
      CLOSE_BTN.forEach(function (closure) {
        closure.addEventListener('click', function () {
          hidePopup();
        });
      });
    }
  };

  var init = function init() {
    if (POPUPS.length) {
      showPopupInit();
    }
  };

  return {
    init: init,
    showPopup: showPopup
  };
}();

var _default = popups;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ACTIVE = 'active';

var tabs = function () {
  var tabsUnit = function tabsUnit() {
    var TAB = document.querySelectorAll('.js-tabs-btn');

    for (var i = 0; TAB.length > i; i += 1) {
      var currentTab = TAB[i];
      currentTab.addEventListener('click', function (e) {
        for (var y = 0; TAB.length > y; y += 1) {
          var _currentTab = TAB[y];
          var currentTabContent = document.querySelector(".".concat(_currentTab.getAttribute('data-tab')));

          _currentTab.classList.remove(ACTIVE);

          currentTabContent.classList.remove(ACTIVE);
        }

        e.currentTarget.classList.add(ACTIVE);
        var target = e.currentTarget.getAttribute('data-tab');
        var targetContent = document.querySelector(".".concat(target));
        targetContent.classList.add(ACTIVE);
      });
    }
  };

  var init = function init() {
    tabsUnit();
  };

  return {
    init: init
  };
}();

var _default = tabs;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TABSACTIVE = 'active';

var tabsIDO = function () {
  var tabsUnit = function tabsUnit() {
    var TAB = document.querySelectorAll('.js-tabs-ido-btn');

    for (var i = 0; TAB.length > i; i += 1) {
      var currentTab = TAB[i];
      currentTab.addEventListener('click', function (e) {
        for (var y = 0; TAB.length > y; y += 1) {
          var _currentTab = TAB[y];
          var currentTabContent = document.querySelector(".".concat(_currentTab.getAttribute('data-tab')));

          _currentTab.classList.remove(TABSACTIVE);

          currentTabContent.classList.remove(TABSACTIVE);
        }

        e.currentTarget.classList.add(TABSACTIVE);
        var target = e.currentTarget.getAttribute('data-tab');
        var targetContent = document.querySelector(".".concat(target));
        targetContent.classList.add(TABSACTIVE);
      });
    }
  };

  var init = function init() {
    tabsUnit();
  };

  return {
    init: init
  };
}();

var _default = tabsIDO;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TABSACTIVE = 'active';

var tabsINFO = function () {
  var tabsUnit = function tabsUnit() {
    var TAB = document.querySelectorAll('.js-tabs-info-btn');

    for (var i = 0; TAB.length > i; i += 1) {
      var currentTab = TAB[i];
      currentTab.addEventListener('click', function (e) {
        for (var y = 0; TAB.length > y; y += 1) {
          var _currentTab = TAB[y];
          var currentTabContent = document.querySelector(".".concat(_currentTab.getAttribute('data-tab')));

          _currentTab.classList.remove(TABSACTIVE);

          currentTabContent.classList.remove(TABSACTIVE);
        }

        e.currentTarget.classList.add(TABSACTIVE);
        var target = e.currentTarget.getAttribute('data-tab');
        var targetContent = document.querySelector(".".concat(target));
        targetContent.classList.add(TABSACTIVE);
      });
    }
  };

  var init = function init() {
    tabsUnit();
  };

  return {
    init: init
  };
}();

var _default = tabsINFO;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TABSACTIVE = 'active';

var tabsPools = function () {
  var tabsUnit = function tabsUnit() {
    var TAB = document.querySelectorAll('.js-tab-pools-btn');

    for (var i = 0; TAB.length > i; i += 1) {
      var currentTab = TAB[i];
      currentTab.addEventListener('click', function (e) {
        for (var y = 0; TAB.length > y; y += 1) {
          var _currentTab = TAB[y];
          var currentTabContent = document.querySelector(".".concat(_currentTab.getAttribute('data-tab')));

          _currentTab.classList.remove(TABSACTIVE);

          currentTabContent.classList.remove(TABSACTIVE);
        }

        e.currentTarget.classList.add(TABSACTIVE);
        var target = e.currentTarget.getAttribute('data-tab');
        var targetContent = document.querySelector(".".concat(target));
        targetContent.classList.add(TABSACTIVE);
      });
    }
  };

  var init = function init() {
    tabsUnit();
  };

  return {
    init: init
  };
}();

var _default = tabsPools;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TABSACTIVE = 'active';

var tabsTools = function () {
  var tabsUnit = function tabsUnit() {
    var TAB = document.querySelectorAll('.js-tabs-tools-btn');

    for (var i = 0; TAB.length > i; i += 1) {
      var currentTab = TAB[i];
      currentTab.addEventListener('click', function (e) {
        for (var y = 0; TAB.length > y; y += 1) {
          var _currentTab = TAB[y];
          var currentTabContent = document.querySelector(".".concat(_currentTab.getAttribute('data-tab')));

          _currentTab.classList.remove(TABSACTIVE);

          currentTabContent.classList.remove(TABSACTIVE);
        }

        e.currentTarget.classList.add(TABSACTIVE);
        var target = e.currentTarget.getAttribute('data-tab');
        var targetContent = document.querySelector(".".concat(target));
        targetContent.classList.add(TABSACTIVE);
      });
    }
  };

  var init = function init() {
    tabsUnit();
  };

  return {
    init: init
  };
}();

var _default = tabsTools;
exports["default"] = _default;

},{}]},{},[1]);
