"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.assign");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _popover = require("../popover");

var _popover2 = _interopRequireDefault(_popover);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * A Filter is a popover with custom trigger. It can be used by [Panel Filtering](/components/panels/). Menus within a Filter Popover will need to not have "portal mounts" and be inline.
 */
var Filter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        popoverIsOpen: _this.props.popover ? _this.props.popover.props.isOpen : false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.id || _this.generatedId;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getCustomPopoverProps", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref2) {
        var assistiveText = _ref2.assistiveText;

        /*
         * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
         */
        var popoverBody = _react2.default.createElement("div", null, _react2.default.createElement("h4", {
          className: "slds-assistive-text",
          id: "".concat(_this.getId(), "-popover-heading")
        }, assistiveText.editFilterHeading), _this.props.children, _react2.default.createElement("div", {
          className: "slds-m-top_small slds-text-align_right"
        }, _react2.default.createElement(_button2.default, {
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

        var popoverProps = (0, _lodash2.default)(defaultPopoverProps, _this.props.popover ? _this.props.popover.props : {});
        delete popoverProps.children;
        return popoverProps;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleFilterClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          popoverIsOpen: true
        });

        if (_this.props.onClick) {
          _this.props.onClick();
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          popoverIsOpen: false
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          popoverIsOpen: false
        });

        if (_this.props.onChange) {
          _this.props.onChange(event, {
            id: _this.getId()
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleRemove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onRemove) {
          _this.props.onRemove(event, {
            id: _this.getId()
          });
        }
      }
    }), _temp));
  }

  _createClass(Filter, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid2.default.generate();
      (0, _checkProps2.default)(_constants.FILTER, _docs2.default);
    }
  }, {
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
      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)('slds-filters__item', 'slds-grid', 'slds-grid_vertical-align-center', {
          'slds-is-locked': this.props.isLocked,
          'slds-is-new': this.props.isNew,
          'slds-has-error': this.props.isError
        }, this.props.className)
      }, !this.props.isLocked && (this.props.children || this.props.popover) ? _react2.default.createElement(_popover2.default, popoverProps, _react2.default.createElement("button", {
        className: "slds-button_reset slds-grow slds-has-blur-focus",
        onClick: this.handleFilterClick,
        "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined
      }, _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.editFilter), this.props.property ? _react2.default.createElement("p", {
        className: "slds-text-body_small"
      }, this.props.property) : null, _react2.default.createElement("p", null, this.props.predicate))) : _react2.default.createElement("button", {
        "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined,
        className: "slds-button_reset slds-grow slds-has-blur-focus",
        disabled: true
      }, _react2.default.createElement("p", {
        className: "slds-text-body_small"
      }, this.props.property), _react2.default.createElement("p", null, this.props.predicate)), // Remove button
      !this.props.isPermanent && !this.props.isLocked ? _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: assistiveText.removeFilter
        },
        hint: true,
        iconCategory: "utility",
        iconName: "close",
        iconSize: "small",
        iconVariant: "bare",
        onClick: this.handleRemove,
        title: assistiveText.removeFilter,
        variant: "icon"
      }) : null);
    }
  }]);

  return Filter;
}(_react2.default.Component);

Object.defineProperty(Filter, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.FILTER
});
Object.defineProperty(Filter, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
     */
    align: _propTypes2.default.oneOf(['left', 'right']),

    /**
     * **Assistive text for accessibility**
     * * `removeFilter`: Assistive text for removing a filter. The default is `Remove Filter: this.props.property this.props.predicate`.
     * * `editFilter`: Assistive text for changing a filter.
     * * `editFilterHeading`: Assistive text for Popover heading.
     */
    assistiveText: _propTypes2.default.shape({
      editFilter: _propTypes2.default.string,
      editFilterHeading: _propTypes2.default.string,
      removeFilter: _propTypes2.default.string
    }),

    /**
     * Contents of popover. That is the dropdowns and inputs that set the filter criteria.
     */
    children: _propTypes2.default.node,

    /**
     * Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Applies error state styling. Per filter error messages are outside this components.
     */
    isError: _propTypes2.default.bool,

    /**
     * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
     */
    id: _propTypes2.default.string,

    /**
     * If true, the filter will not display an editing popover when clicked.
     */
    isLocked: _propTypes2.default.bool,

    /**
     * Applies new filter styling.
     */
    isNew: _propTypes2.default.bool,

    /**
     * If true, the filter will not include a remove button.
     */
    isPermanent: _propTypes2.default.bool,

    /**
     * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
     */
    onChange: _propTypes2.default.func,

    /**
     * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
     */
    onRemove: _propTypes2.default.func,

    /**
     * Will be triggered when Filter is clicked. This is the place to close/open popover if a custom popover is passed in
     */
    onClick: _propTypes2.default.func,

    /**
     * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Filter's Popover dialog to be a controlled component. _Tested with Mocha framework._
     */
    popover: _propTypes2.default.node,

    /**
     * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
     */
    predicate: _propTypes2.default.node,

    /**
     * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
     */
    property: _propTypes2.default.node
  }
});
Object.defineProperty(Filter, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    align: 'left',
    assistiveText: {
      editFilter: 'Edit filter:',
      editFilterHeading: 'Choose filter criteria'
    },
    predicate: 'New Filter'
  }
});
exports.default = Filter;