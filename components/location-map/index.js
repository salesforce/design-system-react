"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var displayName = _constants.LOCATION_MAP;
var propTypes = {
  /**
   * CSS class names to be added with `slds-map` class. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  classNameContainer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   *  Accepts location object that will be shown if no location has been selected. Required
   *  * `id` : A unique identifier string for the location
   *  * `name` : Name of the location
   *  * `address` : Address of the location
   */
  defaultLocation: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired,
    address: _propTypes.default.string.isRequired
  }).isRequired,

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   *  Labels
   *  * `title` - Title for the LocationMap component.
   */
  labels: _propTypes.default.shape({
    title: _propTypes.default.string
  }),

  /**
   * Array of locations objects for the LocationMap component.**
   * Each location object can contain:
   *  * `id` : A unique identifier string for the location
   *  * `name` : Name of the location
   *  * `address` : Address of the location
   */
  locations: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired,
    address: _propTypes.default.string.isRequired
  })).isRequired,

  /**
   * Callback function triggered when a location is selected
   */
  onClickLocation: _propTypes.default.func,

  /**
   * Accepts a Google Map API Key that will be used for showing the map
   */
  googleAPIKey: _propTypes.default.string.isRequired,

  /**
   *  Accepts location object that will be shown when selected
   *  * `id` : A unique identifier string for the location
   *  * `name` : Name of the location
   *  * `address` : Address of the location
   */
  selection: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired,
    address: _propTypes.default.string.isRequired
  })
};
var defaultProps = {
  labels: {
    title: 'Interactive Map'
  }
};
/**
 * A location map component is used to find and show locations
 */

var LocationMap = /*#__PURE__*/function (_React$Component) {
  _inherits(LocationMap, _React$Component);

  var _super = _createSuper(LocationMap);

  function LocationMap(props) {
    var _this;

    _classCallCheck(this, LocationMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event, i) {
      if (typeof _this.props.onClickLocation === 'function') _this.props.onClickLocation(event, _this.props.locations[i]);

      if (_this.map) {
        _this.map.focus();
      }
    });

    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the LocationMap's HTML id. Generate a new one if no ID present.
   */


  _createClass(LocationMap, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
    /**
     * Handles clicking of a location
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var labels = _objectSpread(_objectSpread({}, defaultProps.labels), this.props.labels);

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)("slds-grid", {
          'slds-has-coordinates': this.props.locations
        }, this.props.classNameContainer)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-map_container",
        style: {
          padding: '4px'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("slds-map", this.props.className),
        ref: function ref(map) {
          _this2.map = map;
        },
        tabIndex: 0 // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        ,
        title: labels.title
      }, /*#__PURE__*/_react.default.createElement("iframe", {
        id: "".concat(this.getId(), "-google-map"),
        src: "https://www.google.com/maps/embed/v1/place?key=".concat(this.props.googleAPIKey, "&q=").concat(encodeURIComponent(this.props.selection ? this.props.selection.address : this.props.defaultLocation.address)),
        title: labels.title
      }))), this.props.locations.length > 1 ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-coordinates"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-coordinates__header"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-coordinates__title"
      }, "".concat(labels.title, " (").concat(this.props.locations.length, ")"))), /*#__PURE__*/_react.default.createElement("ul", {
        className: "slds-coordinates__list"
      }, this.props.locations.map(function (location, i) {
        return /*#__PURE__*/_react.default.createElement("li", {
          key: location.id,
          className: "slds-coordinates__item"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-assistive-text",
          "aria-live": "polite"
        }, "".concat(location.name, " is currently selected")), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: function onClick(event) {
            return _this2.handleClick(event, i);
          },
          className: "slds-coordinates__item-action slds-button_reset slds-media",
          "aria-pressed": _this2.props.selection && _this2.props.selection.id === location.id
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-media__figure"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "standard",
          name: "account"
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-media__body"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-text-link"
        }, location.name), /*#__PURE__*/_react.default.createElement("span", null, location.address))));
      }))) : null);
    }
  }]);

  return LocationMap;
}(_react.default.Component);

LocationMap.displayName = displayName;
LocationMap.propTypes = propTypes;
var _default = LocationMap;
exports.default = _default;