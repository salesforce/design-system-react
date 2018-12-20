"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
var PanelFilterList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelFilterList, _React$Component);

  function PanelFilterList() {
    _classCallCheck(this, PanelFilterList);

    return _possibleConstructorReturn(this, (PanelFilterList.__proto__ || Object.getPrototypeOf(PanelFilterList)).apply(this, arguments));
  }

  _createClass(PanelFilterList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid2.default.generate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var children = _react2.default.Children.map(this.props.children, function (child, index) {
        var id = child && child.props.id ? child.props.id : "".concat(_this.generatedId, "-").concat(index);
        var clonedChild;

        if (child && child.props.errorLabel) {
          clonedChild = _react2.default.cloneElement(child, {
            isError: true
          });
        }

        return child ? _react2.default.createElement("li", {
          className: "slds-item slds-hint-parent"
        }, clonedChild || child, child.props.errorLabel ? _react2.default.createElement("p", {
          id: "".concat(id, "-error"),
          className: "slds-text-color_error slds-m-top_xx-small"
        }, child.props.errorLabel) : null) : null;
      });

      return _react2.default.createElement("ol", {
        className: "slds-list_vertical slds-list_vertical-space"
      }, children);
    }
  }], [{
    key: "propTypes",
    value: function propTypes() {
      return {
        /**
         * Pass in `Filter` components
         */
        children: _propTypes2.default.node
      };
    }
  }]);

  return PanelFilterList;
}(_react2.default.Component);

Object.defineProperty(PanelFilterList, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.PANEL_FILTER_LIST
});
exports.default = PanelFilterList;