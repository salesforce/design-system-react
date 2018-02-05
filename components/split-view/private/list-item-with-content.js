define(['exports', 'react', 'prop-types', 'classnames'], function (exports, _react, _propTypes, _classnames) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DISPLAY_NAME = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

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

	var DISPLAY_NAME = exports.DISPLAY_NAME = 'SLDSSplitViewListItemWithContent';

	var propsTypes = {
		/**
   * **Assistive text for accessibility**
   * * `unreadItem`: The unread indicator.
   */
		assistiveText: _propTypes2.default.shape({
			unreadItem: _propTypes2.default.string
		}),
		/**
   * Item to be displayed
   */
		item: _propTypes2.default.object.isRequired,
		/**
   * Allows multiple item to be selection
   */
		multiple: _propTypes2.default.bool,
		/**
   * Shows the item as `focused`.
   */
		isFocused: _propTypes2.default.bool.isRequired,
		/**
   * Shows the item as `selected`.
   */
		isSelected: _propTypes2.default.bool.isRequired,
		/**
   * Shows the item as `unread`.
   */
		isUnread: _propTypes2.default.bool,
		/**
   * **Event Callbacks**
   * * `onClick`: Called when the item is clicked.
   * * * Event
   * * * Meta data
   * * * * `item`: The original item.
   * * * * `isSelected`: Is the item selected.
   * * * * `isUnread`: Is the item unread.
   */
		events: _propTypes2.default.shape({
			onClick: _propTypes2.default.func.isRequired
		}),
		/**
   * Reference to the list item component
   */
		listItemRef: _propTypes2.default.func
	};

	var defaultProps = {
		assistiveText: {
			unreadItem: 'Unread Item'
		},
		events: {}
	};

	/**
  * HOC that wraps the list item content with selection and unread functionality.
  * @param ListItemContent {node} A React component
  * @returns {ListItemWithContent} A React component
  */
	var listItemWithContent = function listItemWithContent(ListItemContent) {
		var ListItemWithContent = function (_React$Component) {
			_inherits(ListItemWithContent, _React$Component);

			function ListItemWithContent() {
				_classCallCheck(this, ListItemWithContent);

				return _possibleConstructorReturn(this, (ListItemWithContent.__proto__ || Object.getPrototypeOf(ListItemWithContent)).apply(this, arguments));
			}

			_createClass(ListItemWithContent, [{
				key: 'onClick',
				value: function onClick(event) {
					this.props.events.onClick(event, {
						item: this.props.item,
						isSelected: this.props.isSelected,
						isUnread: this.props.isUnread
					});
				}
			}, {
				key: 'unread',
				value: function unread() {
					return this.props.isUnread ? _react2.default.createElement(
						'abbr',
						{
							className: 'slds-indicator_unread',
							title: this.props.assistiveText.unreadItem,
							'aria-label': this.props.assistiveText.unreadItem
						},
						_react2.default.createElement(
							'span',
							{ className: 'slds-assistive-text' },
							'\u25CF'
						)
					) : null;
				}
			}, {
				key: 'render',
				value: function render() {
					var _this2 = this;

					return _react2.default.createElement(
						'li',
						{
							className: (0, _classnames2.default)('slds-split-view__list-item', {
								'slds-is-unread': this.props.isUnread
							}),
							role: 'presentation'
						},
						_react2.default.createElement(
							'a',
							{
								className: 'slds-split-view__list-item-action slds-grow slds-has-flexi-truncate',
								role: 'option',
								ref: this.props.listItemRef,
								'aria-selected': this.props.multiple ? !!this.props.isSelected : this.props.isSelected,
								tabIndex: this.props.isFocused ? 0 : -1,
								href: 'javascript:void(0);' // eslint-disable-line no-script-url
								, onClick: function onClick(e) {
									return _this2.onClick(e);
								}
							},
							this.unread(),
							_react2.default.createElement(ListItemContent, this.props)
						)
					);
				}
			}]);

			return ListItemWithContent;
		}(_react2.default.Component);

		ListItemWithContent.displayName = DISPLAY_NAME + '(' + (ListItemContent.displayName || ListItemContent.name || 'Component') + ')';
		ListItemWithContent.propTypes = propsTypes;
		ListItemWithContent.defaultProps = defaultProps;


		return ListItemWithContent;
	};

	exports.default = listItemWithContent;
});