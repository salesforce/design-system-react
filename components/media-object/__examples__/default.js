"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _mediaObject = require("../../../../components/media-object");

var _mediaObject2 = _interopRequireDefault(_mediaObject);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'MediaObjectExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_mediaObject2.default, {
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.",
      figure: _react2.default.createElement(_icon2.default, {
        category: "standard",
        name: "user",
        size: "large"
      })
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime