"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idSuffixes = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _header = _interopRequireDefault(require("./private/header"));

var _body = _interopRequireDefault(require("./private/body"));

var _footer = _interopRequireDefault(require("./private/footer"));

var _empty = _interopRequireDefault(require("./empty"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Card Component
// Implements the [Card design pattern](https://www.lightningdesignsystem.com/components/cards/) in React.
// Based on SLDS v2.2.1
// ### React
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
// ## Children
var idSuffixes = {
  body: '__body',
  headerActions: '__header-actions',
  heading: '__heading',
  filter: '__filter-input'
};
/**
 * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination.
 */

exports.idSuffixes = idSuffixes;

var Card = function Card(props) {
  var bodyId = props.id ? props.id + idSuffixes.body : null;
  var filterId = props.id ? props.id + idSuffixes.filter : null;
  var headingId = props.id ? props.id + idSuffixes.heading : null;
  var headerActionsId = props.id ? props.id + idSuffixes.headerActions : null;
  var empty = props.empty;

  if (empty === true) {
    // Can be overridden by passing in a node to the empty prop
    empty = _react.default.createElement(_empty.default, {
      id: props.id,
      heading: props.heading
    });
  }

  return _react.default.createElement("article", {
    id: props.id,
    className: (0, _classnames.default)('slds-card', props.className),
    style: props.style
  }, !props.hasNoHeader && _react.default.createElement(_header.default, {
    header: props.header,
    headingId: headingId,
    icon: props.icon,
    filter: props.filter,
    filterId: filterId,
    heading: props.heading,
    headerActions: props.headerActions,
    headerActionsId: headerActionsId
  }), !empty ? _react.default.createElement(_body.default, {
    id: bodyId,
    className: props.bodyClassName
  }, props.children) : _react.default.createElement(_body.default, {
    id: bodyId,
    className: props.bodyClassName
  }, empty), props.footer ? _react.default.createElement(_footer.default, null, props.footer) : null);
}; // ### Display Name
// Always use the canonical component name as the React display name.


Card.displayName = _constants.CARD;
Card.defaultProps = {
  heading: 'Related Items'
}; // ### Prop Types

Card.propTypes = {
  /**
   * CSS classes to be added to the card body (wraps children).
   */
  bodyClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The main section of the card. It often contains a `DataTable` or `Tile`.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to the card.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
   */
  empty: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),

  /**
   * Adds a filter input to the card header.
   */
  filter: _propTypes.default.node,

  /**
   * Footer often contains pagination.
   */
  footer: _propTypes.default.node,

  /**
   * Allows card to have no header, and ignores header related props altogether.
   */
  hasNoHeader: _propTypes.default.bool,

  /**
   * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed into the media object from Card if present. Use `design-system-react/components/media-object` to create your own custom header.
   */
  header: _propTypes.default.node,

  /**
   * The heading is the name of the related item group and should only contain inline elements.
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]).isRequired,

  /**
   * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
   */
  headerActions: _propTypes.default.node,

  /**
   * Icon associated with the items within the `body`.
   */
  icon: _propTypes.default.node,

  /**
   * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
   */
  id: _propTypes.default.string,

  /**
   * Custom styles to be added to the card.
   */
  style: _propTypes.default.object
};
var _default = Card;
exports.default = _default;