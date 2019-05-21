"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlExists = _interopRequireDefault(require("../../../utilities/warning/url-exists"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    if (!props.context["".concat(props.category, "Sprite")] && !props.context.onRequestIconPath) {
      var modifiedPath = props.path || props.context.iconPath;
      (0, _urlExists.default)(COMPONENT, "".concat(modifiedPath, "/").concat(props.category, "-sprite/svg/symbols.svg#").concat(props.name));
    }
  };
}

var _default = checkProps;
exports.default = _default;