"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tooltip = require("./tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _lodash = require("lodash.flatten");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.compact");

var _lodash4 = _interopRequireDefault(_lodash3);

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

var displayName = "SLDSPopoverTooltip";
var propTypes = {
  /**
   * Alignment of the Tooltip relative to the element that triggers it.
   */
  align: _react2.default.PropTypes.oneOf(["top", "top left", "top right", "right", "right top", "right bottom", "bottom", "bottom left", "bottom right", "left", "left top", "left bottom"]).isRequired,
  /**
   * Pass the element that triggers Tooltip as a child of the Tooltip component. It must be either an anchor or button so keyboard users can tab to it.
   */
  children: _react2.default.PropTypes.node,
  /**
   * Content inside Tooltip.
   */
  content: _react2.default.PropTypes.node.isRequired,
  /**
   * Delay on Tooltip closing.
   */
  hoverCloseDelay: _react2.default.PropTypes.number,
  openByDefault: _react2.default.PropTypes.bool
};
var defaultProps = {
  align: "top",
  content: _react2.default.createElement(
    "span",
    null,
    "Tooltip"
  ),
  hoverCloseDelay: 50,
  openByDefault: false
};

/**
 * The SLDSPopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or anchor) so that keyboard users can navigate to it.
 */

var SLDSPopoverTooltip = function (_React$Component) {
  _inherits(SLDSPopoverTooltip, _React$Component);

  function SLDSPopoverTooltip(props) {
    _classCallCheck(this, SLDSPopoverTooltip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSPopoverTooltip).call(this, props));

    _this.state = {
      isClosing: false,
      isOpen: _this.props.openByDefault
    };
    return _this;
  }

  _createClass(SLDSPopoverTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        el: _reactDom2.default.findDOMNode(this),
        isOpen: this.props.openByDefault
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.target && this.props.target !== prevProps.target) {
        this.setState({
          tooltipTarget: this.getTooltipTarget()
        });
      }
    }
  }, {
    key: "getTooltipTarget",
    value: function getTooltipTarget() {
      return this.props.target ? this.props.target : this.state.el;
    }
  }, {
    key: "getTriggerId",
    value: function getTriggerId() {
      var trigger = this.getTooltipTarget();
      if (trigger) {
        return trigger.getAttribute("data-reactid");
      }
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
      var _this2 = this;

      this.setState({ isClosing: true });

      setTimeout(function () {
        if (!_this2.isUnmounting && _this2.state.isClosing) {
          _this2.setState({
            isOpen: false,
            isClosing: false
          });
        }
      }, this.props.hoverCloseDelay);
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      return _react2.default.createElement(
        "div",
        { id: this.getTriggerId(), className: "slds-popover__body" },
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
      return this.state.isOpen ? _tooltip2.default.getTooltip(this.props, this.getTooltipContent(), this.getTooltipTarget(), this.handleCancel.bind(this)) : _react2.default.createElement("span", null);
    }
  }, {
    key: "renderAssistantText",
    value: function renderAssistantText() {
      return _react2.default.createElement(
        "span",
        { className: "slds-assistive-text" },
        this.props.content
      );
    }
  }, {
    key: "decorateGrandKidsWithKeyToSilenceWarning",
    value: function decorateGrandKidsWithKeyToSilenceWarning(grandKids) {
      return _react2.default.Children.map(grandKids, function (c, i) {
        return _react2.default.isValidElement(c) ? _react2.default.cloneElement(c, { key: i }) : c;
      });
    }
  }, {
    key: "grandKidsWithAsstText",
    value: function grandKidsWithAsstText(child) {
      var _child$props = child.props;
      var props = _child$props === undefined ? {} : _child$props;

      var grandKids = (0, _lodash4.default)((0, _lodash2.default)([this.renderAssistantText()].concat(props.children)));
      return this.decorateGrandKidsWithKeyToSilenceWarning(grandKids);
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this3 = this;

      return _react2.default.Children.map(this.props.children, function (child, i) {
        return _react2.default.cloneElement(child, {
          key: i,
          onBlur: _this3.handleMouseLeave.bind(_this3),
          onFocus: _this3.handleMouseEnter.bind(_this3),
          onMouseEnter: _this3.handleMouseEnter.bind(_this3),
          onMouseLeave: _this3.handleMouseLeave.bind(_this3)
        }, _this3.grandKidsWithAsstText(child));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var containerStyles = { display: "inline" };
      return _react2.default.createElement(
        "div",
        {
          "aria-describedby": this.getTriggerId(),
          style: containerStyles,
          ref: "tooltipTarget",
          role: "tooltip" },
        this.getContent(),
        this.getTooltip()
      );
    }
  }]);

  return SLDSPopoverTooltip;
}(_react2.default.Component);

SLDSPopoverTooltip.displayName = displayName;
SLDSPopoverTooltip.propTypes = propTypes;
SLDSPopoverTooltip.defaultProps = defaultProps;

module.exports = SLDSPopoverTooltip;