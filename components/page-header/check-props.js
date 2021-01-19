"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedPropertyValue = _interopRequireDefault(require("../../utilities/warning/deprecated-property-value"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _renderFunctionReturnContentsLackDisplayName = _interopRequireDefault(require("../../utilities/warning/render-function-return-contents-lack-display-name"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _deprecatedProperty.default)(COMPONENT, props.iconCategory, 'iconCategory', 'icon', createDocUrl('icon'));
    (0, _deprecatedProperty.default)(COMPONENT, props.iconName, 'iconName', 'icon', createDocUrl('icon'));
    (0, _deprecatedProperty.default)(COMPONENT, props.iconPosition, 'iconPosition', 'icon', createDocUrl('icon'));
    (0, _deprecatedProperty.default)(COMPONENT, props.iconSize, 'iconSize', 'icon', createDocUrl('icon'));
    (0, _deprecatedProperty.default)(COMPONENT, props.iconVariant, 'iconVariant', 'icon', createDocUrl('icon'));

    if (props.variant === 'objectHome') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'objectHome',
        replacementPropAsValue: 'object-home'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('object-home') instead. ".concat(createDocUrl('variant')));
    }

    if (props.variant === 'recordHome') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'recordHome',
        replacementPropAsValue: 'record-home'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('record-home') instead. ".concat(createDocUrl('variant')));
    }

    if (props.variant === 'relatedList') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'relatedList',
        replacementPropAsValue: 'related-list'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('related-list') instead. ".concat(createDocUrl('variant')));
    }

    (0, _deprecatedProperty.default)(COMPONENT, props.contentRight, 'contentRight', 'onRenderActions', createDocUrl('onRenderActions'));
    (0, _deprecatedProperty.default)(COMPONENT, props.navRight, 'navRight', 'onRenderControls', createDocUrl('onRenderControls'));

    if (props.onRenderActions) {
      (0, _renderFunctionReturnContentsLackDisplayName.default)(COMPONENT, 'onRenderActions', props.onRenderActions(), [_constants.PAGE_HEADER_CONTROL], true);
    } else if (props.contentRight) {
      (0, _renderFunctionReturnContentsLackDisplayName.default)(COMPONENT, 'contentRight', props.contentRight, [_constants.PAGE_HEADER_CONTROL], true);
    }

    if (props.onRenderControls) {
      (0, _renderFunctionReturnContentsLackDisplayName.default)(COMPONENT, 'onRenderControls', props.onRenderControls(), [_constants.PAGE_HEADER_CONTROL], true);
    } else if (props.navRight) {
      (0, _renderFunctionReturnContentsLackDisplayName.default)(COMPONENT, 'navRight', props.navRight, [_constants.PAGE_HEADER_CONTROL], true);
    }
  };
}

var _default = checkProps;
exports.default = _default;