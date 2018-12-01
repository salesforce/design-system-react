"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lowPriorityWarning = require("./low-priority-warning");

var _lowPriorityWarning2 = _interopRequireDefault(_lowPriorityWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
// This function will deliver a warning message to the browser console about an event parameter change.
var deprecated = function deprecated() {};

if (process.env.NODE_ENV !== 'production') {
  var hasWarned = {};

  deprecated = function deprecated(control, _ref, comment) {
    var oldEventParameterOrder = _ref.oldEventParameterOrder,
        propAsString = _ref.propAsString,
        log = _ref.log;
    var additionalComment = comment ? " ".concat(comment) : '';
    var warnOnFirstOccurrenceKey = control + propAsString;
    var triggerWarning = oldEventParameterOrder !== undefined;

    if (!hasWarned[warnOnFirstOccurrenceKey]) {
      var message = "[Design System React] ".concat(additionalComment);

      if (triggerWarning && log) {
        log({
          message: message
        });
      } else {
        (0, _lowPriorityWarning2.default)(!triggerWarning, // false value triggers warning
        message);
      } // store global flag to limit warnings to first issue


      hasWarned[warnOnFirstOccurrenceKey] = triggerWarning;
    }
  };
}

exports.default = deprecated;