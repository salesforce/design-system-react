"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _svg = _interopRequireDefault(require("../utilities/utility-icon/svg"));

var _constants = require("../../utilities/constants");

var _docs = _interopRequireDefault(require("./docs.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Illustration Component
// Based on SLDS v2.6.2
// ## Dependencies
// ### React
// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
// ## SVG
// ## Constants

/**
 * An illustration is an image and inline text that work in tandem to communicate a state in a more friendly way.
 */
var Illustration = function Illustration(_ref) {
  var className = _ref.className,
      illustration = _ref.illustration,
      internalIllustration = _ref.internalIllustration,
      heading = _ref.heading,
      messageBody = _ref.messageBody,
      name = _ref.name,
      path = _ref.path,
      size = _ref.size,
      style = _ref.style;
  (0, _checkProps.default)('Illustration', {
    illustration: illustration,
    internalIllustration: internalIllustration,
    heading: heading,
    path: path
  }, _docs.default);
  var kababCaseName = name ? name.replace(/_| /g, '-').toLowerCase() : '';
  var illustrationSvg;

  if (illustration) {
    // Use SVG data passed in with `illustration` prop
    illustrationSvg = _react.default.createElement(_svg.default, {
      className: "slds-illustration__svg",
      "aria-hidden": "true",
      data: illustration,
      name: kababCaseName,
      style: style
    });
  } else if (path) {
    illustrationSvg = _react.default.createElement("svg", {
      className: "slds-illustration__svg",
      "aria-hidden": "true",
      name: kababCaseName,
      style: style
    }, _react.default.createElement("use", {
      xlinkHref: path
    }));
  } // large illustration svg should have a default height of 400px if not already specified


  if (illustrationSvg && size === 'large' && !style.height) {
    style.height = '400px';
  }

  return _react.default.createElement("div", {
    className: (0, _classNames.default)(className, 'slds-illustration', {
      'slds-illustration_small': size === 'small',
      'slds-illustration_large': size === 'large'
    })
  }, illustrationSvg, _react.default.createElement("div", {
    className: "slds-text-longform"
  }, heading ? _react.default.createElement("h3", {
    className: "slds-text-heading_medium"
  }, heading) : null, messageBody ? _react.default.createElement("p", {
    className: "slds-text-body_regular"
  }, messageBody) : null));
}; // ### Display Name
// Always use the canonical component name as the React display name.


Illustration.displayName = _constants.ILLUSTRATION; // ### Prop Types

Illustration.propTypes = {
  /**
   * CSS classes that are applied to the SVG. _Tested with Mocha testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * A heading text. It is required if illustration is present. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  heading: _propTypes.default.string,

  /**
   * A custom SVG object to use instead of the supplied SLDS illustrations, look in `design-system-react/icons` for examples and syntax. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  illustration: _propTypes.default.object,

  /**
   * Indicates whether the illustration SVGs are from the design-system-react repo. If yes, set to true.
   */
  internalIllustration: _propTypes.default.bool.isRequired,

  /**
   * A message body below the heading to further communicate the state of the component. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  messageBody: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Name of the illustration. Visit <a href='https://lightningdesignsystem.com/components/illustration/'>Lightning Design System Illustration</a> to reference illustration names. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  name: _propTypes.default.string,

  /**
   * Path to the illustration SVG image. _Tested with snapshot testing._
   */
  path: _propTypes.default.string,

  /**
   * Size of the illustration. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  size: _propTypes.default.oneOf(['small', 'large']),

  /**
   * Custom styles to be passed to the illustration SVG. _Tested with Mocha testing._
   */
  style: _propTypes.default.object
};
Illustration.defaultProps = {
  internalIllustration: true,
  size: 'small',
  style: {}
};
var _default = Illustration;
exports.default = _default;