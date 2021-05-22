"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idSuffixes = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _mediaObject = _interopRequireDefault(require("../../media-object"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
var idSuffixes = {
  headerActions: '__header-actions',
  heading: '__heading',
  filter: '__filter-input'
};
exports.idSuffixes = idSuffixes;

var renderFilter = function renderFilter(filter, id) {
  // allow id to be set by custom header component passed in
  var clonedFilter = /*#__PURE__*/_react.default.cloneElement(filter, {
    id: filter.props.id || id
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-input-has-icon slds-input-has-icon_left slds-size_1-of-3"
  }, clonedFilter);
};

renderFilter.displayName = 'renderFilter';
/**
 * Card Header is a private component and is not meant to be imported or used for Card's `header` prop. It just happens to have the same file name.
 */

var CardHeader = function CardHeader(props) {
  var title = null;

  if (typeof props.heading === 'string' || props.heading instanceof String) {
    title = props.heading;
  }

  var heading = /*#__PURE__*/_react.default.createElement("h2", {
    id: props.headingId,
    className: "slds-text-heading_small slds-truncate",
    title: title
  }, props.heading);

  var Header;

  if (props.header) {
    Header = /*#__PURE__*/_react.default.cloneElement(props.header, _objectSpread({
      figure: props.icon,
      body: heading,
      verticalCenter: true,
      canTruncate: true
    }, props.header.props));
  } else {
    Header = /*#__PURE__*/_react.default.createElement(_mediaObject.default, {
      figure: props.icon,
      body: heading,
      verticalCenter: true,
      canTruncate: true
    });
  }

  var hasFilter = props.filter ? true : null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-card__header', 'slds-grid')
  }, Header, props.filter ? renderFilter(props.filter, props.filterId) : null, /*#__PURE__*/_react.default.createElement("div", {
    id: props.headerActionsId,
    className: (0, _classnames.default)('slds-no-flex', {
      'slds-size_1-of-3': hasFilter,
      'slds-text-align_right': hasFilter
    })
  }, props.headerActions));
}; // ### Display Name
// Always use the canonical component name as the React display name.


CardHeader.displayName = _constants.CARD_HEADER; // ### Prop Types

CardHeader.propTypes = {
  /**
   * Adds a filter input to the card header
   */
  filter: _propTypes.default.node,

  /**
   * Set the HTML `id` of the card filter.
   */
  filterId: _propTypes.default.string,

  /**
   * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed in the media object from Card. Use `design-system-react/components/media-object` to create your own.
   */
  header: _propTypes.default.node,

  /**
   * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
   */
  headerActions: _propTypes.default.node,

  /**
   * Set the HTML `id` of the card header actions.
   */
  headerActionsId: _propTypes.default.string,

  /**
   * The heading is the name of the related item group.
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]).isRequired,

  /**
   * Set the HTML `id` of the card heading.
   */
  headingId: _propTypes.default.string,

  /**
   * Icon associated with grouped items
   */
  icon: _propTypes.default.node
};
var _default = CardHeader;
exports.default = _default;