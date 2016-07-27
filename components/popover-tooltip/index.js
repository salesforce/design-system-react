"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _constants = require("../../utilities/constants");

var _tooltip = require("./tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _lodash = require("lodash.flatten");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.compact");

var _lodash4 = _interopRequireDefault(_lodash3);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

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

// # Popover - tooltip variant

// Implements the [Popover design pattern](https://core-204.lightningdesignsystem.com/components/popovers#flavor-tooltips) in React.
// Based on SLDS v2.1.0-rc3

// ### Children


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### Util helpers


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### Display Name
// Always use the canonical component name as the React display name.
var displayName = _constants.POPOVER_TOOLTIP;

var propTypes = {
	/**
  * Alignment of the Tooltip relative to the element that triggers it.
  */
	align: _react.PropTypes.oneOf(["top", "top left", "top right", "right", "right top", "right bottom", "bottom", "bottom left", "bottom right", "left", "left top", "left bottom"]).isRequired,
	/**
  * Pass the element that triggers Tooltip as a child of the Tooltip component. It must be either an anchor or button so keyboard users can tab to it.
  */
	children: _react.PropTypes.node,
	/**
  * Content inside Tooltip.
  */
	content: _react.PropTypes.node.isRequired,
	/**
  * Delay on Tooltip closing.
  */
	hoverCloseDelay: _react.PropTypes.number,
	/**
 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
 */
	id: _react.PropTypes.string,
	openByDefault: _react.PropTypes.bool
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
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or anchor) so that keyboard users can navigate to it.
 */

var PopoverTooltip = function (_React$Component) {
	_inherits(PopoverTooltip, _React$Component);

	function PopoverTooltip(props) {
		_classCallCheck(this, PopoverTooltip);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PopoverTooltip).call(this, props));

		_this.state = {
			isClosing: false,
			isOpen: false
		};
		return _this;
	}

	_createClass(PopoverTooltip, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.POPOVER_TOOLTIP, this.props);

			this.generatedId = _shortid2.default.generate();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setState({
				el: _reactDom2.default.findDOMNode(this)
			});
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
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.isUnmounting = true;
		}
	}, {
		key: "getId",
		value: function getId() {
			return this.props.id || this.generatedId;
		}
	}, {
		key: "getTooltipTarget",
		value: function getTooltipTarget() {
			return this.props.target ? this.props.target : this.state.el;
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
				{ className: "slds-popover__body" },
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
			var isOpen = this.props.openByDefault !== undefined ? this.state.isOpen : this.props.openByDefault;
			var id = this.getId();
			return isOpen ? _tooltip2.default.getTooltip(id, this.props, this.getTooltipContent(), this.getTooltipTarget(), this.handleCancel.bind(this)) : _react2.default.createElement("span", null);
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
					'aria-describedby': _this3.getId(),
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
					style: containerStyles,
					ref: "tooltipTarget"
				},
				this.getContent(),
				this.getTooltip()
			);
		}
	}]);

	return PopoverTooltip;
}(_react2.default.Component);

PopoverTooltip.displayName = displayName;
PopoverTooltip.propTypes = propTypes;
PopoverTooltip.defaultProps = defaultProps;

module.exports = PopoverTooltip;