define(['module', 'react', '@storybook/react', '../../icon-settings', '../../media-object', '../../icon', '../../../utilities/constants'], function (module, _react, _react3, _iconSettings, _mediaObject, _icon, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _mediaObject2 = _interopRequireDefault(_mediaObject);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var DemoMediaObject = function DemoMediaObject(props) {
		return _react2.default.createElement(_mediaObject2.default, props);
	};
	DemoMediaObject.displayName = 'DemoMediaObject';

	(0, _react3.storiesOf)(_constants.MEDIA_OBJECT, module).addDecorator(function (getStory) {
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
		return _react2.default.createElement(DemoMediaObject, {
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.',
			figure: _react2.default.createElement(_icon2.default, { category: 'standard', name: 'user', size: 'medium' })
		});
	}).add('Figure Vertical Center', function () {
		return _react2.default.createElement(DemoMediaObject, {
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.',
			figure: _react2.default.createElement(_icon2.default, { category: 'standard', name: 'user', size: 'medium' }),
			verticalCenter: true
		});
	});
});