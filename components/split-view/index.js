'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isboolean');

var _lodash2 = _interopRequireDefault(_lodash);

var _toggleButton = require('./private/toggle-button');

var _toggleButton2 = _interopRequireDefault(_toggleButton);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var propTypes = {
	/**
  * **Assistive text for accessibility**
  * * `toggleButtonOpen`: The button used to open the split view.
  * * `toggleButtonClose`: The button used to close the split view.
  */
	assistiveText: _propTypes2.default.shape({
		toggleButtonOpen: _propTypes2.default.string,
		toggleButtonClose: _propTypes2.default.string
	}),
	/**
  * HTML Id for the component.
  */
	id: _propTypes2.default.string,
	/**
  * CSS classes to be added to the root `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Sets the split view to be open or closed.
  */
	isOpen: _propTypes2.default.bool,
	/**
  * Event Callbacks
  * * `onClose`: Triggered when the split view has closed.
  * * `onOpen`: Triggered when the split view has opened.
  */
	events: _propTypes2.default.shape({
		onClose: _propTypes2.default.func,
		onOpen: _propTypes2.default.func
	}),
	/**
  * The React component that is rendered in the master section.
  * You need to pass in an array of elements in order for the scrolling to in the SplitViewList to work correctly.
  * React requires that you also supply a unique `key` for each element [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).
  */
	master: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element]).isRequired,
	/**
  * The width of the master section.
  */
	masterWidth: _propTypes2.default.string,
	/**
  * The React component that is rendered in the detail section.
  */
	detail: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element]).isRequired
};

var defaultProps = {
	assistiveText: {
		toggleButtonOpen: 'Close split view',
		toggleButtonClose: 'Open split view'
	},
	events: {},
	masterWidth: '20rem'
};

/**
 * Split view is used to navigate between records in a list while staying on the same screen.
 */

var SplitView = function (_React$Component) {
	_inherits(SplitView, _React$Component);

	function SplitView(props) {
		_classCallCheck(this, SplitView);

		var _this = _possibleConstructorReturn(this, (SplitView.__proto__ || Object.getPrototypeOf(SplitView)).call(this, props));

		_this.state = {
			isOpen: true
		};
		return _this;
	}

	_createClass(SplitView, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();

			this.setIsOpen(this.props.isOpen);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.isOpen !== this.props.isOpen) {
				this.setIsOpen(nextProps.isOpen);
			}
		}
	}, {
		key: 'getId',
		value: function getId() {
			return this.props.id || this.generatedId;
		}
	}, {
		key: 'getMasterViewId',
		value: function getMasterViewId() {
			return 'master_view_' + this.getId();
		}
	}, {
		key: 'setIsOpen',
		value: function setIsOpen(isOpen) {
			if ((0, _lodash2.default)(isOpen)) {
				this.setState({
					isOpen: isOpen
				});
			}
		}
	}, {
		key: 'toggle',
		value: function toggle(event) {
			this.setIsOpen(!this.state.isOpen);

			if (this.state.isOpen && this.props.events.onClose) {
				this.props.events.onClose(event);
			} else if (!this.state.isOpen && this.props.events.onOpen) {
				this.props.events.onOpen(event);
			}
		}
	}, {
		key: 'masterContent',
		value: function masterContent() {
			return this.state.isOpen ? _react2.default.createElement(
				'article',
				{
					id: this.getMasterViewId(),
					className: 'slds-split-view slds-grid slds-grid_vertical slds-grow slds-scrollable_none'
				},
				this.props.master
			) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{
					id: this.getId(),
					className: (0, _classnames2.default)('slds-grid', this.props.className),
					style: {
						height: '100%'
					}
				},
				_react2.default.createElement(
					'div',
					{
						style: {
							maxWidth: this.state.isOpen ? this.props.masterWidth : '0'
						},
						className: (0, _classnames2.default)('slds-split-view_container', { 'slds-is-open': this.state.isOpen }, { 'slds-is-closed': !this.state.isOpen })
					},
					_react2.default.createElement(_toggleButton2.default, {
						assistiveText: this.props.assistiveText,
						ariaControls: this.getMasterViewId(),
						isOpen: this.state.isOpen,
						events: {
							onClick: function onClick(event) {
								return _this2.toggle(event);
							}
						}
					}),
					this.masterContent()
				),
				_react2.default.createElement(
					'div',
					{
						style: {
							marginLeft: _toggleButton.TOGGLE_BUTTON_WIDTH
						},
						className: 'slds-grow slds-scrollable_y'
					},
					this.props.detail
				)
			);
		}
	}]);

	return SplitView;
}(_react2.default.Component);

SplitView.displayName = _constants.SPLIT_VIEW;
SplitView.propTypes = propTypes;
SplitView.defaultProps = defaultProps;
exports.default = SplitView;