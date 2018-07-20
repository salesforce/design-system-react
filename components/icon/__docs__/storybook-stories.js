"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _download = require("../../../icons/utility/download");

var _download2 = _interopRequireDefault(_download);

var _standard = require("../__examples__/standard");

var _standard2 = _interopRequireDefault(_standard);

var _utility = require("../__examples__/utility");

var _utility2 = _interopRequireDefault(_utility);

var _action = require("../__examples__/action");

var _action2 = _interopRequireDefault(_action);

var _doctype = require("../__examples__/doctype");

var _doctype2 = _interopRequireDefault(_doctype);

var _custom = require("../__examples__/custom");

var _custom2 = _interopRequireDefault(_custom);

var _externalPath = require("../__examples__/external-path");

var _externalPath2 = _interopRequireDefault(_externalPath);

var _colorBase = require("../__examples__/color-base");

var _colorBase2 = _interopRequireDefault(_colorBase);

var _colorDefault = require("../__examples__/color-default");

var _colorDefault2 = _interopRequireDefault(_colorDefault);

var _colorError = require("../__examples__/color-error");

var _colorError2 = _interopRequireDefault(_colorError);

var _colorWarning = require("../__examples__/color-warning");

var _colorWarning2 = _interopRequireDefault(_colorWarning);

var _sizesExtraSmall = require("../__examples__/sizes-extra-small");

var _sizesExtraSmall2 = _interopRequireDefault(_sizesExtraSmall);

var _sizesSmall = require("../__examples__/sizes-small");

var _sizesSmall2 = _interopRequireDefault(_sizesSmall);

var _sizesMedium = require("../__examples__/sizes-medium");

var _sizesMedium2 = _interopRequireDefault(_sizesMedium);

var _sizesLarge = require("../__examples__/sizes-large");

var _sizesLarge2 = _interopRequireDefault(_sizesLarge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.ICON, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Category: Standard', function () {
  return _react2.default.createElement(_standard2.default, null);
}).add('Category: Utility', function () {
  return _react2.default.createElement(_utility2.default, null);
}).add('Category: Action', function () {
  return _react2.default.createElement(_action2.default, null);
}).add('Category: Doctype', function () {
  return _react2.default.createElement(_doctype2.default, null);
}).add('Category: Custom', function () {
  return _react2.default.createElement(_custom2.default, null);
}).add('Category: External Path', function () {
  return _react2.default.createElement(_externalPath2.default, null);
}).add('Size: X-Small', function () {
  return _react2.default.createElement(_sizesExtraSmall2.default, null);
}).add('Size: Small', function () {
  return _react2.default.createElement(_sizesSmall2.default, null);
}).add('Size: Medium (default)', function () {
  return _react2.default.createElement(_sizesMedium2.default, null);
}).add('Size: Large', function () {
  return _react2.default.createElement(_sizesLarge2.default, null);
}).add('Color: Base', function () {
  return _react2.default.createElement("div", {
    style: {
      backgroundColor: 'goldenrod',
      padding: '10px'
    }
  }, _react2.default.createElement(_colorBase2.default, null));
}).add('Color: Default', function () {
  return _react2.default.createElement(_colorDefault2.default, null);
}).add('Base: Standard (custom styles)', function () {
  return _react2.default.createElement(_icon2.default, {
    assistiveText: {
      label: 'Account'
    },
    category: "standard",
    name: "account",
    style: {
      backgroundColor: '#aceace',
      fill: 'orangered'
    },
    title: "This is a title"
  });
}).add('Base: Imported', function () {
  return _react2.default.createElement(_icon2.default, {
    assistiveText: {
      label: 'Download'
    },
    category: "utility",
    icon: _download2.default
  });
});