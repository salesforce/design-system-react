"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PILLS = [{
  category: 'standard',
  name: 'account'
}, {
  category: 'standard',
  name: 'case'
}, {
  category: 'utility',
  name: 'retweet'
}, {
  category: 'standard',
  name: 'solution'
}, {
  category: 'standard',
  name: 'custom_notification'
}, {
  category: 'standard',
  name: 'email'
}, {
  category: 'standard',
  name: 'endorsement'
}, {
  category: 'standard',
  name: 'recent'
}, {
  category: 'custom',
  name: 'custom31'
}];

function noop() {}

var Example = (0, _createReactClass2.default)({
  displayName: 'PillWithIconListboxExample',
  propTypes: {
    action: _react.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      action: function action() {
        return noop;
      }
    };
  },
  getInitialState: function getInitialState() {
    return this.getAllOn();
  },
  onClick: function onClick(event) {
    this.props.action('onClick')(event);
  },
  onRemove: function onRemove(event, pill) {
    this.props.action('onRemove')(event);
    this.setState(_defineProperty({}, pill, false));
  },
  getAllOn: function getAllOn() {
    return PILLS.reduce(function (result, item, index) {
      result['pill' + index] = true;
      return result;
    }, {});
  },
  renderListItem: function renderListItem(icon, index) {
    var _this = this;

    if (this.state['pill' + index]) {
      return _react2.default.createElement("li", {
        className: "slds-listbox-item",
        role: "presentation",
        key: index
      }, _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        assistiveText: {
          remove: 'Press delete or backspace to remove'
        },
        variant: "option",
        icon: _react2.default.createElement(_icon2.default, {
          title: "Title",
          category: icon.category,
          name: icon.name
        }),
        onClick: this.onClick,
        onRemove: function onRemove() {
          return _this.onRemove(event, 'pill' + index);
        }
      }));
    }

    return null;
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement("div", {
      className: "slds-grid slds-grid_vertical-align-start"
    }, _react2.default.createElement("div", {
      className: "slds-pill_container"
    }, _react2.default.createElement("ul", {
      className: "slds-listbox slds-listbox_horizontal slds-listbox_inline",
      role: "listbox",
      "aria-label": "Selected Options:",
      "aria-orientation": "horizontal"
    }, PILLS.map(this.renderListItem))))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime