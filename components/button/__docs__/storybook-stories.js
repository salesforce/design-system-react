define(['module', 'react', '@storybook/react', '../../icon-settings', '../../../utilities/constants', '../../button'], function (module, _react, _react3, _iconSettings, _constants, _button) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	var getButton = function getButton(props) {
		return _react2.default.createElement(_button2.default, _extends({}, props, {
			onClick: (0, _react3.action)('click')
		}));
	};

	var getIconButton = function getIconButton(props) {
		return getButton(_extends({ variant: 'icon' }, props));
	};

	(0, _react3.storiesOf)(_constants.BUTTON, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Base', function () {
		return getButton({ label: 'Base', variant: 'base' });
	}).add('Neutral', function () {
		return getButton({ label: 'Neutral' });
	}).add('Neutral with id', function () {
		return getButton({ label: 'Neutral', id: 'custom-id' });
	}).add('Neutral Icon', function () {
		return getButton({
			label: 'Neutral Icon',
			iconName: 'download',
			iconPosition: 'left',
			onFocus: (0, _react3.action)('focus'),
			onKeyDown: (0, _react3.action)('keyDown')
		});
	}).add('Disabled', function () {
		return getButton({ label: 'Disabled', disabled: true });
	}).add('Icon large', function () {
		return getIconButton({
			assistiveText: 'Icon',
			iconSize: 'large',
			iconName: 'answer',
			title: 'chat'
		});
	}).add('Icon with external path', function () {
		return getIconButton({
			assistiveText: 'Icon',
			iconSize: 'large',
			iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
			title: 'announcement'
		});
	}).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium slds-hint-parent', style: { backgroundColor: '#16325c' } },
			getStory()
		);
	}).add('Icon Container Small', function () {
		return getIconButton({
			assistiveText: 'Icon border container small',
			iconName: 'settings',
			iconSize: 'large',
			iconVariant: 'border',
			inverse: true
		});
	}).add('Dropdown Icon inverse', function () {
		return getIconButton({
			'aria-haspopup': true,
			assistiveText: 'Dropdown Icon inverse',
			iconName: 'settings',
			iconVariant: 'more',
			inverse: true
		});
	}).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-hint-parent', style: { backgroundColor: '#16325c' } },
			getStory()
		);
	}).add('Small Icon Hint inverse', function () {
		return getIconButton({
			assistiveTest: 'Hint',
			iconName: 'down',
			iconVariant: 'border',
			iconSize: 'small',
			hint: true,
			inverse: true
		});
	});
});