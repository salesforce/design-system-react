/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSUtilityIcon = require('../../SLDSUtilityIcon');

var _SLDSUtilityIcon2 = _interopRequireDefault(_SLDSUtilityIcon);

var classNames = require("classnames");

var displayName = "Icon";
var propTypes = {
  assistiveText: _react2['default'].PropTypes.string,
  category: _react2['default'].PropTypes.string,
  name: _react2['default'].PropTypes.string,
  position: _react2['default'].PropTypes.oneOf(["left", "right"]),
  size: _react2['default'].PropTypes.string,
  theme: _react2['default'].PropTypes.string
};
var defaultProps = {
  category: 'standard' };

// standard Icon Reference: https://www.lightningdesignsystem.com/resources/icons

var Icon = (function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon(props) {
    _classCallCheck(this, Icon);

    _get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _createClass(Icon, [{
    key: 'getContainerClassName',
    value: function getContainerClassName() {
      var _classNames;

      var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
      var renderName = this.props.category === "action";

      return classNames((_classNames = {}, _defineProperty(_classNames, "slds-icon__container", this.props.category !== "utility"), _defineProperty(_classNames, 'slds-icon-' + this.props.category + '-' + (this.props.theme || name), renderName), _classNames));
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      var _classNames2;

      var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
      var customName = this.props.name ? this.props.name.replace("custom", "custom-") : null;

      return classNames(this.props.className, "slds-icon", (_classNames2 = {}, _defineProperty(_classNames2, 'slds-icon--' + this.props.size, this.props.size), _defineProperty(_classNames2, 'slds-icon--' + this.props.position, this.props.position), _defineProperty(_classNames2, 'slds-icon-' + customName, this.props.category === "custom"), _defineProperty(_classNames2, 'slds-icon-' + this.props.category + '-' + (this.props.theme || name), this.props.category === "standard"), _classNames2));
    }
  }, {
    key: 'render',
    value: function render() {
      var label = null;
      var styles = this.props.category === "action" ? { padding: "0.5rem" } : null;

      if (this.props.assistiveText) {
        label = _react2['default'].createElement(
          'span',
          { className: 'slds-assistive-text' },
          this.props.assistiveText
        );
      }
      return _react2['default'].createElement(
        'span',
        { className: this.getContainerClassName(), style: styles },
        label,
        _react2['default'].createElement(_SLDSUtilityIcon2['default'], { className: this.getClassName(), name: this.props.name, category: this.props.category, 'aria-hidden': 'true' })
      );
    }
  }]);

  return Icon;
})(_react2['default'].Component);

Icon.displayName = displayName;
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

module.exports = Icon;