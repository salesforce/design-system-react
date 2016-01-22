"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.omit");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var classNames = require("classnames");

var displayName = 'SLDSTooltip.Trigger';
var propTypes = {
  tooltip: _react2.default.PropTypes.node
};
var defaultProps = {};

/**
 * The Trigger component 
**/

var Trigger = function (_React$Component) {
  _inherits(Trigger, _React$Component);

  function Trigger(props) {
    _classCallCheck(this, Trigger);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Trigger).call(this, props));

    _this.state = {
      isTooltipClosing: false,
      isTooltipOpen: false
    };
    return _this;
  }

  _createClass(Trigger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tooltip) {
        this.addListeners();
      }
      var openByDefault = this.props && this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.openByDefault ? this.props.tooltip.props.openByDefault : false;
      this.setState({
        isTooltipOpen: openByDefault,
        tooltipTarget: _reactDom2.default.findDOMNode(this)
      });
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      _reactDom2.default.findDOMNode(this).addEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this));
      _reactDom2.default.findDOMNode(this).addEventListener('focus', this.handleTooltipMouseEnter.bind(this));
      _reactDom2.default.findDOMNode(this).addEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this));
      _reactDom2.default.findDOMNode(this).addEventListener('blur', this.handleTooltipMouseLeave.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
      _reactDom2.default.findDOMNode(this).removeEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this));
      _reactDom2.default.findDOMNode(this).removeEventListener('focus', this.handleTooltipMouseEnter.bind(this));
      _reactDom2.default.findDOMNode(this).removeEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this));
      _reactDom2.default.findDOMNode(this).removeEventListener('blur', this.handleTooltipMouseLeave.bind(this));
    }
  }, {
    key: "handleTooltipMouseEnter",
    value: function handleTooltipMouseEnter() {
      this.setState({
        isTooltipOpen: true,
        isTooltipClosing: false
      });
    }
  }, {
    key: "handleTooltipMouseLeave",
    value: function handleTooltipMouseLeave() {
      var _this2 = this;

      if (this.isUnmounting) return;
      this.setState({ isTooltipClosing: true });
      var delay = this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.hoverCloseDelay ? this.props.tooltip.props.hoverCloseDelay : 0;
      setTimeout(function () {
        if (_this2.state.isTooltipClosing) {
          _this2.setState({
            isTooltipOpen: false,
            isTooltipClosing: false
          });
        }
      }, delay);
    }
  }, {
    key: "getTooltip",
    value: function getTooltip() {
      if (this.props.tooltip && this.state.isTooltipOpen && this.state.tooltipTarget) {
        return _react2.default.cloneElement(this.props.tooltip, {
          target: this.state.tooltipTarget,
          openByDefault: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("span", null);
    }
  }]);

  return Trigger;
}(_react2.default.Component);

Trigger.displayName = displayName;
Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

module.exports = Trigger;