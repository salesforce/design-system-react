"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * The containers of content that are shown and hidden by `Tabs`.
 */
var TabPanel = function TabPanel(_ref) {
  var className = _ref.className,
      children = _ref.children,
      variant = _ref.variant,
      selected = _ref.selected,
      id = _ref.id,
      tabId = _ref.tabId,
      attributes = _objectWithoutProperties(_ref, ["className", "children", "variant", "selected", "id", "tabId"]);

  return /*#__PURE__*/_react.default.createElement("div", {
    "aria-labelledby": tabId,
    className: (0, _classnames.default)(className, {
      'slds-show': selected,
      'slds-hide': !selected,
      'slds-tabs_default__content': variant === 'default',
      'slds-tabs_scoped__content': variant === 'scoped',
      'slds-vertical-tabs__content': variant === 'vertical'
    }),
    id: id,
    role: "tabpanel"
  }, children.props.children);
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
   * 		<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
   * 		<p>They show when you click the first tab.</p>
   * 	</TabsPanel>
   * 	<TabsPanel label="Tab 2">
   * 		<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
   * 		<p>They show when you click the second tab.</p>
   * 	</TabsPanel>
   * </Tabs>
   * ```
   */
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to the tab panel.
   */
  className: _propTypes.default.string,

  /**
   * The HTML ID of this tab panel. Also used by the `<Tab />`that controls it as `panelId`.
   */
  id: _propTypes.default.string,

  /**
   * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
   */
  selected: _propTypes.default.bool,

  /**
   * If the Tabs should be scoped, vertical, or default (default value)
   */
  variant: _propTypes.default.oneOf(['default', 'scoped', 'vertical']),

  /**
   * The HTML ID of the `<Tab />` that controls this panel.
   */
  tabId: _propTypes.default.string
};
TabPanel.defaultProps = {
  variant: 'default',
  selected: false
};
var _default = TabPanel;
exports.default = _default;