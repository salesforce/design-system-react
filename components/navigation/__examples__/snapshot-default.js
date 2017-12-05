define(['exports', 'react', 'create-react-class', '../../../../components/navigation', '../../../../components/icon-settings', '../../../../utilities/sample-data/navigation'], function (exports, _react, _createReactClass, _navigation, _iconSettings, _navigation3) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

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

	var Example = (0, _createReactClass2.default)({
		displayName: 'NavigationExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_navigation2.default, _extends({
					id: 'sample-navigation',
					categories: _navigation3.sampleReportCategories
				}, this.props))
			);
		}
	});

	exports.default = Example;
});