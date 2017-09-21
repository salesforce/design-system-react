define(['exports', 'react', 'prop-types', 'classnames', './detail-block'], function (exports, _react, _propTypes, _classnames, _detailBlock) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _detailBlock2 = _interopRequireDefault(_detailBlock);

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

	var displayName = 'PageHeaderDetailRow';
	var propTypes = {
		children: _propTypes2.default.node,
		/**
   * Optional class name
   */
		className: _propTypes2.default.string,
		/**
   * An array of detail blocks
   */
		details: _propTypes2.default.array
	};
	var defaultProps = {};

	var DetailRow = function (_Component) {
		_inherits(DetailRow, _Component);

		function DetailRow() {
			_classCallCheck(this, DetailRow);

			return _possibleConstructorReturn(this, (DetailRow.__proto__ || Object.getPrototypeOf(DetailRow)).apply(this, arguments));
		}

		_createClass(DetailRow, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    children = _props.children,
				    className = _props.className,
				    details = _props.details;

				var classes = this._getClassNames(className);

				/**
     * Render the deets
     */
				var renderDetails = function renderDetails() {
					if (children !== undefined) {
						return children;
					}

					return details.map(function (detail, i) {
						var key = 'PageHeader.detailBlock.' + i;

						return _react2.default.createElement(_detailBlock2.default, {
							key: key,
							flavor: detail.flavor,
							label: detail.label,
							content: detail.content,
							truncate: detail.truncate
						});
					});
				};

				return _react2.default.createElement(
					'ul',
					{ className: classes },
					renderDetails()
				);
			}
		}, {
			key: '_getClassNames',
			value: function _getClassNames(className) {
				// eslint-disable-line class-methods-use-this
				return (0, _classnames2.default)('slds-grid slds-page-header__detail-row', className);
			}
		}]);

		return DetailRow;
	}(_react.Component);

	DetailRow.displayName = displayName;
	DetailRow.propTypes = propTypes;
	DetailRow.defaultProps = defaultProps;

	exports.default = DetailRow;
});