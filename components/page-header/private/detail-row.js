"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _detailBlock = _interopRequireDefault(require("./detail-block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var displayName = 'PageHeaderDetailRow';
var propTypes = {
  children: _propTypes.default.node,

  /**
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * An array of detail blocks
   */
  details: _propTypes.default.array
};
var defaultProps = {};

var DetailRow =
/*#__PURE__*/
function (_Component) {
  _inherits(DetailRow, _Component);

  function DetailRow() {
    _classCallCheck(this, DetailRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(DetailRow).apply(this, arguments));
  }

  _createClass(DetailRow, [{
    key: "renderDetails",
    value: function renderDetails() {
      if (this.props.children !== undefined) {
        return this.props.children;
      }

      if (this.props.details) {
        return this.props.details.map(function (detail, i) {
          var key = "page-header-detail-block-".concat(i);
          return _react.default.createElement(_detailBlock.default, {
            key: key,
            flavor: detail.flavor,
            label: detail.label,
            content: detail.content,
            truncate: detail.truncate
          });
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var classes = (0, _classnames.default)('slds-page-header__detail-row', this.props.className);
      return _react.default.createElement("ul", {
        className: classes
      }, this.renderDetails());
    }
  }]);

  return DetailRow;
}(_react.Component);

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;
var _default = DetailRow;
exports.default = _default;