define(['exports', 'react-onclickoutside', './date-picker'], function (exports, _reactOnclickoutside, _datePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

  var _datePicker2 = _interopRequireDefault(_datePicker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _reactOnclickoutside2.default)(_datePicker2.default);
});