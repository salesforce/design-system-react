"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classnames = _interopRequireDefault(require("classnames"));

var _toggleButton = _interopRequireWildcard(require("./private/toggle-button"));

var _constants = require("../../utilities/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `toggleButtonOpen`: The button used to open the split view.
   * * `toggleButtonClose`: The button used to close the split view.
   */
  assistiveText: _propTypes.default.shape({
    toggleButtonOpen: _propTypes.default.string,
    toggleButtonClose: _propTypes.default.string
  }),

  /**
   * HTML Id for the component.
   */
  id: _propTypes.default.string,

  /**
   * CSS classes to be added to the root `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Sets the split view to be open or closed.
   */
  isOpen: _propTypes.default.bool,

  /**
   * Event Callbacks
   * * `onClose`: Triggered when the split view has closed.
   * * `onOpen`: Triggered when the split view has opened.
   */
  events: _propTypes.default.shape({
    onClose: _propTypes.default.func,
    onOpen: _propTypes.default.func
  }),

  /**
   * The React component that is rendered in the master section.
   * You need to pass in an array of elements in order for the scrolling to in the SplitViewList to work correctly.
   * React requires that you also supply a unique `key` for each element [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  master: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.element), _propTypes.default.element]).isRequired,

  /**
   * The width of the master section.
   */
  masterWidth: _propTypes.default.string,

  /**
   * The React component that is rendered in the detail section.
   */
  detail: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.element), _propTypes.default.element]).isRequired
};
var defaultProps = {
  assistiveText: {
    toggleButtonOpen: 'Close split view',
    toggleButtonClose: 'Open split view'
  },
  events: {},
  masterWidth: '20rem'
};
/**
 * Split view is used to navigate between records in a list while staying on the same screen.
 */

var SplitView = /*#__PURE__*/function (_React$Component) {
  _inherits(SplitView, _React$Component);

  var _super = _createSuper(SplitView);

  function SplitView(props) {
    var _this;

    _classCallCheck(this, SplitView);

    _this = _super.call(this, props);
    _this.state = {
      isOpen: typeof props.isOpen === 'boolean' ? props.isOpen : true
    };
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(SplitView, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getIsOpen",
    value: function getIsOpen() {
      return typeof this.props.isOpen === 'boolean' ? this.props.isOpen : this.state.isOpen;
    }
  }, {
    key: "getMasterViewId",
    value: function getMasterViewId() {
      return "master_view_".concat(this.getId());
    }
  }, {
    key: "toggle",
    value: function toggle(event) {
      if (typeof this.props.isOpen !== 'boolean') {
        this.setState(function (prevState) {
          return {
            isOpen: !prevState.isOpen
          };
        });
      }

      var isOpen = this.getIsOpen();

      if (isOpen && this.props.events.onClose) {
        this.props.events.onClose(event);
      } else if (!isOpen && this.props.events.onOpen) {
        this.props.events.onOpen(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-grid', this.props.className),
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          maxWidth: this.getIsOpen() ? this.props.masterWidth : '0',
          minWidth: this.getIsOpen() ? this.props.masterWidth : '0'
        },
        className: (0, _classnames.default)('slds-split-view_container', {
          'slds-is-open': this.getIsOpen()
        }, {
          'slds-is-closed': !this.getIsOpen()
        })
      }, /*#__PURE__*/_react.default.createElement(_toggleButton.default, {
        assistiveText: this.props.assistiveText,
        ariaControls: this.getMasterViewId(),
        isOpen: this.getIsOpen(),
        events: {
          onClick: function onClick(event) {
            return _this2.toggle(event);
          }
        }
      }), /*#__PURE__*/_react.default.createElement("article", {
        id: this.getMasterViewId(),
        className: "slds-split-view slds-grid slds-grid_vertical slds-grow slds-scrollable_none"
      }, this.getIsOpen() ? this.props.master : null)), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          marginLeft: _toggleButton.TOGGLE_BUTTON_WIDTH
        },
        className: "slds-grow slds-scrollable_y"
      }, this.props.detail));
    }
  }]);

  return SplitView;
}(_react.default.Component);

_defineProperty(SplitView, "displayName", _constants.SPLIT_VIEW);

_defineProperty(SplitView, "propTypes", propTypes);

_defineProperty(SplitView, "defaultProps", defaultProps);

var _default = SplitView;
exports.default = _default;