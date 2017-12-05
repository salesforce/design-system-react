define(['module', 'react', 'prop-types', '@storybook/react', 'airbnb-prop-types', '../../radio-button-group', '../../radio-button-group/radio', '../../../utilities/constants'], function (module, _react, _propTypes, _react3, _airbnbPropTypes, _radioButtonGroup, _radio, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

	var _radio2 = _interopRequireDefault(_radio);

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

	var RadioButtonGroupExample = function (_React$Component) {
		_inherits(RadioButtonGroupExample, _React$Component);

		function RadioButtonGroupExample(props) {
			_classCallCheck(this, RadioButtonGroupExample);

			var _this = _possibleConstructorReturn(this, (RadioButtonGroupExample.__proto__ || Object.getPrototypeOf(RadioButtonGroupExample)).call(this, props));

			_this.state = { checked: 'Tue' };
			_this.onChange = _this.onChange.bind(_this);
			return _this;
		}

		_createClass(RadioButtonGroupExample, [{
			key: 'onChange',
			value: function onChange(event) {
				this.setState({ checked: event.target.value });
				(0, _react3.action)('onChange')(event);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h1',
						{ className: 'slds-text-title_caps slds-p-vertical--medium' },
						this.props.heading
					),
					_react2.default.createElement(
						_radioButtonGroup2.default,
						{
							labels: this.props.labels,
							onChange: this.onChange,
							disabled: this.props.disabled,
							required: this.props.required
						},
						days.map(function (day) {
							return _react2.default.createElement(_radio2.default, { key: day, label: day, value: day, checked: _this2.state.checked === day, variant: 'button-group' });
						})
					)
				);
			}
		}]);

		return RadioButtonGroupExample;
	}(_react2.default.Component);

	RadioButtonGroupExample.propTypes = {
		labels: (0, _airbnbPropTypes.shape)({
			error: _propTypes2.default.string,
			label: _propTypes2.default.string
		}),
		disabled: _propTypes2.default.bool,
		required: _propTypes2.default.bool,
		heading: _propTypes2.default.string
	};

	RadioButtonGroupExample.defaultProps = {
		labels: { label: 'Day of week' }
	};

	(0, _react3.storiesOf)(_constants.RADIO_BUTTON_GROUP, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			getStory()
		);
	}).add('Base', function () {
		return _react2.default.createElement(RadioButtonGroupExample, { heading: 'Base' });
	}).add('Disabled', function () {
		return _react2.default.createElement(RadioButtonGroupExample, { heading: 'Disabled', disabled: true });
	}).add('Required', function () {
		return _react2.default.createElement(RadioButtonGroupExample, { heading: 'Required', required: true });
	}).add('Error', function () {
		return _react2.default.createElement(RadioButtonGroupExample, { heading: 'Error', labels: { label: 'Day of week', error: 'There is an error' } });
	});
});