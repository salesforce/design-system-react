"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _interactiveElement = _interopRequireDefault(require("./interactive-element"));

var _cellContext = _interopRequireDefault(require("./private/cell-context"));

var _tableContext = _interopRequireDefault(require("./private/table-context"));

var _contextHelper = _interopRequireDefault(require("./private/context-helper"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InteractiveDropdown = (0, _interactiveElement.default)(_menuDropdown.default);
var propTypes = {
  /**
   * Description of the menu for screenreaders.
   */
  assistiveText: _propTypes.default.object,

  /**
   * Class names to be added to the actions menu.
   */
  className: _propTypes.default.string,

  /**
   * HTML ID to be added to the actions menu.
   */
  id: _propTypes.default.string,

  /**
   * `DataTable` row item
   */
  item: _propTypes.default.object,

  /**
   * Disable hint styling which changes the color of the dropdown svg on hover over.
   */
  noHint: _propTypes.default.bool,

  /**
   * Triggered when an item is selected.
   */
  onAction: _propTypes.default.func,

  /**
   * `Dropdown` options. See `Dropdown`.
   */
  options: _propTypes.default.array,

  /**
   * A [Dropdown](http://react.lightningdesignsystem.com/components/dropdown-menus/) component. The props from this drop will be merged and override any default props.
   * **Note:** onAction will not be overridden, both `DropDown`'s onSelect(dropDownActionOption) and onAction(rowItem, dropdownActionOption) will be called with appropriate parameters
   */
  dropdown: _propTypes.default.node
};
var defaultProps = {
  assistiveText: {
    icon: 'Actions'
  },
  noHint: false,
  options: []
};
/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */

var DataTableRowActions = function DataTableRowActions(props) {
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var cellContext = (0, _react.useContext)(_cellContext.default);

  var _useContextHelper = (0, _contextHelper.default)(tableContext, cellContext, props.fixedLayout),
      tabIndex = _useContextHelper.tabIndex,
      hasFocus = _useContextHelper.hasFocus,
      handleFocus = _useContextHelper.handleFocus,
      handleKeyDown = _useContextHelper.handleKeyDown;

  var handleClick = function handleClick(e) {
    _event.default.trap(e);
  };

  var handleSelect = function handleSelect(selection) {
    if ((0, _lodash.default)(props.onAction)) {
      props.onAction(props.item, selection);
    }

    if (props.dropdown && (0, _lodash.default)(props.dropdown.props.onSelect)) {
      props.dropdown.props.onSelect(selection);
    }
  }; // i18n


  var defaultDropdownProps = {
    align: 'right',
    buttonClassName: 'slds-button_icon-x-small',
    buttonVariant: 'icon',
    iconCategory: 'utility',
    iconName: 'down',
    iconSize: 'small',
    iconVariant: 'border-filled',
    assistiveText: props.assistiveText,
    className: props.className,
    options: props.options,
    hint: !props.noHint,
    id: props.id
  };
  var dropdownProps = props.dropdown ? props.dropdown.props : {};
  dropdownProps = _objectSpread(_objectSpread(_objectSpread({}, defaultDropdownProps), dropdownProps), {}, {
    onSelect: handleSelect
  });
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    _react.default.createElement("td", {
      className: (0, _classnames.default)({
        'slds-has-focus': hasFocus
      }),
      "data-label": "Actions",
      onClick: handleClick,
      style: {
        width: '3.25rem'
      },
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      ref: function ref(_ref) {
        if (_ref && hasFocus) {
          _ref.focus();
        }
      },
      role: props.fixedLayout ? 'gridcell' : null,
      tabIndex: tabIndex
    }, /*#__PURE__*/_react.default.createElement(InteractiveDropdown, dropdownProps))
  );
};

DataTableRowActions.propTypes = propTypes;
DataTableRowActions.defaultProps = defaultProps;
DataTableRowActions.displayName = _constants.DATA_TABLE_ROW_ACTIONS;
var _default = DataTableRowActions;
exports.default = _default;