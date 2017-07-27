define(['module', 'react-onclickoutside', './date-picker'], function (module, _reactOnclickoutside, _datePicker) {
  'use strict';

  var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

  var _datePicker2 = _interopRequireDefault(_datePicker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
  /* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

  // ### onClickOutside
  // Listen for clicks that occur somewhere in the document, outside of the element itself
  module.exports = (0, _reactOnclickoutside2.default)(_datePicker2.default);
});