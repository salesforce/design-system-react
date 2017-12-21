define(['module', 'react', '@storybook/react', '../../icon-settings', '../../../utilities/constants', '../__examples__/advanced', '../__examples__/basic'], function (module, _react, _react3, _iconSettings, _constants, _advanced, _basic) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _advanced2 = _interopRequireDefault(_advanced);

	var _basic2 = _interopRequireDefault(_basic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.DATA_TABLE, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Basic (Fluid Layout)', function () {
		return _react2.default.createElement(_basic2.default, null);
	}).add('Advanced (Fixed Layout)', function () {
		return _react2.default.createElement(_advanced2.default, { log: _react3.action });
	});
});