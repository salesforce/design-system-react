define(['module', 'react', '@storybook/react', '../../icon-settings', '../../../utilities/constants', '../__examples__/default', '../__examples__/new', '../__examples__/locked', '../__examples__/permanant', '../__examples__/error', '../__examples__/assistive-text'], function (module, _react, _react3, _iconSettings, _constants, _default, _new, _locked, _permanant, _error, _assistiveText) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _default2 = _interopRequireDefault(_default);

	var _new2 = _interopRequireDefault(_new);

	var _locked2 = _interopRequireDefault(_locked);

	var _permanant2 = _interopRequireDefault(_permanant);

	var _error2 = _interopRequireDefault(_error);

	var _assistiveText2 = _interopRequireDefault(_assistiveText);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* eslint-disable react/display-name */
	/* eslint-disable react/prop-types */

	var CustomAlignment = function CustomAlignment(_ref) {
		var children = _ref.children,
		    align = _ref.align;
		return _react2.default.createElement(
			'div',
			{ className: 'slds-grid slds-m-around--xx-large' },
			_react2.default.createElement(
				'div',
				{
					className: 'slds-col--bump-' + align,
					style: { width: '420px' }
				},
				children
			)
		);
	};

	CustomAlignment.defaultProps = { align: 'left' };

	(0, _react3.storiesOf)(_constants.FILTER, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Filter', function () {
		return _react2.default.createElement(
			CustomAlignment,
			null,
			_react2.default.createElement(_default2.default, null)
		);
	}).add('New Filter', function () {
		return _react2.default.createElement(
			CustomAlignment,
			null,
			_react2.default.createElement(_new2.default, null)
		);
	}).add('Locked Filter', function () {
		return _react2.default.createElement(
			CustomAlignment,
			null,
			_react2.default.createElement(_locked2.default, null)
		);
	}).add('Permanant Filter', function () {
		return _react2.default.createElement(
			CustomAlignment,
			null,
			_react2.default.createElement(_permanant2.default, null)
		);
	}).add('Filter Align Right', function () {
		return _react2.default.createElement(
			CustomAlignment,
			{ align: 'right' },
			_react2.default.createElement(_default2.default, { align: 'right' })
		);
	}).add('AssistiveTextFilter', function () {
		return _react2.default.createElement(
			CustomAlignment,
			null,
			_react2.default.createElement(_assistiveText2.default, null)
		);
	});
});