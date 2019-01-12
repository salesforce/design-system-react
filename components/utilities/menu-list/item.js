"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _itemLabel = require("./item-label");

var _itemLabel2 = _interopRequireDefault(_itemLabel);

var _event = require("../../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Component description.
 */
var ListItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getLabel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var Label = _this.props.labelRenderer;
        return _react2.default.createElement(Label, {
          checkmark: _this.props.checkmark,
          data: _this.props.data,
          icon: _this.getIcon('left'),
          index: _this.props.index,
          inverted: _this.props.inverted,
          isSelected: _this.props.isSelected,
          label: _this.props.label,
          value: _this.props.value
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getIcon", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(position) {
        var classnames = ['slds-icon-text-default'];

        var iconProps = _this.props["".concat(position, "Icon")];

        if (position === 'left') {
          if (_this.props.checkmark) {
            classnames.push('slds-icon_selected');
            iconProps = {
              category: 'utility',
              name: 'check'
            };
          }

          classnames.push('slds-m-right_x-small');
        } else {
          classnames.push('slds-m-left_small');
        }

        if (iconProps) {
          return _react2.default.createElement(_icon2.default, _extends({
            className: (0, _classnames2.default)(classnames),
            position: position,
            size: "x-small"
          }, iconProps));
        }

        return null;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.type !== 'link' || _this.props.href === 'javascript:void(0);' // eslint-disable-line no-script-url
        ) {
            // eslint-disable-line no-script-url
            _event2.default.trapImmediate(event);
          }

        if (_this.props.onSelect) {
          _this.props.onSelect(_this.props.index);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleMouseDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _event2.default.trapImmediate(event);
      }
    }), _temp));
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      switch (this.props.type) {
        case 'header':
          {
            return _react2.default.createElement("li", {
              className: (0, _classnames2.default)('slds-dropdown__header', {
                'slds-has-divider_top-space': this.props.divider === 'top',
                'slds-has-divider_bottom-space': this.props.divider === 'bottom'
              }, this.props.className),
              onMouseDown: this.handleMouseDown,
              role: "separator"
            }, _react2.default.createElement("span", {
              className: "slds-text-title_caps"
            }, this.props.label));
          }

        case 'divider':
          {
            return _react2.default.createElement("li", {
              className: (0, _classnames2.default)('slds-has-divider', this.props.className),
              onMouseDown: this.handleMouseDown,
              role: "separator"
            });
          }

        case 'link':
        case 'item':
        default:
          {
            return (
              /* eslint-disable jsx-a11y/role-supports-aria-props */
              // disabled eslint, but using aria-selected on presentation role seems suspicious...
              _react2.default.createElement("li", {
                "aria-selected": this.props.checkmark === null ? this.props.isSelected : null,
                className: (0, _classnames2.default)('slds-dropdown__item', {
                  'slds-is-selected': this.props.isSelected
                }, this.props.className),
                id: this.props.id,
                onMouseDown: this.handleMouseDown,
                role: "presentation"
              }, _react2.default.createElement("a", {
                "aria-checked": this.props.checkmark && this.props.isSelected,
                "aria-disabled": this.props['aria-disabled'],
                href: this.props.href,
                "data-index": this.props.index,
                onClick: this.handleClick,
                role: this.props.checkmark ? 'menuitemcheckbox' : 'menuitem',
                tabIndex: "-1"
              }, this.getLabel(), this.getIcon('right')))
            );
          }
      }
    }
  }]);

  return ListItem;
}(_react2.default.Component);

Object.defineProperty(ListItem, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.LIST_ITEM
});
Object.defineProperty(ListItem, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    'aria-disabled': _propTypes2.default.bool,
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
    checkmark: _propTypes2.default.bool,
    data: _propTypes2.default.object,
    divider: _propTypes2.default.oneOf(['top', 'bottom']),
    href: _propTypes2.default.string,
    id: _propTypes2.default.string.isRequired,
    index: _propTypes2.default.number.isRequired,
    inverted: _propTypes2.default.bool,
    isSelected: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    labelRenderer: _propTypes2.default.func,
    leftIcon: _propTypes2.default.shape({
      category: _propTypes2.default.string,
      name: _propTypes2.default.string
    }),
    onSelect: _propTypes2.default.func.isRequired,
    rightIcon: _propTypes2.default.shape({
      category: _propTypes2.default.string,
      name: _propTypes2.default.string
    }),
    type: _propTypes2.default.string,
    value: _propTypes2.default.any
  }
});
Object.defineProperty(ListItem, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    data: {},
    href: 'javascript:void(0);',
    // eslint-disable-line no-script-url
    inverted: false,
    isSelected: false,
    label: '',
    labelRenderer: _itemLabel2.default,
    value: null
  }
});
exports.default = ListItem;