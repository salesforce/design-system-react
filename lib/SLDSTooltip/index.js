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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var classNames = require("classnames");

var displayName = "SLDSTooltip";
var propTypes = {
  align: _react2['default'].PropTypes.string,
  children: _react2['default'].PropTypes.node,
  content: _react2['default'].PropTypes.node,
  hoverCloseDelay: _react2['default'].PropTypes.number,
  openByDefault: _react2['default'].PropTypes.bool,
  openOn: _react2['default'].PropTypes.string
};
var defaultProps = {
  align: 'top',
  content: _react2['default'].createElement(
    'span',
    null,
    'Tooltip'
  ),
  hoverCloseDelay: 350,
  openByDefault: false,
  openOn: 'hover'
};

var SLDSTooltip = (function (_React$Component) {
  _inherits(SLDSTooltip, _React$Component);

  function SLDSTooltip(props) {
    _classCallCheck(this, SLDSTooltip);

    _get(Object.getPrototypeOf(SLDSTooltip.prototype), 'constructor', this).call(this, props);
    this.state = {
      isClosing: false,
      isOpen: this.props.openByDefault
    };
  }

  _createClass(SLDSTooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isMounted: true });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ isMounted: false });
    }
  }, {
    key: 'handleMouseClick',
    value: function handleMouseClick() {
      this.setState({
        isOpen: !this.state.isOpen,
        isClosing: !this.state.isOpen
      });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({
        isOpen: true,
        isClosing: false
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      var _this = this;

      this.setState({ isClosing: true });

      setTimeout(function () {
        if (_this.state.isMounted && _this.state.isClosing) {
          _this.setState({
            isOpen: false,
            isClosing: false
          });
        }
      }, this.props.hoverCloseDelay);
    }
  }, {
    key: 'getTooltipContent',
    value: function getTooltipContent() {
      return _react2['default'].createElement(
        'div',
        { className: 'slds-popover__body' },
        this.props.content
      );
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.setState({
        isOpen: false,
        isClosing: false
      });
    }
  }, {
    key: 'getTooltip',
    value: function getTooltip() {
      return this.state.isOpen ? _tooltip2['default'].getTooltip(this.props, this.getTooltipContent(), this.refs.tooltipTarget, this.handleCancel.bind(this)) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var btnStyles = { color: "inherit", textDecoration: "none" };
      return _react2['default'].createElement(
        'a',
        { href: 'javascript:void(0)', ref: 'tooltipTarget', onClick: this.props.openOn === 'click' ? this.handleMouseClick.bind(this) : null, onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this) : null, onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this) : null, onFocus: this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this) : null, onBlur: this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this) : null, style: btnStyles },
        this.props.children,
        this.getTooltip()
      );
    }
  }]);

  return SLDSTooltip;
})(_react2['default'].Component);

SLDSTooltip.displayName = displayName;
SLDSTooltip.propTypes = propTypes;
SLDSTooltip.defaultProps = defaultProps;

module.exports = SLDSTooltip;