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

var _keyCode = require("../../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _keyCallbacks = require("../../../utilities/key-callbacks");

var _keyCallbacks2 = _interopRequireDefault(_keyCallbacks);

var _event = require("../../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _pill = require("../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * Pill is the active pill within a listbox of pills. This will request focus on the DOM node.
   */
  active: _propTypes2.default.bool,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
   */
  assistiveText: _propTypes2.default.shape({
    remove: _propTypes2.default.string
  }),

  /*
   * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
   */
  eventData: _propTypes2.default.object,

  /*
   * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
   */
  events: _propTypes2.default.shape({
    onClick: _propTypes2.default.func,
    onRequestFocus: _propTypes2.default.func.isRequired,
    onRequestFocusOnNextPill: _propTypes2.default.func.isRequired,
    onRequestFocusOnPreviousPill: _propTypes2.default.func.isRequired,
    onRequestRemove: _propTypes2.default.func.isRequired
  }),

  /*
   * The icon next to the pill label.
   */
  icon: _propTypes2.default.element,

  /*
   * Pill Label
   */
  labels: _propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    removeTitle: _propTypes2.default.string
  }),

  /*
   * If true and is active pill in listbox, will trigger `events.onRequestFocus`
   */
  requestFocus: _propTypes2.default.bool,

  /*
   * Pill Title
   */
  title: _propTypes2.default.string,

  /*
   * Allows the user to tab to the node
   */
  tabIndex: _propTypes2.default.number
};
var defaultProps = {
  assistiveText: _propTypes2.default.shape({
    remove: ', Press delete or backspace to remove'
  }),
  labels: {
    remove: 'Remove'
  },
  events: {}
};

var handleKeyDown = function handleKeyDown(event, _ref) {
  var _callbacks;

  var events = _ref.events,
      data = _ref.data;
  // Helper function that takes an object literal of callbacks that are triggered with a key event
  (0, _keyCallbacks2.default)(event, {
    callbacks: (_callbacks = {}, _defineProperty(_callbacks, _keyCode2.default.BACKSPACE, {
      callback: events.onRequestRemove,
      data: data
    }), _defineProperty(_callbacks, _keyCode2.default.DELETE, {
      callback: events.onRequestRemove,
      data: data
    }), _defineProperty(_callbacks, _keyCode2.default.LEFT, {
      callback: events.onRequestFocusOnPreviousPill,
      data: _objectSpread({}, data, {
        direction: 'previous'
      })
    }), _defineProperty(_callbacks, _keyCode2.default.RIGHT, {
      callback: events.onRequestFocusOnNextPill,
      data: _objectSpread({}, data, {
        direction: 'next'
      })
    }), _callbacks)
  });
};

var handleClickRemove = function handleClickRemove(event, _ref2) {
  var events = _ref2.events,
      eventData = _ref2.eventData;

  _event2.default.trap(event);

  events.onRequestRemove(event, eventData);
};

var Pill = function Pill(props) {
  var assistiveText = (0, _lodash2.default)({}, defaultProps.assistiveText, props.assistiveText);
  var labels = (0, _lodash2.default)({}, defaultProps.labels, props.labels);
  return _react2.default.createElement(_pill2.default, {
    tabIndex: props.tabIndex || '0',
    icon: props.icon,
    variant: "option",
    labels: labels,
    assistiveText: {
      remove: assistiveText.remove
    },
    "aria-selected": props.active,
    onBlur: props.events.onBlur,
    onClick: typeof props.events.onClick === 'function' ? function (event) {
      if (props.events.onClick) {
        props.events.onClick(event, {
          option: props.eventData
        });
      }
    } : null,
    onRemove: function onRemove(event) {
      _event2.default.trap(event);

      handleClickRemove(event, {
        events: props.events,
        eventData: props.eventData
      });
    },
    onKeyDown: function onKeyDown(event) {
      handleKeyDown(event, {
        events: props.events,
        data: props.eventData
      });
    },
    ref: function ref(component) {
      if (props.requestFocus && props.active) {
        props.events.onRequestFocus(undefined, {
          ref: component
        });
      }
    }
  });
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;
Pill.defaultProps = defaultProps;
exports.default = Pill;