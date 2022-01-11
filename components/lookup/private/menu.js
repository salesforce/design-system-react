"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _item = _interopRequireDefault(require("./item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-did-update-set-state */
var displayName = 'Lookup-Menu';
var propTypes = {
  boldRegex: _propTypes.default.instanceOf(RegExp),
  emptyMessage: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  filterWith: _propTypes.default.func,
  focusIndex: _propTypes.default.number,
  getListLength: _propTypes.default.func,
  iconCategory: _propTypes.default.string,
  items: _propTypes.default.array,
  label: _propTypes.default.string,
  listLength: _propTypes.default.number,
  searchTerm: _propTypes.default.string,
  setFocus: _propTypes.default.func
};
var defaultProps = {
  emptyMessage: 'No matches found.'
};

var Menu = /*#__PURE__*/function (_React$Component) {
  _inherits(Menu, _React$Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleItemFocus", function (itemIndex, itemHeight) {
      if (_this.listRef) {
        _this.listRef.scrollTop = itemIndex * itemHeight;
      }
    });

    _this.state = {
      filteredItems: _this.filteredItems()
    };
    return _this;
  } // Set filtered list length in parent to determine active indexes for aria-activedescendent


  _createClass(Menu, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // make an array of the children of the list but only count the actual items (but include section dividers)
      var childFilter = function childFilter(child) {
        return child.className.indexOf('js-slds-lookup__item') > -1 || child.className.indexOf('slds-lookup__divider') > -1;
      };

      var list = [].slice.call(this.listRef.children).filter(childFilter).length;
      this.props.getListLength(list);

      if (prevProps.items !== this.props.items || prevProps.filter !== this.props.filter || prevProps.searchTerm !== this.props.searchTerm) {
        // eslint-disable-next-line class-methods-use-this
        this.setState({
          filteredItems: this.filteredItems()
        });
      }
    }
  }, {
    key: "getFilteredItemForIndex",
    value: function getFilteredItemForIndex(i) {
      if (i > -1 && this.state.filteredItems && i < this.state.filteredItems.length) {
        return this.state.filteredItems[i];
      }

      return null;
    }
  }, {
    key: "filter",
    value: function filter(item) {
      return this.props.filterWith(this.props.searchTerm, item);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "filterEmptySections",
    value: function filterEmptySections(items) {
      var result = [];
      items.forEach(function (item, index) {
        if (item && item.data && item.data.type === 'section') {
          if (index + 1 < items.length) {
            var nextItem = items[index + 1];

            if (nextItem.data && nextItem.data.type !== 'section') {
              // eslint-disable-next-line fp/no-mutating-methods
              result.push(item);
            }
          }
        } else {
          // eslint-disable-next-line fp/no-mutating-methods
          result.push(item);
        }
      });
      return result;
    }
  }, {
    key: "filteredItems",
    value: function filteredItems() {
      return this.filterEmptySections(this.props.items.filter(this.filter, this));
    } // Scroll menu up/down when using mouse keys

  }, {
    key: "renderContent",
    value: function renderContent() {
      if (this.state.filteredItems.length === 0) {
        return /*#__PURE__*/_react.default.createElement("li", {
          className: "slds-lookup__message",
          "aria-live": "polite"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-m-left_x-large slds-p-vertical_medium"
        }, this.props.emptyMessage));
      }

      return this.renderItems();
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      return this.props.footer;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      return this.props.header;
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      var focusIndex = this.props.focusIndex;
      return this.state.filteredItems.map(function (component, i) {
        // isActive means it is aria-activedescendant
        var id = component.id;
        var isActive = false;

        if (_this2.props.header) {
          isActive = focusIndex === i + 1;
        } else {
          isActive = focusIndex === i;
        }

        if (component.data.type === 'section') {
          if (_this2.props.sectionDividerRenderer) {
            var SectionDivider = _this2.props.sectionDividerRenderer;
            return /*#__PURE__*/_react.default.createElement(SectionDivider, _extends({
              data: component.data,
              key: "section_header_".concat(id)
            }, _this2.props));
          }
        }

        return /*#__PURE__*/_react.default.createElement(_item.default, {
          boldRegex: _this2.props.boldRegex,
          data: component.data,
          handleItemFocus: _this2.handleItemFocus,
          iconCategory: _this2.props.iconCategory,
          iconInverse: _this2.props.iconInverse,
          iconName: _this2.props.iconName,
          id: id,
          index: i,
          isActive: isActive,
          key: id,
          listItemLabelRenderer: _this2.props.listItemLabelRenderer,
          onSelect: _this2.props.onSelect,
          searchTerm: _this2.props.searchTerm,
          setFocus: _this2.props.setFocus
        }, component);
      });
    }
  }, {
    key: "renderSectionDivider",
    value: function renderSectionDivider() {
      return this.props.sectionDivider;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement("section", {
        id: "menuContainer",
        className: "ignore-react-onclickoutside"
      }, this.renderHeader(), /*#__PURE__*/_react.default.createElement("ul", {
        id: "list",
        className: "slds-lookup__list",
        role: "presentation",
        ref: function ref(list) {
          if (list) {
            _this3.listRef = list;
          }
        }
      }, this.renderContent()), this.renderFooter());
    }
  }]);

  return Menu;
}(_react.default.Component);

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
var _default = Menu;
exports.default = _default;