define(['module', 'react', '@storybook/react', '../../../utilities/constants', '../__examples__/base', '../__examples__/complete', '../__examples__/warning', '../__examples__/expired', '../__examples__/customIcon'], function (module, _react, _react3, _constants, _base, _complete, _warning, _expired, _customIcon) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _base2 = _interopRequireDefault(_base);

  var _complete2 = _interopRequireDefault(_complete);

  var _warning2 = _interopRequireDefault(_warning);

  var _expired2 = _interopRequireDefault(_expired);

  var _customIcon2 = _interopRequireDefault(_customIcon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  (0, _react3.storiesOf)(_constants.PROGRESS_RING, module).addDecorator(function (getStory) {
    return _react2.default.createElement(
      'div',
      { className: 'slds-p-around--medium' },
      getStory()
    );
  }).add('Base', function () {
    return _react2.default.createElement(_base2.default, null);
  }).add('Theme: Complete', function () {
    return _react2.default.createElement(_complete2.default, null);
  }).add('Theme: Warning', function () {
    return _react2.default.createElement(_warning2.default, null);
  }).add('Theme: Expired', function () {
    return _react2.default.createElement(_expired2.default, null);
  }).add('Custom Icon', function () {
    return _react2.default.createElement(_customIcon2.default, null);
  });
});