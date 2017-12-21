define(['exports', 'react', 'prop-types', './item'], function (exports, _react, _propTypes, _item) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _item2 = _interopRequireDefault(_item);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

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

	/* eslint-disable react/no-did-update-set-state */

	var displayName = 'Lookup-Menu';
	var propTypes = {
		boldRegex: _propTypes2.default.instanceOf(RegExp),
		emptyMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
		filterWith: _propTypes2.default.func,
		focusIndex: _propTypes2.default.number,
		getListLength: _propTypes2.default.func,
		iconCategory: _propTypes2.default.string,
		items: _propTypes2.default.array,
		label: _propTypes2.default.string,
		listLength: _propTypes2.default.number,
		searchTerm: _propTypes2.default.string,
		setFocus: _propTypes2.default.func
	};
	var defaultProps = {
		emptyMessage: 'No matches found.'
	};

	var Menu = function (_React$Component) {
		_inherits(Menu, _React$Component);

		function Menu(props) {
			_classCallCheck(this, Menu);

			var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

			_this.handleItemFocus = function (itemIndex, itemHeight) {
				if (_this.listRef) {
					_this.listRef.scrollTop = itemIndex * itemHeight;
				}
			};

			_this.state = { filteredItems: _this.filteredItems() };
			return _this;
		}

		// Set filtered list length in parent to determine active indexes for aria-activedescendent


		_createClass(Menu, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				// make an array of the children of the list but only count the actual items (but include section dividers)
				var childFilter = function childFilter(child) {
					return child.className.indexOf('js-slds-lookup__item') > -1 || child.className.indexOf('slds-lookup__divider') > -1;
				};
				var list = [].slice.call(this.listRef.children).filter(childFilter).length;
				this.props.getListLength(list);
				if (prevProps.items !== this.props.items || prevProps.filter !== this.props.filter || prevProps.searchTerm !== this.props.searchTerm) {
					this.setState({
						// eslint-disable-line react/no-did-update-set-state
						filteredItems: this.filteredItems()
					});
				}
			}
		}, {
			key: 'filter',
			value: function filter(item) {
				return this.props.filterWith(this.props.searchTerm, item);
			}
		}, {
			key: 'filteredItems',
			value: function filteredItems() {
				return this.filterEmptySections(this.props.items.filter(this.filter, this));
			}
		}, {
			key: 'filterEmptySections',
			value: function filterEmptySections(items) {
				// eslint-disable-line class-methods-use-this
				var result = [];
				items.forEach(function (item, index) {
					if (item && item.data && item.data.type === 'section') {
						if (index + 1 < items.length) {
							var nextItem = items[index + 1];
							if (nextItem.data && nextItem.data.type !== 'section') {
								result.push(item);
							}
						}
					} else {
						result.push(item);
					}
				});
				return result;
			}
		}, {
			key: 'getFilteredItemForIndex',
			value: function getFilteredItemForIndex(i) {
				if (i > -1 && this.state.filteredItems && i < this.state.filteredItems.length) {
					return this.state.filteredItems[i];
				}
				return null;
			}
		}, {
			key: 'renderHeader',
			value: function renderHeader() {
				return this.props.header;
			}
		}, {
			key: 'renderFooter',
			value: function renderFooter() {
				return this.props.footer;
			}
		}, {
			key: 'renderSectionDivider',
			value: function renderSectionDivider() {
				return this.props.sectionDivider;
			}
		}, {
			key: 'renderItems',
			value: function renderItems() {
				var _this2 = this;

				var focusIndex = this.props.focusIndex;
				return this.state.filteredItems.map(function (component, i) {
					// isActive means it is aria-activedescendant
					var id = component.id;
					var isActive = false;
					if (_this2.props.header) {
						isActive = focusIndex === i + 1;
					} else {
						isActive = focusIndex === i;
					}
					if (component.data.type === 'section') {
						if (_this2.props.sectionDividerRenderer) {
							var SectionDivider = _this2.props.sectionDividerRenderer;
							return _react2.default.createElement(SectionDivider, _extends({
								data: component.data,
								key: 'section_header_' + id
							}, _this2.props));
						}
					}
					return _react2.default.createElement(
						_item2.default,
						{
							boldRegex: _this2.props.boldRegex,
							data: component.data,
							handleItemFocus: _this2.handleItemFocus,
							iconCategory: _this2.props.iconCategory,
							iconInverse: _this2.props.iconInverse,
							iconName: _this2.props.iconName,
							id: id,
							index: i,
							isActive: isActive,
							key: id,
							listItemLabelRenderer: _this2.props.listItemLabelRenderer,
							onSelect: _this2.props.onSelect,
							searchTerm: _this2.props.searchTerm,
							setFocus: _this2.props.setFocus
						},
						component
					);
				});
			}
		}, {
			key: 'renderContent',
			value: function renderContent() {
				if (this.state.filteredItems.length === 0) {
					return _react2.default.createElement(
						'li',
						{ className: 'slds-lookup__message', 'aria-live': 'polite' },
						_react2.default.createElement(
							'span',
							{ className: 'slds-m-left--x-large slds-p-vertical--medium' },
							this.props.emptyMessage
						)
					);
				}

				return this.renderItems();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				return _react2.default.createElement(
					'section',
					{ id: 'menuContainer', className: 'ignore-react-onclickoutside' },
					this.renderHeader(),
					_react2.default.createElement(
						'ul',
						{
							id: 'list',
							className: 'slds-lookup__list',
							role: 'presentation',
							ref: function ref(list) {
								if (list) {
									_this3.listRef = list;
								}
							}
						},
						this.renderContent()
					),
					this.renderFooter()
				);
			}
		}]);

		return Menu;
	}(_react2.default.Component);

	Menu.displayName = displayName;
	Menu.propTypes = propTypes;
	Menu.defaultProps = defaultProps;

	exports.default = Menu;
});