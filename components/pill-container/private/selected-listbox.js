"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _avatar = _interopRequireDefault(require("../../avatar"));

var _icon = _interopRequireDefault(require("../../icon"));

var _pill = _interopRequireDefault(require("../../utilities/pill"));

var _isReactComponent = _interopRequireDefault(require("../../../utilities/is-react-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /*
   * The option object within the selection prop that should have focus.
   */
  activeOption: _propTypes.default.object,

  /*
   * The index of the option object within the selection prop that should have focus.
   */
  activeOptionIndex: _propTypes.default.number,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   * * `removePill`: Aids in keyboard interaction with Pills.
   * * `selectedListboxLabel`: Used to identify the listbox
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    removePill: _propTypes.default.string,
    selectedListboxLabel: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to the top-level `div` tag.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /*
   * Callbacks for various pill events such as click, focus, etc
   */
  events: _propTypes.default.shape({
    onClickPill: _propTypes.default.func.isRequired,
    onPillFocus: _propTypes.default.func.isRequired,
    onRequestFocus: _propTypes.default.func.isRequired,
    onRequestFocusOnNextPill: _propTypes.default.func.isRequired,
    onRequestFocusOnPreviousPill: _propTypes.default.func.isRequired,
    onRequestRemove: _propTypes.default.func.isRequired
  }),

  /**
   * HTML id for component main container
   */
  id: _propTypes.default.string,

  /**
   * Determines whether component renders as a bare pill container with associated styling for child pills
   */
  isBare: _propTypes.default.bool,

  /**
   * Adds inline (inside of input) styling
   */
  isInline: _propTypes.default.bool,

  /**
   * Determines whether component renders as a pill container with associated styling and behavior
   */
  isPillContainer: _propTypes.default.bool,

  /*
   * Pill Label
   */
  labels: _propTypes.default.shape({
    label: _propTypes.default.string,
    remove: _propTypes.default.string,
    title: _propTypes.default.string
  }),

  /**
   * Changes styles of the input. Currently `entity` is not supported.
   */
  renderAtSelectionLength: _propTypes.default.number,

  /**
   * This callback exposes the selected listbox reference / DOM node to parent components.
   */
  selectedListboxRef: _propTypes.default.func,

  /**
   * Accepts an array of item objects.
   */
  selection: _propTypes.default.array,

  /**
   * Custom styles to be passed to the top-level `div` tag
   */
  style: _propTypes.default.object,

  /**
   * Requests that the active option set focus on render
   */
  listboxHasFocus: _propTypes.default.bool,

  /**
   * Changes styles of the input. Currently `entity` is not supported.
   */
  variant: _propTypes.default.oneOf(['base', 'inline-listbox', 'readonly'])
};
var defaultProps = {
  renderAtSelectionLength: 1
};

var getAvatar = function getAvatar(option) {
  var avatarObject = option.avatar;
  var avatar = null;

  if (avatarObject) {
    if ((0, _isReactComponent.default)(avatarObject) || avatarObject instanceof HTMLElement) {
      avatar = avatarObject;
    } else if (avatarObject.imgSrc) {
      avatar = _react.default.createElement(_avatar.default, {
        imgSrc: avatarObject.imgSrc,
        title: avatarObject.title || option.label,
        variant: avatarObject.variant || 'user'
      });
    }
  }

  return avatar;
};

var getIcon = function getIcon(option) {
  var iconObject = option.icon;
  var icon = null;

  if (iconObject) {
    if ((0, _isReactComponent.default)(iconObject) || iconObject instanceof HTMLElement) {
      icon = iconObject;
    } else if (iconObject.category && iconObject.name) {
      icon = _react.default.createElement(_icon.default, {
        category: iconObject.category,
        name: iconObject.name,
        title: iconObject.title || option.label
      });
    }
  }

  return icon;
};

var SelectedListBox = function SelectedListBox(props) {
  return props.selection.length >= props.renderAtSelectionLength ? _react.default.createElement("div", {
    // eslint-disable-line jsx-a11y/role-supports-aria-props
    className: (0, _classnames.default)({
      'slds-pill_container': props.isPillContainer
    }, props.className) || undefined,
    id: props.id,
    ref: function ref(_ref) {
      if (props.selectedListboxRef) {
        props.selectedListboxRef(_ref);
      }
    },
    role: "listbox",
    style: props.style,
    "aria-orientation": "horizontal"
  }, _react.default.createElement("ul", {
    className: (0, _classnames.default)('slds-listbox', {
      'slds-listbox_inline': props.isInline,
      'slds-listbox_horizontal': !props.isInline,
      'slds-p-top_xxx-small': !props.isInline
    }),
    role: "group",
    "aria-label": props.assistiveText.selectedListboxLabel
  }, props.selection.map(function (option, renderIndex) {
    var hasTabIndex = renderIndex === props.activeOptionIndex;
    var icon = getIcon(option);
    var avatar = !icon ? getAvatar(option) : null;
    return _react.default.createElement("li", {
      role: "presentation",
      className: "slds-listbox__item",
      key: "".concat(props.id, "-list-item-").concat(option.id)
    }, _react.default.createElement(_pill.default, {
      active: hasTabIndex && props.listboxHasFocus,
      assistiveText: {
        remove: props.assistiveText.removePill
      },
      avatar: avatar,
      bare: option.bare || props.isBare,
      error: option.error,
      events: {
        onBlur: props.events.onBlurPill,
        onClick: function onClick(event, data) {
          props.events.onClickPill(event, _objectSpread({}, data, {
            index: renderIndex
          }));
        },
        onFocus: props.events.onPillFocus,
        onRequestFocusOnNextPill: props.events.onRequestFocusOnNextPill,
        onRequestFocusOnPreviousPill: props.events.onRequestFocusOnPreviousPill,
        onRequestRemove: function onRequestRemove(event, data) {
          props.events.onRequestRemove(event, _objectSpread({}, data, {
            index: renderIndex
          }));
        },
        onRequestFocus: props.events.onRequestFocus
      },
      eventData: {
        option: option
      },
      hasError: option.error,
      icon: icon,
      labels: {
        label: option.label,
        removeTitle: props.labels.removePillTitle
      },
      requestFocus: props.listboxHasFocus,
      tabIndex: hasTabIndex ? 0 : -1
    }));
  }))) : null;
};

SelectedListBox.displayName = 'SelectedListBox';
SelectedListBox.propTypes = propTypes;
SelectedListBox.defaultProps = defaultProps;
var _default = SelectedListBox;
exports.default = _default;