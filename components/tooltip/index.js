"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _constants = require("../../utilities/constants");

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _iconSettings = require("../icon-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

// ### Display Name
// Always use the canonical component name as the React display name.
var displayName = _constants.POPOVER_TOOLTIP;
var propTypes = {
  /**
   * Alignment of the Tooltip relative to the element that triggers it.
   */
  align: _propTypes.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']).isRequired,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `tooltipTipLearnMoreIcon`: This text is inside the info icon within the tooltip content and exists to "complete the sentence" for assistive tech users.
   * * `triggerLearnMoreIcon`: This text is inside the info icon that triggers the tooltip in order to have text within the link.
   */
  assistiveText: _propTypes.default.shape({
    tooltipTipLearnMoreIcon: _propTypes.default.string,
    triggerLearnMoreIcon: _propTypes.default.string
  }),

  /**
   * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
   */
  children: _propTypes.default.node,

  /**
   * Content inside Tooltip.
   */
  content: _propTypes.default.node.isRequired,

  /**
   * CSS classes to be added to the popover dialog. That is the element with `.slds-popover` on it.
   */
  dialogClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Enabling this hides the default nubbin, replacing it with one attached directly to the tooltip trigger. Note: `hasStaticAlignment` should be set to `true` if using this feature as auto-flipping anchored nubbins are not currently supported.
   */
  hasAnchoredNubbin: _propTypes.default.bool,

  /**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * Delay on Tooltip closing in milliseconds. Defaults to 50
   */
  hoverCloseDelay: _propTypes.default.number,

  /**
   * Delay on Tooltip opening in milliseconds. Defaults to 0
   */
  hoverOpenDelay: _propTypes.default.number,

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
   */
  id: _propTypes.default.string,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `learnMoreAfter`: This label appears in the tooltip after the info icon.
   * * `learnMoreBefore`: This label appears in the tooltip before the info icon.
   */
  labels: _propTypes.default.shape({
    learnMoreAfter: _propTypes.default.string,
    learnMoreBefore: _propTypes.default.string
  }),

  /**
   * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
   */
  isOpen: _propTypes.default.bool,

  /**
   * Callback that returns an element or React `ref` to align the Tooltip with.
   */
  onRequestTargetElement: _propTypes.default.func,

  /**
   * CSS classes to be added to tag with `slds-tooltip-trigger`.
   */
  triggerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  position: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Custom styles to be added to wrapping triggering `div`.
   */
  triggerStyle: _propTypes.default.object,

  /**
   * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background). This used to be `variant`.
   */
  theme: _propTypes.default.oneOf(['info', 'error']),

  /**
   * Determines the type of the tooltip.
   */
  variant: _propTypes.default.oneOf(['base', 'learnMore', 'list-item'])
};
var defaultProps = {
  assistiveText: {
    tooltipTipLearnMoreIcon: 'this link',
    triggerLearnMoreIcon: 'Help'
  },
  align: 'top',
  // eslint-disable-next-line react/jsx-curly-brace-presence
  content: /*#__PURE__*/_react.default.createElement("span", null, 'Tooltip'),
  labels: {
    learnMoreAfter: 'to learn more.',
    learnMoreBefore: 'Click'
  },
  hoverCloseDelay: 50,
  hoverOpenDelay: 0,
  position: 'absolute',
  theme: 'info',
  variant: 'base'
};
/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */

var Tooltip = /*#__PURE__*/function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  var _super = _createSuper(Tooltip);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      clearTimeout(_this.tooltipTimeout);

      _this.setState({
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      clearTimeout(_this.tooltipTimeout);
      _this.tooltipTimeout = setTimeout(function () {
        if (!_this.isUnmounting) {
          _this.setState({
            isOpen: true
          });
        }
      }, _this.props.hoverOpenDelay);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      clearTimeout(_this.tooltipTimeout);
      _this.tooltipTimeout = setTimeout(function () {
        if (!_this.isUnmounting) {
          _this.setState({
            isOpen: false
          });
        }
      }, _this.props.hoverCloseDelay);
    });

    _defineProperty(_assertThisInitialized(_this), "saveTriggerRef", function (component) {
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
    });

    _this.state = {
      isOpen: false
    };
    _this.tooltipTimeout = {}; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.POPOVER_TOOLTIP, props, _component.default);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "getAnchoredNubbinStyles",
    value: function getAnchoredNubbinStyles() {
      if (this.props.hasAnchoredNubbin) {
        var alignment = this.props.align.split(' ')[0];
        var nubbinContainerStyles = {
          height: '0',
          position: 'relative',
          width: '0'
        };
        var nubbinStyles = {
          backgroundColor: '#16325c',
          content: '',
          height: '1rem',
          position: 'absolute',
          transform: 'rotate(45deg)',
          width: '1rem'
        };
        var triggerDimensions = {
          height: this.trigger ? this.trigger.getBoundingClientRect().height : 0,
          width: this.trigger ? this.trigger.getBoundingClientRect().width : 0
        };

        switch (alignment) {
          case 'bottom':
            {
              nubbinContainerStyles.left = "".concat(triggerDimensions.width / 2, "px");
              nubbinContainerStyles.top = "".concat(triggerDimensions.height, "px");
              nubbinStyles.left = '-8px';
              nubbinStyles.top = '3px';
              break;
            }

          case 'left':
            {
              nubbinContainerStyles.left = '0';
              nubbinContainerStyles.top = "".concat(triggerDimensions.height / 2, "px");
              nubbinStyles.left = '-19px';
              nubbinStyles.top = '-9px';
              break;
            }

          case 'right':
            {
              nubbinContainerStyles.left = "".concat(triggerDimensions.width, "px");
              nubbinContainerStyles.top = "".concat(triggerDimensions.height / 2, "px");
              nubbinStyles.left = '3px';
              nubbinStyles.top = '-9px';
              break;
            }

          default:
            {
              nubbinContainerStyles.left = "".concat(triggerDimensions.width / 2, "px");
              nubbinContainerStyles.top = '0';
              nubbinStyles.left = '-8px';
              nubbinStyles.top = '-19px';
            }
        }

        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", null, "#".concat(this.getId(), ":after, #").concat(this.getId(), ":before {\n\tdisplay: none;\n}")), this.getIsOpen() ? /*#__PURE__*/_react.default.createElement("div", {
          style: nubbinContainerStyles
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: nubbinStyles
        })) : null);
      }

      return null;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this2 = this;

      var children;
      var noChildrenProvided = _react.default.Children.count(this.props.children) === 0;

      if (noChildrenProvided && this.props.onClickTrigger) {
        children = [/*#__PURE__*/_react.default.createElement("a", {
          href: "#",
          onClick: _event.default.trappedHandler(this.props.onClickTrigger)
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "info",
          assistiveText: {
            label: this.props.assistiveText.triggerLearnMoreIcon
          },
          size: "x-small"
        }))];
      } else if (noChildrenProvided) {
        children = [/*#__PURE__*/_react.default.createElement(_button.default, {
          "aria-disabled": true,
          assistiveText: {
            icon: this.props.assistiveText.triggerLearnMoreIcon
          },
          iconCategory: "utility",
          iconName: "info",
          variant: "icon"
        })];
      } else {
        // eslint-disable-next-line prefer-destructuring
        children = this.props.children;
      }

      return _react.default.Children.map(children, function (child, i) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          key: i,
          // eslint-disable-line react/no-array-index-key
          'aria-describedby': _this2.getIsOpen() ? _this2.getId() : undefined,
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
    key: "getIsOpen",
    value: function getIsOpen() {
      return this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;
    }
  }, {
    key: "getTooltip",
    value: function getTooltip() {
      var _this3 = this;

      var isOpen = this.getIsOpen();
      var align = this.props.align; // REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)

      var deprecatedWay = this.props.variant === 'error';
      return isOpen ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
        closeOnTabKey: true,
        hasNubbin: true,
        contentsClassName: (0, _classnames.default)('slds-popover', 'slds-popover_tooltip', {
          'slds-theme_error': this.props.theme === 'error' || deprecatedWay
        }, this.props.dialogClassName),
        align: align,
        context: this.context,
        hasStaticAlignment: this.props.hasStaticAlignment,
        onClose: this.handleCancel,
        onRequestTargetElement: function onRequestTargetElement() {
          return _this3.getTooltipTarget();
        },
        position: this.props.position,
        variant: "tooltip",
        containerProps: {
          id: this.getId()
        }
      }, this.getTooltipContent()) : /*#__PURE__*/_react.default.createElement("span", null);
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-popover__body"
      }, this.props.content, this.props.variant === 'learnMore' && this.props.onClickTrigger ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-m-top_x-small",
        "aria-hidden": "true"
      }, this.props.labels.learnMoreBefore, ' ', /*#__PURE__*/_react.default.createElement(_icon.default, {
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
      if (this.props.onRequestTargetElement) {
        return this.props.onRequestTargetElement();
      } // for backwards compatibility


      if (this.props.target) {
        return this.props.target;
      }

      return this.trigger;
    }
  }, {
    key: "render",
    value: function render() {
      var containerStyles = _objectSpread({
        display: 'inline-block',
        lineHeight: '1'
      }, this.props.triggerStyle);

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-tooltip-trigger', this.props.triggerClassName),
        style: containerStyles,
        ref: this.saveTriggerRef
      }, this.getAnchoredNubbinStyles(), this.getContent(), this.getTooltip());
    }
  }]);

  return Tooltip;
}(_react.default.Component);

Tooltip.contextType = _iconSettings.IconSettingsContext;
Tooltip.displayName = displayName;
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
var _default = Tooltip;
exports.default = _default;