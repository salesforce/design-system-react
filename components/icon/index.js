define(['exports', 'react', 'prop-types', '../../utilities/class-names', '../utilities/utility-icon', '../../utilities/constants'], function (exports, _react, _propTypes, _classNames2, _utilityIcon, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classNames3 = _interopRequireDefault(_classNames2);

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
  * The Icon component is the Lightning Design System Icon component and should be used for naked icons. For icons that are buttons, use the <a href='/components/buttons/'>Button component</a> component with <code>variant='icon'</code>.
  */
	var Icon = function Icon(_ref) {
		var assistiveText = _ref.assistiveText,
		    category = _ref.category,
		    className = _ref.className,
		    containerClassName = _ref.containerClassName,
		    icon = _ref.icon,
		    inverse = _ref.inverse,
		    name = _ref.name,
		    path = _ref.path,
		    size = _ref.size,
		    style = _ref.style,
		    title = _ref.title;

		var kababCaseName = name ? name.replace(/_/g, '-') : '';

		return _react2.default.createElement(
			'span',
			{
				className: (0, _classNames3.default)(_defineProperty({
					'slds-icon_container': category !== 'utility',
					'slds-icon_container--circle': category === 'action'
				}, 'slds-icon-' + category + '-' + kababCaseName, category !== 'utility' && category !== 'doctype' && !path), containerClassName),
				title: title
			},
			_react2.default.createElement(_utilityIcon2.default, {
				'aria-hidden': 'true',
				category: category,
				className: (0, _classNames3.default)(className, 'slds-icon', {
					'slds-icon--xx-small': size === 'xx-small',
					'slds-icon--x-small': size === 'x-small',
					'slds-icon--small': size === 'small',
					// medium intentially not present
					'slds-icon--large': size === 'large',
					// if category is `utility` and `inverse` is false (default), icon will be dark // return true
					// if category is `utility` and `inverse` is true, icon will be light // return false
					// if category is NOT `utility` and `inverse` is false (default), icon will be light // return false
					// if category is NOT `utility` and `inverse` is true, icon will be dark // return true
					'slds-icon-text-default': category === 'utility' ? !inverse : inverse
				}),
				icon: icon,
				name: name,
				path: path,
				style: style
			}),
			assistiveText ? _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				assistiveText
			) : ''
		);
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	Icon.displayName = _constants.ICON;

	// ### Prop Types
	Icon.propTypes = {
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
   * declare this prop as <code>assistiveText=''</code>.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
		category: _propTypes2.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
		/**
   * CSS classes that are applied to the SVG.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * CSS classes that are applied to the span.
   */
		containerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Icon color variants
   */
		colorVariant: _propTypes2.default.oneOf(['base', 'default', 'error', 'warning']),
		/**
   * A custom SVG object to use instead of the supplied SLDS icons, look in `design-system-react/icons` for examples and syntax.
   */
		icon: _propTypes2.default.object,
		/**
   * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
   */
		inverse: _propTypes2.default.bool,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		name: _propTypes2.default.string,
		/**
   * Path to the icon. This will override any global icon settings
   */
		path: _propTypes2.default.string,
		/**
   * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
   */
		size: _propTypes2.default.oneOf(['xx-small', 'x-small', 'small', 'medium', 'large']),
		/**
   * Custom styles to be passed to the SVG. Could be used to change icon or background color.
   */
		style: _propTypes2.default.object,
		/**
   * Title attribute for the icon container
   */
		title: _propTypes2.default.string
	};

	Icon.defaultProps = {
		category: 'standard',
		size: 'medium'
	};

	exports.default = Icon;
});