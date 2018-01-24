define(['exports', 'react', 'prop-types', 'classnames', '../../utilities/event', '../../utilities/constants', '../icon', './private/list-item-content', './private/list-item-with-content'], function (exports, _react, _propTypes, _classnames, _event, _constants, _icon, _listItemContent, _listItemWithContent) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SORT_OPTIONS = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _event2 = _interopRequireDefault(_event);

	var _icon2 = _interopRequireDefault(_icon);

	var _listItemContent2 = _interopRequireDefault(_listItemContent);

	var _listItemWithContent2 = _interopRequireDefault(_listItemWithContent);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
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

	var SORT_OPTIONS = exports.SORT_OPTIONS = Object.freeze({
		UP: 'up',
		DOWN: 'down'
	});

	var propTypes = {
		/**
   * **Assistive text for accessibility**
   * * `list`: aria label for the list
   * * `sort`
   * * * `sortedBy`: Clickable sort header for the list.
   * * * `descending`: Descending sorting.
   * * * `ascending`: Ascending sorting.
   */
		assistiveText: _propTypes2.default.shape({
			list: _propTypes2.default.string,
			sort: _propTypes2.default.shape({
				sortedBy: _propTypes2.default.string,
				descending: _propTypes2.default.string,
				ascending: _propTypes2.default.string
			}),
			unreadItem: _propTypes2.default.string
		}),
		/**
   * CSS classes to be added to the parent `div` tag.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Event Callbacks
   * * `onSelect`: Called when a list item is selected.
   * * * event {object} List item click event
   * * * Meta {object}
   * * * * selectedItems {array} List of selected items.
   * * * * item {object} Last selected item.
   * * `onSort`: Called when the list is sorted.
   * * * event {object} Sort click event
   */
		events: _propTypes2.default.shape({
			onSelect: _propTypes2.default.func.isRequired,
			onSort: _propTypes2.default.func
		}),
		/**
   * HTML id for component.
   */
		id: _propTypes2.default.string,
		/**
   * **Text labels for internationalization**
   * * `header`: This is the header of the list.
   */
		labels: _propTypes2.default.shape({
			header: _propTypes2.default.string
		}),
		/**
   * The direction of the sort arrow. Option are:
   * * SORT_OPTIONS.UP: `up`
   * * SORT_OPTIONS.DOWN: `down`
   */
		sortDirection: _propTypes2.default.oneOf([SORT_OPTIONS.UP, SORT_OPTIONS.DOWN]),
		/**
   * Allows multiple item to be selection
   */
		multiple: _propTypes2.default.bool,
		/**
   * The list of items.
   * It is recommended that you have a unique `id` for each item.
   */
		options: _propTypes2.default.array.isRequired,
		/**
   * Accepts an array of item objects. For single selection, pass in an array of one object.
   */
		selection: _propTypes2.default.array,
		/**
   * Accepts an array of item objects. For single unread, pass in an array of one object.
   */
		unread: _propTypes2.default.array,
		/**
   * Custom list item template for the list item content. The select and unread functionality wraps the custom list item.
   * This should be a React component that accepts props.
   */
		listItem: _propTypes2.default.func
	};

	var defaultProps = {
		assistiveText: {
			list: 'Select an item to open it in a new workspace tab.',
			sort: {
				sortedBy: 'Sorted by',
				descending: 'Descending',
				ascending: 'Ascending'
			}
		},
		events: {},
		labels: {},
		selection: [],
		unread: []
	};

	var SplitViewListbox = function (_React$Component) {
		_inherits(SplitViewListbox, _React$Component);

		function SplitViewListbox(props) {
			_classCallCheck(this, SplitViewListbox);

			var _this = _possibleConstructorReturn(this, (SplitViewListbox.__proto__ || Object.getPrototypeOf(SplitViewListbox)).call(this, props));

			_this.listItemComponents = {};

			_this.state = {
				currentSelectedItem: null,
				currentFocusedListItem: {
					index: 0,
					item: null
				}
			};
			return _this;
		}

		_createClass(SplitViewListbox, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				// Generates the list item template
				this.ListItemWithContent = (0, _listItemWithContent2.default)(this.props.listItem || _listItemContent2.default);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.focusFirstItem();
			}
		}, {
			key: 'isListItemFocused',
			value: function isListItemFocused(item) {
				return this.state.currentFocusedListItem.item === item;
			}
		}, {
			key: 'isSelected',
			value: function isSelected(item) {
				return this.props.selection.includes(item);
			}
		}, {
			key: 'isUnread',
			value: function isUnread(item) {
				return this.props.unread.includes(item);
			}
		}, {
			key: 'handleKeyDown',
			value: function handleKeyDown(event) {
				if (this.props.multiple && event.key === 'a' && event.ctrlKey) {
					// select / deselect all
					_event2.default.trap(event);
					this.props.options === this.props.selection ? this.deselectAllListItems(event) : this.selectAllListItems(event);
				} else if (event.key === 'ArrowUp') {
					_event2.default.trap(event);
					this.moveToPreviousItem(event);
				} else if (event.key === 'ArrowDown') {
					_event2.default.trap(event);
					this.moveToNextItem(event);
				}
			}
		}, {
			key: 'moveToNextItem',
			value: function moveToNextItem(event) {
				var nextFocusIndex = this.state.currentFocusedListItem.index === this.props.options.length - 1 ? 0 : this.state.currentFocusedListItem.index + 1;

				this.moveToIndex(event, nextFocusIndex);
			}
		}, {
			key: 'moveToPreviousItem',
			value: function moveToPreviousItem(event) {
				var previousFocusIndex = this.state.currentFocusedListItem.index === 0 ? this.props.options.length - 1 : this.state.currentFocusedListItem.index - 1;

				this.moveToIndex(event, previousFocusIndex);
			}
		}, {
			key: 'moveToIndex',
			value: function moveToIndex(event, index) {
				var item = this.props.options[index];

				!event.metaKey && !event.ctrlKey && this.selectListItem(item, event);

				this.focusItem(item);
			}
		}, {
			key: 'focusFirstItem',
			value: function focusFirstItem() {
				var _this2 = this;

				var firstSelectedItem = this.props.options.find(function (item) {
					return _this2.props.selection.includes(item);
				}) || this.props.options[0];

				if (firstSelectedItem) {
					this.focusItem(firstSelectedItem, true);
				}
			}
		}, {
			key: 'focusItem',
			value: function focusItem(item, setDataOnly) {
				var index = this.props.options.indexOf(item);

				!setDataOnly && this.listItemComponents[index].focus();

				this.setState({
					currentFocusedListItem: {
						index: index,
						item: item
					}
				});
			}
		}, {
			key: 'deselectAllListItems',
			value: function deselectAllListItems(event) {
				this.setState({ currentSelectedItem: null });
				this.props.events.onSelect(event, {
					selectedItems: [],
					item: null
				});
			}
		}, {
			key: 'selectAllListItems',
			value: function selectAllListItems(event) {
				this.props.events.onSelect(event, {
					selectedItems: this.props.options,
					item: this.state.currentSelectedItem
				});
			}
		}, {
			key: 'selectListItem',
			value: function selectListItem(item, event) {
				var selectedItems = [item];

				if (this.props.multiple) {
					if (event.metaKey) {
						selectedItems = this.props.selection.includes(item) ? this.props.selection.filter(function (i) {
							return i !== item;
						}) : [item].concat(_toConsumableArray(this.props.selection));
					} else if (event.shiftKey) {
						var _sort = [this.props.options.indexOf(this.state.currentSelectedItem), this.props.options.indexOf(item)].sort(),
						    _sort2 = _slicedToArray(_sort, 2),
						    begin = _sort2[0],
						    end = _sort2[1];

						var addToSelection = this.props.options.slice(begin, end + 1);

						selectedItems = [].concat(_toConsumableArray(addToSelection), _toConsumableArray(this.props.selection.filter(function (i) {
							return !addToSelection.includes(i);
						})));
					}
				}

				this.setState({ currentSelectedItem: item });

				this.props.events.onSelect(event, { selectedItems: selectedItems, item: item });
			}
		}, {
			key: 'handleOnSelect',
			value: function handleOnSelect(event, _ref) {
				var item = _ref.item;

				this.selectListItem(item, event);
				this.focusItem(item);
			}
		}, {
			key: 'sortDirection',
			value: function sortDirection() {
				return this.props.sortDirection ? _react2.default.createElement(_icon2.default, {
					category: 'utility',
					name: this.props.sortDirection === SORT_OPTIONS.DOWN ? 'arrowdown' : 'arrowup',
					size: 'xx-small',
					className: 'slds-align-top'
				}) : null;
			}
		}, {
			key: 'headerWrapper',
			value: function headerWrapper(children) {
				return this.props.events.onSort ? _react2.default.createElement(
					'a',
					{
						style: { borderTop: '0' },
						href: 'javascript:void(0);',
						role: 'button',
						className: 'slds-split-view__list-header slds-grid slds-text-title_caps slds-text-link_reset',
						onClick: this.props.events.onSort
					},
					children
				) : _react2.default.createElement(
					'div',
					{
						style: { borderTop: '0' },
						className: 'slds-split-view__list-header slds-grid slds-text-title_caps'
					},
					children
				);
			}
		}, {
			key: 'header',
			value: function header() {
				return this.props.labels.header ? this.headerWrapper(_react2.default.createElement(
					'span',
					null,
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.assistiveText.sort.sortedBy,
						':'
					),
					_react2.default.createElement(
						'span',
						null,
						this.props.labels.header,
						this.sortDirection()
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						'-',
						' ',
						this.props.sortDirection === SORT_OPTIONS.DOWN ? this.props.assistiveText.sort.descending : this.props.assistiveText.sort.ascending
					)
				)) : null;
			}
		}, {
			key: 'addListItemComponent',
			value: function addListItemComponent(component, index) {
				this.listItemComponents[index] = component;
			}
		}, {
			key: 'listItems',
			value: function listItems() {
				var _this3 = this;

				var ListItemWithContent = this.ListItemWithContent;

				return this.props.options.map(function (item, index) {
					return _react2.default.createElement(ListItemWithContent, {
						key: item.id || index,
						assistiveText: {
							unreadItem: _this3.props.assistiveText.unreadItem
						},
						listItemRef: function listItemRef(component) {
							_this3.addListItemComponent(component, index);
						},
						item: item,
						isFocused: _this3.isListItemFocused(item),
						isSelected: _this3.isSelected(item),
						isUnread: _this3.isUnread(item),
						events: {
							onClick: function onClick(event, meta) {
								return _this3.handleOnSelect(event, meta);
							}
						},
						multiple: _this3.props.multiple
					});
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				return _react2.default.createElement(
					'div',
					{
						id: this.props.id,
						className: (0, _classnames2.default)('slds-grid slds-grid_vertical slds-scrollable_none', this.props.className)
					},
					this.header(),
					_react2.default.createElement(
						'ul',
						{
							className: 'slds-scrollable_y',
							'aria-label': this.props.assistiveText.list,
							'aria-multiselectable': this.props.multiple,
							role: 'listbox',
							onKeyDown: function onKeyDown(event) {
								return _this4.handleKeyDown(event);
							}
						},
						this.listItems()
					)
				);
			}
		}]);

		return SplitViewListbox;
	}(_react2.default.Component);

	SplitViewListbox.displayName = _constants.SPLIT_VIEW_LISTBOX;
	SplitViewListbox.propTypes = propTypes;
	SplitViewListbox.defaultProps = defaultProps;
	exports.default = SplitViewListbox;
});