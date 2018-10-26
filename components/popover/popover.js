"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverNubbinPositions = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _dialog = require("../utilities/dialog");

var _dialog2 = _interopRequireDefault(_dialog);

var _keyboardNavigableDialog = require("../../utilities/keyboard-navigable-dialog");

var _keyboardNavigableDialog2 = _interopRequireDefault(_keyboardNavigableDialog);

var _keyCode = require("../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _constants = require("../../utilities/constants");

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
var defaultProps = {
  align: 'right',
  assistiveText: {
    closeButton: 'Close dialog'
  },
  hoverCloseDelay: 300,
  openOn: 'click',
  position: 'absolute'
};
/**
 * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked. Multiple popovers open at the same time, each with focus trap is not supported.
 */

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popover, _React$Component);

  function Popover() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Popover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Popover.__proto__ || Object.getPrototypeOf(Popover)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        isOpen: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.id || _this.generatedId;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getIsOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return !_this.props.disabled && !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getMenu", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return (// needed by keyboard navigation
          _this.dialog
        );
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "setMenuRef", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(component) {
        _this.dialog = component;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "setContainerRef", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(component) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleDialogClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var isOpen = _this.getIsOpen();

        if (!isOpen) {
          if (currentOpenPopover && (0, _lodash2.default)(currentOpenPopover.handleClose)) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleMouseEnter", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleMouseLeave", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var isOpen = _this.getIsOpen();

        if (isOpen) {
          _this.isClosing = setTimeout(function () {
            _this.handleClose();
          }, _this.props.hoverCloseDelay);
        }

        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave(event);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref2) {
        var triggerOnClickCallback = _ref2.triggerOnClickCallback;

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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var isOpen = _this.getIsOpen();

        if (!isOpen) {
          _this.handleOpen();
        }

        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode) {
          if (event.keyCode !== _keyCode2.default.TAB) {
            var isOpen = _this.getIsOpen();

            (0, _keyboardNavigableDialog2.default)({
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleCancel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.handleClose(event, {
          trigger: 'cancel'
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClickOutside", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.handleClose(event, {
          trigger: 'clickOutside'
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleOpenFromKeyboard", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var isOpen = _this.getIsOpen();

        if (isOpen) {
          _this.handleCancel(event);
        } else {
          _this.handleOpen();
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderDialog", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(isOpen, outsideClickIgnoreClass) {
        var props = _this.props;
        var offset = props.offset;

        var assistiveText = _objectSpread({}, defaultProps.assistiveText, _this.props.assistiveText);

        var closeButtonAssistiveText = props.closeButtonAssistiveText || assistiveText.closeButton;
        return isOpen ? _react2.default.createElement(_dialog2.default, {
          hasNubbin: true,
          align: props.align,
          contentsClassName: (0, _classnames2.default)(_this.props.contentsClassName, 'ignore-react-onclickoutside', 'slds-popover', props.className),
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
            return _this.trigger;
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
        }, _react2.default.createElement(_button2.default, {
          assistiveText: {
            icon: closeButtonAssistiveText
          },
          iconCategory: "utility",
          iconName: "close",
          iconSize: "small",
          className: "slds-button slds-button_icon-small slds-float_right slds-popover__close slds-button_icon",
          onClick: _this.handleCancel,
          variant: "icon"
        }), _this.props.heading ? _react2.default.createElement("header", {
          className: "slds-popover__header"
        }, _react2.default.createElement("h2", {
          id: "".concat(_this.getId(), "-dialog-heading"),
          className: "slds-text-heading_small"
        }, _this.props.heading)) : null, _react2.default.createElement("div", {
          id: "".concat(_this.getId(), "-dialog-body"),
          className: "slds-popover__body"
        }, props.body), _this.props.footer ? _react2.default.createElement("footer", {
          className: "slds-popover__footer"
        }, _this.props.footer) : null) : null;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderOverlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(isOpen) {
        if ((0, _lodash2.default)(overlay) && documentDefined) {
          overlay(isOpen, overlay);
        } else if (_this.props.overlay && isOpen && !_this.overlay && documentDefined) {
          _this.overlay = overlay;
          document.querySelector('body').appendChild(_this.overlay);
        } else if (!isOpen && _this.overlay && _this.overlay.parentNode) {
          _this.overlay.parentNode.removeChild(_this.overlay);

          _this.overlay = undefined;
        }
      }
    }), _temp));
  }

  _createClass(Popover, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid2.default.generate(); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

      (0, _checkProps2.default)(_constants.POPOVER, this.props, _docs2.default);
    }
  }, {
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

      var outsideClickIgnoreClass = "ignore-click-".concat(this.getId());
      var clonedTrigger = this.props.children ? _react2.default.cloneElement(this.props.children, _objectSpread({
        id: this.getId(),
        onClick: this.props.openOn === 'click' || this.props.openOn === 'hybrid' ? function (event) {
          _this2.handleClick(event, {
            triggerOnClickCallback: _this2.props.children.props.onClick
          });
        } : this.children.props.onClick,
        onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
        onMouseDown: this.props.onMouseDown,
        onMouseEnter: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseEnter : null,
        onMouseLeave: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseLeave : null,
        tabIndex: this.props.children.props.tabIndex || '0'
      }, this.props.children.props)) : null;
      this.renderOverlay(this.getIsOpen());
      var containerStyles = {
        display: 'inline-block'
      };
      return _react2.default.createElement("div", {
        className: this.props.triggerClassName,
        style: containerStyles,
        ref: this.setContainerRef
      }, clonedTrigger, this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass));
    }
  }]);

  return Popover;
}(_react2.default.Component);

