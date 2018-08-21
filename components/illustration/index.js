"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _classNames = require("../../utilities/class-names");

var _classNames2 = _interopRequireDefault(_classNames);

var _svg = require("../utilities/utility-icon/svg");

var _svg2 = _interopRequireDefault(_svg);

var _constants = require("../../utilities/constants");

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
  (0, _checkProps2.default)('Illustration', {
    illustration: illustration,
    internalIllustration: internalIllustration,
    heading: heading,
    path: path
  });
  var kababCaseName = name ? name.replace(/_| /g, '-').toLowerCase() : '';
  var illustrationSvg;

  if (illustration) {
    // Use SVG data passed in with `illustration` prop
    illustrationSvg = _react2.default.createElement(_svg2.default, {
      className: "slds-illustration__svg",
      "aria-hidden": "true",
      data: illustration,
      name: kababCaseName,
      style: style
    });
  } else if (path) {
    illustrationSvg = _react2.default.createElement("svg", {
      className: "slds-illustration__svg",
      "aria-hidden": "true",
      name: kababCaseName,
      style: style
    }, _react2.default.createElement("use", {
      xlinkHref: path
    }));
  } // large illustration svg should have a default height of 400px if not already specified


  if (illustrationSvg && size === 'large' && !style.height) {
    style.height = '400px';
  }

  return _react2.default.createElement("div", {
    className: (0, _classNames2.default)(className, 'slds-illustration', {
      'slds-illustration_small': size === 'small',
      'slds-illustration_large': size === 'large'
    })
  }, illustrationSvg, _react2.default.createElement("div", {
    className: "slds-text-longform"
  }, heading ? _react2.default.createElement("h3", {
    className: "slds-text-heading_medium"
  }, heading) : null, messageBody ? _react2.default.createElement("p", {
    className: "slds-text-body_regular"
  }, messageBody) : null));
}; // ### Display Name
// Always use the canonical component name as the React display name.


Illustration.displayName = _constants.ILLUSTRATION; // ### Prop Types

Illustration.propTypes = {
  /**
   * CSS classes that are applied to the SVG. _Tested with Mocha testing._
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * A heading text. It is required if illustration is present. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  heading: _propTypes2.default.string,

  /**
   * A custom SVG object to use instead of the supplied SLDS illustrations, look in `design-system-react/assets/images/illustrations` for examples and syntax. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  illustration: _propTypes2.default.object,

  /**
   * Indicates whether the illustration SVGs are from the design-system-react repo. If yes, set to true.
   */
  internalIllustration: _propTypes2.default.bool.isRequired,

  /**
   * A message body below the heading to further communicate the state of the component. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  messageBody: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),

  /**
   * Name of the illustration. Visit <a href='https://lightningdesignsystem.com/components/illustration/'>Lightning Design System Illustration</a> to reference illustration names. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  name: _propTypes2.default.string,

  /**
   * Path to the illustration SVG image. _Tested with snapshot testing._
   */
  path: _propTypes2.default.string,

  /**
   * Size of the illustration. _Tested with snapshot testing._ _Tested with Mocha testing._
   */
  size: _propTypes2.default.oneOf(['small', 'large']),

  /**
   * Custom styles to be passed to the illustration SVG. _Tested with Mocha testing._
   */
  style: _propTypes2.default.object
};
Illustration.defaultProps = {
  internalIllustration: true,
  size: 'small',
  style: {}
};
exports.default = Illustration;