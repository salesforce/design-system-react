"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _componentIsDeprecated = _interopRequireDefault(require("../../utilities/warning/component-is-deprecated"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _oneOfComponent = _interopRequireDefault(require("../../utilities/warning/one-of-component"));

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);

    if (COMPONENT === _constants.APP_LAUNCHER) {
      if (props.modalHeaderButton !== undefined) {
        (0, _oneOfComponent.default)(COMPONENT, props, 'modalHeaderButton', ['SLDSButton'], createDocUrl('modalHeaderButton'));
      }

      (0, _deprecatedProperty.default)(COMPONENT, props.triggerAssistiveText, 'triggerAssistiveText', "assistiveText['trigger']", createDocUrl('assistiveText'));
    } else if (COMPONENT === _constants.APP_LAUNCHER_EXPANDABLE_SECTION) {
      (0, _deprecatedProperty.default)(COMPONENT, props.collapseSectionAssistiveText, 'collapseSectionAssistiveText', "assistiveText['collapseSection']", createDocUrl('assistiveText'));
    } else if (COMPONENT === _constants.APP_LAUNCHER_SECTION) {
      (0, _componentIsDeprecated.default)(COMPONENT, props, 'App Launcher Section has been deprecated. Please use APP_LAUNCHER_EXPANDABLE_SECTION instead.');
    } else if (COMPONENT === _constants.APP_LAUNCHER_TILE) {
      (0, _deprecatedProperty.default)(COMPONENT, props.descriptionHeading, 'descriptionHeading', null, 'Description headings are no longer a part of the SLDS App Launcher Tile spec. Please reach out to DSR admin if there is a special need for this feature');
      (0, _sunsetProperty.default)(COMPONENT, props.size, 'size', 'App Launcher Tiles are now all a consistent size according to SLDS specifications');
    }
  };
}

var _default = checkProps;
exports.default = _default;