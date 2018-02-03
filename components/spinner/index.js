define(['exports', 'react', 'prop-types', 'classnames', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	// ### Prop Types
	var PROP_TYPES = {
		/**
   * Assistive text that is read out loud to screen readers.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * Custom css classes applied to Spinner container
   */
		containerClassName: _propTypes2.default.string,
		/**
   * Unique html id placed on div with role="status".
   */
		id: _propTypes2.default.string,
		/**
   * Determines if spinner is inside input field
   */
		isInput: _propTypes2.default.bool,
		/**
   * Determines the size of the spinner
   */
		size: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
		variant: _propTypes2.default.oneOf(['base', 'brand', 'inverse'])
	};

	var DEFAULT_PROPS = {
		assistiveText: 'Loading...',
		size: 'medium',
		variant: 'base'
	};

	// ## Spinner
	var Spinner = function Spinner(props) {
		var assistiveText = props.assistiveText,
		    containerClassName = props.containerClassName,
		    id = props.id,
		    isInput = props.isInput,
		    size = props.size,
		    variant = props.variant;


		var spinnerClassName = (0, _classnames2.default)('slds-spinner', _defineProperty({
			'slds-input__spinner': isInput,
			'slds-spinner_brand': variant === 'brand',
			'slds-spinner_inverse': variant === 'inverse'
		}, 'slds-spinner_' + size, size));

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(containerClassName, 'slds-spinner_container') },
			_react2.default.createElement(
				'div',
				{
					'aria-hidden': 'false',
					className: spinnerClassName,
					id: id,
					role: 'status'
				},
				assistiveText && _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					assistiveText
				),
				_react2.default.createElement('div', { className: 'slds-spinner__dot-a' }),
				_react2.default.createElement('div', { className: 'slds-spinner__dot-b' })
			)
		);
	};

	Spinner.displayName = _constants.SPINNER;
	Spinner.propTypes = PROP_TYPES;
	Spinner.defaultProps = DEFAULT_PROPS;

	exports.default = Spinner;
});