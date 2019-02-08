"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */
var DataTableRowActions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableRowActions, _React$Component);

  function DataTableRowActions() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DataTableRowActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DataTableRowActions.__proto__ || Object.getPrototypeOf(DataTableRowActions)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        _event2.default.trap(e);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selection) {
        if ((0, _lodash2.default)(_this.props.onAction)) {
          _this.props.onAction(_this.props.item, selection);
        }

        if (_this.props.dropdown && (0, _lodash2.default)(_this.props.dropdown.props.onSelect)) {
          _this.props.dropdown.props.onSelect(selection);
        }
      }
    }), _temp));
  }

  _createClass(DataTableRowActions, [{
    key: "render",
    // ### Render
    value: function render() {
      // i18n
      var defaultDropdownProps = {
        align: 'right',
        buttonClassName: 'slds-button_icon-x-small',
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
  }]);

  return DataTableRowActions;
}(_react2.default.Component);

Object.defineProperty(DataTableRowActions, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.DATA_TABLE_ROW_ACTIONS
});
Object.defineProperty(DataTableRowActions, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
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
  }
});
Object.defineProperty(DataTableRowActions, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    assistiveText: {
      icon: 'Actions'
    },
    noHint: false,
    options: []
  }
});
exports.default = DataTableRowActions;