define(['exports', 'react', 'prop-types', 'classnames', './check-props', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _checkProps, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _checkProps2 = _interopRequireDefault(_checkProps);

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

	var Panel = function (_React$Component) {
		_inherits(Panel, _React$Component);

		function Panel() {
			_classCallCheck(this, Panel);

			return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
		}

		_createClass(Panel, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				(0, _checkProps2.default)(_constants.PANEL);
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('slds-panel', 'slds-grid', 'slds-grid--vertical', 'slds-nowrap', {
							'slds-panel--filters': this.props.variant === 'filters'
						})
					},
					_react2.default.createElement(
						'div',
						{ className: 'slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical' },
						this.props.children
					)
				);
			}
		}]);

		return Panel;
	}(_react2.default.Component);

	Panel.displayName = _constants.PANEL;

	Panel.propTypes = {
		/**
   * The contents of the panel
   */
		children: _propTypes2.default.node,
		/**
   * The type of panel
   */
		variant: _propTypes2.default.oneOf(['filters'])
	};

	exports.default = Panel;
});