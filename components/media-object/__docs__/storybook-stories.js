"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _mediaObject = _interopRequireDefault(require("../../media-object"));

var _icon = _interopRequireDefault(require("../../icon"));

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _verticallyCentered = _interopRequireDefault(require("../__examples__/vertically-centered"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DemoMediaObject = function DemoMediaObject(props) {
  return _react.default.createElement(_mediaObject.default, props);
};

DemoMediaObject.displayName = 'DemoMediaObject';
(0, _react2.storiesOf)(_constants.MEDIA_OBJECT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react.default.createElement(DemoMediaObject, {
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.",
    figure: _react.default.createElement(_icon.default, {
      category: "standard",
      name: "user",
      size: "medium"
    })
  });
}).add('Figure Vertical Center', function () {
  return _react.default.createElement(DemoMediaObject, {
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.",
    figure: _react.default.createElement(_icon.default, {
      category: "standard",
      name: "user",
      size: "medium"
    }),
    verticalCenter: true
  });
}).add('Docs site Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Docs site VerticallyCentered', function () {
  return _react.default.createElement(_verticallyCentered.default, null);
});