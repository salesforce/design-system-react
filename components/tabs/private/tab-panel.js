define(['exports', 'react', 'prop-types', 'classnames', '../../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	/* eslint-disable no-unused-vars */
	var TabPanel = function TabPanel(_ref) {
		var className = _ref.className,
		    children = _ref.children,
		    variant = _ref.variant,
		    selected = _ref.selected,
		    id = _ref.id,
		    tabId = _ref.tabId,
		    attributes = _objectWithoutProperties(_ref, ['className', 'children', 'variant', 'selected', 'id', 'tabId']);

		return _react2.default.createElement(
			'div',
			{
				'aria-labelledby': tabId,
				className: (0, _classnames2.default)(className, {
					'slds-show': selected,
					'slds-hide': !selected,
					'slds-tabs--default__content': variant === 'default',
					'slds-tabs--scoped__content': variant === 'scoped'
				}),
				id: id,
				role: 'tabpanel'
			},
			children.props.children
		);
	};

	TabPanel.displayName = _constants.TAB_PANEL;

	TabPanel.propTypes = {
		/**
   * The `children` are the contents of the tab panel.
   *
   * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
   *
   * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
   *
   * The tab panel component actually returns the _children_ of the _children_ which were provided by the `<TabsPanel />` component.
   *
   * Due to React's nature, the `<TabsPanel />` component wraps its children in a `div` element which we don't need nor want in our rendered DOM structure, so we just bypass it and get its kids via `{children.props.children}` in the render method below.
   * ```
   * <Tabs>
   * 	<TabsPanel label="Tab 1">
   * 		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
   * 		<p>They show when you click the first tab.</p>
   * 	</TabsPanel>
   * 	<TabsPanel label="Tab 2">
   * 		<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
   * 		<p>They show when you click the second tab.</p>
   * 	</TabsPanel>
   * </Tabs>
   * ```
   */
		children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

		/**
   * CSS classes to be added to the tab panel.
   */
		className: _propTypes2.default.string,

		/**
   * The HTML ID of this tab panel. Also used by the `<Tab />`that controls it as `panelId`.
   */
		id: _propTypes2.default.string,

		/**
   * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
   */
		selected: _propTypes2.default.bool,

		/**
   * If the Tabs should be scopped, defaults to false
   */
		variant: _propTypes2.default.oneOf(['default', 'scoped']),

		/**
   * The HTML ID of the `<Tab />` that controls this panel.
   */
		tabId: _propTypes2.default.string
	};

	TabPanel.defaultProps = {
		variant: 'default',
		selected: false
	};

	exports.default = TabPanel;
});