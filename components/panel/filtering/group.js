"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _panelFooter = require("./private/panel-footer");

var _panelFooter2 = _interopRequireDefault(_panelFooter);

var _panelHeader = require("./private/panel-header");

var _panelHeader2 = _interopRequireDefault(_panelHeader);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
  (0, _checkProps2.default)(_constants.PANEL_FILTER_GROUP, props);
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

  var assistiveText = _objectSpread({}, defaultProps.assistiveText, props.assistiveText);

  if (props.assistiveTextCloseFilterPanel) {
    assistiveText.closeButton = props.assistiveTextCloseFilterPanel;
  }

  return _react2.default.createElement("div", {
    className: "slds-filters"
  }, variant === 'panel' ? _react2.default.createElement(_panelHeader2.default, {
    assistiveText: assistiveText,
    cancelLabel: cancelLabel,
    heading: heading,
    modified: modified,
    onRequestCancel: onRequestCancel,
    onRequestClose: onRequestClose,
    onRequestSave: onRequestSave,
    saveLabel: saveLabel
  }) : header || null, _react2.default.createElement("div", {
    className: "slds-filters__body"
  }, errorLabel ? _react2.default.createElement("div", {
    className: "slds-text-color--error slds-m-bottom--x-small",
    role: "alert"
  }, errorLabel) : null, children), variant === 'panel' ? _react2.default.createElement(_panelFooter2.default, {
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
  assistiveText: _propTypes2.default.shape({
    closeButton: _propTypes2.default.string
  }),

  /**
   * Localized description of the "Add Filter" button in the footer
   */
  addFilterLabel: _propTypes2.default.node,

  /**
   * Label for button that cancels modified filters
   */
  cancelLabel: _propTypes2.default.string,

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
  children: _propTypes2.default.node,

  /**
   * Label for the error message at the top of the panel.
   */
  errorLabel: _propTypes2.default.string,

  /**
   * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
   */
  footer: _propTypes2.default.node,

  /**
   * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
   */
  header: _propTypes2.default.node,

  /**
   * The heading within the header of the filtering panel
   */
  heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

  /**
   * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
   */
  modified: _propTypes2.default.bool,

  /**
   * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
   */
  onClickAdd: _propTypes2.default.func,

  /**
   * Callback triggered when "Remove All" is clicked. Recieves an `event`.
   */
  onClickRemoveAll: _propTypes2.default.func,

  /**
   * When the panel's cancel button is clicked in order to reset filter panel to previous state.
   */
  onRequestCancel: _propTypes2.default.func,

  /**
   * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
   */
  onRequestClose: _propTypes2.default.func,

  /**
   * When the panel's save button is clicked in order to confirm filter panel state.
   */
  onRequestSave: _propTypes2.default.func,

  /**
   * Localized description of the "Remove All" button in the footer
   */
  removeAllLabel: _propTypes2.default.node,

  /**
   * Label for button that saves modified filters
   */
  saveLabel: _propTypes2.default.string,

  /**
   * Adds in default Panel header and footer
   */
  variant: _propTypes2.default.oneOf(['panel'])
};
PanelFilterGroup.defaultProps = defaultProps;
exports.default = PanelFilterGroup;