define(['exports', 'react', 'create-react-class', '../../../../../components/forms/radio'], function (exports, _react, _createReactClass, _radio) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _radio2 = _interopRequireDefault(_radio);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'RadioExample',

		render: function render() {
			return _react2.default.createElement(_radio2.default, {
				id: 'radioId1',
				label: 'Radio Label',
				disabled: true
			});
		}
	});

	exports.default = Example;
});