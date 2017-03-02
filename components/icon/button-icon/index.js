define(['module', 'react', 'classnames', './check-props', '../../utilities/utility-icon', '../../../utilities/constants'], function (module, _react, _classnames, _checkProps, _utilityIcon, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

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

	/**
  * This is a non-interctive wrapper component for `UtilityIcon` that specifies button icon classes for an icon inside a `button` tag. Use of this component by itself is not recommended, but should be used as part of other components to obtain the correct styling for icons within buttons. This component only partially implements [Button Icons](http://www.lightningdesignsystem.com/components/button-icons). It does not return a `button` HTML tag. It only returns an icon for use within a button. Assistive text must also be rendered by the parent.
  */
	var ButtonIcon = function ButtonIcon(props) {
		var _classNames;

		(0, _checkProps2.default)(_constants.BUTTON_ICON, props);

		return _react2.default.createElement(_utilityIcon2.default, {
			'aria-hidden': 'true',
			category: props.category,
			className: (0, _classnames2.default)('slds-button__icon', (_classNames = {}, _defineProperty(_classNames, 'slds-button__icon--' + props.size, props.size && props.size !== 'medium'), _defineProperty(_classNames, 'slds-button__icon--inverse-hint', props.inverse && props.hint), _defineProperty(_classNames, 'slds-button__icon--hint', props.hint && !props.inverse), _defineProperty(_classNames, 'slds-button__icon--' + props.position, props.position), _classNames), props.className) // iconClassName has been deprecated
			, icon: props.icon,
			name: props.name
		});
	};

	var propTypes = {
		/**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
		category: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
		/**
   * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
		hint: _react.PropTypes.bool,
		/**
    * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
    */
		icon: _react.PropTypes.object,
		/**
   * Class names to be added to the SVG.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
   */
		inverse: _react.PropTypes.bool,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		name: _react.PropTypes.string,
		/**
   * Adds additional spacing on the opposite side specified between button icon and the button label
   */
		position: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
   */
		size: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large'])
	};

	var defaultProps = {
		category: 'utility',
		size: 'medium'
	};

	ButtonIcon.displayName = _constants.BUTTON_ICON;
	ButtonIcon.propTypes = propTypes;
	ButtonIcon.defaultProps = defaultProps;

	module.exports = ButtonIcon;
});