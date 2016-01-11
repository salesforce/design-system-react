/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tooltip = require("./tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _lodashFlatten = require("lodash.flatten");

var _lodashFlatten2 = _interopRequireDefault(_lodashFlatten);

var displayName = "SLDSTooltip";
var propTypes = {
  /**
   * Alignment of the Tooltip relative to the element that triggers it.
   */
  align: _react2["default"].PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
  /**
   * Pass the element that triggers Tooltip as a child of the Tooltip component. It must be either an anchor or button so keyboard users can tab to it.
   */
  children: _react2["default"].PropTypes.node.isRequired,
  /**
   * Content inside Tooltip.
   */
  content: _react2["default"].PropTypes.node.isRequired,
  /**
   * Delay on Tooltip closing.
   */
  hoverCloseDelay: _react2["default"].PropTypes.number,
  openByDefault: _react2["default"].PropTypes.bool
};
var defaultProps = {
  align: "top",
  content: _react2["default"].createElement(
    "span",
    null,
    "Tooltip"
  ),
  hoverCloseDelay: 350
};

/**
 * The Tooltip component is variant of the Popover component. <br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/popovers#tooltips">SLDS Popovers > Tooltips</a>.
 */

var SLDSTooltip = (function (_React$Component) {
  _inherits(SLDSTooltip, _React$Component);

  function SLDSTooltip(props) {
    _classCallCheck(this, SLDSTooltip);

    _get(Object.getPrototypeOf(SLDSTooltip.prototype), "constructor", this).call(this, props);
    this.state = {
      isClosing: false,
      isOpen: this.props.openByDefault,
      triggerId: null
    };
  }

  _createClass(SLDSTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var id = _reactDom2["default"].findDOMNode(this.refs.tooltipTarget).getAttribute("data-reactid");
      this.setState({
        isMounted: true,
        triggerId: id
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        isMounted: false,
        triggerId: null
      });
    }
  }, {
    key: "handleMouseClick",
    value: function handleMouseClick() {
      this.setState({
        isOpen: !this.state.isOpen,
        isClosing: !this.state.isOpen
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.setState({
        isOpen: true,
        isClosing: false
      });
    }
  }, {
    key: "handleMouseLeave",
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
    key: "getTooltipContent",
    value: function getTooltipContent() {
      return _react2["default"].createElement(
        "div",
        { id: this.state.triggerId, className: "slds-popover__body" },
        this.props.content
      );
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        isOpen: false,
        isClosing: false
      });
    }
  }, {
    key: "getTooltip",
    value: function getTooltip() {
      return this.state.isOpen ? _tooltip2["default"].getTooltip(this.props, this.getTooltipContent(), this.refs.tooltipTarget, this.handleCancel.bind(this)) : _react2["default"].createElement("span", null);
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this2 = this;

      var asstText = _react2["default"].createElement(
        "span",
        { className: "slds-assistive-text" },
        this.props.content
      );
      return _react2["default"].Children.map(this.props.children, function (child) {
        return _react2["default"].cloneElement(child, {
          children: child.props.children ? (0, _lodashFlatten2["default"])([child.props.children]).concat(asstText) : asstText,
          onBlur: _this2.handleMouseLeave.bind(_this2),
          onFocus: _this2.handleMouseEnter.bind(_this2),
          onMouseEnter: _this2.handleMouseEnter.bind(_this2),
          onMouseLeave: _this2.handleMouseLeave.bind(_this2)
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var containerStyles = { display: "inline" };
      return _react2["default"].createElement(
        "div",
        { "aria-describedby": this.state.triggerId, style: containerStyles, ref: "tooltipTarget", role: "tooltip" },
        this.getContent(),
        this.getTooltip()
      );
    }
  }]);

  return SLDSTooltip;
})(_react2["default"].Component);

SLDSTooltip.displayName = displayName;
SLDSTooltip.propTypes = propTypes;
SLDSTooltip.defaultProps = defaultProps;

module.exports = SLDSTooltip;