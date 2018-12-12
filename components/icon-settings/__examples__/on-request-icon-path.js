"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _symbols = require("@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg");

var _symbols2 = _interopRequireDefault(_symbols);

var _symbols3 = require("@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg");

var _symbols4 = _interopRequireDefault(_symbols3);

var _symbols5 = require("@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg");

var _symbols6 = _interopRequireDefault(_symbols5);

var _symbols7 = require("@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg");

var _symbols8 = _interopRequireDefault(_symbols7);

var _symbols9 = require("@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg");

var _symbols10 = _interopRequireDefault(_symbols9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var sprites = {
  action: _symbols2.default,
  custom: _symbols4.default,
  utility: _symbols6.default,
  standard: _symbols8.default,
  doctype: _symbols10.default
};
var Example = (0, _createReactClass2.default)({
  displayName: 'IconSettingsExample',
  componentDidMount: function componentDidMount() {
    var _this = this;

    Promise.all(Object.keys(sprites).map(function (category) {
      return fetch(sprites[category]).then(function (resp) {
        return resp.text();
      });
    })).then(function (texts) {
      _this.spriteInlineContainer.innerHTML = texts.join('');
    });
  },
  render: function render() {
    var _this2 = this;

    return _react2.default.createElement(_iconSettings2.default, {
      onRequestIconPath: function onRequestIconPath(_ref) {
        var category = _ref.category,
            name = _ref.name;
        return "#".concat(name);
      }
    }, _react2.default.createElement("div", {
      ref: function ref(el) {
        _this2.spriteInlineContainer = el;
      }
    }), _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_icon2.default, {
      assistiveText: {
        label: 'Account'
      },
      category: "standard",
      name: "account",
      size: "small"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_icon2.default, {
      assistiveText: {
        label: 'Announcement'
      },
      category: "utility",
      name: "announcement",
      size: "small"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_icon2.default, {
      assistiveText: {
        label: 'Description'
      },
      category: "action",
      name: "description",
      size: "small"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_icon2.default, {
      assistiveText: {
        label: 'XML'
      },
      category: "doctype",
      name: "xml",
      size: "small"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_icon2.default, {
      assistiveText: {
        label: 'custom5'
      },
      category: "custom",
      name: "custom5",
      size: "small"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime