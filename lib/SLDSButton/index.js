/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require('../utils/create-chained-function');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _SLDSIconsJs = require('../SLDSIcons.js');

var _lodashOmit = require('lodash.omit');

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var classNames = require('classnames');

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);
    this.displayName = 'SLDSButton';
    this.state = { active: false };
  }

  _createClass(Button, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      /*===============================
      TODO: refactor so that React doesn't throw warnings in console
      for (var key in this.props) {
        if(this.props.hasOwnProperty(key) && typeof(this.props[key]) === 'string' && key !== 'label'){
          this.props[key] = this.props[key].toLowerCase();
        }
      }
      ===============================*/
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      console.log('YES!!!');
      this.setState({ active: !this.state.active });
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      var _classNames;

      var isSelected = this.props.stateful && this.state.active ? true : false;
      var notSelected = this.props.stateful && !this.state.active ? true : false;
      return classNames(this.props.className, 'slds-button', (_classNames = {}, _defineProperty(_classNames, 'slds-button--' + this.props.variant, this.props.variant), _defineProperty(_classNames, 'slds-not-selected', notSelected), _defineProperty(_classNames, 'slds-is-selected', isSelected), _classNames));
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      if (this.props.iconName) {
        return _react2['default'].createElement(_SLDSIconsJs.ButtonIcon, {
          variant: this.props.variant,
          disabled: this.props.disabled,
          inverse: this.props.inverse,
          stateful: this.props.stateful,
          name: this.props.iconName,
          size: this.props.iconSize,
          position: this.props.iconPosition
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _lodashOmit2['default'])('className', this.props);
      var click = (0, _utilsCreateChainedFunction2['default'])(this.props.onClick, this.onClick.bind(this));
      var labelClasses = this.props.variant === 'icon' ? 'slds-assistive-text' : '';
      if (this.props.disabled) {
        props['disabled'] = 'disabled';
      };

      return _react2['default'].createElement(
        'button',
        _extends({ className: this.getClassName() }, props, { onClick: click }),
        this.props.iconPosition === 'right' ? _react2['default'].createElement(
          'span',
          { className: labelClasses },
          this.props.label
        ) : null,
        this.renderIcon(),
        this.props.iconPosition === 'left' || !this.props.iconPosition ? _react2['default'].createElement(
          'span',
          { className: labelClasses },
          this.props.label
        ) : null
      );
    }
  }]);

  return Button;
})(_react2['default'].Component);

Button.propTypes = {
  label: _react2['default'].PropTypes.string.isRequired,
  variant: _react2['default'].PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
  disabled: _react2['default'].PropTypes.bool,
  inverse: _react2['default'].PropTypes.bool,
  stateful: _react2['default'].PropTypes.bool,
  iconName: _react2['default'].PropTypes.string,
  iconSize: _react2['default'].PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  iconPosition: _react2['default'].PropTypes.oneOf(['left', 'right'])
};

module.exports = Button;