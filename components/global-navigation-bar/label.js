define(['module', 'react', 'classnames', '../../utilities/constants'], function (module, _react, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

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

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	/**
  * Wraps text in the proper markup and removes link styling to support use in the GlobalNavigationBar.
  */
	var GlobalNavigationBarLabel = function GlobalNavigationBarLabel(props) {
		var
		// Separate props we care about in order to pass others along passively to the `span` tag
		className = props.className;
		var dividerPosition = props.dividerPosition;
		var label = props.label;

		var other = _objectWithoutProperties(props, ['className', 'dividerPosition', 'label']);

		return _react2.default.createElement(
			'li',
			{ className: 'slds-context-bar__item slds-no-hover' },
			_react2.default.createElement(
				'span',
				_extends({
					// inline style override
					style: { color: '#16325c' },
					className: (0, _classnames2.default)('slds-context-bar__label-action', _defineProperty({}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition), className)
				}, other),
				_react2.default.createElement(
					'span',
					{ className: 'slds-truncate' },
					label
				)
			)
		);
	};

	GlobalNavigationBarLabel.displayName = _constants.GLOBAL_NAVIGATION_BAR_LABEL;

	// ### Prop Types
	GlobalNavigationBarLabel.propTypes = {
		/**
   * Class names to be added to the `span` element
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Determines position of separating bar.
   */
		dividerPosition: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * Text to show
   */
		label: _react.PropTypes.string
	};

	module.exports = GlobalNavigationBarLabel;
});