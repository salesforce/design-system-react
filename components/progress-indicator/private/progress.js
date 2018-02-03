define(['exports', 'react', 'prop-types', 'airbnb-prop-types', './progress-bar', 'classnames', '../../../utilities/constants'], function (exports, _react, _propTypes, _airbnbPropTypes, _progressBar, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _progressBar2 = _interopRequireDefault(_progressBar);

	var _classnames2 = _interopRequireDefault(_classnames);

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

	// ### Prop Types
	var propTypes = {
		/**
   * Assistive text for percentage
   */
		assistiveText: (0, _airbnbPropTypes.shape)({
			percentage: _propTypes2.default.string
		}),
		/**
   * Steps in the component
   */
		children: _propTypes2.default.node,
		/**
   * CSS class names to be added to the container element.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * HTML id for component.
   */
		id: _propTypes2.default.string.isRequired,
		/**
   * Percentage of progress completion, ranging [0, 100]
   */
		value: _propTypes2.default.string.isRequired,
		/**
   * Determines component style
   */
		variant: _propTypes2.default.oneOf(['base', 'modal'])
	};

	/**
  * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
  */

	var Progress = function (_React$Component) {
		_inherits(Progress, _React$Component);

		function Progress() {
			_classCallCheck(this, Progress);

			return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
		}

		_createClass(Progress, [{
			key: 'getId',
			value: function getId() {
				return this.props.id;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{
						id: this.getId(),
						className: (0, _classnames2.default)('slds-progress', { 'slds-progress_shade': this.props.variant === 'modal' }, this.props.className)
					},
					_react2.default.createElement(
						'ol',
						{ className: 'slds-progress__list' },
						this.props.children
					),
					_react2.default.createElement(_progressBar2.default, {
						value: this.props.value,
						assistiveText: this.props.assistiveText
					})
				);
			}
		}]);

		return Progress;
	}(_react2.default.Component);

	Progress.propTypes = propTypes;
	Progress.displayName = _constants.PROGRESS_INDICATOR_PROGRESS;

	exports.default = Progress;
});