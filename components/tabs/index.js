define(['module', 'react', 'react-dom', 'shortid', 'classnames', 'lodash.isfunction', 'lodash.isnumber', './tabs-list', './tab', './tab-panel', '../../utilities/constants', '../../utilities'], function (module, _react, _reactDom, _shortid, _classnames, _lodash, _lodash3, _tabsList, _tab3, _tabPanel, _constants, _utilities) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _tabsList2 = _interopRequireDefault(_tabsList);

	var _tab4 = _interopRequireDefault(_tab3);

	var _tabPanel2 = _interopRequireDefault(_tabPanel);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	// Determine if a node from event.target is a Tab element
	function isTabNode(node) {
		return node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
	}

	// Determine if a tab node is disabled
	function isTabDisabled(node) {
		return node.getAttribute('aria-disabled') === 'true';
	}

	/**
  * Tabs keeps related content in a single container that is shown and hidden through navigation.
  */
	var Tabs = _react2.default.createClass({
		displayName: _constants.TABS,
		propTypes: {

			/**
    * HTML `id` attribute of primary element that has `.slds-tabs--default` on it. Optional: If one is not supplied, a `shortid` will be created.
    */
			id: _react.PropTypes.string,

			/**
    * The `children` are the actual tabs and panels to be displayed.
    *
    * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<Panel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
    *
    * The component iterates through each `<Panel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
    *
    * ```
    * <Tabs>
    * 	<Panel label="Tab 1">
    * 		<div>
    * 			<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
    * 			<p>They show when you click the first tab.</p>
    * 		</div>
    * 	</Pane>
    * 	<Panel label="Tab 2">
    * 		<div>
    * 			<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
    * 			<p>They show when you click the second tab.</p>
    * 		</div>
    * 	</Pane>
    * </Tabs>
    * ```
    */
			children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node, _react.PropTypes.element]).isRequired,

			/**
    * Class names to be added to the container element and is passed along to its children.
    */
			className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),

			/**
    * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
    */
			defaultSelectedIndex: _react.PropTypes.number,

			/**
    * This function triggers when a tab is selected
    */
			onSelect: _react.PropTypes.func,

			/**
    * The Tab (and corresponding TabPanel) that is currently selected.
    */
			selectedIndex: _react.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			// If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.
			return {
				defaultSelectedIndex: 0
			};
		},
		getInitialState: function getInitialState() {
			return {};
		},
		componentWillMount: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();

			this.setState({
				selectedIndex: this.props.defaultSelectedIndex
			});
		},
		handleClick: function handleClick(e) {
			var node = e.target;
			/* eslint-disable no-cond-assign */
			do {
				if (this.isTabFromContainer(node)) {
					if (isTabDisabled(node)) {
						return;
					}

					var index = [].slice.call(node.parentNode.children).indexOf(node);
					this.setSelected(index);
					return;
				}
			} while ((node = node.parentNode) !== null);
			/* eslint-enable no-cond-assign */
		},
		setSelected: function setSelected(index, focus) {
			// Check index boundary
			if (index < 0 || index >= this.getTabsCount()) {
				return;
			}

			// Keep reference to last index for event handler
			var last = this.getSelectedIndex();

			// Call change event handler
			if ((0, _lodash2.default)(this.props.onSelect)) {
				this.props.onSelect(index, last);
			}

			// Don't update the state if nothing has changed
			if (index !== this.state.selectedIndex) {
				this.setState({ selectedIndex: index, focus: focus === true });
			}
		},
		getNextTab: function getNextTab(index) {
			var count = this.getTabsCount();

			// Look for non-disabled tab from index to the last tab on the right
			for (var i = index + 1; i < count; i++) {
				var tab = this.getTab(i);
				if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
					return i;
				}
			}

			// If no tab found, continue searching from first on left to index
			for (var _i = 0; _i < index; _i++) {
				var _tab = this.getTab(_i);
				if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab))) {
					return _i;
				}
			}

			// No tabs are disabled, return index
			return index;
		},
		getPrevTab: function getPrevTab(index) {
			var i = index;

			// Look for non-disabled tab from index to first tab on the left
			while (i--) {
				var tab = this.getTab(i);
				if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
					return i;
				}
			}

			// If no tab found, continue searching from last tab on right to index
			i = this.getTabsCount();
			while (i-- > index) {
				var _tab2 = this.getTab(i);
				if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab2))) {
					return i;
				}
			}

			// No tabs are disabled, return index
			return index;
		},
		getTabsCount: function getTabsCount() {
			return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
		},
		getPanelsCount: function getPanelsCount() {
			return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
		},
		getSelectedIndex: function getSelectedIndex() {
			return (0, _lodash4.default)(this.props.selectedIndex) ? this.props.selectedIndex : this.state.selectedIndex;
		},
		getTab: function getTab(index) {
			return this.refs['tabs-' + index];
		},
		isTabFromContainer: function isTabFromContainer(node) {
			// Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
			if (!isTabNode(node)) {
				return false;
			}

			// Check if the first occurrence of a Tabs container is `this` one.
			var nodeAncestor = node.parentElement;
			var tabsNode = (0, _reactDom.findDOMNode)(this);
			do {
				if (nodeAncestor === tabsNode) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;

				nodeAncestor = nodeAncestor.parentElement;
			} while (nodeAncestor);

			return false;
		},
		handleKeyDown: function handleKeyDown(event) {
			if (this.isTabFromContainer(event.target)) {
				var index = this.getSelectedIndex();
				var preventDefault = false;

				if (event.keyCode === _utilities.KEYS.LEFT || event.keyCode === _utilities.KEYS.UP) {
					// Select next tab to the left
					index = this.getPrevTab(index);
					preventDefault = true;
				} else if (event.keyCode === _utilities.KEYS.RIGHT || event.keyCode === _utilities.KEYS.DOWN) {
					// Select next tab to the right
					index = this.getNextTab(index);
					preventDefault = true;
				}

				// Prevent any dumn scrollbars from moving around as we type.
				if (preventDefault) {
					_utilities.EventUtil.trap(event);
				}

				this.setSelected(index, true);
			}
		},
		renderTabsList: function renderTabsList(parentId) {
			var _this = this;

			var children = _react2.default.Children.toArray(this.props.children);

			return (
				// `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
				_react2.default.createElement(
					_tabsList2.default,
					{ id: parentId },
					children.map(function (child, index) {
						var ref = 'tabs-' + index;
						var id = parentId + '-slds-tabs--tab-' + index;
						var panelId = parentId + '-slds-tabs--panel-' + index;
						var selected = _this.getSelectedIndex() === index;
						var focus = selected && _this.state.focus;
						return _react2.default.createElement(
							_tab4.default,
							{
								key: index,
								ref: ref,
								focus: focus,
								selected: selected,
								id: id,
								panelId: panelId,
								disabled: child.props.disabled
							},
							child.props.label
						);
					})
				)
			);
		},
		renderTabPanels: function renderTabPanels(parentId) {
			var children = _react2.default.Children.toArray(this.props.children);
			var selectedIndex = this.getSelectedIndex();
			var result = null;

			result = children.map(function (child, index) {
				var tabId = parentId + '-slds-tabs--tab-' + index;
				var id = parentId + '-slds-tabs--panel-' + index;
				var selected = selectedIndex === index;

				return _react2.default.createElement(
					_tabPanel2.default,
					{
						key: index,
						focus: focus,
						selected: selected,
						id: id,
						tabId: tabId
					},
					children[index]
				);
			});
			return result;
		},
		render: function render() {
			var _this2 = this;

			var _props = this.props;
			var className = _props.className;
			var _props$id = _props.id;
			var id = _props$id === undefined ? this.generatedId : _props$id;

			var attributes = _objectWithoutProperties(_props, ['className', 'id']);

			if (this.state.focus) {
				setTimeout(function () {
					_this2.setState({ focus: false });
				}, 0);
			}

			// Delete all known props, so they don't get added to DOM
			delete attributes.selectedIndex;
			delete attributes.onSelect;
			delete attributes.children;

			return _react2.default.createElement(
				'div',
				_extends({
					id: id,
					className: (0, _classnames2.default)('slds-tabs--default', className),
					onClick: this.handleClick,
					onKeyDown: this.handleKeyDown,
					'data-tabs': true
				}, attributes),
				this.renderTabsList(id),
				this.renderTabPanels(id)
			);
		}
	});

	module.exports = Tabs;
});