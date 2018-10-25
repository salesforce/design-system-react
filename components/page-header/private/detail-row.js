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

var _detailBlock = require("./detail-block");

var _detailBlock2 = _interopRequireDefault(_detailBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'PageHeaderDetailRow';
var propTypes = {
  children: _propTypes2.default.node,

  /**
   * Optional class name
   */
  className: _propTypes2.default.string,

  /**
   * An array of detail blocks
   */
  details: _propTypes2.default.array
};
var defaultProps = {};

var DetailRow =
/*#__PURE__*/
function (_Component) {
  _inherits(DetailRow, _Component);

  function DetailRow() {
    _classCallCheck(this, DetailRow);

    return _possibleConstructorReturn(this, (DetailRow.__proto__ || Object.getPrototypeOf(DetailRow)).apply(this, arguments));
  }

  _createClass(DetailRow, [{
    key: "_getClassNames",
    // eslint-disable-next-line class-methods-use-this
    value: function _getClassNames(className) {
      return (0, _classnames2.default)('slds-grid slds-page-header__detail-row', className);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          details = _props.details;

      var classes = this._getClassNames(className);
      /**
       * Render the deets
       */


      var renderDetails = function renderDetails() {
        if (children !== undefined) {
          return children;
        }

        return details.map(function (detail, i) {
          var key = "PageHeader.detailBlock.".concat(i);
          return _react2.default.createElement(_detailBlock2.default, {
            key: key,
            flavor: detail.flavor,
            label: detail.label,
            content: detail.content,
            truncate: detail.truncate
          });
        });
      };

      return _react2.default.createElement("ul", {
        className: classes
      }, renderDetails());
    }
  }]);

  return DetailRow;
}(_react.Component);

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;
exports.default = DetailRow;