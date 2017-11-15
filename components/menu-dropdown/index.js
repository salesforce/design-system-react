define(['exports', 'react-onclickoutside', './menu-dropdown'], function (exports, _reactOnclickoutside, _menuDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

  var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _reactOnclickoutside2.default)(_menuDropdown2.default);
});