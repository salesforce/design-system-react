define(['exports', 'react-onclickoutside', './combobox'], function (exports, _reactOnclickoutside, _combobox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

  var _combobox2 = _interopRequireDefault(_combobox);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _reactOnclickoutside2.default)(_combobox2.default);
});