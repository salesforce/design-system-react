define(['exports', 'react-onclickoutside', './popover'], function (exports, _reactOnclickoutside, _popover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

  var _popover2 = _interopRequireDefault(_popover);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _reactOnclickoutside2.default)(_popover2.default);
});