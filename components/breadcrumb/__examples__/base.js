define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/breadcrumb'], function (exports, _react, _createReactClass, _iconSettings, _breadcrumb) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'BreadCrumbExample',

		render: function render() {
			var trail = [_react2.default.createElement(
				'a',
				{ id: 'parent-entity', href: 'javascript:void(0);' },
				'Parent Entity'
			), _react2.default.createElement(
				'a',
				{ href: 'javascript:void(0);' },
				'Parent Record Name'
			)];

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_breadcrumb2.default, { trail: trail })
			);
		}
	});

	exports.default = Example;
});