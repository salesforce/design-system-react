"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _menuDropdown = require("../menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */
var DataTableRowActions = (0, _createReactClass2.default)({
  // ### Display Name
  // Always use the canonical component name as the React display name.
  displayName: _constants.DATA_TABLE_ROW_ACTIONS,
  // ### Prop Types
  propTypes: {
    /**
     * Description of the menu for screenreaders.
     */
    assistiveText: _propTypes2.default.object,

    /**
     * Class names to be added to the actions menu.
     */
    className: _propTypes2.default.string,

    /**
     * HTML ID to be added to the actions menu.
     */
    id: _propTypes2.default.string,

    /**
     * `DataTable` row item
     */
    item: _propTypes2.default.object,

    /**
     * Disable hint styling which changes the color of the dropdown svg on hover over.
     */
    noHint: _propTypes2.default.bool,

    /**
     * Triggered when an item is selected.
     */
    onAction: _propTypes2.default.func,

    /**
     * `Dropdown` options. See `Dropdown`.
     */
    options: _propTypes2.default.array,

    /**
     * A [Dropdown](http://react.lightningdesignsystem.com/components/dropdown-menus/) component. The props from this drop will be merged and override any default props.
     * **Note:** onAction will not be overridden, both `DropDown`'s onSelect(dropDownActionOption) and onAction(rowItem, dropdownActionOption) will be called with appropriate parameters
     */
    dropdown: _propTypes2.default.node
  },
  getDefaultProps: function getDefaultProps() {
    return {
      assistiveText: {
        icon: 'Actions'
      },
      noHint: false,
      options: []
    };
  },
  handleClick: function handleClick(e) {
    _event2.default.trap(e);
  },
  handleSelect: function handleSelect(selection) {
    if ((0, _lodash2.default)(this.props.onAction)) {
      this.props.onAction(this.props.item, selection);
    }

    if (this.props.dropdown && (0, _lodash2.default)(this.props.dropdown.props.onSelect)) {
      this.props.dropdown.props.onSelect(selection);
    }
  },
  // ### Render
  render: function render() {
    // i18n
    var defaultDropdownProps = {
      align: 'right',
      buttonClassName: 'slds-button--icon-x-small',
      buttonVariant: 'icon',
      iconCategory: 'utility',
      iconName: 'down',
      iconSize: 'small',
      iconVariant: 'border-filled',
      assistiveText: this.props.assistiveText,
      className: this.props.className,
      options: this.props.options,
      hint: !this.props.noHint,
      id: this.props.id
    };
    var props = this.props.dropdown ? this.props.dropdown.props : {};

    var dropdownProps = _objectSpread({}, defaultDropdownProps, props, {
      onSelect: this.handleSelect
    });

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      _react2.default.createElement("td", {
        className: "",
        "data-label": "Actions",
        onClick: this.handleClick,
        style: {
          width: '3.25rem'
        }
      }, _react2.default.createElement(_menuDropdown2.default, dropdownProps))
    );
  }
});
exports.default = DataTableRowActions;