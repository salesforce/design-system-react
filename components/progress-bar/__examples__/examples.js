"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LARGE_BAR = exports.MEDIUM_BAR = exports.SMALL_BAR = exports.X_SMALL_BAR = exports.ROUNDED_BAR = exports.COMPLETE_WITH_DESCRIPTION = exports.COMPLETE_100 = exports.PROGRESS_75 = exports.PROGRESS_HALF = exports.PROGRESS_25 = exports.PROGRESS_0 = void 0;

var _react = _interopRequireDefault(require("react"));

var _progressBar = _interopRequireDefault(require("../../../components/progress-bar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROGRESS_0 = function PROGRESS_0() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-1",
    value: 0
  });
};

exports.PROGRESS_0 = PROGRESS_0;

var PROGRESS_25 = function PROGRESS_25() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-2",
    value: 25
  });
};

exports.PROGRESS_25 = PROGRESS_25;

var PROGRESS_HALF = function PROGRESS_HALF() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-3",
    value: 50
  });
};

exports.PROGRESS_HALF = PROGRESS_HALF;

var PROGRESS_75 = function PROGRESS_75() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-4",
    value: 75
  });
};

exports.PROGRESS_75 = PROGRESS_75;

var COMPLETE_100 = function COMPLETE_100() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-5",
    value: 100,
    color: "success"
  });
};

exports.COMPLETE_100 = COMPLETE_100;

var COMPLETE_WITH_DESCRIPTION = function COMPLETE_WITH_DESCRIPTION() {
  return _react.default.createElement(_progressBar.default, {
    value: 100,
    color: "success",
    label: "Einstein Setup Assistant"
  });
};

exports.COMPLETE_WITH_DESCRIPTION = COMPLETE_WITH_DESCRIPTION;

var ROUNDED_BAR = function ROUNDED_BAR() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-circular",
    value: 20,
    radius: "circular"
  });
};

exports.ROUNDED_BAR = ROUNDED_BAR;

var X_SMALL_BAR = function X_SMALL_BAR() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-x-small",
    value: 20,
    thickness: "x-small"
  });
};

exports.X_SMALL_BAR = X_SMALL_BAR;

var SMALL_BAR = function SMALL_BAR() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-small",
    value: 20,
    thickness: "small"
  });
};

exports.SMALL_BAR = SMALL_BAR;

var MEDIUM_BAR = function MEDIUM_BAR() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-medium",
    value: 20,
    thickness: "medium"
  });
};

exports.MEDIUM_BAR = MEDIUM_BAR;

var LARGE_BAR = function LARGE_BAR() {
  return _react.default.createElement(_progressBar.default, {
    id: "progress-bar-large",
    value: 20,
    thickness: "large"
  });
};

exports.LARGE_BAR = LARGE_BAR;