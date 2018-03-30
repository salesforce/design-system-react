'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.compact');

var _lodash4 = _interopRequireDefault(_lodash3);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../utilities/constants');

var _dialog = require('../utilities/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _dialogHelpers = require('../../utilities/dialog-helpers');

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Popover - tooltip variant

// Implements the [Popover design pattern](https://core-204.lightningdesignsystem.com/components/popovers#flavor-tooltips) in React.
// Based on SLDS v2.1.0-rc3

// ### Util helpers


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### Display Name
// Always use the canonical component name as the React display name.
var displayName = _constants.POPOVER_TOOLTIP;

var propTypes = {
	/**
  * Alignment of the Tooltip relative to the element that triggers it.
  */
	align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']).isRequired,
	/**
  * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
  */
	children: _propTypes2.default.node,
	/**
  * Content inside Tooltip.
  */
	content: _propTypes2.default.node.isRequired,
	/**
  * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. This is the opposite of "flippable."
  */
	hasStaticAlignment: _propTypes2.default.bool,
	/**
  * Delay on Tooltip closing.
  */
	hoverCloseDelay: _propTypes2.default.number,
	/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
  */
	id: _propTypes2.default.string,
	/**
  * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
  */
	isOpen: _propTypes2.default.bool,
	/**
  * CSS classes to be added to tag with `slds-tooltip-trigger`.
  */
	triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Please select one of the following:
  * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
  * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
  * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
  */
	position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),
	/**
  * Custom styles to be added to wrapping triggering `div`.
  */
	triggerStyle: _propTypes2.default.object,
	/**
  * Determines the variant of tooltip: for informative purpose (blue background) or warning purpose (red background)
  */
	variant: _propTypes2.default.oneOf(['info', 'error'])
};

var defaultProps = {
	align: 'top',
	content: _react2.default.createElement(
		'span',
		null,
		'Tooltip'
	),
	hoverCloseDelay: 50,
	position: 'absolute',
	variant: 'info'
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */

var PopoverTooltip = function (_React$Component) {
	_inherits(PopoverTooltip, _React$Component);

	function PopoverTooltip(props) {
		_classCallCheck(this, PopoverTooltip);

		var _this = _possibleConstructorReturn(this, (PopoverTooltip.__proto__ || Object.getPrototypeOf(PopoverTooltip)).call(this, props));

		_this.handleCancel = function () {
			_this.setState({
				isOpen: false,
				isClosing: false
			});
		};

		_this.handleMouseEnter = function () {
			_this.setState({
				isOpen: true,
				isClosing: false
			});
		};

		_this.handleMouseLeave = function () {
			_this.setState({ isClosing: true });

			setTimeout(function () {
				if (!_this.isUnmounting && _this.state.isClosing) {
					_this.setState({
						isOpen: false,
						isClosing: false
					});
				}
			}, _this.props.hoverCloseDelay);
		};

		_this.saveTriggerRef = function (component) {
			_this.trigger = component;
			// yes, this is a re-render triggered by a render.
			// Dialog/Popper.js cannot place the popover until
			// the trigger/target DOM node is mounted. This
			// way `findDOMNode` is not called and parent
			// DOM nodes are not queried.
			if (!_this.state.triggerRendered) {
				_this.setState({ triggerRendered: true });
			}
		};

		_this.state = {
			isClosing: false,
			isOpen: false
		};
		return _this;
	}

	_createClass(PopoverTooltip, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.POPOVER_TOOLTIP, this.props);

			this.generatedId = _shortid2.default.generate();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.isUnmounting = true;
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			var _this2 = this;

			return _react2.default.Children.map(this.props.children, function (child, i) {
				return _react2.default.cloneElement(child, {
					key: i,
					'aria-describedby': _this2.getId(),
					onBlur: _this2.handleMouseLeave,
					onFocus: _this2.handleMouseEnter,
					onMouseEnter: _this2.handleMouseEnter,
					onMouseLeave: _this2.handleMouseLeave
				}, _this2.grandKidsWithAsstText(child));
			});
		}
	}, {
		key: 'getId',
		value: function getId() {
			return this.props.id || this.generatedId;
		}
	}, {
		key: 'getTooltip',
		value: function getTooltip() {
			var _this3 = this;

			var isOpen = this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;
			var align = this.props.align;

			return isOpen ? _react2.default.createElement(
				_dialog2.default,
				{
					align: align,
					context: this.context,
					closeOnTabKey: true,
					hasStaticAlignment: this.props.hasStaticAlignment,
					onClose: this.handleCancel,
					onRequestTargetElement: function onRequestTargetElement() {
						return _this3.getTooltipTarget();
					},
					position: this.props.position,
					style: {
						marginBottom: _dialogHelpers.getMargin.bottom(align),
						marginLeft: _dialogHelpers.getMargin.left(align),
						marginRight: _dialogHelpers.getMargin.right(align),
						marginTop: _dialogHelpers.getMargin.top(align)
					},
					variant: 'tooltip'
				},
				_react2.default.createElement(
					'div',
					{
						id: this.getId(),
						className: (0, _classnames2.default)('slds-popover', 'slds-popover--tooltip', { 'slds-theme_error': this.props.variant === 'error' }, (0, _dialogHelpers.getNubbinClassName)(align)),
						role: 'tooltip'
					},
					this.getTooltipContent()
				)
			) : _react2.default.createElement('span', null);
		}
	}, {
		key: 'getTooltipContent',
		value: function getTooltipContent() {
			return _react2.default.createElement(
				'div',
				{ className: 'slds-popover__body' },
				this.props.content
			);
		}
	}, {
		key: 'getTooltipTarget',
		value: function getTooltipTarget() {
			return this.props.target ? this.props.target : this.trigger;
		}

		// eslint-disable-next-line class-methods-use-this

	}, {
		key: 'decorateGrandKidsWithKeyToSilenceWarning',
		value: function decorateGrandKidsWithKeyToSilenceWarning(grandKids) {
			return _react2.default.Children.map(grandKids, function (component, i) {
				var decoratedComponent = _react2.default.isValidElement(component) ? _react2.default.cloneElement(component, { key: i }) : component;
				return decoratedComponent;
			});
		}
	}, {
		key: 'grandKidsWithAsstText',
		value: function grandKidsWithAsstText(child) {
			var _child$props = child.props,
			    props = _child$props === undefined ? {} : _child$props;

			var grandKids = (0, _lodash4.default)((0, _lodash2.default)([this.renderAssistantText()].concat(props.children)));
			return this.decorateGrandKidsWithKeyToSilenceWarning(grandKids);
		}
	}, {
		key: 'renderAssistantText',
		value: function renderAssistantText() {
			return _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				this.props.content
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var containerStyles = _extends({ display: 'inline' }, this.props.triggerStyle);

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-tooltip-trigger', this.props.triggerClassName),
					style: containerStyles,
					ref: this.saveTriggerRef
				},
				this.getContent(),
				this.getTooltip()
			);
		}
	}]);

	return PopoverTooltip;
}(_react2.default.Component);

PopoverTooltip.contextTypes = {
	iconPath: _propTypes2.default.string
};

PopoverTooltip.displayName = displayName;
PopoverTooltip.propTypes = propTypes;
PopoverTooltip.defaultProps = defaultProps;

exports.default = PopoverTooltip;