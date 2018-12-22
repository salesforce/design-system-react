"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.escaperegexp");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isequal");

var _lodash4 = _interopRequireDefault(_lodash3);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _dialog = require("../utilities/dialog");

var _dialog2 = _interopRequireDefault(_dialog);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../icon");

var _icon2 = _interopRequireDefault(_icon);

var _inputIcon = require("../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _input = require("../input");

var _input2 = _interopRequireDefault(_input);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _keyCode = require("../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _menu = require("./menu");

var _menu2 = _interopRequireDefault(_menu);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
var defaultFilter = function defaultFilter(term, item) {
  if (!term) return true;
  return item.data && item.data.type === 'section' || item.label.match(new RegExp((0, _lodash2.default)(term), 'ig'));
};

var normalizeSearchTerm = function normalizeSearchTerm(string) {
  return (string || '').toString().replace(/^\s+/, '');
};
/**
 * ** Lookup is deprecated. Please use an auto-complete Combobox instead.**
 *
 * Lookup is an advanced inline search form. The lookup can parse through single or multi scoped datasets. The parsed dataset can be filtered by single or multi option selects.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */


var Lookup = (_temp2 = _class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Lookup, _React$Component);

  function Lookup() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Lookup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Lookup.__proto__ || Object.getPrototypeOf(Lookup)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        currentFocus: null,
        focusIndex: null,
        items: [],
        listLength: _this.props.options.length,
        searchTerm: normalizeSearchTerm(_this.props.searchTerm),
        selectedIndex: _this.props.selectedItem
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getClassName", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return (0, _classnames2.default)(_this.props.className, 'slds-form-element slds-lookup', {
          'slds-has-selection': _this.isSelected(),
          'slds-is-open': _this.getIsOpen()
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "setFirstIndex", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var nextFocusIndex = 0;
        var filteredItem = _this.state.items[0];

        if (_this.menuComponent && _this.menuComponent.getFilteredItemForIndex) {
          filteredItem = _this.menuComponent.getFilteredItemForIndex(nextFocusIndex);
        }

        if (filteredItem && filteredItem.data.type === 'section') {
          nextFocusIndex += 1;
        }

        _this.setState({
          focusIndex: nextFocusIndex
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getHeader", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var Header = _this.props.headerRenderer;
        var headerActive = _this.state.focusIndex === 0;
        return _react2.default.createElement(Header, _extends({
          ref: function ref(header) {
            _this.headerComponent = header;
          }
        }, _this.props, {
          focusIndex: _this.state.focusIndex,
          isActive: headerActive,
          onClose: _this.handleClose,
          searchTerm: _this.state.searchTerm,
          setFocus: _this.setFocus
        }));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getFooter", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var Footer = _this.props.footerRenderer;

        var numFocusable = _this.getNumFocusableItems();

        var footerActive = _this.state.focusIndex === numFocusable;
        return _react2.default.createElement(Footer, _extends({
          ref: function ref(footer) {
            _this.footerComponent = footer;
          }
        }, _this.props, {
          focusIndex: _this.state.focusIndex,
          isActive: footerActive,
          onClose: _this.handleClose,
          setFocus: _this.setFocus
        }));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "setFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(id) {
        _this.setState({
          currentFocus: id
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getIsOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getListLength", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(qty) {
        if (qty !== _this.state.listLength) {
          _this.setState({
            listLength: qty
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getNumFocusableItems", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var offset = 0;

        if (_this.footerComponent) {
          offset += 1;
        }

        if (_this.headerComponent) {
          offset += 1;
        }

        return _this.state.listLength - 1 + offset;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "increaseIndex", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var numFocusable = _this.getNumFocusableItems();

        var nextFocusIndex = _this.state.focusIndex < numFocusable ? _this.state.focusIndex + 1 : 0;

        var filteredItem = _this.menuComponent.getFilteredItemForIndex(nextFocusIndex);

        if (filteredItem && filteredItem.data.type === 'section') {
          nextFocusIndex += 1;
        }

        _this.setState({
          focusIndex: nextFocusIndex
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "decreaseIndex", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var numFocusable = _this.getNumFocusableItems();

        var prevFocusIndex = _this.state.focusIndex > 0 ? _this.state.focusIndex - 1 : numFocusable;

        var filteredItem = _this.menuComponent.getFilteredItemForIndex(prevFocusIndex);

        if (filteredItem && filteredItem.data.type === 'section') {
          prevFocusIndex = prevFocusIndex === 0 ? numFocusable : prevFocusIndex - 1;
        }

        _this.setState({
          focusIndex: prevFocusIndex
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "selectItem", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(itemId) {
        if (itemId) {
          var index = itemId.replace('item-', '');

          _this.selectItemByIndex(index);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "selectItemByIndex", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(index) {
        if (index >= 0 && index < _this.state.items.length) {
          if (_this.props.onRequestClose) {
            _this.props.onRequestClose();
          }

          _this.setState({
            isOpen: false,
            selectedIndex: index,
            searchTerm: ''
          });

          var data = _this.state.items[index].data;

          if (_this.props.onSelect) {
            _this.props.onSelect(data);
          }
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleDeleteSelected", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.onRequestOpen) {
          _this.props.onRequestOpen();
        }

        _this.setState({
          selectedIndex: null,
          isOpen: true
        });

        _this.focusInput();

        if (_this.props.onUnselect) {
          _this.props.onUnselect();
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.onRequestClose) {
          _this.props.onRequestClose();
        }

        _this.setState({
          isOpen: false,
          focusIndex: null,
          currentFocus: null
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClickOutside", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.handleClose();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleEscape", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.getIsOpen() && event) {
          _event2.default.trap(event);
        }

        _this.handleClose();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleCancel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.handleClose();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.onRequestOpen) {
          _this.props.onRequestOpen();
        }

        _this.setState({
          isOpen: true
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onBlur) {
          var target = event.target || event.currentTarget;

          _this.props.onBlur(target.value);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onFocus) {
          var target = event.target || event.currentTarget;

          _this.props.onFocus(target.value);
        }

        if (_this.props.onRequestOpen) {
          _this.props.onRequestOpen();
        }

        _this.setState({
          isOpen: true
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var target = event.target || event.currentTarget;

        _this.setState({
          searchTerm: normalizeSearchTerm(target.value)
        });

        if (_this.props.onChange) {
          _this.props.onChange(target.value);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode) {
          // If user hits esc key or tab key, close menu
          if (event.keyCode === _keyCode2.default.ESCAPE) {
            _this.handleEscape(event);
          } else if (event.keyCode === _keyCode2.default.TAB) {
            // remove the focus on input, tab focus shoud move to next tabbale elemnt
            setTimeout(function () {
              _this.handleClose();
            }, 200);

            _this.handleBlur(event);
          } else {
            _this.handleClick();
          } // If user hits down key, advance aria activedescendant to next item


          if (event.keyCode === _keyCode2.default.DOWN) {
            _event2.default.trapImmediate(event);

            if (_this.state.focusIndex === null) {
              _this.setFirstIndex();
            } else {
              _this.increaseIndex();
            }
          } else if (event.keyCode === _keyCode2.default.UP) {
            // If user hits up key, advance aria activedescendant to previous item
            _event2.default.trapImmediate(event);

            var numFocusable = _this.getNumFocusableItems();

            if (_this.state.focusIndex === null) {
              _this.setState({
                focusIndex: numFocusable
              });
            } else {
              _this.decreaseIndex();
            }
          } else if (event.keyCode === _keyCode2.default.ENTER && _this.state.focusIndex !== null) {
            // If user hits enter, select current activedescendant item
            _event2.default.trapImmediate(event); // If the focus is on the first fixed Action Item in Menu, click it


            if (_this.headerComponent && _this.state.focusIndex === 0) {
              _this.headerComponent.handleClick();
            } else if (_this.footerComponent && _this.state.focusIndex === _this.state.listLength + 1) {
              // If the focus is on the last fixed Action Item in Menu, click it
              _this.footerComponent.handleClick();
            } else {
              // If not, then select menu item
              _this.selectItem(_this.state.currentFocus);
            }
          }
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handlePillKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode) {
          if (event.keyCode === _keyCode2.default.DELETE || event.keyCode === _keyCode2.default.BACKSPACE) {
            _event2.default.trapImmediate(event);

            _this.handleDeleteSelected();
          }
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "inputRefId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return "".concat(_this.props.label, "Lookup");
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "focusInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.focusOnRender = true;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "isSelected", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var hasSelection = !isNaN(parseInt(_this.state.selectedIndex, 10)) && _this.state.selectedIndex >= 0;
        return hasSelection;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "modifyItems", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(itemsToModify) {
        var items = itemsToModify.map(function (item, index) {
          return {
            id: "item-".concat(index),
            label: item.label,
            data: item
          };
        });

        _this.setState({
          items: items
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderMenuContent", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _react2.default.createElement(_menu2.default, {
          ref: function ref(menu) {
            _this.menuComponent = menu;
          },
          emptyMessage: _this.props.emptyMessage,
          filterWith: _this.props.filterWith,
          focusIndex: _this.state.focusIndex,
          footer: _this.props.footerRenderer ? _this.getFooter() : null,
          getListLength: _this.getListLength,
          header: _this.props.headerRenderer ? _this.getHeader() : null,
          iconCategory: _this.props.iconCategory,
          iconInverse: _this.props.iconInverse,
          iconName: _this.props.iconName,
          items: _this.state.items,
          label: _this.props.label,
          listItemLabelRenderer: _this.props.listItemLabelRenderer,
          listLength: _this.state.listLength,
          onSelect: _this.selectItem,
          searchTerm: _this.state.searchTerm,
          sectionDividerRenderer: _this.props.sectionDividerRenderer,
          setFocus: _this.setFocus
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderInlineMenu", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.getIsOpen() ? _react2.default.createElement("div", {
          className: "ignore-react-onclickoutside slds-lookup__menu",
          role: "listbox"
        }, _this.renderMenuContent()) : null;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderSeparateMenu", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        // FOR BACKWARDS COMPATIBILITY
        var menuPosition = _this.props.isInline ? 'relative' : _this.props.menuPosition; // eslint-disable-line react/prop-types

        return _this.getIsOpen() ? _react2.default.createElement(_dialog2.default, {
          align: "bottom",
          className: "slds-lookup__menu slds-show",
          closeOnTabKey: true,
          contentsClassName: "slds-lookup__menu slds-show",
          context: _this.context,
          inheritWidthOf: "target",
          onClose: _this.handleCancel,
          hasStaticAlignement: !_this.props.flippable,
          constrainToScrollParent: _this.props.constrainToScrollParent,
          onRequestTargetElement: function onRequestTargetElement() {
            return _this.input;
          },
          position: menuPosition
        }, _this.renderMenuContent()) : null;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _react2.default.createElement(_input2.default, {
          "aria-activedescendant": _this.state.currentFocus ? _this.state.currentFocus : '',
          "aria-autocomplete": "list",
          "aria-describedby": _this.props.describedById,
          "aria-expanded": !!_this.getIsOpen(),
          assistiveText: _this.props.assistiveText,
          className: "slds-lookup__search-input",
          disabled: _this.props.disabled,
          iconRight: _react2.default.createElement(_inputIcon2.default, {
            assistiveText: {
              icon: 'Search'
            },
            category: "utility",
            name: "search"
          }),
          id: _this.inputRefId(),
          onBlur: _this.handleBlur,
          onChange: _this.handleChange,
          onClick: _this.handleClick,
          onFocus: _this.handleFocus,
          onKeyDown: _this.handleKeyDown,
          inputRef: function inputRef(component) {
            _this.input = component;

            if (_this.focusOnRender) {
              _this.input.focus();

              _this.focusOnRender = false;
            }
          },
          placeholder: _this.props.placeholder,
          role: "combobox",
          type: "text",
          value: _this.state.searchTerm
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderSelectedItem", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var selectedItem = _this.props.options[_this.state.selectedIndex].label;
        var renderIcon = _this.props.iconName ? _react2.default.createElement(_icon2.default, {
          category: _this.props.iconCategory,
          className: "slds-icon slds-pill__icon",
          inverse: _this.props.iconInverse,
          name: _this.props.iconName
        }) : null;
        var labelClassName = _this.props.iconName ? 'slds-pill__label' : 'slds-pill__label slds-m-left_x-small'; // i18n

        return _react2.default.createElement("div", {
          className: "slds-pill__container"
        }, _react2.default.createElement("a", {
          href: "javascript:void(0)",
          className: "slds-pill",
          ref: function ref(pill) {
            _this.pills[_this.state.selectedIndex] = pill;
          },
          onKeyDown: _this.handlePillKeyDown
        }, renderIcon, _react2.default.createElement("span", {
          className: labelClassName
        }, selectedItem), _react2.default.createElement(_button2.default, {
          assistiveText: {
            icon: 'Press delete to remove'
          },
          className: "slds-pill__remove slds-button_icon-bare",
          iconCategory: "utility",
          iconName: "close",
          onClick: _this.handleDeleteSelected,
          tabIndex: "-1",
          variant: "icon"
        })));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderLabel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var inputLabel;
        var required = _this.props.required ? _react2.default.createElement("span", {
          className: "slds-required"
        }, "*") : null;

        if (_this.isSelected()) {
          // inline style override
          inputLabel = _react2.default.createElement("span", {
            className: "slds-form-element__label",
            style: {
              width: '100%'
            }
          }, required, _this.props.label);
        } else {
          inputLabel = _react2.default.createElement("label", {
            className: "slds-form-element__label",
            htmlFor: _this.inputRefId(),
            style: {
              width: '100%'
            }
          }, required, _this.props.label);
        }

        return inputLabel;
      }
    }), _temp));
  }

  _createClass(Lookup, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
      (0, _checkProps2.default)(_constants.LOOKUP, this.props); // Keeps track of references of children for keyboard navigation

      this.pills = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.modifyItems(this.props.options);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.options) {
        this.modifyItems(newProps.options);
      }

      if (newProps.selectedItem !== this.props.selectedItem || !(0, _lodash4.default)(newProps.options, this.props.options)) {
        this.setState({
          selectedIndex: newProps.selectedItem
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!isNaN(parseInt(prevState.selectedIndex, 10)) && isNaN(parseInt(this.state.selectedIndex, 10))) {
        if (this.input) {
          this.input.focus();
        }
      } else if (isNaN(parseInt(prevState.selectedIndex, 10)) && !isNaN(parseInt(this.state.selectedIndex, 10))) {
        if (this.pills[this.state.selectedIndex]) {
          this.pills[this.state.selectedIndex].focus();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isInline;
      /* eslint-disable react/prop-types */

      if (this.props.isInline) {
        isInline = true;
      } else if (this.props.modal !== undefined) {
        isInline = !this.props.modal;
      }
      /* eslint-enable react/prop-types */


      var formElementControlClasses = _defineProperty({
        'slds-form-element__control': true
      }, "slds-input-has-icon slds-input-has-icon_".concat(this.props.iconPosition), !this.isSelected());

      return _react2.default.createElement("div", {
        className: this.getClassName(),
        "data-select": "single",
        "data-scope": "single",
        onScroll: this.props.onScroll
      }, this.props.label ? this.renderLabel() : null, _react2.default.createElement("div", {
        className: (0, _classnames2.default)(formElementControlClasses)
      }, this.isSelected() ? this.renderSelectedItem() : null, !this.isSelected() ? this.renderInput() : null), isInline ? this.renderInlineMenu() : this.renderSeparateMenu());
    }
  }]);

  return Lookup;
}(_react2.default.Component), Object.defineProperty(_class, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.LOOKUP
}), Object.defineProperty(_class, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * If present, the label associated with this `input` is overwritten
     * by this text and is visually not shown.
     */
    assistiveText: _propTypes2.default.string,

    /**
     * Class names to be added to the tag classed with `slds-lookup`.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
     */
    constrainToScrollParent: _propTypes2.default.bool,

    /**
     * ID for aria-describedby (e.g. for an error message or a description)
     */
    describedById: _propTypes2.default.string,

    /**
     * Please select one of the following:
     * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
     * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
     * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
     */
    menuPosition: _propTypes2.default.string,

    /**
     * This prop is passed onto the `input`. Prevents dropdown menu from opening. Also applies disabled styling to input.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
     */
    emptyMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),

    /**
     * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
     */
    filterWith: _propTypes2.default.func,

    /**
     * If true, the menu is constrained to the window and may be flipped up. Has no effect if `isInline` is `true`. In other components, its opposite is used `hasStaticAlignment`.
     */
    flippable: _propTypes2.default.bool,

    /**
     * Custom component for Lookup footer. The default footer allows user to add new item - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>Lookup.DefaultFooter</code>.
     */
    footerRenderer: _propTypes2.default.func,

    /**
     * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>Lookup.DefaultHeader</code>.
     */
    headerRenderer: _propTypes2.default.func,

    /**
     * Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view categories.
     */
    iconCategory: _propTypes2.default.string,

    /**
     * If true, icon color is white. If false, icon color is the default text color.
     */
    iconInverse: _propTypes2.default.bool,

    /**
     * Name of icon. Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view icon names.
     */
    iconName: _propTypes2.default.string,

    /**
     * Determines whether the input's icon will display that icon on the left or the right.
     */
    iconPosition: _propTypes2.default.oneOf(['left', 'right']),

    /**
     * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
     */
    isInline: _propTypes2.default.bool,

    /**
     * Whether or not the dropdown menu is open. This overrides the default behavior.
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Form label for input.
     */
    label: _propTypes2.default.string,

    /**
     * Custom component that overrides the default Lookup Item component.
     */
    listItemLabelRenderer: _propTypes2.default.func,

    /**
     * Triggered when input focus is removed.
     */
    onBlur: _propTypes2.default.func,

    /**
     * Triggered when the contents of the input changes.
     */
    onChange: _propTypes2.default.func,

    /**
     * Triggered when input is focused.
     */
    onFocus: _propTypes2.default.func,

    /**
     * Function called when the lookup dropdown would like hide. This will turn the Lookup into into a controlled component. Please use with `isOpen`.
     */
    onRequestClose: _propTypes2.default.func,

    /**
     * Function called when the lookup dropdown would like show. This will turn the Lookup into into a controlled component. Please use with `isOpen`.
     */
    onRequestOpen: _propTypes2.default.func,

    /**
     * Triggered when the user scrolls in the dropdown menu.
     */
    onScroll: _propTypes2.default.func,

    /**
     * Triggered when an item is selected from the dropdown menu.
     */
    onSelect: _propTypes2.default.func,

    /**
     * Triggered when an item is an item is removed from the input.
     */
    onUnselect: _propTypes2.default.func,

    /**
     * Item added to the dropdown menu.
     */
    options: _propTypes2.default.array.isRequired,

    /**
     * Text that will appear in an empty input.
     */
    placeholder: _propTypes2.default.string,

    /**
     * If true, adds asterisk next to input label to indicate it is a required field.
     */
    required: _propTypes2.default.bool,

    /**
     * Text passed on to header search input of dropdown menu.
     */
    searchTerm: _propTypes2.default.string,

    /**
     * Custom component that overrides the default section divider
     */
    sectionDividerRenderer: _propTypes2.default.func,

    /**
     * Index of current selected item. To clear the selection, pass in -1.
     */
    selectedItem: _propTypes2.default.number
  }
}), Object.defineProperty(_class, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    constrainToScrollParent: true,
    filterWith: defaultFilter,
    iconPosition: 'right',
    searchTerm: '',
    menuPosition: 'absolute'
  }
}), _temp2);
Lookup.contextTypes = {
  iconPath: _propTypes2.default.string
};
exports.default = Lookup;