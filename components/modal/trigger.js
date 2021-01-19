"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _componentIsDeprecated = _interopRequireDefault(require("../../utilities/warning/component-is-deprecated"));

var _index = _interopRequireDefault(require("./index"));

var _executionEnvironment = require("../../utilities/execution-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// This component should be deprecated and appears to have
// been created in order to do modals in portals.
var ModalTrigger = {
  open: function open(cfg) {
    (0, _componentIsDeprecated.default)('components/modal/trigger.jsx', 'This component is deprecated and appears to have been created in order to do modals in portals which is what current Modal has done for years.');
    var el;

    if (_executionEnvironment.canUseDOM) {
      el = document.createElement('span');
      el.setAttribute('data-slds-modal', true);
      document.body.appendChild(el);
    }

    var comp = /*#__PURE__*/_react.default.createElement(_index.default, {
      heading: cfg.title,
      footer: cfg.footer,
      isOpen: true
    }, cfg.content);

    _reactDom.default.render(comp, el); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE

  }
};
var _default = ModalTrigger;
exports.default = _default;