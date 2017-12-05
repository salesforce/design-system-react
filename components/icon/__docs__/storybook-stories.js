define(['module', 'react', '@storybook/react', '../../../utilities/constants', '../../icon', '../../icon-settings', '../../../icons/utility/download', '../__examples__/standard', '../__examples__/utility', '../__examples__/action', '../__examples__/doctype', '../__examples__/custom', '../__examples__/external-path', '../__examples__/color-base', '../__examples__/color-default', '../__examples__/color-error', '../__examples__/color-warning', '../__examples__/sizes-extra-small', '../__examples__/sizes-small', '../__examples__/sizes-medium', '../__examples__/sizes-large'], function (module, _react, _react3, _constants, _icon, _iconSettings, _download, _standard, _utility, _action, _doctype, _custom, _externalPath, _colorBase, _colorDefault, _colorError, _colorWarning, _sizesExtraSmall, _sizesSmall, _sizesMedium, _sizesLarge) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _icon2 = _interopRequireDefault(_icon);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _download2 = _interopRequireDefault(_download);

	var _standard2 = _interopRequireDefault(_standard);

	var _utility2 = _interopRequireDefault(_utility);

	var _action2 = _interopRequireDefault(_action);

	var _doctype2 = _interopRequireDefault(_doctype);

	var _custom2 = _interopRequireDefault(_custom);

	var _externalPath2 = _interopRequireDefault(_externalPath);

	var _colorBase2 = _interopRequireDefault(_colorBase);

	var _colorDefault2 = _interopRequireDefault(_colorDefault);

	var _colorError2 = _interopRequireDefault(_colorError);

	var _colorWarning2 = _interopRequireDefault(_colorWarning);

	var _sizesExtraSmall2 = _interopRequireDefault(_sizesExtraSmall);

	var _sizesSmall2 = _interopRequireDefault(_sizesSmall);

	var _sizesMedium2 = _interopRequireDefault(_sizesMedium);

	var _sizesLarge2 = _interopRequireDefault(_sizesLarge);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.ICON, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
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
		return _react2.default.createElement(
			'div',
			{ style: { backgroundColor: 'goldenrod', padding: '10px' } },
			_react2.default.createElement(_colorBase2.default, null)
		);
	}).add('Color: Default', function () {
		return _react2.default.createElement(_colorDefault2.default, null);
	}).add('Base: Standard (custom styles)', function () {
		return _react2.default.createElement(_icon2.default, {
			assistiveText: 'Account',
			category: 'standard',
			name: 'account',
			style: { backgroundColor: '#aceace', fill: 'orangered' },
			title: 'This is a title'
		});
	}).add('Base: Imported', function () {
		return _react2.default.createElement(_icon2.default, {
			assistiveText: 'Download',
			category: 'utility',
			icon: _download2.default
		});
	});
});