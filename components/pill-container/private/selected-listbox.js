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

var _avatar = require("../../avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _pill = require("../../utilities/pill");

var _pill2 = _interopRequireDefault(_pill);

var _isReactComponent = require("../../../utilities/is-react-component");

var _isReactComponent2 = _interopRequireDefault(_isReactComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /*
   * The option object within the selection prop that should have focus.
   */
  activeOption: _propTypes2.default.object,

  /*
   * The index of the option object within the selection prop that should have focus.
   */
  activeOptionIndex: _propTypes2.default.number,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   * * `removePill`: Aids in keyboard interaction with Pills.
   * * `selectedListboxLabel`: Used to identify the listbox
   */
  assistiveText: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    removePill: _propTypes2.default.string,
    selectedListboxLabel: _propTypes2.default.string
  }),

  /**
   * CSS classes to be added to the top-level `div` tag.
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /*
   * Callbacks for various pill events such as click, focus, etc
   */
  events: _propTypes2.default.shape({
    onClickPill: _propTypes2.default.func.isRequired,
    onPillFocus: _propTypes2.default.func.isRequired,
    onRequestFocus: _propTypes2.default.func.isRequired,
    onRequestFocusOnNextPill: _propTypes2.default.func.isRequired,
    onRequestFocusOnPreviousPill: _propTypes2.default.func.isRequired,
    onRequestRemove: _propTypes2.default.func.isRequired
  }),

  /**
   * HTML id for component main container
   */
  id: _propTypes2.default.string,

  /**
   * Determines whether component renders as a bare pill container with associated styling for child pills
   */
  isBare: _propTypes2.default.bool,

  /**
   * Adds inline (inside of input) styling
   */
  isInline: _propTypes2.default.bool,

  /**
   * Determines whether component renders as a pill container with associated styling and behavior
   */
  isPillContainer: _propTypes2.default.bool,

  /*
   * Pill Label
   */
  labels: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    remove: _propTypes2.default.string,
    title: _propTypes2.default.string
  }),

  /**
   * Changes styles of the input. Currently `entity` is not supported.
   */
  renderAtSelectionLength: _propTypes2.default.number,

  /**
   * This callback exposes the selected listbox reference / DOM node to parent components.
   */
  selectedListboxRef: _propTypes2.default.func,

  /**
   * Accepts an array of item objects.
   */
  selection: _propTypes2.default.array,

  /**
   * Custom styles to be passed to the top-level `div` tag
   */
  style: _propTypes2.default.object,

  /**
   * Requests that the active option set focus on render
   */
  listboxHasFocus: _propTypes2.default.bool,

  /**
   * Changes styles of the input. Currently `entity` is not supported.
   */
  variant: _propTypes2.default.oneOf(['base', 'inline-listbox', 'readonly'])
};
var defaultProps = {
  renderAtSelectionLength: 1
};

var getAvatar = function getAvatar(option) {
  var avatarObject = option.avatar;
  var avatar = null;

  if (avatarObject) {
    if ((0, _isReactComponent2.default)(avatarObject) || avatarObject instanceof HTMLElement) {
      avatar = avatarObject;
    } else if (avatarObject.imgSrc) {
      avatar = _react2.default.createElement(_avatar2.default, {
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
    if ((0, _isReactComponent2.default)(iconObject) || iconObject instanceof HTMLElement) {
      icon = iconObject;
    } else if (iconObject.category && iconObject.name) {
      icon = _react2.default.createElement(_icon2.default, {
        category: iconObject.category,
        name: iconObject.name,
        title: iconObject.title || option.label
      });
    }
  }

  return icon;
};

var SelectedListBox = function SelectedListBox(props) {
  return props.selection.length >= props.renderAtSelectionLength ? _react2.default.createElement("div", {
    // eslint-disable-line jsx-a11y/role-supports-aria-props
    className: (0, _classnames2.default)({
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
  }, _react2.default.createElement("ul", {
    className: (0, _classnames2.default)('slds-listbox', {
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
    return _react2.default.createElement("li", {
      role: "presentation",
      className: "slds-listbox__item",
      key: "".concat(props.id, "-list-item-").concat(option.id)
    }, _react2.default.createElement(_pill2.default, {
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
exports.default = SelectedListBox;