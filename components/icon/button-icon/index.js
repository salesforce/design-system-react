define(['module', 'react', '../../utilities/utility-icon', 'classnames'], function (module, _react, _utilityIcon, _classnames) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

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

	var displayName = 'ButtonIcon';

	var propTypes = {
		assistiveText: _react2.default.PropTypes.string,
		category: _react2.default.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
		className: _react2.default.PropTypes.string,
		hint: _react2.default.PropTypes.bool,
		icon: _react2.default.PropTypes.object,
		inverse: _react2.default.PropTypes.bool,
		name: _react2.default.PropTypes.string,
		position: _react2.default.PropTypes.oneOf(['left', 'right']),
		size: _react2.default.PropTypes.oneOf(['x-small', 'small', 'medium', 'large'])
	};

	var defaultProps = {
		category: 'utility',
		size: 'medium'
	};

	var ButtonIcon = function (_React$Component) {
		_inherits(ButtonIcon, _React$Component);

		function ButtonIcon(props) {
			_classCallCheck(this, ButtonIcon);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonIcon).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(ButtonIcon, [{
			key: 'getClassName',
			value: function getClassName() {
				var _classNames;

				return (0, _classnames2.default)(this.props.className, 'slds-button__icon', (_classNames = {}, _defineProperty(_classNames, 'slds-button__icon--' + this.props.position, this.props.position), _defineProperty(_classNames, 'slds-button__icon--' + this.props.size, this.props.size && this.props.size !== 'medium'), _defineProperty(_classNames, 'slds-button__icon--inverse-hint', this.props.inverse && this.props.hint), _defineProperty(_classNames, 'slds-button__icon--hint', this.props.hint && !this.props.inverse), _classNames));
			}
		}, {
			key: 'render',
			value: function render() {
				var label = null;

				if (this.props.assistiveText) {
					label = _react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.assistiveText
					);
				}

				return _react2.default.createElement(
					'span',
					null,
					label,
					_react2.default.createElement(_utilityIcon2.default, {
						'aria-hidden': 'true',
						category: this.props.category,
						className: this.getClassName(),
						icon: this.props.icon,
						name: this.props.name
					})
				);
			}
		}]);

		return ButtonIcon;
	}(_react2.default.Component);

	ButtonIcon.displayName = displayName;
	ButtonIcon.propTypes = propTypes;
	ButtonIcon.defaultProps = defaultProps;

	module.exports = ButtonIcon;
});