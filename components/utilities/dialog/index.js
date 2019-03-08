"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _popper = require("popper.js");

var _popper2 = _interopRequireDefault(_popper);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _portal = require("./portal");

var _portal2 = _interopRequireDefault(_portal);

var _event = require("../../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _keyCode = require("../../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _domElementFocus = require("../../../utilities/dom-element-focus");

var _domElementFocus2 = _interopRequireDefault(_domElementFocus);

var _dialogHelpers = require("../../../utilities/dialog-helpers");

var _constants = require("../../../utilities/constants");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/*
 * A Dialog is content that is separate from the typical flow of a page. It typically overlays other elements in the document flow. This is achieved with elevation (`z-index`) and one of the following: relative position, absolute position, or a new top-level React render tree (portal). A boundary element is a scrolling ancestor element or the edge of the browser (window/viewport). This element typically has an overflow (overflow-y/overflow-x) style that is scroll, hidden, or auto. Inverted placement is the flipping of the overlay element from top to bottom or left to right in order stay within a boundary element.
 *
 * * Dropdown menu (Combobox, DatePicker, et al.) placement is typically bottom-aligned and should be allowed to invert its placement when inside a boundary element this often happens within a modal. Dropdowns should not overflow boundary elements , since most boundary elements scroll vertically and have space for the menu.
 *
 * * If they are hidden, left and right placed overlay elements (such as Popover and Tooltip) should be placed within a portal element attached to the DOM <body>, but styled to align to its target/trigger. Since scrolling typically occurs on the vertical axis, this allows them to overflow boundary elements and still allow scrolling of content, yet still invert placement for the browser viewport. Portal elements are only necessary if an original ancestor boundary element exists. **No portals are created by default.**
 *
 * * Nubbins/arrows should be repositioned for any new placement/alignment.
 *
 * Allow Overflowing of Boundary Element: Allow applications to create a portal element attached to the DOM <body> to be outside of boundary elements if manual testing shows confusing alignment/poor usability/readability. This should be exception and not the default.
 *
 * Allow Inverted placement: Allow applications to prevent inverted placement if manual testing shows confusing alignment/poor usability/readability.
 *
 * ### How this new Dialog component works
 * * There is no longer an inline render within components. All overlays should go through `Dialog`. `position: relative` just passes on the markup with some additional event listeners. No positional library is used.
 * * The default `position: absolute` will run through three renders. It will first render the overlay at `0px/0px` offset of its parent. It will then store the target DOM node, once the DOM node is set, a state change will occur and tell a PopperJS instance to be created on update, once it is created, a third render is done to update the styles created by PopperJS.
 * * `position: overflowBoundaryElement` will do the same three renders as `absolute` except that the initial render will create a disconnected render tree (portal) on the `body`. Then, the position will change once the target is stored. The portal itself will be rendered multiple times. The first will result in `onOpen` executing. Each update will result in a re-render of the disconnected render-tree.
 *
 * This component is private.
 */
var Dialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        triggerPopperJS: false,
        isOpen: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getPropOffsetsInPixels", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(offsetString) {
        var offsetArray = offsetString.split(' ');
        return {
          vertical: parseInt(offsetArray[0], 10),
          horizontal: parseInt(offsetArray[1], 10)
        };
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getPopperStyles", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var popperData = _this.state.popperData;

        if (!_this.popper || !popperData) {
          return {
            position: 'absolute',
            pointerEvents: 'none'
          };
        }

        var position = popperData.offsets.popper.position;

        var propOffsets = _this.getPropOffsetsInPixels(_this.props.offset); // FIXME before merge - gotta rename from margin to offset


        var nubbinOffsets = _this.props.hasNubbin ? (0, _dialogHelpers.getNubbinMargins)(_this.state.popperData) : {
          left: 0,
          top: 0
        };
        var left = popperData.offsets.popper.left + nubbinOffsets.left + propOffsets.horizontal;
        var top = popperData.offsets.popper.top + nubbinOffsets.top + propOffsets.vertical; // A Dropdown with overflowBoundaryElement position and 'align=right' uses max-width instead of inherited children width

        var right = 'inherit';
        return _objectSpread({}, popperData.style, {
          left: left,
          top: top,
          right: right,
          position: position
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "setDialogContent", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(component) {
        _this.dialogContent = component;

        if (!_this.state.triggerPopperJS) {
          _this.setState({
            triggerPopperJS: true
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClickOutside", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.handleClose();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClose", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        _this.setState({
          triggerPopperJS: true
        });

        if (_this.props.onClose) {
          _this.props.onClose(event, data);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.nativeEvent) {
          event.nativeEvent.preventDefault();
          event.nativeEvent.stopPropagation();
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode === _keyCode2.default.TAB) {
          if (_this.props.closeOnTabKey) {
            _event2.default.trap(event);

            _this.handleClose(event);
          }
        }

        if (_this.props.onKeyDown) {
          _this.props.onKeyDown(event);
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.variant === 'popover' && _this.dialogContent) {
          _domElementFocus2.default.storeActiveElement();

          _domElementFocus2.default.setupScopedFocus({
            ancestorElement: _this.dialogContent
          }); // eslint-disable-line react/no-find-dom-node
          // Don't steal focus from inner elements


          if (!_domElementFocus2.default.hasOrAncestorHasFocus()) {
            _domElementFocus2.default.focusAncestor({
              isPortal: _this.props.position === 'overflowBoundaryElement'
            });
          }
        }

        if (_this.props.onOpen) {
          _this.props.onOpen(undefined, {
            portal: _this.dialogContent
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "createPopper", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var reference = _this.props.onRequestTargetElement(); // eslint-disable-line react/no-find-dom-node


        var popper = _this.dialogContent;
        var placement = (0, _dialogHelpers.mapPropToPopperPlacement)(_this.props.align);
        var eventsEnabled = true; // Lets popper listen to events (resize, scroll, etc.)

        var modifiers = {
          applyStyle: {
            enabled: false
          },
          // moves dialog in order to not extend a boundary element such as a scrolling parent or a window/viewpoint.
          preventOverflow: {
            enabled: !_this.props.hasStaticAlignment,
            boundariesElement: _this.props.position === 'absolute' ? 'scrollParent' : 'viewport'
          },
          hide: {
            enabled: false
          },
          // By default, dialogs will flip their alignment if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint
          flip: {
            enabled: !_this.props.hasStaticAlignment
          },
          removeOnDestroy: true,
          updateState: {
            enabled: true,
            order: 900,
            fn: function fn(popperData) {
              if (_this.state.popperData && !(0, _lodash2.default)(popperData.offsets, _this.state.popperData.offsets) || !_this.state.popperData) {
                _this.setState({
                  popperData: popperData
                });
              }

              return popperData;
            }
          } // arrow property can also point to an element

        };

        if (!reference) {
          console.error('Target node not found!', reference); // eslint-disable-line no-console
        }

        if (!popper) {
          console.error('Popper node not found!', popper); // eslint-disable-line no-console
        }

        _this.popper = new _popper2.default(reference, popper, {
          placement: placement,
          eventsEnabled: eventsEnabled,
          modifiers: modifiers
        });

        _this.popper.scheduleUpdate();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "destroyPopper", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.popper) {
          _this.popper.destroy();
        }
      }
    }), _temp));
  }

  _createClass(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.position === 'absolute' || this.props.position === 'relative') {
        this.handleOpen();
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      if (this.popper) {
        this.popper.scheduleUpdate();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.triggerPopperJS === true && prevState.triggerPopperJS === false && (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') && this.dialogContent && this.props.onRequestTargetElement()) {
        this.createPopper();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.variant === 'popover') {
        _domElementFocus2.default.teardownScopedFocus();

        _domElementFocus2.default.returnFocusToStoredElement();
      }

      if (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') {
        this.destroyPopper();
      }

      this.handleClose(undefined, {
        componentWillUnmount: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = {};

      if (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') {
        style = _objectSpread({}, style, {
          outline: 0
        }, this.getPopperStyles());
      }

      if (this.props.inheritWidthOf === 'target' && this.props.onRequestTargetElement()) {
        style.width = this.props.onRequestTargetElement().getBoundingClientRect().width;
      } else if (this.props.inheritWidthOf === 'menu' && this.dialogContent && this.dialogContent.querySelector('.slds-listbox')) {
        // inherit menu renderer width
        style.width = this.dialogContent.querySelector('.slds-listbox').getBoundingClientRect().width;
      }

      style = _objectSpread({}, style, this.props.style);

      var contents = _react2.default.createElement("div", _extends({
        // eslint-disable-line jsx-a11y/no-static-element-interactions
        className: (0, _classnames2.default)(_defineProperty({
          'absolute-positioned': this.props.position === 'absolute',
          'portal-positioned': this.props.position === 'overflowBoundaryElement'
        }, "".concat(this.props.outsideClickIgnoreClass), this.props.position === 'overflowBoundaryElement'), this.props.hasNubbin && (0, _dialogHelpers.getNubbinClassName)(this.props.align, this.state.popperData), this.props.contentsClassName) || undefined,
        style: style,
        onKeyDown: this.handleKeyDown,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        ref: this.setDialogContent,
        role: this.props.variant,
        tabIndex: this.props.variant === 'popover' ? '-1' : undefined
      }, this.props.containerProps), this.props.children);

      var subRenders = {
        absolute: function absolute() {
          return contents;
        },
        relative: function relative() {
          return contents;
        },
        overflowBoundaryElement: function overflowBoundaryElement() {
          // Cycle through current context, create object of
          // truthy values, and pass into Portal's context.
          // TODO: Add test when switched to `ReactDOM.createPortal`
          var truthyIconSettingsContext = Object.keys(_iconSettings2.default.childContextTypes).filter(function (key) {
            return Boolean(_this2.context[key]);
          }).reduce(function (accumulatedContext, key) {
            return _objectSpread({}, accumulatedContext, _defineProperty({}, key, _this2.context[key]));
          }, {});
          return _react2.default.createElement(_portal2.default, {
            onOpen: _this2.handleOpen,
            portalMount: _this2.props.portalMount
          }, _react2.default.createElement(_iconSettings2.default, truthyIconSettingsContext, contents));
        }
      };
      return subRenders[this.props.position] && subRenders[this.props.position]();
    }
  }]);

  return Dialog;
}(_react2.default.Component);

Object.defineProperty(Dialog, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.DIALOG
});
Object.defineProperty(Dialog, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Aligns the right or left side of the dialog with the respective side of the target.
     */
    align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']),

    /**
     * CSS classes to be added to the absolutely positioned element.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * CSS classes to be added to the wrapping `div` of the contents of the dialog.
     */
    contentsClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Contents of dialog
     */
    children: _propTypes2.default.node.isRequired,

    /**
     * Closes dialog when tab key is pressed
     */
    closeOnTabKey: _propTypes2.default.bool,

    /**
     * Props passed along to wrapping div. This allows one less wrapping `div` to be in the markup. dialog children are expected to be wrapper in a single `div`.
     */
    containerProps: _propTypes2.default.object,

    /**
     * Will show the nubbin pointing from the dialog to the reference element. Positioning and offsets will be handled.
     */
    hasNubbin: _propTypes2.default.bool,

    /**
     * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements.
     */
    hasStaticAlignment: _propTypes2.default.bool,

    /**
     * Sets the dialog width to the width of either 'target' (Menus attached to `input` typically follow this UX pattern), 'menu' or 'none.
     */
    inheritWidthOf: _propTypes2.default.oneOf(['target', 'menu', 'none']),

    /**
     * DEPRECATED - do not add checkProp deprecation message at this level. It is handled at higher level components.
     * TODO - to be removed.
     * Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px). SHOULD BE OBJECT -----------
     */
    offset: _propTypes2.default.string,

    /**
     * Called when dialog closes and unmounts.
     */
    onClose: _propTypes2.default.func,

    /**
     * Called when a key pressed.
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
     */
    onMouseEnter: _propTypes2.default.func,

    /**
     * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
     */
    onMouseLeave: _propTypes2.default.func,

    /**
     * Called when dialog opens (that is mounts). The parameters are `undefined, { portal: this.portal }`.
     */
    onOpen: _propTypes2.default.func,

    /**
     * React component to be aligned with. Function should return a DOM `ref` from the parent component.
     */
    onRequestTargetElement: _propTypes2.default.func.isRequired,

    /**
     * Triggered when an item in the menu is clicked.
     */
    outsideClickIgnoreClass: _propTypes2.default.string,

    /**
     * If a dialog is `positione="overflowBoundaryElement"`, it will be rendered in a portal or separate render tree. This `portalMount` callback will be triggered instead of the the default `ReactDOM.unstable_renderSubtreeIntoContainer` and the function will mount the portal itself. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
     *
     * ```
     * <Popover
     *   isOpen
     *   portalMount={({ instance, reactElement, domContainerNode }) => {
     *     portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
     *   }}
     *   onOpen={() => {
     *     expect(portalWrapper.find(`#my-heading`)).to.exist;
     *     done();
     *   }}
     *   />
     * ```
     */
    portalMount: _propTypes2.default.func,

    /**
     * Please select one of the following:
     * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
     * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
     * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
     */
    position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']).isRequired,

    /**
     * An object of CSS styles that are applied to the immediate parent `div` of the contents. Use this instead of margin props.
     */
    style: _propTypes2.default.object,

    /**
     * Sets which focus UX pattern to follow. For instance, popovers trap focus and must be exited to regain focus. Dropdowns and Tooltips never have focus.
     */
    variant: _propTypes2.default.oneOf(['dropdown', 'popover', 'tooltip'])
  }
});
Object.defineProperty(Dialog, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    align: 'bottom left',
    offset: '0px 0px',
    outsideClickIgnoreClass: 'ignore-react-onclickoutside'
  }
});
Dialog.contextTypes = {
  iconPath: _propTypes2.default.string
};
exports.default = Dialog;