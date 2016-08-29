define(['module', 'react', '../../forms/input', '../../../utilities/constants'], function (module, _react, _input, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _input2 = _interopRequireDefault(_input);

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

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var PropTypes = _react2.default.PropTypes;


	var idSuffixes = {
		base: '__filter-input'
	};

	/**
  * A default filter or search input for Cards that contain items.
  */
	var Filter = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.CARD_FILTER,

		// ### Prop Types
		propTypes: {
			/**
    * The HTML `id` from the card.
    */
			id: PropTypes.string,
			/**
    * This callback fires when the input changes.
    */
			onChange: PropTypes.func,
			/**
    * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
    */
			placeholder: PropTypes.string.isRequired
		},

		getDefaultProps: function getDefaultProps() {
			return {
				placeholder: 'Find in List'
			};
		},
		render: function render() {
			var _props = this.props;
			var id = _props.id;
			var placeholder = _props.placeholder;
			var onChange = _props.onChange;

			var props = _objectWithoutProperties(_props, ['id', 'placeholder', 'onChange']);

			return _react2.default.createElement(_input2.default, _extends({}, props, {
				assistiveText: placeholder,
				iconCategory: 'utility',
				iconName: 'search',
				id: id + idSuffixes.base,
				onChange: onChange,
				placeholder: placeholder
			}));
		}
	});

	module.exports = Filter;
	module.exports.idSuffixes = idSuffixes;
});