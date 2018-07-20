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

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require("../../utilities/constants");

var _dialog = require("../utilities/dialog");

var _dialog2 = _interopRequireDefault(_dialog);

var _icon = require("../icon");

var _icon2 = _interopRequireDefault(_icon);

var _dialogHelpers = require("../../utilities/dialog-helpers");

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// ### Display Name
// Always use the canonical component name as the React display name.
var displayName = _constants.POPOVER_TOOLTIP;
var propTypes = {
  /**
   * Alignment of the Tooltip relative to the element that triggers it.
   */
  align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']).isRequired,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `tooltipTipLearnMoreIcon`: This text is inside the info icon within the tooltip content and exists to "complete the sentence" for assistive tech users.
   * * `triggerLearnMoreIcon`: This text is inside the info icon that triggers the tooltip in order to have text within the link.
   */
  assistiveText: _propTypes2.default.shape({
    tooltipTipLearnMoreIcon: _propTypes2.default.string,
    triggerLearnMoreIcon: _propTypes2.default.string
  }),

  /**
   * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
   */
  children: _propTypes2.default.node,

  /**
   * Content inside Tooltip.
   */
  content: _propTypes2.default.node.isRequired,

  /**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes2.default.bool,

  /**
   * Delay on Tooltip closing.
   */
  hoverCloseDelay: _propTypes2.default.number,

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
   */
  id: _propTypes2.default.string,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `learnMoreAfter`: This label appears in the tooltip after the info icon.
   * * `learnMoreBefore`: This label appears in the tooltip before the info icon.
   */
  labels: _propTypes2.default.shape({
    learnMoreAfter: _propTypes2.default.string,
    learnMoreBefore: _propTypes2.default.string
  }),

  /**
   * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
   */
  isOpen: _propTypes2.default.bool,

  /**
   * CSS classes to be added to tag with `slds-tooltip-trigger`.
   */
  triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Custom styles to be added to wrapping triggering `div`.
   */
  triggerStyle: _propTypes2.default.object,

  /**
   * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background). This used to be `variant`.
   */
  theme: _propTypes2.default.oneOf(['info', 'error']),

  /**
   * Determines the type of the tooltip.
   */
  variant: _propTypes2.default.oneOf(['base', 'learnMore'])
};
var defaultProps = {
  assistiveText: {
    tooltipTipLearnMoreIcon: 'this link',
    triggerLearnMoreIcon: 'Learn More'
  },
  align: 'top',
  content: _react2.default.createElement("span", null, "Tooltip"),
  labels: {
    learnMoreAfter: 'to learn more.',
    learnMoreBefore: 'Click'
  },
  hoverCloseDelay: 50,
  position: 'absolute',
  theme: 'info',
  variant: 'base'
};
/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "handleCancel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isOpen: false,
          isClosing: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleMouseEnter", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isOpen: true,
          isClosing: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleMouseLeave", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isClosing: true
        });

        setTimeout(function () {
          if (!_this.isUnmounting && _this.state.isClosing) {
            _this.setState({
              isOpen: false,
              isClosing: false
            });
          }
        }, _this.props.hoverCloseDelay);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "saveTriggerRef", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(component) {
        _this.trigger = component; // yes, this is a re-render triggered by a render.
        // Dialog/Popper.js cannot place the popover until
        // the trigger/target DOM node is mounted. This
        // way `findDOMNode` is not called and parent
        // DOM nodes are not queried.

        if (!_this.state.triggerRendered) {
          _this.setState({
            triggerRendered: true
          });
        }
      }
    });
    _this.state = {
      isClosing: false,
      isOpen: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
      (0, _checkProps2.default)(_constants.POPOVER_TOOLTIP, this.props);
      this.generatedId = _shortid2.default.generate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this2 = this;

      var children;

      if (_react2.default.Children.count(this.props.children) === 0) {
        children = [_react2.default.createElement("a", {
          href: "javascript:void(0)",
          onClick: this.props.onClickTrigger
        }, _react2.default.createElement(_icon2.default, {
          category: "utility",
          name: "info",
          assistiveText: {
            label: this.props.assistiveText.triggerLearnMoreIcon
          },
          size: "x-small"
        }))];
      } else {
        children = this.props.children;
      }

      return _react2.default.Children.map(children, function (child, i) {
        return _react2.default.cloneElement(child, {
          key: i,
          'aria-describedby': _this2.getId(),
          onBlur: _this2.handleMouseLeave,
          onFocus: _this2.handleMouseEnter,
          onMouseEnter: _this2.handleMouseEnter,
          onMouseLeave: _this2.handleMouseLeave
        });
      });
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getTooltip",
    value: function getTooltip() {
      var _this3 = this;

      var isOpen = this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;
      var align = this.props.align; // REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)

      var deprecatedWay = this.props.variant === 'error';
      return isOpen ? _react2.default.createElement(_dialog2.default, {
        align: align,
        context: this.context,
        closeOnTabKey: true,
        hasStaticAlignment: this.props.hasStaticAlignment,
        onClose: this.handleCancel,
        onRequestTargetElement: function onRequestTargetElement() {
          return _this3.getTooltipTarget();
        },
        position: this.props.position,
        style: {
          marginBottom: _dialogHelpers.getMargin.bottom(align),
          marginLeft: _dialogHelpers.getMargin.left(align),
          marginRight: _dialogHelpers.getMargin.right(align),
          marginTop: _dialogHelpers.getMargin.top(align)
        },
        variant: "tooltip"
      }, _react2.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames2.default)('slds-popover', 'slds-popover--tooltip', {
          'slds-theme_error': this.props.theme === 'error' || deprecatedWay
        }, (0, _dialogHelpers.getNubbinClassName)(align)),
        role: "tooltip"
      }, this.getTooltipContent())) : _react2.default.createElement("span", null);
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      return _react2.default.createElement("div", {
        className: "slds-popover__body"
      }, this.props.content, this.props.variant === 'learnMore' ? _react2.default.createElement("div", {
        className: "slds-m-top_x-small"
      }, this.props.labels.learnMoreBefore, ' ', _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: this.props.assistiveText.tooltipTipLearnMoreIcon
        },
        category: "utility",
        inverse: true,
        name: "info",
        size: "x-small"
      }), ' ', this.props.labels.learnMoreAfter, ' ') : null);
    }
  }, {
    key: "getTooltipTarget",
    value: function getTooltipTarget() {
      return this.props.target ? this.props.target : this.trigger;
    }
  }, {
    key: "render",
    value: function render() {
      var containerStyles = _objectSpread({
        display: 'inline'
      }, this.props.triggerStyle);

      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)('slds-tooltip-trigger', this.props.triggerClassName),
        style: containerStyles,
        ref: this.saveTriggerRef
      }, this.getContent(), this.getTooltip());
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.contextTypes = {
  iconPath: _propTypes2.default.string
};
Tooltip.displayName = displayName;
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
exports.default = Tooltip;