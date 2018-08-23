"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require("classnames");

var _classnames3 = _interopRequireDefault(_classnames2);

var _popoverTooltip = require("../../popover-tooltip");

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'PageHeaderDetailRow';
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes2.default.string,

  /**
   * label
   */
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),

  /**
   * The content property can be a string or a React element
   */
  content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),

  /**
   * Sets whether the fields truncate
   */
  truncate: _propTypes2.default.bool,
  flavor: _propTypes2.default.string
};
var defaultProps = {
  label: '',
  content: ''
};

var DetailBlock =
/*#__PURE__*/
function (_Component) {
  _inherits(DetailBlock, _Component);

  function DetailBlock(props) {
    var _this;

    _classCallCheck(this, DetailBlock);

    _this = _possibleConstructorReturn(this, (DetailBlock.__proto__ || Object.getPrototypeOf(DetailBlock)).call(this, props));
    _this.state = {
      showTooltip: false
    };
    return _this;
  }

  _createClass(DetailBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderFieldTruncation();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.content !== prevProps.content) {
        this._renderFieldTruncation();
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "_getClassNames",
    value: function _getClassNames(className, flavor) {
      return (0, _classnames3.default)('slds-page-header__detail-block', className, _defineProperty({}, "slds-size--".concat(flavor), flavor));
    }
  }, {
    key: "_renderFieldTruncation",
    value: function _renderFieldTruncation() {
      var fieldContent = this.fieldContentRef;
      var isTruncated = fieldContent && fieldContent.scrollWidth > fieldContent.offsetWidth;

      if (isTruncated) {
        this.setState({
          showTooltip: true
        });
      } else {
        this.setState({
          showTooltip: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          content = _props.content,
          flavor = _props.flavor,
          label = _props.label,
          truncate = _props.truncate;

      var classes = this._getClassNames(className, flavor);
      /**
       * Render the label
       */


      var renderLabel = function renderLabel() {
        var type = _typeof(label);

        if (type === 'string') {
          var labelClasses = (0, _classnames3.default)('slds-text-title', {
            'slds-truncate': truncate
          });
          return _react2.default.createElement("p", {
            className: labelClasses,
            title: label
          }, label);
        }

        return label;
      };
      /**
       * Render the content
       */


      var renderContent = function renderContent() {
        var type = _typeof(content);

        if (type === 'string') {
          var labelClasses = (0, _classnames3.default)('slds-text-body--regular', {
            'slds-truncate': truncate
          });
          return _react2.default.createElement("p", {
            ref: function ref(field) {
              _this2.fieldContentRef = field;
            },
            className: labelClasses,
            content: content
          }, content);
        }

        return content;
      };
      /**
       * Render the content with a tooltip (for content that truncates)
       */


      var renderContentWithTooltip = function renderContentWithTooltip() {
        var labelClasses = (0, _classnames3.default)('slds-text-body--regular', {
          'slds-truncate': truncate
        });
        return _react2.default.createElement(_popoverTooltip2.default, {
          align: "top",
          content: content
        }, _react2.default.createElement("p", {
          tabIndex: "0",
          className: labelClasses
        }, content));
      };

      return _react2.default.createElement("li", {
        className: classes
      }, renderLabel(), this.state.showTooltip ? renderContentWithTooltip() : renderContent());
    }
  }]);

  return DetailBlock;
}(_react.Component);

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;
exports.default = DetailBlock;