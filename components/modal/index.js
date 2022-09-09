"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _shortid = _interopRequireDefault(require("shortid"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _checkAppElementSet = _interopRequireDefault(require("../../utilities/warning/check-app-element-set"));

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

var _component = _interopRequireDefault(require("./component.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var documentDefined = typeof document !== 'undefined';
var windowDefined = typeof window !== 'undefined';
var propTypes = {
  /**
   * Vertical alignment of Modal.
   */
  align: _propTypes.default.oneOf(['top', 'center']),

  /**
   * Boolean indicating if the appElement should be hidden.
   */
  ariaHideApp: _propTypes.default.bool,

  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `dialogLabel`: This is a visually hidden label for the dialog. If not provided, `heading` is used.
   * * `dialogLabelledBy`: This describes which node labels the dialog. If not provided and dialogLabel is unavailable, `id` is used.
   * * `closeButton`: This is a visually hidden label for the close button.
   */
  assistiveText: _propTypes.default.shape({
    dialogLabel: _propTypes.default.string,
    dialogLabelledBy: _propTypes.default.string,
    closeButton: _propTypes.default.string
  }),

  /**
   * Modal content.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Custom CSS classes for the modal `section` node classed `.slds-modal` and the parent of `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Custom CSS classes for the modal's container. This is the child element of `.slds-modal` with class `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  containerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Custom CSS classes for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired. Use `classNames` [API](https://github.com/JedWatson/classnames).
   */
  contentClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Custom styles for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired.
   */
  contentStyle: _propTypes.default.object,

  /**
   * If true, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
   */
  directional: _propTypes.default.bool,

  /**
   * If true, Modals cannot be dismissed by clicking on the close icon or pressing esc key.
   */
  disableClose: _propTypes.default.bool,

  /**
   * If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to disableClose.
   */
  dismissOnClickOutside: _propTypes.default.bool,

  /**
   * Callback to fire with Modal is dismissed
   */
  onRequestClose: _propTypes.default.func,

  /**
   * Accepts a node or array of nodes that are typically a `Button` or `ProgressIndicator`. If an array, the nodes render on the right side first but are then floated left and right if <code>directional</code> prop is `true`.
   */
  footer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.node]),

  /**
   * Allows for a custom modal header that does not scroll with modal content. If this is defined, `heading` and `tagline` will be ignored. The close button will still be present.
   */
  header: _propTypes.default.node,

  /**
   * Adds CSS classes to the container surrounding the modal header and the close button. Use `classNames` [API](https://github.com/JedWatson/classnames).
   */
  headerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Unique identifier for the modal. The id is automatically generated if not provided
   */
  id: _propTypes.default.string,

  /**
   * Forces the modal to be open or closed.
   */
  isOpen: _propTypes.default.bool.isRequired,

  /**
   * Function whose return value is the mount node to insert the Modal element into. The default is `() => document.body`.
   */
  parentSelector: _propTypes.default.func,

  /**
   * Custom CSS classes for the portal DOM node. This node is a direct descendant of the `body` and is the parent of `ReactModal__Overlay`. Use `classNames` [API](https://github.com/JedWatson/classnames).
   */
  portalClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Styles the modal as a prompt.
   */
  prompt: _propTypes.default.oneOf(['success', 'warning', 'error', 'wrench', 'offline', 'info']),

  /**
   * Specifies the modal's width. May be deprecated in favor of `width` in the future.
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * Content underneath the heading in the modal header.
   */
  tagline: _propTypes.default.node,

  /**
   * Content underneath the title in the modal header.
   */
  title: _propTypes.default.node,

  /**
   * Text heading at the top of a modal.
   */
  heading: _propTypes.default.node,

  /**
   * Allows adding additional notifications within the modal.
   */
  toast: _propTypes.default.node
};
var defaultProps = {
  assistiveText: {
    dialogLabelledBy: '',
    closeButton: 'Close'
  },
  align: 'center',
  ariaHideApp: true
};
/**
 * The Modal component is used for the Lightning Design System Modal and Notification > Prompt components. The Modal opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop). For more details on the Prompt markup, please review the <a href="http://www.lightningdesignsystem.com/components/notifications#prompt">Notifications > Prompt</a>.
 *
 * By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 * This component uses a portalMount (a disconnected React subtree mount) to create a modal as a child of `body`.
 */

