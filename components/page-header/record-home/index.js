define(['module', 'react', '../detail-row'], function (module, _react, _detailRow) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _detailRow2 = _interopRequireDefault(_detailRow);

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

	var displayName = 'PageHeaderRecordHome';
	var propTypes = {
		/**
   * Icon node passed by PageHeader
   */
		icon: _react2.default.PropTypes.node,
		/**
   * Title node passed by PageHeader
   */
		title: _react2.default.PropTypes.node,
		/**
   * Info node passed by PageHeader
   */
		info: _react2.default.PropTypes.node,
		/**
   * Content to appear on the right hand side of the page header
   */
		contentRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
		/**
   * An array of detail blocks
   */
		details: _react2.default.PropTypes.array
	};
	var defaultProps = {};

	var RecordHome = function (_Component) {
		_inherits(RecordHome, _Component);

		function RecordHome() {
			_classCallCheck(this, RecordHome);

			return _possibleConstructorReturn(this, (RecordHome.__proto__ || Object.getPrototypeOf(RecordHome)).apply(this, arguments));
		}

		_createClass(RecordHome, [{
			key: 'renderIcon',
			value: function renderIcon() {
				if (this.props.icon) {
					return _react2.default.createElement(
						'div',
						{ className: 'slds-media__figure' },
						this.props.icon
					);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var details = this.props.details;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'slds-grid' },
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-has-flexi-truncate' },
							_react2.default.createElement(
								'div',
								{ className: 'slds-media slds-media--center' },
								this.renderIcon(),
								_react2.default.createElement(
									'div',
									{ className: 'slds-media__body' },
									this.props.label,
									this.props.title,
									this.props.info
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'slds-col slds-no-flex slds-grid slds-align-bottom' },
							this.props.contentRight
						)
					),
					_react2.default.createElement(_detailRow2.default, { details: details })
				);
			}
		}]);

		return RecordHome;
	}(_react.Component);

	RecordHome.displayName = displayName;
	RecordHome.propTypes = propTypes;
	RecordHome.defaultProps = defaultProps;

	module.exports = RecordHome;
});