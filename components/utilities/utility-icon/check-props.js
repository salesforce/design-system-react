"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlExists = require("../../../utilities/warning/url-exists");

var _urlExists2 = _interopRequireDefault(_urlExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    if (!props.context["".concat(props.category, "Sprite")]) {
      var modifiedPath = props.path || props.context.iconPath;
      (0, _urlExists2.default)(COMPONENT, "".concat(modifiedPath, "/").concat(props.category, "-sprite/svg/symbols.svg#").concat(props.name));
    }
  };
}

exports.default = checkProps;