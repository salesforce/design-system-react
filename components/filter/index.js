"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _button = _interopRequireDefault(require("../button"));

var _popover = _interopRequireDefault(require("../popover"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

/**
 * A Filter is a popover with custom trigger. It can be used by [Panel Filtering](/components/panels/). Menus within a Filter Popover will need to not have "portal mounts" and be inline.
 */
var Filter = /*#__PURE__*/function (_React$Component) {
  _inherits(Filter, _React$Component);

  var _super = _createSuper(Filter);

  function Filter(props) {
    var _this;

    _classCallCheck(this, Filter);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      popoverIsOpen: _this.props.popover ? _this.props.popover.props.isOpen : false
    });

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getCustomPopoverProps", function (_ref) {
      var assistiveText = _ref.assistiveText;

      /*
       * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
       */
      var popoverBody = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", {
        className: "slds-assistive-text",
        id: "".concat(_this.getId(), "-popover-heading")
      }, assistiveText.editFilterHeading), _this.props.children, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-m-top_small slds-text-align_right"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        className: "slds-col_bump-left",
        label: "Done",
        onClick: _this.handleChange
      })));

      var defaultPopoverProps = {
        ariaLabelledby: "".concat(_this.getId(), "-popover-heading"),
        align: _this.props.align,
        body: popoverBody,
        heading: '',
        id: _this.getId(),
        isOpen: _this.state.popoverIsOpen,
        // MAGIC NUMBERS - REMOVE/REDESIGN WHEN DESIGN FOR RIGHT-ALIGNED FILTERS ARE ADDED TO SLDS
        offset: _this.props.align === 'right' ? '0px -35px' : undefined,
        onClose: _this.handleClose,
        onRequestClose: _this.handleClose,
        position: 'overflowBoundaryElement',
        triggerClassName: 'slds-grow'
      };
      /* Mixin passed popover's props if there is any to override the default popover props */

      var popoverProps = (0, _lodash.default)(defaultPopoverProps, _this.props.popover ? _this.props.popover.props : {}); // eslint-disable-next-line fp/no-delete

      delete popoverProps.children;
      return popoverProps;
    });

    _defineProperty(_assertThisInitialized(_this), "handleFilterClick", function () {
      _this.setState({
        popoverIsOpen: true
      });

      if (_this.props.onClick) {
        _this.props.onClick();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        popoverIsOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      _this.setState({
        popoverIsOpen: false
      });

      if (_this.props.onChange) {
        _this.props.onChange(event, {
          id: _this.getId()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (event) {
      if (_this.props.onRemove) {
        _this.props.onRemove(event, {
          id: _this.getId()
        });
      }
    });

    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(Filter, [{
    key: "render",
    value: function render() {
      /* Remove at next breaking change */
      var assistiveText = {
        editFilter: this.props.assistiveTextEditFilter || // eslint-disable-line react/prop-types
        this.props.assistiveText.editFilter,
        editFilterHeading: this.props.assistiveTextEditFilterHeading || // eslint-disable-line react/prop-types
        this.props.assistiveText.editFilterHeading,
        removeFilter: this.props.assistiveTextRemoveFilter || // eslint-disable-line react/prop-types
        this.props.assistiveText.removeFilter || "Remove Filter: ".concat(this.props.property, " ").concat(this.props.predicate)
      };
      /* TODO: Button wrapper for property and predictate should be transitioned to `Button` component. `Button` needs to take custom children first though. */

      var popoverProps = this.getCustomPopoverProps({
        assistiveText: assistiveText
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-filters__item', 'slds-grid', 'slds-grid_vertical-align-center', {
          'slds-is-locked': this.props.isLocked,
          'slds-is-new': this.props.isNew,
          'slds-has-error': this.props.isError
        }, this.props.className)
      }, !this.props.isLocked && (this.props.children || this.props.popover) ? /*#__PURE__*/_react.default.createElement(_popover.default, _extends({}, popoverProps, {
        silenceDeprecatedPropertyWarning: true
      }), /*#__PURE__*/_react.default.createElement("button", {
        className: "slds-button_reset slds-grow slds-has-blur-focus",
        onClick: this.handleFilterClick,
        "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined,
        type: "button"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.editFilter), this.props.property ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-show slds-text-body_small"
      }, this.props.property) : null, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-show"
      }, this.props.predicate))) : /*#__PURE__*/_react.default.createElement("button", {
        "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined,
        className: "slds-button_reset slds-grow slds-has-blur-focus",
        disabled: true,
        type: "button"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-show slds-text-body_small"
      }, this.props.property), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-show"
      }, this.props.predicate)), // Remove button
      !this.props.isPermanent && !this.props.isLocked ? /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: assistiveText.removeFilter
        },
        hint: true,
        iconCategory: "utility",
        iconName: "delete",
        iconSize: "small",
        iconVariant: "bare",
        onClick: this.handleRemove,
        title: assistiveText.removeFilter,
        variant: "icon"
      }) : null);
    }
  }]);

  return Filter;
}(_react.default.Component);

_defineProperty(Filter, "displayName", _constants.FILTER);

_defineProperty(Filter, "propTypes", {
  /**
   * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
   */
  align: _propTypes.default.oneOf(['left', 'right']),

  /**
   * **Assistive text for accessibility**
   * * `removeFilter`: Assistive text for removing a filter. The default is `Remove Filter: this.props.property this.props.predicate`.
   * * `editFilter`: Assistive text for changing a filter.
   * * `editFilterHeading`: Assistive text for Popover heading.
   */
  assistiveText: _propTypes.default.shape({
    editFilter: _propTypes.default.string,
    editFilterHeading: _propTypes.default.string,
    removeFilter: _propTypes.default.string
  }),

  /**
   * Contents of popover. That is the dropdowns and inputs that set the filter criteria.
   */
  children: _propTypes.default.node,

  /**
   * Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Applies error state styling. Per filter error messages are outside this components.
   */
  isError: _propTypes.default.bool,

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
   */
  id: _propTypes.default.string,

  /**
   * If true, the filter will not display an editing popover when clicked.
   */
  isLocked: _propTypes.default.bool,

  /**
   * Applies new filter styling.
   */
  isNew: _propTypes.default.bool,

  /**
   * If true, the filter will not include a remove button.
   */
  isPermanent: _propTypes.default.bool,

  /**
   * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
   */
  onChange: _propTypes.default.func,

  /**
   * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
   */
  onRemove: _propTypes.default.func,

  /**
   * Will be triggered when Filter is clicked. This is the place to close/open popover if a custom popover is passed in
   */
  onClick: _propTypes.default.func,

  /**
   * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Filter's Popover dialog to be a controlled component. _Tested with Mocha framework._
   */
  popover: _propTypes.default.node,

  /**
   * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
   */
  predicate: _propTypes.default.node,

  /**
   * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
   */
  property: _propTypes.default.node
});

_defineProperty(Filter, "defaultProps", {
  align: 'left',
  assistiveText: {
    editFilter: 'Edit filter:',
    editFilterHeading: 'Choose filter criteria'
  },
  predicate: 'New Filter'
});

var _default = Filter;
exports.default = _default;