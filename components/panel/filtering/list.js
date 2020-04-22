"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
var PanelFilterList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelFilterList, _React$Component);

  _createClass(PanelFilterList, null, [{
    key: "propTypes",
    value: function propTypes() {
      return {
        /**
         * Pass in `Filter` components
         */
        children: _propTypes.default.node
      };
    }
  }]);

  function PanelFilterList(props) {
    var _this;

    _classCallCheck(this, PanelFilterList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelFilterList).call(this, props));
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(PanelFilterList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = _react.default.Children.map(this.props.children, function (child, index) {
        var id = child && child.props.id ? child.props.id : "".concat(_this2.generatedId, "-").concat(index);
        var clonedChild;

        if (child && child.props.errorLabel) {
          clonedChild = _react.default.cloneElement(child, {
            isError: true
          });
        }

        return child ? _react.default.createElement("li", {
          className: "slds-item slds-hint-parent"
        }, clonedChild || child, child.props.errorLabel ? _react.default.createElement("p", {
          id: "".concat(id, "-error"),
          className: "slds-text-color_error slds-m-top_xx-small"
        }, child.props.errorLabel) : null) : null;
      });

      return _react.default.createElement("ol", {
        className: "slds-list_vertical slds-list_vertical-space"
      }, children);
    }
  }]);

  return PanelFilterList;
}(_react.default.Component);

_defineProperty(PanelFilterList, "displayName", _constants.PANEL_FILTER_LIST);

var _default = PanelFilterList;
exports.default = _default;