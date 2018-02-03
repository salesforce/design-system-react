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

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isnumber');

var _lodash4 = _interopRequireDefault(_lodash3);

var _tabsList = require('./private/tabs-list');

var _tabsList2 = _interopRequireDefault(_tabsList);

var _tab3 = require('./private/tab');

var _tab4 = _interopRequireDefault(_tab3);

var _tabPanel = require('./private/tab-panel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _constants = require('../../utilities/constants');

var _keyCode = require('../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React


// ### shortid
// `shortid` is a short, non-sequential, url-friendly, unique id generator. It is used here to provide unique strings for the HTML attribute `id` on the Tabs components. It is only used if the `id` prop is not provided on the man <Tabs /> component.


// ### classNames


// ### isFunction


// ### isNumber


// Child components


// ## Constants


// ### Event Helpers


// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
	if (node.getAttribute) {
		return node.getAttribute('aria-disabled') === 'true';
	}

	return !!node.props.disabled;
}

/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */
var displayName = _constants.TABS;
var propTypes = {
	/**
  * HTML `id` attribute of primary element that has `.slds-tabs--default` on it. Optional: If one is not supplied, a `shortid` will be created.
  */
	id: _propTypes2.default.string,

	/**
  * The `children` are the actual tabs and panels to be displayed.
  *
  * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
  *
  * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
  *
  * ```
  * <Tabs>
  * 	<TabsPanel label="Tab 1">
  * 		<div>
  * 			<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
  * 			<p>They show when you click the first tab.</p>
  * 		</div>
  * 	</TabsPanel>
  * 	<TabsPanel label="Tab 2">
  * 		<div>
  * 			<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
  * 			<p>They show when you click the second tab.</p>
  * 		</div>
  * 	</TabsPanel>
  * </Tabs>
  * ```
  */
	children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node, _propTypes2.default.element]).isRequired,

	/**
  * Class names to be added to the container element and is passed along to its children.
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

	/**
  * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
  */
	defaultSelectedIndex: _propTypes2.default.number,

	/**
  * This function triggers when a tab is selected.
  */
	onSelect: _propTypes2.default.func,

	/**
  * If the Tabs should be scopped, defaults to false
  */
	variant: _propTypes2.default.oneOf(['default', 'scoped']),

	/**
  * The Tab (and corresponding TabPanel) that is currently selected.
  */
	selectedIndex: _propTypes2.default.number
};
var defaultProps = {
	defaultSelectedIndex: 0,
	variant: 'default'
};

