"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverNubbinPositions = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _shortid = _interopRequireDefault(require("shortid"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _button = _interopRequireDefault(require("../button"));

var _mediaObject = _interopRequireDefault(require("../media-object"));

var _icon = _interopRequireDefault(require("../icon"));

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _keyboardNavigableDialog = _interopRequireDefault(require("../../utilities/keyboard-navigable-dialog"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _constants = require("../../utilities/constants");

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

var documentDefined = typeof document !== 'undefined'; // The overlay is an optional way to allow the popover to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all popovers in the app.

var overlay = documentDefined ? document.createElement('span') : {
  style: {}
};
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';
var currentOpenPopover; // FIXME - what is this exported for? Probably needs to be deprecated.

var PopoverNubbinPositions = ['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right'];
exports.PopoverNubbinPositions = PopoverNubbinPositions;
var defaultProps = {
  align: 'right',
  assistiveText: {
    closeButton: 'Close dialog'
  },
  hasNoCloseButton: false,
  hasNoNubbin: false,
  hoverCloseDelay: 300,
  openOn: 'click',
  position: 'absolute',
  variant: 'base'
};
/**
 * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked. Multiple popovers open at the same time, each with focus trap is not supported.
 */

var Popover = /*#__PURE__*/function (_React$Component) {
  _inherits(Popover, _React$Component);

  var _super = _createSuper(Popover);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function Popover(_props) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsOpen", function () {
      return !_this.props.disabled && !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "getMenu", function () {
      return (// needed by keyboard navigation
        _this.dialog
      );
    });

    _defineProperty(_assertThisInitialized(_this), "getTargetElement", function () {
      return _this.props.onRequestTargetElement && _this.props.onRequestTargetElement() ? _this.props.onRequestTargetElement() : _this.trigger;
    });

    _defineProperty(_assertThisInitialized(_this), "setMenuRef", function (component) {
      _this.dialog = component;
    });

    _defineProperty(_assertThisInitialized(_this), "setContainerRef", function (component) {
      _this.trigger = component; // yes, this is a re-render triggered by a render.
      // Dialog/Popper.js cannot place the popover until
      // the trigger/target DOM node is mounted. This
      // way `findDOMNode` is not called and parent
      // DOM nodes are not queried.

      if (!_this.state.inputRendered) {
        _this.setState({
          inputRendered: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDialogClose", function (event, data) {
      var componentWillUnmount = data && data.componentWillUnmount || false;

      if (currentOpenPopover === _assertThisInitialized(_this)) {
        currentOpenPopover = undefined;
      }

      if (_this.props.onClose) {
        _this.props.onClose(event, {
          // Breaking change: component object reference has been
          // removed (`this`), due to endless loop creation.
          componentWillUnmount: componentWillUnmount
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (event, data) {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        // call even if closed
        if (_this.props.onRequestClose) {
          _this.props.onRequestClose(event, data);
        }

        if (currentOpenPopover === _assertThisInitialized(_this)) {
          currentOpenPopover = undefined;
        }

        _this.setState({
          isOpen: false
        });

        _this.isHover = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        if (currentOpenPopover && (0, _lodash.default)(currentOpenPopover.handleClose)) {
          currentOpenPopover.handleClose(undefined, {
            trigger: 'newPopover',
            id: currentOpenPopover.getId()
          });
        }

        currentOpenPopover = _assertThisInitialized(_this);

        _this.setState({
          isOpen: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (event) {
      var isOpen = _this.getIsOpen();

      _this.isHover = true;

      if (!isOpen && _this.props.openOn === 'hover') {
        _this.handleOpen();
      } else {
        // we want this clear when openOn is hover or hybrid
        clearTimeout(_this.isClosing);
      }

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (event) {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        _this.isClosing = setTimeout(function () {
          _this.handleClose();
        }, _this.props.hoverCloseDelay);
      }

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event, _ref) {
      var triggerOnClickCallback = _ref.triggerOnClickCallback;

      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        _this.handleOpen();
      } else {
        _this.handleClose();
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (triggerOnClickCallback) {
        triggerOnClickCallback(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        _this.handleOpen();
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.keyCode) {
        if (event.keyCode !== _keyCode.default.TAB) {
          var isOpen = _this.getIsOpen();

          (0, _keyboardNavigableDialog.default)({
            event: event,
            isOpen: isOpen,
            handleClick: _this.handleClick,
            key: event.key,
            keyCode: event.keyCode,
            targetTarget: event.target,
            toggleOpen: _this.toggleOpenFromKeyboard,
            trigger: _this.trigger
          });
        }

        if (_this.props.onKeyDown) {
          _this.props.onKeyDown(event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (event) {
      _this.handleClose(event, {
        trigger: 'cancel'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.handleClose(event, {
        trigger: 'clickOutside'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpenFromKeyboard", function (event) {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        _this.handleCancel(event);
      } else {
        _this.handleOpen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderDialog", function (isOpen, outsideClickIgnoreClass) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var offset = props.offset;

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), _this.props.assistiveText);

      var closeButtonAssistiveText = props.closeButtonAssistiveText || assistiveText.closeButton; // HEADER SUB-RENDERS

      var hasThemedHeader = _this.props.variant === 'error' || _this.props.variant === 'warning';
      var hasDefinedHeader = _this.props.heading || hasThemedHeader;
      var headerIcon = {
        error: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "error",
          size: "x-small",
          inverse: true
        }),
        warning: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "warning",
          size: "x-small",
          inverse: true
        })
      };
      var headerVariants = {
        base: /*#__PURE__*/_react.default.createElement("header", {
          className: (0, _classnames.default)('slds-popover__header', {
            'slds-p-vertical_medium': props.variant === 'walkthrough'
          })
        }, /*#__PURE__*/_react.default.createElement("h2", {
          id: _this.props.ariaLabelledby || "".concat(_this.getId(), "-dialog-heading"),
          className: (0, _classnames.default)({
            'slds-text-heading_small': props.variant !== 'walkthrough',
            'slds-text-heading_medium': props.variant === 'walkthrough'
          })
        }, _this.props.heading)),
        themed: /*#__PURE__*/_react.default.createElement("header", {
          className: "slds-popover__header"
        }, /*#__PURE__*/_react.default.createElement(_mediaObject.default, {
          body: /*#__PURE__*/_react.default.createElement("h2", {
            id: _this.props.ariaLabelledby || "".concat(_this.getId(), "-dialog-heading"),
            className: "slds-truncate slds-text-heading_medium",
            title: props.heading
          }, props.heading),
          figure: headerIcon[_this.props.variant],
          verticalCenter: true
        }))
      };
      var header = null;

      if (hasDefinedHeader && props.variant !== 'walkthrough-action' && props.variant !== 'feature') {
        header = headerVariants[hasThemedHeader ? 'themed' : 'base'];
      } // BODY SUB-RENDERS


      var body = null;

      if (props.variant === 'error' || props.variant === 'warning') {
        body = /*#__PURE__*/_react.default.createElement("div", {
          id: "".concat(_this.getId(), "-dialog-body"),
          className: (0, _classnames.default)('slds-popover__body', _this.props.classNameBody)
        }, props.body);
      } else if (props.variant === 'walkthrough-action' || props.variant === 'feature') {
        body = /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)('slds-popover__body', _this.props.classNameBody),
          id: "".concat(_this.getId(), "-dialog-body")
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-media"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-media__figure"
        }, props.variant === 'walkthrough-action' ? /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "touch_action",
          size: "small",
          inverse: true
        }) : _this.props.icon), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-media__body"
        }, props.heading ? /*#__PURE__*/_react.default.createElement("h2", {
          id: _this.props.ariaLabelledby || "".concat(_this.getId(), "-dialog-heading"),
          className: "slds-text-heading_small"
        }, props.heading) : null, props.body, props.stepText ? /*#__PURE__*/_react.default.createElement("p", {
          className: "slds-m-top_medium slds-text-title"
        }, props.stepText) : null)));
      } else {
        body =
        /*#__PURE__*/
        // DEFAULT - NOT SCROLLABLE
        _react.default.createElement("div", {
          id: "".concat(_this.getId(), "-dialog-body"),
          className: (0, _classnames.default)('slds-popover__body', _this.props.classNameBody)
        }, props.body);
      } // FOOTER SUB-RENDERS


      var footer = null;

      if (props.footer) {
        footer = /*#__PURE__*/_react.default.createElement("footer", {
          className: (0, _classnames.default)('slds-popover__footer', _this.props.classNameFooter, _this.props.footerClassName),
          style: _this.props.footerStyle
        }, _this.props.footer);
      } else if (props.variant !== 'walkthrough-action' && (props.footerWalkthroughActions || props.stepText)) {
        footer = /*#__PURE__*/_react.default.createElement("footer", {
          className: "slds-popover__footer"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-grid slds-grid_vertical-align-center"
        }, props.stepText ? /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-text-title"
        }, props.stepText) : null, props.footerWalkthroughActions ? /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-col_bump-left",
          style: {
            display: 'inline-block'
          }
        }, props.footerWalkthroughActions) : null));
      } // MAIN RENDER


      return isOpen ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
        hasNubbin: !_this.props.hasNoNubbin,
        align: props.align,
        contentsClassName: (0, _classnames.default)(_this.props.contentsClassName, 'ignore-react-onclickoutside', 'slds-popover', {
          'slds-popover_error': props.variant === 'error'
        }, {
          'slds-popover_walkthrough': props.variant === 'walkthrough' || props.variant === 'walkthrough-action' || props.variant === 'feature'
        }, {
          'slds-popover_walkthrough-alt': props.variant === 'walkthrough-action'
        }, {
          'slds-popover_feature': props.variant === 'feature'
        }, {
          'slds-popover_warning': props.variant === 'warning'
        }, props.className),
        context: _this.context,
        hasStaticAlignment: props.hasStaticAlignment,
        offset: offset,
        onCancel: _this.handleClose,
        onClose: _this.handleDialogClose,
        onOpen: _this.props.onOpen,
        onKeyDown: _this.handleKeyDown,
        onMouseEnter: props.openOn === 'hover' ? _this.handleMouseEnter : null,
        onMouseLeave: props.openOn === 'hover' ? _this.handleMouseLeave : null,
        outsideClickIgnoreClass: outsideClickIgnoreClass,
        onRequestTargetElement: function onRequestTargetElement() {
          return _this.getTargetElement();
        },
        position: _this.props.position,
        style: _this.props.style,
        variant: "popover",
        ref: _this.setMenuRef,
        containerProps: {
          id: "".concat(_this.getId(), "-popover"),
          'aria-labelledby': _this.props.ariaLabelledby || "".concat(_this.getId(), "-dialog-heading"),
          'aria-describedby': "".concat(_this.getId(), "-dialog-body")
        }
      }, !_this.props.hasNoCloseButton && /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: closeButtonAssistiveText
        },
        iconCategory: "utility",
        iconName: "close",
        className: (0, _classnames.default)('slds-button slds-button_icon-small slds-float_right slds-popover__close slds-button_icon', {
          'slds-button_icon-inverse': props.variant === 'walkthrough' || props.variant === 'walkthrough-action' || props.variant === 'feature'
        }),
        onClick: _this.handleCancel,
        variant: "icon",
        inverse: _this.props.variant === 'error' || _this.props.variant === 'warning'
      }), header, body, footer) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderOverlay", function (isOpen) {
      if ((0, _lodash.default)(overlay) && documentDefined) {
        overlay(isOpen, overlay);
      } else if (_this.props.overlay && isOpen && !_this.overlay && documentDefined) {
        _this.overlay = overlay;
        document.querySelector('body').appendChild(_this.overlay);
      } else if (!isOpen && _this.overlay && _this.overlay.parentNode) {
        _this.overlay.parentNode.removeChild(_this.overlay);

        _this.overlay = undefined;
      }
    });

    _this.generatedId = _shortid.default.generate(); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.POPOVER, _props, _component.default);
    return _this;
  }

  _createClass(Popover, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (currentOpenPopover === this) {
        currentOpenPopover = undefined;
      }

      this.isUnmounting = true;
      this.renderOverlay(false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var otherChildren = [];
      var outsideClickIgnoreClass = "ignore-click-".concat(this.getId());
      var clonedTrigger = null;

      _react.default.Children.forEach(this.props.children, function (child, index) {
        if (index === 0) {
          clonedTrigger = /*#__PURE__*/_react.default.cloneElement(child, _objectSpread({
            'aria-haspopup': 'dialog',
            id: _this2.getId(),
            onClick: _this2.props.openOn === 'click' || _this2.props.openOn === 'hybrid' ? function (event) {
              _this2.handleClick(event, {
                triggerOnClickCallback: child.props.onClick
              });
            } : child.props.onClick,
            onFocus: _this2.props.openOn === 'hover' ? _this2.handleFocus : null,
            onMouseDown: _this2.props.onMouseDown,
            onMouseEnter: _this2.props.openOn === 'hover' || _this2.props.openOn === 'hybrid' ? _this2.handleMouseEnter : null,
            onMouseLeave: _this2.props.openOn === 'hover' || _this2.props.openOn === 'hybrid' ? _this2.handleMouseLeave : null,
            tabIndex: child.props.tabIndex || '0'
          }, child.props));
        } else {
          // eslint-disable-next-line fp/no-mutating-methods
          otherChildren.push(child);
        }
      });

      this.renderOverlay(this.getIsOpen());
      var containerStyles = {
        display: this.props.hasNoTriggerStyles ? undefined : 'inline-block'
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.triggerClassName,
        style: containerStyles,
        ref: this.setContainerRef
      }, clonedTrigger, otherChildren.length > 0 ? otherChildren : null, this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass));
    }
  }]);

  return Popover;
}(_react.default.Component);

