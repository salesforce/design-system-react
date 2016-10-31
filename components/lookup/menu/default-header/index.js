define(['module', 'react', '../../../icon', '../../../../utilities'], function (module, _react, _icon, _utilities) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

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

	var displayName = "LookupDefaultHeader";
	var propTypes = {};
	var defaultProps = {};

	var DefaultHeader = function (_React$Component) {
		_inherits(DefaultHeader, _React$Component);

		function DefaultHeader(props) {
			_classCallCheck(this, DefaultHeader);

			return _possibleConstructorReturn(this, (DefaultHeader.__proto__ || Object.getPrototypeOf(DefaultHeader)).call(this, props));
		}

		_createClass(DefaultHeader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
					this.props.setFocus('searchRecords');
				}
			}
		}, {
			key: 'handleClick',
			value: function handleClick() {
				if (this.props.onClose) {
					this.props.onClose();
				}
			}
		}, {
			key: 'handleMouseDown',
			value: function handleMouseDown(event) {
				_utilities.EventUtil.trapImmediate(event);
			}
		}, {
			key: 'render',
			value: function render() {
				var className = 'slds-lookup__item-action slds-lookup__item-action--label';
				if (this.props.isActive) className += ' slds-theme--shade';

				return _react2.default.createElement(
					'div',
					{ className: 'js-slds-lookup__item', onMouseDown: this.handleMouseDown, onClick: this.handleClick.bind(this) },
					_react2.default.createElement(
						'a',
						{ id: 'searchRecords', href: 'javascript:void(0);', className: className },
						_react2.default.createElement(
							'span',
							{ className: 'lookup__item-action-label' },
							_react2.default.createElement(_icon2.default, { name: 'search', category: 'utility', size: 'x-small', className: 'slds-icon-text-default' }),
							_react2.default.createElement(
								'span',
								{ className: 'slds-truncate' },
								this.props.searchTerm
							)
						)
					)
				);
			}
		}]);

		return DefaultHeader;
	}(_react2.default.Component);

	DefaultHeader.displayName = displayName;
	DefaultHeader.propTypes = propTypes;
	DefaultHeader.defaultProps = defaultProps;

	module.exports = DefaultHeader;
});