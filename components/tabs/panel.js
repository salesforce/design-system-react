"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * The `<TabsPanel />` component allows us to simplify the structure of the `<Tabs />` component.

 * Rather than require different (deeply nested) children for tabslist, with its tab(s) as well as tabpanel(s), we provide this `TabsPanel` component which takes a `label` property that will become what is shown on the `<Tab />` that will be associated with it.

 * The `children` of the Panel will be fed to the `<TabPanel />` component, while its `label` is handled in `<Tab />`, via `<TabsList />`.
 *
 * ```
 * <TabsPanel label="Tab 1">
 * 	<div>
 * 		<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
 * 		<p>They show when you click the first tab.</p>
 * 	</div>
 * </TabsPanel>
 * ```
 */
var Panel = function Panel(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", null, _react.default.Children.toArray(children));
};

Panel.displayName = _constants.TABS_PANEL;
Panel.propTypes = {
  /**
   * The string or element that is handed off to the `<Tab />` component, ends up being the title and the label for the tab associated with its tab panel.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]).isRequired,

  /**
   * The `children` are the actual tab panels to be rendered. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabPanels` function.
   *
   * Note that the `<TabsPanel />` component inserts a `div` element around the children, because React requires exactly one "parent" element returned. The `<TabPanel />` component simply dips down into `children` to get the children of this wrapping `div` so that it does not get rendered in the DOM.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.element]).isRequired,

  /**
   * Show an icon on the `<Tab />` next to the title that can be used to communicate when a tab contains a validation error that needs attention
   */
  hasError: _propTypes.default.bool,
  // deepscan-disable-line REACT_USELESS_PROP_TYPES

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `withErrorIcon`: This text is for the error icon that will be placed next to the `<Tab />` title
   */

  /* deepscan-disable REACT_USELESS_PROP_TYPES */
  assistiveText: _propTypes.default.shape({
    withErrorIcon: _propTypes.default.string
  })
  /* deepscan-enable REACT_USELESS_PROP_TYPES */

};
var _default = Panel;
exports.default = _default;