"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2
var propTypes = {
  /**
   * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
   */
  children: _propTypes.default.node,

  /**
   * Indicates whether item is expanded or not, which should be handled by `onTogglePanel`. _Tested with Mocha framework and snapshot testing._
   */
  expanded: _propTypes.default.bool.isRequired,

  /**
   * Id of the item belonging to this panel. _Tested with snapshot testing._
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,

  /**
   * Component that can be passed as prop to `<Panel />`. As an example, a menu dropdown could be used here to handle additional actions for each accordion panel. _Tested with Mocha framework._
   */
  panelContentActions: _propTypes.default.node,

  /**
   * Callback that will run whenever there is a keydown on the panel button. Function doesn't change the state of the component.
   */
  onKeyDownSummary: _propTypes.default.func,

  /**
   * Callback that will run whenever a panel is toggled. Function should handle state to toggle `expanded` prop. _Tested with Mocha framework._
   */
  onTogglePanel: _propTypes.default.func.isRequired,

  /**
   * Ref callback that will pass in panel's `input` tag
   */
  refs: _propTypes.default.shape({
    summaryButton: _propTypes.default.func
  }),

  /**
   * Summary in the span element in the header of this panel. The summary is truncated and so the title element should contain the full text so that it is accessible on hover. _Tested with snapshot testing._
   */
  summary: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]).isRequired,

  /**
   * HTML title attribute. _Tested with snapshot testing._
   */
  title: _propTypes.default.string
};
/**
 * The panel content for the Accordion component.
 */

var AccordionPanel = function AccordionPanel(_ref) {
  var children = _ref.children,
      expanded = _ref.expanded,
      id = _ref.id,
      panelContentActions = _ref.panelContentActions,
      summary = _ref.summary,
      title = _ref.title,
      onClickSummary = _ref.onClickSummary,
      onKeyDownSummary = _ref.onKeyDownSummary,
      onTogglePanel = _ref.onTogglePanel,
      refs = _ref.refs;
  return /*#__PURE__*/_react.default.createElement("li", {
    className: "slds-accordion__list-item"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: (0, _classnames.default)('slds-accordion__section', {
      'slds-is-open': expanded
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-accordion__summary"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "slds-text-heading_small slds-accordion__summary-heading slds-has-flexi-truncate"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    "aria-controls": "".concat(id, "-accordion-panel"),
    "aria-expanded": expanded,
    buttonRef: refs.summaryButton,
    className: "slds-button_reset slds-accordion__summary-action",
    iconCategory: "utility",
    iconClassName: "slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left",
    iconName: "switch",
    id: "".concat(id, "-accordion-button"),
    onKeyDown: onKeyDownSummary,
    onClick: function onClick(e) {
      onClickSummary();
      onTogglePanel(e);
    },
    variant: "base"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: title || summary
  }, summary))), panelContentActions), /*#__PURE__*/_react.default.createElement("div", {
    "aria-hidden": !expanded,
    className: "slds-accordion__content",
    id: "".concat(id, "-accordion-panel")
  }, children)));
};

var _default = AccordionPanel;
exports.default = _default;
AccordionPanel.propTypes = propTypes;
AccordionPanel.displayName = _constants.ACCORDION_PANEL;