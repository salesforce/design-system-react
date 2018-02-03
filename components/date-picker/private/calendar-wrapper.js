define(['exports', 'react', 'prop-types', './calendar', './navigation', '../../../utilities/event', '../../../utilities/key-code', 'classnames'], function (exports, _react, _propTypes, _calendar, _navigation, _event, _keyCode, _classnames) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _event2 = _interopRequireDefault(_event);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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

	var DatepickerCalendarWrapper = function (_React$Component) {
		_inherits(DatepickerCalendarWrapper, _React$Component);

		function DatepickerCalendarWrapper() {
			var _ref;

			var _temp, _this, _ret;

			_classCallCheck(this, DatepickerCalendarWrapper);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatepickerCalendarWrapper.__proto__ || Object.getPrototypeOf(DatepickerCalendarWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				initialDateForCalendarRender: _this.props.selectedDate,
				isCalendarFocused: true
			}, _this.handleCalendarBlur = function (event, _ref2) {
				var direction = _ref2.direction;

				if (direction === 'next' && _this.previousMonthRef) {
					_this.setState({ isCalendarFocused: false });
					if (_this.props.onCalendarFocus) {
						_this.props.onCalendarFocus(event, {
							direction: direction,
							isCalendarFocused: false,
							ref: _this.previousMonthRef
						});
					}
					_this.previousMonthRef.focus();
				} else if (direction === 'previous' && _this.todayRef) {
					_this.setState({ isCalendarFocused: false });
					if (_this.props.onCalendarFocus) {
						_this.props.onCalendarFocus(event, {
							direction: direction,
							isCalendarFocused: false,
							ref: _this.todayRef
						});
					}
					_this.todayRef.focus();
				}
			}, _this.handleFirstFocusableNodeKeyDown = function (event) {
				if (event.shiftKey && event.keyCode === _keyCode2.default.TAB) {
					_event2.default.trapEvent(event);
					_this.setState({ isCalendarFocused: true });
				}
			}, _this.handleInitialDateForCalendarRenderChange = function (event, initialDateForCalendarRender) {
				_this.setState({ initialDateForCalendarRender: initialDateForCalendarRender });
			}, _this.handleKeyDown = function (event) {
				if (event.keyCode === _keyCode2.default.ESCAPE) {
					_event2.default.trapEvent(event);
					_this.props.onRequestClose(event);
				}
			}, _this.handleLastFocusableNodeKeyDown = function (event) {
				if (!event.shiftKey && event.keyCode === _keyCode2.default.TAB) {
					_event2.default.trapEvent(event);
					_this.setState({ isCalendarFocused: true });
				}
			}, _this.handleRequestClose = function () {
				if (_this.props.onRequestClose) {
					_this.props.onRequestClose();
				}
			}, _this.handleRequestFocusDate = function (event, data) {
				// will be called three times, due to re-render
				if (data.ref && _this.state.isCalendarFocused) {
					data.ref.focus();
				}

				// only call on actual DOM event and not on re-render
				if (_this.props.onCalendarFocus && data.triggerCallback) {
					var triggerCallback = data.triggerCallback,
					    modifiedData = _objectWithoutProperties(data, ['triggerCallback']);

					// eslint-disable-line no-unused-vars
					_this.props.onCalendarFocus(event, modifiedData);
				}
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(DatepickerCalendarWrapper, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					'div',
					{ // eslint-disable-line jsx-a11y/no-static-element-interactions
						className: (0, _classnames2.default)({
							'slds-datepicker': this.props.isolated
						}, this.props.className),
						'aria-hidden': 'false',
						'data-selection': 'single',
						onKeyDown: this.handleKeyDown
					},
					_react2.default.createElement(_navigation2.default, {
						assistiveTextNextMonth: this.props.assistiveTextNextMonth,
						assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth,
						id: this.props.id,
						initialDateForCalendarRender: this.state.initialDateForCalendarRender,
						monthLabels: this.props.monthLabels,
						onChangeMonth: this.handleInitialDateForCalendarRenderChange,
						previousMonthRef: function previousMonthRef(component) {
							_this2.previousMonthRef = component;
						},
						onPreviousMonthKeyDown: this.handleFirstFocusableNodeKeyDown,
						relativeYearFrom: this.props.relativeYearFrom,
						relativeYearTo: this.props.relativeYearTo
					}),
					_react2.default.createElement(_calendar2.default, {
						abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels,
						dateDisabled: this.props.dateDisabled,
						id: this.props.id,
						initialDateForCalendarRender: this.state.initialDateForCalendarRender,
						isIsoWeekday: this.props.isIsoWeekday,
						onCalendarBlur: this.handleCalendarBlur,
						onChangeMonth: this.handleInitialDateForCalendarRenderChange,
						onRequestClose: this.handleRequestClose,
						onRequestInternalFocusDate: this.handleRequestFocusDate,
						onSelectDate: this.props.onSelectDate,
						selectedDate: this.props.selectedDate,
						selectedDateRef: this.props.selectedDateRef,
						todayLabel: this.props.todayLabel,
						todayRef: function todayRef(component) {
							_this2.todayRef = component;
						},
						onLastFocusableNodeKeyDown: this.handleLastFocusableNodeKeyDown,
						weekDayLabels: this.props.weekDayLabels
					})
				);
			}
		}]);

		return DatepickerCalendarWrapper;
	}(_react2.default.Component);

	DatepickerCalendarWrapper.defaultProps = {
		selectedDate: new Date(),
		value: new Date()
	};
	DatepickerCalendarWrapper.displayName = 'DatepickerCalendarWrapper';
	DatepickerCalendarWrapper.propTypes = {
		/**
   * Label for button to go to the next month
   */
		assistiveTextNextMonth: _propTypes2.default.string.isRequired,
		/**
   * Label for button to go to the previous month
   */
		assistiveTextPreviousMonth: _propTypes2.default.string.isRequired,
		/**
   * One letter abbreviations of the days of the week, starting on Sunday.
   */
		abbreviatedWeekDayLabels: _propTypes2.default.array.isRequired,
		/**
   * CSS classes to be added to tag with `slds-datepicker`.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
   */
		dateDisabled: _propTypes2.default.func,
		/**
   * HTML id for component
   */
		id: _propTypes2.default.string,
		/**
   * Makes Monday the first day of the week
   */
		isIsoWeekday: _propTypes2.default.bool,
		/**
   * For use of datepicker outside of dropdown.
   */
		isolated: _propTypes2.default.bool,
		/**
   * Names of the months
   */
		monthLabels: _propTypes2.default.array.isRequired,
		/**
   * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
   */
		onCalendarFocus: _propTypes2.default.func,
		/**
   * Triggered when the calendar is supposed to close.
   */
		onRequestClose: _propTypes2.default.func.isRequired,
		/**
   * Triggered when a date on the calendar is clicked.
   */
		onSelectDate: _propTypes2.default.func.isRequired,
		/**
   * The earliest year that can be selected in the year selection dropdown.
   */
		relativeYearFrom: _propTypes2.default.number.isRequired,
		/**
   * The maximum year that can be selected in the year selection dropdown.
   */
		relativeYearTo: _propTypes2.default.number.isRequired,
		/**
   * Currently selected date
   */
		selectedDate: _propTypes2.default.instanceOf(Date),
		/**
   * Component reference / DOM node for selected day.
   */
		selectedDateRef: _propTypes2.default.func,
		/**
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
		todayLabel: _propTypes2.default.string.isRequired,
		/**
   * Names of the seven days of the week, starting on Sunday.
   */
		weekDayLabels: _propTypes2.default.array.isRequired
	};
	exports.default = DatepickerCalendarWrapper;
});