_defineProperty(Popover, "displayName", _constants.POPOVER);

_defineProperty(Popover, "propTypes", {
  /**
   * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
   */
  align: _propTypes.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']),

  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `closeButton`: This is a visually hidden label for the close button.
   */
  assistiveText: _propTypes.default.shape({
    closeButton: _propTypes.default.string
  }),

  /**
   * HTML `id` of heading for popover. Only use if your header is within your popover body.
   */
  ariaLabelledby: _propTypes.default.string,

  /**
   * Multiple children of any kind are allowed, but the first child must serve as the trigger component. Many props will be passed into this trigger related to popover interactions. The trigger needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
   */
  children: _propTypes.default.node.isRequired,

  /**
   * The contents of the popover. This should also accept arrays.
   */
  body: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array]).isRequired,

  /**
   * CSS classes to be added to the popover footer. That is the element with `.slds-popover__body` on it.
   */
  classNameBody: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to the popover footer. That is the element with `.slds-popover__footer` on it.
   */
  classNameFooter: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
   */
  disabled: _propTypes.default.bool,

  /**
   * A footer is an optional. Buttons are often placed here.
   */
  footer: _propTypes.default.node,

  /**
   * An object of CSS styles that are applied to the `slds-popover__footer` DOM element.
   */
  footerStyle: _propTypes.default.object,

  /**
   * Used with `walkthrough` variant to provide action buttons (ex: "Next" / "Skip" / etc) for a walkthrough popover footer. Accepts either a single node or array of nodes for multiple buttons.
   */
  footerWalkthroughActions: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]),

  /**
   * Determines if the popover has a close button or not. Default is `false`
   */
  hasNoCloseButton: _propTypes.default.bool,

  /**
   * Determines if the popover has a nubbin or not. Default is `false`
   */
  hasNoNubbin: _propTypes.default.bool,

  /**
   * Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen. When enabled, `position` `absolute` is used.
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * Removes `display:inline-block` from the trigger button.
   */
  hasNoTriggerStyles: _propTypes.default.bool,

  /**
   * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag, or in an h2 within the popover body if used with `variant="walkthrough-action"`. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Icon displayed in the `feature` variant
   */
  icon: _propTypes.default.node,

  /**
   * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
   */
  id: _propTypes.default.string,

  /**
   * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
   */
  isOpen: _propTypes.default.bool,

  /**
   * This function is passed onto the triggering `Button`. Triggered when the trigger button is clicked. You will want this if Popover is to be a controlled component.
   */
  onClick: _propTypes.default.func,

  /**
   * This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM. This function returns `{event, { trigger, componentWillUnmount }`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
   */
  onClose: _propTypes.default.func,

  /**
   * Called when a key is pressed.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Called when mouse clicks down on the trigger button.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * This function is triggered when the Dialog child component (that is the actual popover) is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
   */
  onOpen: _propTypes.default.func,

  /**
   * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
   */
  onRequestClose: _propTypes.default.func,

  /**
   * Callback that returns an element or React `ref` to align the Popover with. If the target element has not been rendered yet, the popover will use the triggering element as the attachment target instead. NOTE: `position="relative"` is not compatible with custom targets that are not the triggering element.
   */
  onRequestTargetElement: _propTypes.default.func,

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing. NOTE: this setting is not compatible with custom targets outside the trigger
   */
  position: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Used with `walkthrough` variant to provide the step text (ex: "Step 1 of 4") for a walkthrough popover footer. If used with `variant="walkthrough-action"`, it will be placed in the popover body.
   */
  stepText: _propTypes.default.string,

  /**
   * An object of CSS styles that are applied to the `slds-popover` DOM element.
   */
  style: _propTypes.default.object,

  /**
   * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
   */
  overlay: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),

  /**
   * CSS classes to be added to wrapping trigger `div` around the button.
   */
  triggerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Determines the type of the popover. `error` and `warning` allows the  content body to scroll. Default is `base` _Tested with snaphots._
   */
  variant: _propTypes.default.oneOf(['base', 'error', 'feature', 'walkthrough', 'walkthrough-action', 'warning'])
});

_defineProperty(Popover, "defaultProps", defaultProps);

Popover.contextType = _iconSettings.IconSettingsContext;
var _default = Popover;
exports.default = _default;