"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  /**
   * Optional class name
   */
  className: _propTypes.default.string,

  /**
   * label
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * The content property can be a string or a React element
   */
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * Sets whether the fields truncate
   */
  truncate: _propTypes.default.bool,
  flavor: _propTypes.default.string
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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DetailBlock).call(this, props));
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
      return (0, _classnames2.default)('slds-page-header__detail-block', className, _defineProperty({}, "slds-size_".concat(flavor), flavor));
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

      var _this$props = this.props,
          className = _this$props.className,
          content = _this$props.content,
          flavor = _this$props.flavor,
          label = _this$props.label,
          truncate = _this$props.truncate;

      var classes = this._getClassNames(className, flavor);
      /**
       * Render the label
       */


      var renderLabel = function renderLabel() {
        var type = _typeof(label);

        if (type === 'string') {
          var labelClasses = (0, _classnames2.default)('slds-text-title', {
            'slds-truncate': truncate
          });
          return _react.default.createElement("p", {
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
          var labelClasses = (0, _classnames2.default)('slds-text-body_regular', {
            'slds-truncate': truncate
          });
          return _react.default.createElement("p", {
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
        var labelClasses = (0, _classnames2.default)('slds-text-body_regular', {
          'slds-truncate': truncate
        });
        return _react.default.createElement(_tooltip.default, {
          align: "top",
          content: content,
          triggerStyle: {
            display: 'inline'
          }
        }, _react.default.createElement("p", {
          tabIndex: "0",
          className: labelClasses
        }, content));
      };

      return _react.default.createElement("li", {
        className: classes
      }, renderLabel(), this.state.showTooltip ? renderContentWithTooltip() : renderContent());
    }
  }]);

  return DetailBlock;
}(_react.Component);

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;
var _default = DetailBlock;
exports.default = _default;