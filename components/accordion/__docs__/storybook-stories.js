define(['module', 'react', '@storybook/react', '../../../utilities/constants', '../__examples__/base'], function (module, _react, _react3, _constants, _base) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.ACCORDION, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			getStory()
		);
	}).add('Base', function () {
		return _react2.default.createElement(_base2.default, { action: _react3.action });
	});
});