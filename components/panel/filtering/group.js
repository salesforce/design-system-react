"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _panelFooter = _interopRequireDefault(require("./private/panel-footer"));

var _panelHeader = _interopRequireDefault(require("./private/panel-header"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  addFilterLabel: 'Add Filter',
  cancelLabel: 'Cancel',
  assistiveText: {
    closeButton: 'Close Filter Panel'
  },
  heading: 'Filter',
  saveLabel: 'Save',
  removeAllLabel: 'Remove All'
};
/**
 * A filtering panel contextual filtering options.
 */

var PanelFilterGroup = function PanelFilterGroup(props) {
  (0, _checkProps.default)(_constants.PANEL_FILTER_GROUP, props);
  var children = props.children,
      errorLabel = props.errorLabel,
      footer = props.footer,
      header = props.header,
      variant = props.variant,
      addFilterLabel = props.addFilterLabel,
      onClickAdd = props.onClickAdd,
      onClickRemoveAll = props.onClickRemoveAll,
      removeAllLabel = props.removeAllLabel,
      cancelLabel = props.cancelLabel,
      heading = props.heading,
      modified = props.modified,
      onRequestCancel = props.onRequestCancel,
      onRequestClose = props.onRequestClose,
      onRequestSave = props.onRequestSave,
      saveLabel = props.saveLabel;

  var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText);

  if (props.assistiveTextCloseFilterPanel) {
    assistiveText.closeButton = props.assistiveTextCloseFilterPanel;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-filters"
  }, variant === 'panel' ? /*#__PURE__*/_react.default.createElement(_panelHeader.default, {
    assistiveText: assistiveText,
    cancelLabel: cancelLabel,
    heading: heading,
    modified: modified,
    onRequestCancel: onRequestCancel,
    onRequestClose: onRequestClose,
    onRequestSave: onRequestSave,
    saveLabel: saveLabel
  }) : header || null, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-filters__body"
  }, errorLabel ? /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-text-color_error slds-m-bottom_x-small",
    role: "alert"
  }, errorLabel) : null, children), variant === 'panel' ? /*#__PURE__*/_react.default.createElement(_panelFooter.default, {
    addFilterLabel: addFilterLabel,
    onClickAdd: onClickAdd,
    onClickRemoveAll: onClickRemoveAll,
    removeAllLabel: removeAllLabel
  }) : footer || null);
};

PanelFilterGroup.displayName = _constants.PANEL_FILTER_GROUP;
PanelFilterGroup.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `closeButton`: Localized description of the close button for the panel for screen readers
   */
  assistiveText: _propTypes.default.shape({
    closeButton: _propTypes.default.string
  }),

  /**
   * Localized description of the "Add Filter" button in the footer
   */
  addFilterLabel: _propTypes.default.node,

  /**
   * Label for button that cancels modified filters
   */
  cancelLabel: _propTypes.default.string,

  /**
   * Pass in `FilterList`'s of `Filters`:
   *
   * ```
   * <FilterGroup
   *   variant="panel"
   * >
   *   <FilterList>
   *   <Filter
   *     property="Show Me"
   *     predicate="All Wackamoles"
   *   >
   *   {popoverContents}
   *   </Filter>
   *   </FilterList>
   * </FilterGroup>
   * ```
   */
  children: _propTypes.default.node,

  /**
   * Label for the error message at the top of the panel.
   */
  errorLabel: _propTypes.default.string,

  /**
   * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
   */
  footer: _propTypes.default.node,

  /**
   * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
   */
  header: _propTypes.default.node,

  /**
   * The heading within the header of the filtering panel
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
   */
  modified: _propTypes.default.bool,

  /**
   * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
   */
  onClickAdd: _propTypes.default.func,

  /**
   * Callback triggered when "Remove All" is clicked. Recieves an `event`.
   */
  onClickRemoveAll: _propTypes.default.func,

  /**
   * When the panel's cancel button is clicked in order to reset filter panel to previous state.
   */
  onRequestCancel: _propTypes.default.func,

  /**
   * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
   */
  onRequestClose: _propTypes.default.func,

  /**
   * When the panel's save button is clicked in order to confirm filter panel state.
   */
  onRequestSave: _propTypes.default.func,

  /**
   * Localized description of the "Remove All" button in the footer
   */
  removeAllLabel: _propTypes.default.node,

  /**
   * Label for button that saves modified filters
   */
  saveLabel: _propTypes.default.string,

  /**
   * Adds in default Panel header and footer
   */
  variant: _propTypes.default.oneOf(['panel'])
};
PanelFilterGroup.defaultProps = defaultProps;
var _default = PanelFilterGroup;
exports.default = _default;