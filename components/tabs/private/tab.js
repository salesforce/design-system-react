'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */

// # TabItem Component

// ## Dependencies

// ### React


// ### classNames


// ## Constants


/*
 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
 */
// import '!style-loader!css-loader!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved

var Tab = (0, _createReactClass2.default)({
	displayName: _constants.TAB,

	propTypes: {
		/**
   * CSS classes to be added to the tab.
   */
		className: _propTypes2.default.string,

		/**
   * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
   */
		id: _propTypes2.default.string,

		/**
   * Whether to apply focus to this tab.
   */
		focus: _propTypes2.default.bool,

		/**
   * When `true`, the class `.slds-active` is applied.
   */
		selected: _propTypes2.default.bool,

		/**
   * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
   */
		disabled: _propTypes2.default.bool,

		/**
   * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
   */
		activeTabClassName: _propTypes2.default.string,

		/**
   * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
   */
		disabledTabClassName: _propTypes2.default.string,

		/**
   * The HTML ID of `<TabPanel />` this tab controls.
   */
		panelId: _propTypes2.default.string,

		/**
   * The string or element that is shown as both the title and the label for this tab.
   */
		children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),

		/**
   * If the Tabs should be scopped, defaults to false
   */
		variant: _propTypes2.default.oneOf(['default', 'scoped'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			focus: false,
			selected: false,
			activeTabClassName: 'slds-active',
			disabledTabClassName: 'slds-disabled',
			variant: 'default'
		};
	},
	componentDidMount: function componentDidMount() {
		this.checkFocus();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.checkFocus();
	},
	checkFocus: function checkFocus() {
		if (this.props.selected && this.props.focus && this.node) {
			this.node.focus();
		}
	},
	render: function render() {
		var _classNames,
		    _this = this,
		    _classNames2;

		var _props = this.props,
		    selected = _props.selected,
		    disabled = _props.disabled,
		    panelId = _props.panelId,
		    activeTabClassName = _props.activeTabClassName,
		    disabledTabClassName = _props.disabledTabClassName,
		    className = _props.className,
		    children = _props.children,
		    id = _props.id,
		    variant = _props.variant;

		var tabIndex = void 0;

		if (selected) {
			tabIndex = '0';
		} else if (disabled) {
			tabIndex = '-1';
		} else {
			tabIndex = null;
		}

		return _react2.default.createElement(
			'li',
			{
				className: (0, _classnames2.default)('slds-text-title--caps', className, (_classNames = {}, _defineProperty(_classNames, activeTabClassName, selected), _defineProperty(_classNames, disabledTabClassName, disabled), _defineProperty(_classNames, 'slds-tabs--default__item', variant === 'default'), _defineProperty(_classNames, 'slds-tabs--scoped__item', variant === 'scoped'), _classNames)),
				role: 'tab',
				ref: function ref(node) {
					_this.node = node;
				},
				'aria-selected': selected ? 'true' : 'false',
				'aria-disabled': disabled,
				'aria-controls': panelId,
				tabIndex: tabIndex,
				id: id,
				title: typeof children === 'string' ? children : null
			},
			_react2.default.createElement(
				'a',
				{
					className: (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, activeTabClassName, selected), _defineProperty(_classNames2, disabledTabClassName, disabled), _defineProperty(_classNames2, 'slds-tabs--default__link', variant === 'default'), _defineProperty(_classNames2, 'slds-tabs--scoped__link', variant === 'scoped'), _classNames2)),
					href: 'javascript:void(0);' // eslint-disable-line no-script-url
					, role: 'presentation',
					tabIndex: '-1',
					'aria-disabled': disabled
				},
				children
			)
		);
	}
});

exports.default = Tab;