var Tabs = function (_React$Component) {
	_inherits(Tabs, _React$Component);

	function Tabs(props) {
		_classCallCheck(this, Tabs);

		var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

		_this.handleClick = function (e) {
			var node = e.target;
			/* eslint-disable no-cond-assign */
			do {
				if (_this.isTabFromContainer(node)) {
					if (isTabDisabled(node)) {
						return;
					}

					var index = [].slice.call(node.parentNode.children).indexOf(node);
					_this.setSelected(index);
					return;
				}
			} while ((node = node.parentNode) !== null);
			/* eslint-enable no-cond-assign */
		};

		_this.handleKeyDown = function (event) {
			if (_this.isTabFromContainer(event.target)) {
				var index = _this.getSelectedIndex();
				var preventDefault = false;

				if (event.keyCode === _keyCode2.default.LEFT || event.keyCode === _keyCode2.default.UP) {
					// Select next tab to the left
					index = _this.getPrevTab(index);
					preventDefault = true;
				} else if (event.keyCode === _keyCode2.default.RIGHT || event.keyCode === _keyCode2.default.DOWN) {
					// Select next tab to the right
					index = _this.getNextTab(index);
					preventDefault = true;
				}

				// Prevent any dumn scrollbars from moving around as we type.
				if (preventDefault) {
					_event2.default.trap(event);
				}

				_this.setSelected(index, true);
			}
		};

		_this.tabs = [];
		return _this;
	}

	_createClass(Tabs, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.
			this.generatedId = _shortid2.default.generate();
			this.flavor = this.getVariant();
			this.setState({
				selectedIndex: this.props.defaultSelectedIndex
			});
		}
	}, {
		key: 'getNextTab',
		value: function getNextTab(index) {
			var count = this.getTabsCount();

			// Look for non-disabled tab from index to the last tab on the right
			for (var i = index + 1; i < count; i++) {
				var tab = this.getTab(i);
				if (!isTabDisabled(tab)) {
					return i;
				}
			}

			// If no tab found, continue searching from first on left to index
			for (var _i = 0; _i < index; _i++) {
				var _tab = this.getTab(_i);
				if (!isTabDisabled(_tab)) {
					return _i;
				}
			}

			// No tabs are disabled, return index
			return index;
		}
	}, {
		key: 'getPanelsCount',
		value: function getPanelsCount() {
			return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
		}
	}, {
		key: 'getPrevTab',
		value: function getPrevTab(index) {
			var i = index;

			// Look for non-disabled tab from index to first tab on the left
			while (i--) {
				var tab = this.getTab(i);
				if (!isTabDisabled(tab)) {
					return i;
				}
			}

			// If no tab found, continue searching from last tab on right to index
			i = this.getTabsCount();
			while (i-- > index) {
				var _tab2 = this.getTab(i);
				if (!isTabDisabled(_tab2)) {
					return i;
				}
			}

			// No tabs are disabled, return index
			return index;
		}
	}, {
		key: 'getSelectedIndex',
		value: function getSelectedIndex() {
			return (0, _lodash4.default)(this.props.selectedIndex) ? this.props.selectedIndex : this.state.selectedIndex;
		}
	}, {
		key: 'getTab',
		value: function getTab(index) {
			return this.tabs[index].tab;
		}
	}, {
		key: 'getTabNode',
		value: function getTabNode(index) {
			return this.tabs[index].node;
		}
	}, {
		key: 'getTabsCount',
		value: function getTabsCount() {
			return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
		}
	}, {
		key: 'getVariant',
		value: function getVariant() {
			return this.props.variant === 'scoped' ? 'scoped' : 'default';
		}
	}, {
		key: 'setSelected',
		value: function setSelected(index, focus) {
			// Check index boundary
			if (index < 0 || index >= this.getTabsCount()) {
				return;
			}

			// Keep reference to last index for event handler
			var last = this.getSelectedIndex();

			/**
    * This is a temporary solution that could be broken in the future without notification,
    * since this component is not a controlled component and only relies on internal state.
    * If this breaks in the future an alternative way to control the state from outside the
    * component should be present.
    * */
			var shouldContinue = void 0;
			// Call change event handler
			if ((0, _lodash2.default)(this.props.onSelect)) {
				shouldContinue = this.props.onSelect(index, last);
			}

			// Don't update the state if nothing has changed
			if (shouldContinue !== false && index !== this.state.selectedIndex) {
				this.setState({ selectedIndex: index, focus: focus === true });
			}
		}
	}, {
		key: 'isTabFromContainer',


		/**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
		value: function isTabFromContainer(node) {
			// Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
			if (!isTabNode(node)) {
				return false;
			}

			// Check if the first occurrence of a Tabs container is `this` one.
			var nodeAncestor = node.parentElement;
			do {
				if (nodeAncestor === this.tabsNode) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;

				nodeAncestor = nodeAncestor.parentElement;
			} while (nodeAncestor);

			return false;
		}
	}, {
		key: 'renderTabPanels',
		value: function renderTabPanels(parentId) {
			var _this2 = this;

			var children = _react2.default.Children.toArray(this.props.children);
			var selectedIndex = this.getSelectedIndex();
			var result = null;

			result = children.map(function (child, index) {
				var tabId = parentId + '-slds-tabs--tab-' + index;
				var id = parentId + '-slds-tabs--panel-' + index;
				var selected = selectedIndex === index;
				var variant = _this2.getVariant();

				return _react2.default.createElement(
					_tabPanel2.default,
					{
						key: child.key,
						selected: selected,
						id: id,
						tabId: tabId,
						variant: variant
					},
					children[index]
				);
			});
			return result;
		}
	}, {
		key: 'renderTabsList',
		value: function renderTabsList(parentId) {
			var _this3 = this;

			var children = _react2.default.Children.toArray(this.props.children);

			return (
				// `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
				_react2.default.createElement(
					_tabsList2.default,
					{ id: parentId, variant: this.getVariant() },
					children.map(function (child, index) {
						var id = parentId + '-slds-tabs--tab-' + index;
						var panelId = parentId + '-slds-tabs--panel-' + index;
						var selected = _this3.getSelectedIndex() === index;
						var focus = selected && _this3.state.focus;
						var variant = _this3.getVariant();
						return _react2.default.createElement(
							_tab4.default,
							{
								key: child.key,
								ref: function ref(node) {
									_this3.tabs[index] = { tab: child, node: node };
								},
								focus: focus,
								selected: selected,
								id: id,
								panelId: panelId,
								disabled: child.props.disabled,
								variant: variant
							},
							child.props.label
						);
					})
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    className = _props.className,
			    _props$id = _props.id,
			    id = _props$id === undefined ? this.generatedId : _props$id,
			    _props$variant = _props.variant,
			    variant = _props$variant === undefined ? this.getVariant : _props$variant;


			if (this.state.focus) {
				setTimeout(function () {
					_this4.setState({ focus: false });
				}, 0);
			}

			return (
				/* eslint-disable jsx-a11y/no-static-element-interactions */
				_react2.default.createElement(
					'div',
					{
						id: id,
						className: (0, _classnames2.default)({
							'slds-tabs--default': variant === 'default',
							'slds-tabs--scoped': variant === 'scoped'
						}, className),
						onClick: this.handleClick,
						onKeyDown: this.handleKeyDown,
						'data-tabs': true,
						ref: function ref(node) {
							_this4.tabsNode = node;
						}
					},
					this.renderTabsList(id),
					this.renderTabPanels(id)
				)
			);
		}
	}]);

	return Tabs;
}(_react2.default.Component);

Tabs.displayName = displayName;
Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

exports.default = Tabs;