"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPIRED_100 = exports.EXPIRED_WITH_CUSTOM_ICON = exports.EXPIRED_WITH_ICON = exports.EXPIRED_PARTIAL = exports.WARNING_100 = exports.WARNING_WITH_ICON = exports.WARNING_PARTIAL = exports.COMPLETE_WITH_ICON = exports.COMPLETE_100 = exports.BASE_100 = exports.BASE_PARTIAL = exports.BASE_0 = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _progressRing = require("../../../components/progress-ring");

var _progressRing2 = _interopRequireDefault(_progressRing);

var _icon = require("../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_0 = exports.BASE_0 = function BASE_0() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 0
  });
};

var BASE_PARTIAL = exports.BASE_PARTIAL = function BASE_PARTIAL() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20
  });
};

var BASE_100 = exports.BASE_100 = function BASE_100() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 100
  });
};

var COMPLETE_100 = exports.COMPLETE_100 = function COMPLETE_100() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 100,
    theme: _progressRing.THEME_OPTIONS.COMPLETE
  });
};

var COMPLETE_WITH_ICON = exports.COMPLETE_WITH_ICON = function COMPLETE_WITH_ICON() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 100,
    theme: _progressRing.THEME_OPTIONS.COMPLETE,
    hasIcon: true
  });
};

var WARNING_PARTIAL = exports.WARNING_PARTIAL = function WARNING_PARTIAL() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20,
    theme: _progressRing.THEME_OPTIONS.WARNING
  });
};

var WARNING_WITH_ICON = exports.WARNING_WITH_ICON = function WARNING_WITH_ICON() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20,
    theme: _progressRing.THEME_OPTIONS.WARNING,
    hasIcon: true
  });
};

var WARNING_100 = exports.WARNING_100 = function WARNING_100() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 100,
    theme: _progressRing.THEME_OPTIONS.WARNING
  });
};

var EXPIRED_PARTIAL = exports.EXPIRED_PARTIAL = function EXPIRED_PARTIAL() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20,
    theme: _progressRing.THEME_OPTIONS.EXPIRED
  });
};

var EXPIRED_WITH_ICON = exports.EXPIRED_WITH_ICON = function EXPIRED_WITH_ICON() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20,
    theme: _progressRing.THEME_OPTIONS.EXPIRED,
    hasIcon: true
  });
};

var EXPIRED_WITH_CUSTOM_ICON = exports.EXPIRED_WITH_CUSTOM_ICON = function EXPIRED_WITH_CUSTOM_ICON() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 20,
    theme: _progressRing.THEME_OPTIONS.EXPIRED,
    hasIcon: true,
    icon: _react2.default.createElement(_icon2.default, {
      category: "utility",
      name: "lock"
    })
  });
};

var EXPIRED_100 = exports.EXPIRED_100 = function EXPIRED_100() {
  return _react2.default.createElement(_progressRing2.default, {
    value: 100,
    theme: _progressRing.THEME_OPTIONS.EXPIRED
  });
};