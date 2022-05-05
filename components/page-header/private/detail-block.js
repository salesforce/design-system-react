"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var displayName = 'PageHeaderDetailRow';
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The content property can be a string or a React element
   */
  content: _propTypes.default.node,

  /**
   * Sets the 'flavor' of a block, which adds the following sizing class: `slds-size_${flavor}`
   */
  flavor: _propTypes.default.string,

  /**
   * Sets the label of a detail block
   */
  label: _propTypes.default.node,

  /**
   * Sets whether the fields truncate
   */
  truncate: _propTypes.default.bool
};
var defaultProps = {
  content: '',
  label: '',
  truncate: true
};

var DetailBlock = /*#__PURE__*/function (_Component) {
  _inherits(DetailBlock, _Component);

  var _super = _createSuper(DetailBlock);

  function DetailBlock(props) {
    var _this;

    _classCallCheck(this, DetailBlock);

    _this = _super.call(this, props);
    _this.state = {
      showTooltip: false
    };
    return _this;
  }

  _createClass(DetailBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderFieldTruncation();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.content !== prevProps.content) {
        this.renderFieldTruncation();
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$props = this.props,
          content = _this$props.content,
          truncate = _this$props.truncate;

      if (typeof content === 'string') {
        var labelClasses = (0, _classnames2.default)({
          'slds-truncate': truncate
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: labelClasses,
          ref: function ref(field) {
            _this2.fieldContentRef = field;
          },
          title: content
        }, content);
      }

      return content;
    }
  }, {
    key: "renderContentWithTooltip",
    value: function renderContentWithTooltip() {
      var _this$props2 = this.props,
          content = _this$props2.content,
          truncate = _this$props2.truncate;
      var labelClasses = (0, _classnames2.default)({
        'slds-truncate': truncate
      });
      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        align: "top",
        title: content,
        triggerStyle: {
          display: 'inline'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: labelClasses,
        tabIndex: "0",
        title: content
      }, content));
    }
  }, {
    key: "renderFieldTruncation",
    value: function renderFieldTruncation() {
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
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props3 = this.props,
          label = _this$props3.label,
          truncate = _this$props3.truncate;

      if (typeof label === 'string') {
        var labelClasses = (0, _classnames2.default)('slds-text-title', {
          'slds-truncate': truncate
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: labelClasses,
          title: label
        }, label);
      }

      return label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          flavor = _this$props4.flavor;
      var classes = (0, _classnames2.default)('slds-page-header__detail-block', className, _defineProperty({}, "slds-size_".concat(flavor), flavor));
      return /*#__PURE__*/_react.default.createElement("li", {
        className: classes
      }, this.renderLabel(), this.state.showTooltip ? this.renderContentWithTooltip() : this.renderContent());
    }
  }]);

  return DetailBlock;
}(_react.Component);

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;
var _default = DetailBlock;
exports.default = _default;