var Modal = /*#__PURE__*/function (_React$Component) {
  _inherits(Modal, _React$Component);

  var _super = _createSuper(Modal);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _super.call(this, props);
    _this.state = {
      isClosing: false
    }; // Bind

    _this.handleModalClick = _this.handleModalClick.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    _this.dismissModalOnClickOutside = _this.dismissModalOnClickOutside.bind(_assertThisInitialized(_this));
    _this.generatedId = _shortid.default.generate();
    (0, _checkProps.default)(_constants.MODAL, props, _component.default);

    if (props.ariaHideApp) {
      (0, _checkAppElementSet.default)();
    }

    _this.selfRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setReturnFocus();
      this.updateBodyScroll();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.updateBodyScroll();
      }

      if (this.state.isClosing !== prevState.isClosing) {
        if (this.state.isClosing) {
          // This section of code should be removed once trigger.jsx
          // and manager.jsx are removed. They appear to have
          // been created in order to do modals in portals.
          if (!this.isUnmounting) {
            if (this.selfRef && this.selfRef.parentNode && this.selfRef.parentNode.getAttribute('data-slds-modal')) {
              _reactDom.default.unmountComponentAtNode(this.selfRef);

              document.body.removeChild(this.selfRef);
            }
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
      this.clearBodyScroll();
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getBorderRadius",
    value: function getBorderRadius() {
      var borderRadiusValue = '.25rem';
      var borderTopRadius = this.props.title || this.props.heading || this.props.header ? {} : {
        borderTopLeftRadius: borderRadiusValue,
        borderTopRightRadius: borderRadiusValue
      };
      var borderBottomRadius = this.props.footer ? {} : {
        borderBottomLeftRadius: borderRadiusValue,
        borderBottomRightRadius: borderRadiusValue
      };
      return _objectSpread(_objectSpread({}, borderTopRadius), borderBottomRadius);
    }
  }, {
    key: "getAriaAttributes",
    value: function getAriaAttributes() {
      var ariaAttributes = {
        describedby: "".concat(this.getId(), "-modal-content"),
        modal: 'true'
      };

      if (this.props.assistiveText.dialogLabel) {
        ariaAttributes.label = this.props.assistiveText.dialogLabel;
        return ariaAttributes;
      }

      var dialogLabelledBy = null;

      if (this.props.assistiveText.dialogLabelledBy) {
        // eslint-disable-next-line prefer-destructuring
        dialogLabelledBy = this.props.assistiveText.dialogLabelledBy;
      } else if (this.props.heading || this.props.title) {
        dialogLabelledBy = "".concat(this.getId(), "-heading");
      }

      ariaAttributes.labelledby = dialogLabelledBy;
      return ariaAttributes;
    }
  }, {
    key: "getModal",
    value: function getModal() {
      var modalStyle = this.props.align === 'top' ? {
        justifyContent: 'flex-start'
      } : null;
      var borderRadius = this.getBorderRadius();
      var contentStyleFromProps = this.props.contentStyle || {};

      var contentStyle = _objectSpread(_objectSpread({}, borderRadius), contentStyleFromProps);

      return (
        /*#__PURE__*/
        // temporarily disabling eslint for the onClicks on the div tags

        /* eslint-disable */
        _react.default.createElement("section", {
          className: (0, _classnames.default)('slds-modal', 'slds-fade-in-open', this.props.size ? "slds-modal_".concat(this.props.size) : null, {
            'slds-modal_prompt': this.isPrompt()
          }, this.props.className),
          onClick: this.dismissModalOnClickOutside
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)('slds-modal__container', this.props.containerClassName),
          style: modalStyle
        }, this.headerComponent(), /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)('slds-modal__content', this.props.contentClassName),
          id: "".concat(this.getId(), "-modal-content"),
          style: contentStyle,
          onClick: this.handleModalClick
        }, this.props.children), this.footerComponent()))
        /* eslint-enable */

      );
    }
  }, {
    key: "setReturnFocus",
    value: function setReturnFocus() {
      this.setState({
        returnFocusTo: documentDefined ? document.activeElement : null
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "clearBodyScroll",
    value: function clearBodyScroll() {
      if (windowDefined && documentDefined && document.body) {
        document.body.style.overflow = 'inherit';
      }
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      if (!this.props.disableClose) {
        this.dismissModal();
      }
    }
  }, {
    key: "dismissModal",
    value: function dismissModal() {
      this.setState({
        isClosing: true
      });

      if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
        this.state.returnFocusTo.focus();
      }

      if (this.props.onRequestClose) {
        this.props.onRequestClose();
      }
    }
  }, {
    key: "dismissModalOnClickOutside",
    value: function dismissModalOnClickOutside() {
      // if dismissOnClickOutside is not set, default its value to disableClose
      var dismissOnClickOutside = this.props.dismissOnClickOutside !== undefined ? this.props.dismissOnClickOutside : !this.props.disableClose;

      if (dismissOnClickOutside) {
        this.dismissModal();
      }
    }
  }, {
    key: "footerComponent",
    value: function footerComponent() {
      var footer = null;
      var hasFooter = this.props.footer;
      var footerClass = {
        'slds-modal__footer': true,
        'slds-modal__footer_directional': this.props.directional,
        'slds-theme_default': this.isPrompt()
      };

      if (hasFooter) {
        footer =
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions
        _react.default.createElement("footer", {
          className: (0, _classnames.default)(footerClass, this.props.footerClassNames),
          onClick: this.handleModalClick
        }, this.props.footer);
      }

      return footer;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "handleModalClick",
    value: function handleModalClick(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
    }
  }, {
    key: "handleSubmitModal",
    value: function handleSubmitModal() {
      this.closeModal();
    }
  }, {
    key: "headerComponent",
    value: function headerComponent() {
      var _classNames;

      var headerContent = this.props.header;
      var headerEmpty = !headerContent && !(this.props.heading || this.props.title) && !this.props.tagline;

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var closeButtonAssistiveText = this.props.closeButtonAssistiveText || assistiveText.closeButton;

      var closeButton = /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: closeButtonAssistiveText
        },
        iconCategory: "utility",
        iconName: "close",
        iconSize: "large",
        inverse: true,
        className: "slds-button_icon slds-modal__close",
        onClick: this.closeModal,
        title: closeButtonAssistiveText,
        variant: "icon"
      });

      if (!headerContent && (this.props.heading || this.props.title) || this.props.tagline) {
        headerContent = /*#__PURE__*/_react.default.createElement("div", null, this.props.toast, /*#__PURE__*/_react.default.createElement("h1", {
          className: (0, _classnames.default)({
            'slds-text-heading_small': this.isPrompt(),
            'slds-text-heading_medium': !this.isPrompt()
          }),
          id: "".concat(this.getId(), "-heading")
        }, this.props.heading ? this.props.heading : this.props.title), this.props.tagline ? /*#__PURE__*/_react.default.createElement("p", {
          className: "slds-m-top_x-small"
        }, this.props.tagline) : null);
      }

      return (
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        _react.default.createElement("header", {
          className: (0, _classnames.default)('slds-modal__header', (_classNames = {
            'slds-modal__header_empty': headerEmpty
          }, _defineProperty(_classNames, "slds-theme_".concat(this.props.prompt), this.isPrompt()), _defineProperty(_classNames, 'slds-theme_alert-texture', this.isPrompt()), _classNames), this.props.headerClassName),
          onClick: this.handleModalClick
        }, this.props.disableClose ? null : closeButton, headerContent)
      );
    }
  }, {
    key: "isPrompt",
    value: function isPrompt() {
      return this.props.prompt !== undefined;
    }
  }, {
    key: "updateBodyScroll",
    value: function updateBodyScroll() {
      if (windowDefined && documentDefined && document.body) {
        if (this.props.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'inherit';
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var ariaAttributes = this.getAriaAttributes();
      var customStyles = {
        content: {
          position: 'default',
          top: 'default',
          left: 'default',
          right: 'default',
          bottom: 'default',
          border: 'default',
          background: 'default',
          overflow: 'default',
          WebkitOverflowScrolling: 'default',
          borderRadius: 'default',
          outline: 'default',
          padding: 'default'
        },
        overlay: {
          zIndex: 8000,
          // following SLDS guideline for z-index overlay
          backgroundColor: 'default'
        }
      };
      return /*#__PURE__*/_react.default.createElement(_reactModal.default, {
        aria: ariaAttributes,
        ariaHideApp: this.props.ariaHideApp,
        isOpen: this.props.isOpen,
        onRequestClose: this.closeModal,
        role: this.props.disableClose ? 'alertdialog' : 'dialog',
        style: customStyles,
        parentSelector: this.props.parentSelector,
        portalClassName: (0, _classnames.default)('ReactModalPortal', this.props.portalClassName)
      }, this.getModal(), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-backdrop slds-backdrop_open"
      }));
    }
  }]);

  return Modal;
}(_react.default.Component);

Modal.displayName = _constants.MODAL;
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
var _default = Modal;
exports.default = _default;