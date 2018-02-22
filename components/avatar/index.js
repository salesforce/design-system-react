define(['module', 'react', 'prop-types', '../../utilities/class-names', '../../utilities/constants', '../icon'], function (module, _react, _propTypes, _classNames, _constants, _icon) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _constants2 = _interopRequireDefault(_constants);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	// ### Display Name Always use the canonical component name as the React display
	// name.
	var displayName = _constants2.default;

	// ### Prop Types
	var propTypes = {
		/**
   * Assistive text for accessibility that labels the icon.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * Class names to be applied to Avatar component.
   */
		className: _propTypes2.default.string,
		/**
   * Alt attribute to be applied to image (base case) element.
   */
		imgAlt: _propTypes2.default.string,
		/**
   * Source attribute to be applied to image (base case) element.
   */
		imgSrc: _propTypes2.default.string,
		/**
   * Initials attribute to optionally pass in initials directly in case of "initials" fallback case.
   */
		initials: _propTypes2.default.string,
		/**
   * Label attibute to display inside "initials" fallback case. Will be passed as title prop in `abbr` element to provide more specificity.
   */
		label: _propTypes2.default.string,
		/**
   * Avatar variants to apply relevant styling (circle: user, square: entity) and icon rendering if applicable.
   */
		variant: _propTypes2.default.oneOf(['entity', 'user']).isRequired,
		/**
   * Size of the icon in "icon" fallback case.
   */
		size: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
		/**
   * Title attribute for the avatar container.
   */
		title: _propTypes2.default.string
	};

	var defaultProps = {
		imgAlt: '',
		size: 'medium',
		title: 'user avatar',
		variant: 'user'
	};

	/**
  * The avatar component represents an object or entity. An image is the preferred format for an avatar.
  If the `imgSrc` prop is undefined, and if a `label` or `initials` prop is available, the fallback avatar will render with initials. If initals are passed in directly in the `initials` prop, this will render in the fallback avatar. If `initals` prop is unavailable but a `label` prop is available, the fallback avatar will render with built initials of the user name or entity name.
 
  Intials built from the `label` prop will apply the following logic: If the label name contains two words, like first and last name, the first letter of each will be capitalized and returned. For labels that only have a single word name, the first two letters of that word, using one capital and one lower case letter, will be returned. For labels that contain three or more words, the first character of the first and last words will be capitalized and returned.
 
  If `initials` or `label` are not available, the fallback avatar will render a standard icon. If `variant='user'`, a user icon will
  render. If `variant='entity'`, an account icon will render.
  */

	var Avatar = function (_React$Component) {
		_inherits(Avatar, _React$Component);

		function Avatar(props) {
			_classCallCheck(this, Avatar);

			var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

			_this.state = {
				imgLoadError: false
			};
			return _this;
		}

		_createClass(Avatar, [{
			key: 'buildInitials',
			value: function buildInitials() {
				var label = this.props.label;

				var name = label.trim();
				var nameParts = name.split(' ');
				if (nameParts.length > 1) {
					return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
				}
				return (name[0] || '').toUpperCase() + (name[1] || '').toLowerCase();
			}
		}, {
			key: 'handleImageError',
			value: function handleImageError() {
				return this.setState(function () {
					return { imgLoadError: true };
				});
			}
		}, {
			key: 'renderBaseAvatar',
			value: function renderBaseAvatar() {
				var _this2 = this;

				var _props = this.props,
				    imgAlt = _props.imgAlt,
				    imgSrc = _props.imgSrc,
				    title = _props.title;

				return _react2.default.createElement('img', {
					alt: imgAlt,
					src: imgSrc,
					onError: function onError() {
						return _this2.handleImageError();
					},
					title: title
				});
			}
		}, {
			key: 'renderIconAvatar',
			value: function renderIconAvatar() {
				var _props2 = this.props,
				    assistiveText = _props2.assistiveText,
				    variant = _props2.variant;

				return _react2.default.createElement(_icon2.default, {
					assistiveText: assistiveText || 'User or Account Icon',
					category: 'standard',
					name: variant === 'entity' ? 'account' : 'user'
				});
			}
		}, {
			key: 'renderInitialsAvatar',
			value: function renderInitialsAvatar() {
				var _props3 = this.props,
				    initials = _props3.initials,
				    label = _props3.label,
				    variant = _props3.variant;

				return _react2.default.createElement(
					'abbr',
					{
						className: (0, _classNames2.default)('slds-avatar__initials', {
							'slds-icon-standard-account': variant === 'entity',
							'slds-icon-standard-user': variant === 'user'
						}),
						title: label
					},
					initials ? initials : this.buildInitials()
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _props4 = this.props,
				    imgSrc = _props4.imgSrc,
				    initials = _props4.initials,
				    variant = _props4.variant,
				    label = _props4.label,
				    size = _props4.size;


				var renderAvatar = function renderAvatar() {
					/* eslint no-unneeded-ternary: */
					if (!_this3.state.imgLoadError && imgSrc) {
						return _this3.renderBaseAvatar();
					}
					if (initials || label && label.trim()) {
						return _this3.renderInitialsAvatar();
					}
					return _this3.renderIconAvatar();
				};

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'span',
						{
							className: (0, _classNames2.default)('slds-avatar', {
								'slds-avatar_circle': variant === 'user',
								'slds-avatar_x-small': size === 'x-small',
								'slds-avatar_small': size === 'small',
								'slds-avatar_medium': size === 'medium',
								'slds-avatar_large': size === 'large'
							})
						},
						renderAvatar()
					)
				);
			}
		}]);

		return Avatar;
	}(_react2.default.Component);

	Avatar.defaultProps = defaultProps;
	Avatar.displayName = displayName;
	Avatar.propTypes = propTypes;

	module.exports = Avatar;
});