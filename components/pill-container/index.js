"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _selectedListbox = _interopRequireDefault(require("./private/selected-listbox"));

var _constants = require("../../utilities/constants");

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
   * * `listboxLabel`: This is a label for the listbox. The default is `Selected Options:`.
   * * `removePill`: Used to remove a selected item (pill). Focus is on the pill. This is not a button. The default is `Press delete or backspace to remove`.
   */
  assistiveText: _propTypes.default.shape({
    listboxLabel: _propTypes.default.string,
    removePill: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to the pill container
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for pill container
   */
  id: _propTypes.default.string,

  /**
   * **Text labels for internationalization**
   * * `removePillTitle`: Title on `X` icon
   */
  labels: _propTypes.default.shape({
    removePillTitle: _propTypes.default.string
  }),

  /**
   * **Array of pill objects.**
   * Each object can contain:
   * * `avatar`: An `Avatar` component.
   * * `error`: Adds error styling
   * * `icon`: An `Icon` component.
   * * `id`: A unique identifier string.
   * * `label`: A primary string of text.
   * * `title`: Text that appears on mouse hover. Most helpful for long labels.
   * ```
   * {
   * 	id: '2',
   * 	label: 'Salesforce.com, Inc.',
   * 	title: 'Salesforce.com, Inc. - Want to work here?',
   * },
   * ```
   * `options` with array length of zero will remove this component from the DOM.
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    avatar: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.shape({
      imgSrc: _propTypes.default.string,
      title: _propTypes.default.string,
      variant: _propTypes.default.string
    })]),
    bare: _propTypes.default.bool,
    error: _propTypes.default.bool,
    icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.shape({
      category: _propTypes.default.string,
      name: _propTypes.default.string
    })]),
    id: _propTypes.default.string,
    label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
    title: _propTypes.default.string
  })),

  /**
   * Function called when a pill is clicked
   */
  onClickPill: _propTypes.default.func,

  /**
   * Function called when a pill is requested to be 'removed' via the delete key or 'X' icon click.
   */
  onRequestRemovePill: _propTypes.default.func,

  /**
   * Custom style object to be passed to the pill container
   */
  style: _propTypes.default.object,

  /**
   * Specifies the pill styling at the container level. `bare` removes border styling from all pills.
   */
  variant: _propTypes.default.oneOf(['base', 'bare'])
};
/**
 * A `PillContainer` is a container that holds one or more pills. Use it for a list of pills in a container that resembles an `input` form field. It is not intended for navigation.
 */

var PillContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(PillContainer, _React$Component);

  var _super = _createSuper(PillContainer);

  function PillContainer(props) {
    var _this;

    _classCallCheck(this, PillContainer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getNewActiveOptionIndex", function (_ref) {
      var activeOptionIndex = _ref.activeOptionIndex,
          offset = _ref.offset,
          options = _ref.options;
      var nextIndex = activeOptionIndex + offset;
      return options.length > nextIndex && nextIndex >= 0 ? nextIndex : activeOptionIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlurPill", function () {
      if (!_this.preserveFocus) {
        _this.setState({
          listboxHasFocus: false
        });
      } else {
        _this.preserveFocus = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickPill", function (event, data) {
      if (_this.props.onClickPill) {
        _this.props.onClickPill(event, {
          index: data.index,
          option: data.option
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePillFocus", function (event, data) {
      if (!_this.state.listboxHasFocus) {
        _this.setState({
          activeSelectedOption: data.option,
          activeSelectedOptionIndex: data.index,
          listboxHasFocus: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavigatePillContainer", function (event, _ref2) {
      var direction = _ref2.direction;
      var offsets = {
        next: 1,
        previous: -1
      };

      _this.setState(function (prevState) {
        var options = _this.props.options;
        var isLastOptionAndRightIsPressed = prevState.activeSelectedOptionIndex + 1 === options.length && direction === 'next';
        var isFirstOptionAndLeftIsPressed = prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
        var newState;

        if (isLastOptionAndRightIsPressed) {
          newState = {
            activeSelectedOption: options[0],
            activeSelectedOptionIndex: 0,
            listboxHasFocus: true
          };
        } else if (isFirstOptionAndLeftIsPressed) {
          newState = {
            activeSelectedOption: options[options.length - 1],
            activeSelectedOptionIndex: options.length - 1,
            listboxHasFocus: true
          };
        } else {
          var newIndex = _this.getNewActiveOptionIndex({
            activeOptionIndex: prevState.activeSelectedOptionIndex,
            offset: offsets[direction],
            options: options
          });

          newState = {
            activeSelectedOption: options[newIndex],
            activeSelectedOptionIndex: newIndex,
            listboxHasFocus: true
          };
        }

        _this.preserveFocus = true;
        return newState;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestFocusPillContainer", function (event, _ref3) {
      var ref = _ref3.ref;

      if (ref) {
        _this.activeSelectedOptionRef = ref;

        _this.activeSelectedOptionRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestRemove", function (event, data) {
      if (_this.props.onRequestRemovePill) {
        _this.preserveFocus = true;

        _this.props.onRequestRemovePill(event, {
          index: data.index,
          option: data.option
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resetActiveSelectedOption", function () {
      var options = _this.props.options;
      var activeSelectedOptionIndex = _this.state.activeSelectedOptionIndex;

      if (!options[activeSelectedOptionIndex]) {
        if (options.length > 0 && activeSelectedOptionIndex >= options.length) {
          activeSelectedOptionIndex = options.length - 1;
        } else {
          activeSelectedOptionIndex = 0;
        }
      }

      _this.setState({
        activeSelectedOption: options[activeSelectedOptionIndex] || undefined,
        activeSelectedOptionIndex: activeSelectedOptionIndex,
        listboxHasFocus: !!options[activeSelectedOptionIndex]
      });
    });

    _this.state = {
      // seeding initial state with this.props.options[0]
      activeSelectedOption: _this.props.options && _this.props.options[0] || undefined,
      activeSelectedOptionIndex: 0,
      listboxHasFocus: false
    };
    _this.activeSelectedOptionRef = null;
    _this.generatedId = _shortid.default.generate();
    _this.preserveFocus = false;
    return _this;
  }

  _createClass(PillContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.options && this.props.options.length > 0 && !this.props.options[this.state.activeSelectedOptionIndex] || this.preserveFocus) {
        this.resetActiveSelectedOption();
        this.preserveFocus = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.options.length > 0 ? /*#__PURE__*/_react.default.createElement(_selectedListbox.default, {
        activeOption: this.state.activeSelectedOption,
        activeOptionIndex: this.state.activeSelectedOptionIndex,
        assistiveText: {
          removePill: this.props.assistiveText.removePill,
          selectedListboxLabel: this.props.assistiveText.listboxLabel
        },
        className: this.props.className,
        events: {
          onBlurPill: this.handleBlurPill,
          onClickPill: this.handleClickPill,
          onPillFocus: this.handlePillFocus,
          onRequestFocus: this.handleRequestFocusPillContainer,
          onRequestFocusOnNextPill: this.handleNavigatePillContainer,
          onRequestFocusOnPreviousPill: this.handleNavigatePillContainer,
          onRequestRemove: this.handleRequestRemove
        },
        id: "".concat(this.getId(), "-listbox-of-pill-options"),
        isBare: this.props.variant === 'bare',
        isPillContainer: true,
        labels: this.props.labels,
        listboxHasFocus: this.state.listboxHasFocus,
        renderAtSelectionLength: 0,
        selection: this.props.options,
        style: this.props.style
      }) : null;
    }
  }]);

  return PillContainer;
}(_react.default.Component);

PillContainer.displayName = _constants.PILL_CONTAINER;
PillContainer.defaultProps = {
  assistiveText: {
    listboxLabel: 'Selected Options:',
    removePill: 'Press delete or backspace to remove'
  },
  labels: {
    removePillTitle: 'Remove'
  }
};
PillContainer.propTypes = propTypes;
var _default = PillContainer;
exports.default = _default;