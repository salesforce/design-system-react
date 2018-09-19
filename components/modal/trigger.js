"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentIsDeprecated = require("../../utilities/warning/component-is-deprecated");

var _componentIsDeprecated2 = _interopRequireDefault(_componentIsDeprecated);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// This component should be deprecated and appears to have
// been created in order to do modals in portals.
var ModalTrigger = {
  open: function open(cfg) {
    (0, _componentIsDeprecated2.default)('components/modal/trigger.jsx', 'This component is deprecated and appears to have been created in order to do modals in portals which is what current Modal has done for years.');
    var el = document.createElement('span');
    el.setAttribute('data-slds-modal', true);
    document.body.appendChild(el);

    var comp = _react2.default.createElement(_index2.default, {
      title: cfg.title,
      footer: cfg.footer,
      isOpen: true
    }, cfg.content);

    _reactDom2.default.render(comp, el);
  }
};
exports.default = ModalTrigger;