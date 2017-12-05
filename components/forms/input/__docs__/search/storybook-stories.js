define(['module', 'react', '@storybook/react', '../../../../icon-settings', '../../../../../utilities/constants', '../../search'], function (module, _react, _react3, _iconSettings, _constants, _search) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.FORMS_SEARCH, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Standard', function () {
		return _react2.default.createElement(_search2.default, {
			assistiveText: 'Search',
			placeholder: 'Search',
			name: 'search-input',
			onChange: (0, _react3.action)('change'),
			onSearch: (0, _react3.action)('search')
		});
	});
});