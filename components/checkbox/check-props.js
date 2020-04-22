"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedEventParameter = _interopRequireDefault(require("../../utilities/warning/deprecated-event-parameter"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _onlyOneOfProperties = _interopRequireDefault(require("../../utilities/warning/only-one-of-properties"));

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _sunsetProperty.default)(COMPONENT, props.label, 'label', "Use `labels.label` instead.".concat(createDocUrl('labels')));
    (0, _deprecatedEventParameter.default)(COMPONENT, {
      oldEventParameterOrder: props.oldEventParameterOrder,
      propAsString: 'onChange',
      propAsValue: props.onChange
    }, "`components/forms/checkbox` is deprecated. `components/checkbox` should be used. When this path update is made `onChange` event parameters will change from `onChange(value, event, { value }) to `onChange(event, { value }). Please update your event parameters when you change paths.` If you are using the CommonJS named import, `Checkbox` events will break at v1.0 and this warning will be present until then. Please review https://github.com/salesforce/design-system-react/releases when you upgrade. ".concat(createDocUrl('onChange')));

    if (props.variant === 'toggle' && props.indeterminate === true) {
      (0, _onlyOneOfProperties.default)(COMPONENT, {
        variant: props.variant,
        indeterminate: props.indeterminate
      }, "Currently SLDS does not support the `indeterminate` state in Checkbox Toggle. See SLDS documentation about [Checkbox Toggle](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle) for more information. ".concat(createDocUrl('variant')));
    }
  };
}

var _default = checkProps;
exports.default = _default;