"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _icon = _interopRequireDefault(require("../../icon"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _download = _interopRequireDefault(require("../../../icons/utility/download"));

var _standard = _interopRequireDefault(require("../__examples__/standard"));

var _utility = _interopRequireDefault(require("../__examples__/utility"));

var _action = _interopRequireDefault(require("../__examples__/action"));

var _doctype = _interopRequireDefault(require("../__examples__/doctype"));

var _custom = _interopRequireDefault(require("../__examples__/custom"));

var _externalPath = _interopRequireDefault(require("../__examples__/external-path"));

var _colorBase = _interopRequireDefault(require("../__examples__/color-base"));

var _colorDefault = _interopRequireDefault(require("../__examples__/color-default"));

var _colorError = _interopRequireDefault(require("../__examples__/color-error"));

var _colorWarning = _interopRequireDefault(require("../__examples__/color-warning"));

var _colorLight = _interopRequireDefault(require("../__examples__/color-light"));

var _sizesExtraSmall = _interopRequireDefault(require("../__examples__/sizes-extra-small"));

var _sizesSmall = _interopRequireDefault(require("../__examples__/sizes-small"));

var _sizesMedium = _interopRequireDefault(require("../__examples__/sizes-medium"));

var _sizesLarge = _interopRequireDefault(require("../__examples__/sizes-large"));

var _categories = _interopRequireDefault(require("../__examples__/categories"));

var _colors = _interopRequireDefault(require("../__examples__/colors"));

var _sizes = _interopRequireDefault(require("../__examples__/sizes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.ICON, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Category: Standard', function () {
  return _react.default.createElement(_standard.default, null);
}).add('Category: Utility', function () {
  return _react.default.createElement(_utility.default, null);
}).add('Category: Action', function () {
  return _react.default.createElement(_action.default, null);
}).add('Category: Doctype', function () {
  return _react.default.createElement(_doctype.default, null);
}).add('Category: Custom', function () {
  return _react.default.createElement(_custom.default, null);
}).add('Category: External Path', function () {
  return _react.default.createElement(_externalPath.default, null);
}).add('Size: X-Small', function () {
  return _react.default.createElement(_sizesExtraSmall.default, null);
}).add('Size: Small', function () {
  return _react.default.createElement(_sizesSmall.default, null);
}).add('Size: Medium (default)', function () {
  return _react.default.createElement(_sizesMedium.default, null);
}).add('Size: Large', function () {
  return _react.default.createElement(_sizesLarge.default, null);
}).add('Color: Base', function () {
  return _react.default.createElement("div", {
    style: {
      backgroundColor: 'goldenrod',
      padding: '10px'
    }
  }, _react.default.createElement(_colorBase.default, null));
}).add('Color: Default', function () {
  return _react.default.createElement(_colorDefault.default, null);
}).add('Color: Error', function () {
  return _react.default.createElement(_colorError.default, null);
}).add('Color: Warning', function () {
  return _react.default.createElement(_colorWarning.default, null);
}).add('Color: Light', function () {
  return _react.default.createElement(_colorLight.default, null);
}).add('Base: Standard (custom styles)', function () {
  return _react.default.createElement(_icon.default, {
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
  return _react.default.createElement(_icon.default, {
    assistiveText: {
      label: 'Download'
    },
    category: "utility",
    icon: _download.default
  });
}).add('Docs site Categories', function () {
  return _react.default.createElement(_categories.default, null);
}).add('Docs site Colors', function () {
  return _react.default.createElement(_colors.default, null);
}).add('Docs site Sizes', function () {
  return _react.default.createElement(_sizes.default, null);
});