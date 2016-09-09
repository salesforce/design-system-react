'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

// ### Prop Types


// ## Constants
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Spinner Component --- SLDS for React

// Implements the [Spinner design pattern - 2.1.0-beta.3 (204)](https://latest-204.lightningdesignsystem.com/components/spinners) in React.

// ### React
// React is an external dependency of the project.

var PROP_TYPES = {
  /**
   * Custom css classes applied to Spinner container
   */
  containerClassName: PropTypes.string,
  /**
   * Determines the size of the spinner
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
  variant: PropTypes.oneOf(['base', 'brand', 'inverse'])
};

var DEFAULT_PROPS = {
  size: 'medium',
  variant: 'base'
};

// ## Spinner
var Spinner = function Spinner(props) {
  var containerClassName = props.containerClassName;
  var variant = props.variant;
  var size = props.size;


  var sizeClass = 'slds-spinner--' + props.size;
  var variants = {
    brand: 'slds-spinner--brand',
    inverse: 'slds-spinner--inverse'
  };

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(props.containerClassName, 'slds-spinner_container') },
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('slds-spinner', sizeClass, variants[props.variant]),
        'aria-hidden': 'false',
        role: 'alert'
      },
      _react2.default.createElement('div', { className: 'slds-spinner__dot-a' }),
      _react2.default.createElement('div', { className: 'slds-spinner__dot-b' })
    )
  );
};

Spinner.displayName = _constants.SPINNER;
Spinner.propTypes = PROP_TYPES;
Spinner.defaultProps = DEFAULT_PROPS;

module.exports = Spinner;