Object.defineProperty(Popover, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.POPOVER
});
Object.defineProperty(Popover, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
     */
    align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']),

    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `closeButton`: This is a visually hidden label for the close button.
     */
    assistiveText: _propTypes2.default.shape({
      closeButton: _propTypes2.default.string
    }),

    /**
     * HTML `id` of heading for popover. Only use if your header is within your popover body.
     */
    ariaLabelledby: _propTypes2.default.string,

    /**
     * The trigger of the component. This must be a **single node**. Many props will be passed into this trigger related to popover interactions. The child needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
     */
    children: _propTypes2.default.node.isRequired,

    /**
     * The contents of the popover. This should also accept arrays.
     */
    body: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array]).isRequired,

    /**
     * CSS classes to be added to the popover. That is the element with `.slds-popover` on it.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
     */
    disabled: _propTypes2.default.bool,

    /**
     * A footer is an optional. Buttons are often placed here.
     */
    footer: _propTypes2.default.node,

    /**
     * Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen. When enabled, `position` `absolute` is used.
     */
    hasStaticAlignment: _propTypes2.default.bool,

    /**
     * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
     */
    heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),

    /**
     * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
     */
    id: _propTypes2.default.string,

    /**
     * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
     */
    isOpen: _propTypes2.default.bool,

    /**
     * This function is passed onto the triggering `Button`. Triggered when the trigger button is clicked. You will want this if Popover is to be a controlled component.
     */
    onClick: _propTypes2.default.func,

    /**
     * This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM. This function returns `{event, { trigger, componentWillUnmount }`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
     */
    onClose: _propTypes2.default.func,

    /**
     * Called when a key is pressed.
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * Called when mouse clicks down on the trigger button.
     */
    onMouseDown: _propTypes2.default.func,

    /**
     * This function is triggered when the Dialog child component (that is the actual popover) is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
     */
    onOpen: _propTypes2.default.func,

    /**
     * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
     */
    onRequestClose: _propTypes2.default.func,

    /**
     * Please select one of the following:
     * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
     * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
     * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
     */
    position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

    /**
     * An object of CSS styles that are applied to the `slds-popover` DOM element.
     */
    style: _propTypes2.default.object,

    /**
     * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
     */
    overlay: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),

    /**
     * CSS classes to be added to wrapping trigger `div` around the button.
     */
    triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
  }
});
Object.defineProperty(Popover, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: defaultProps
});
Popover.contextTypes = {
  iconPath: _propTypes2.default.string
};
exports.default = Popover;
exports.PopoverNubbinPositions = PopoverNubbinPositions;