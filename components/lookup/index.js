define(['module', 'react', 'react-dom', 'lodash.escaperegexp', './check-props', '../utilities/dialog', '../button', '../icon', '../icon/input-icon', '../forms/input', '../../utilities/EventUtil', '../../utilities/KEYS', './menu', './menu/default-footer', './menu/default-header', './menu/default-section-divider', 'classnames', '../../utilities/constants'], function (module, _react, _reactDom, _lodash, _checkProps, _dialog, _button, _icon, _inputIcon, _input, _EventUtil, _KEYS, _menu, _defaultFooter, _defaultHeader, _defaultSectionDivider, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _button2 = _interopRequireDefault(_button);

	var _icon2 = _interopRequireDefault(_icon);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _input2 = _interopRequireDefault(_input);

	var _EventUtil2 = _interopRequireDefault(_EventUtil);

	var _KEYS2 = _interopRequireDefault(_KEYS);

	var _menu2 = _interopRequireDefault(_menu);

	var _defaultFooter2 = _interopRequireDefault(_defaultFooter);

	var _defaultHeader2 = _interopRequireDefault(_defaultHeader);

	var _defaultSectionDivider2 = _interopRequireDefault(_defaultSectionDivider);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
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

	var displayName = _constants.LOOKUP;
	var propTypes = {
		/**
   * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
   */
		constrainToScrollParent: _react.PropTypes.bool,
		/**
   * ID for aria-describedby (e.g. for an error message or a description)
   */
		describedById: _react.PropTypes.string,
		/**
   * Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
   */
		emptyMessage: _react.PropTypes.string,
		/**
   * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
   */
		filterWith: _react.PropTypes.func,
		/**
   * If true, the menu is constrained to the window and may be flipped up. Has no effect if `isInline` is `true`.
   */
		flippable: _react.PropTypes.bool,
		/**
   * Custom component for Lookup footer. The default footer allows user to add new item - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>Lookup.DefaultFooter</code>.
   */
		footerRenderer: _react.PropTypes.func,
		/**
   * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>Lookup.DefaultHeader</code>.
   */
		headerRenderer: _react.PropTypes.func,
		/**
   * Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view categories.
   */
		iconCategory: _react.PropTypes.string,
		/**
   * If true, icon color is white. If false, icon color is the default text color.
   */
		iconInverse: _react.PropTypes.bool,
		/**
   * Name of icon. Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view icon names.
   */
		iconName: _react.PropTypes.string,
		/**
   * Determines whether the input's icon will display that icon on the left or the right.
   */
		iconPosition: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
   */
		isInline: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		/**
   * Custom component that overrides the default Lookup Item component.
   */
		listItemLabelRenderer: _react.PropTypes.func,
		onBlur: _react.PropTypes.func,
		onChange: _react.PropTypes.func,
		onSelect: _react.PropTypes.func,
		onUnselect: _react.PropTypes.func,
		/**
   * Lookup item data.
   */
		options: _react.PropTypes.array.isRequired,
		/**
   * Text that will appear in an empty input.
   */
		placeholder: _react.PropTypes.string,
		/**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
		required: _react.PropTypes.bool,
		searchTerm: _react.PropTypes.string,
		/**
   * Index of current selected item. To clear the selection, pass in -1.
   */
		selectedItem: _react.PropTypes.number
	};

	/**
  * A function that takes a term string and an item and returns a truthy value if the item should be kept.
  */
	var defaultFilter = function defaultFilter(term, item) {
		if (!term) return true;
		return item.data && item.data.type === 'section' || item.label.match(new RegExp((0, _lodash2.default)(term), 'ig'));
	};

	var defaultProps = {
		constrainToScrollParent: true,
		filterWith: defaultFilter,
		iconPosition: 'right',
		searchTerm: ''
	};

	/**
  * The Lookup component
  */

	var Lookup = function (_React$Component) {
		_inherits(Lookup, _React$Component);

		function Lookup(props) {
			_classCallCheck(this, Lookup);

			var _this = _possibleConstructorReturn(this, (Lookup.__proto__ || Object.getPrototypeOf(Lookup)).call(this, props));

			_this.state = {
				currentFocus: null,
				focusIndex: null,
				isOpen: false,
				items: [],
				listLength: _this.props.options.length,
				searchTerm: _this.normalizeSearchTerm(_this.props.searchTerm),
				selectedIndex: _this.props.selectedItem
			};
			return _this;
		}

		_createClass(Lookup, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				var lookup = this.inputRefId();
				if (!isNaN(parseInt(prevState.selectedIndex)) && isNaN(parseInt(this.state.selectedIndex))) {
					if (this.refs[lookup]) {
						_reactDom2.default.findDOMNode(this.refs[lookup]).focus();
					}
				} else if (isNaN(parseInt(prevState.selectedIndex)) && !isNaN(parseInt(this.state.selectedIndex))) {
					var selectedItem = 'pill-' + this.state.selectedIndex;
					if (this.refs[selectedItem]) {
						_reactDom2.default.findDOMNode(this.refs[selectedItem]).focus();
					}
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(newProps) {
				if (newProps.options) {
					this.modifyItems(newProps.options);
				}
				if (newProps.selectedItem !== this.props.selectedItem) {
					this.setState({ selectedIndex: newProps.selectedItem });
				}
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
				(0, _checkProps2.default)(_constants.LOOKUP, this.props);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.modifyItems(this.props.options);
			}
		}, {
			key: 'modifyItems',
			value: function modifyItems(itemsToModify) {
				var items = itemsToModify.map(function (item, index) {
					return {
						id: 'item-' + index,
						label: item.label,
						data: item
					};
				});

				this.setState({ items: items });
			}
		}, {
			key: 'setFirstIndex',
			value: function setFirstIndex() {
				var numFocusable = this.getNumFocusableItems();
				var nextFocusIndex = 0;
				var filteredItem = this.state.items[0];

				if (this.refs.menu && this.refs.menu.getFilteredItemForIndex) {
					filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);
				}

				if (filteredItem && filteredItem.data.type === 'section') {
					nextFocusIndex++;
				}

				this.setState({ focusIndex: nextFocusIndex });
			}
		}, {
			key: 'increaseIndex',
			value: function increaseIndex() {
				var numFocusable = this.getNumFocusableItems();
				var nextFocusIndex = this.state.focusIndex < numFocusable ? this.state.focusIndex + 1 : 0;
				var filteredItem = this.refs.menu.getFilteredItemForIndex(nextFocusIndex);

				if (filteredItem && filteredItem.data.type === 'section') {
					nextFocusIndex++;
				}

				this.setState({ focusIndex: nextFocusIndex });
			}
		}, {
			key: 'decreaseIndex',
			value: function decreaseIndex() {
				var numFocusable = this.getNumFocusableItems();
				var prevFocusIndex = this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable;
				var filteredItem = this.refs.menu.getFilteredItemForIndex(prevFocusIndex);

				if (filteredItem && filteredItem.data.type === 'section') {
					prevFocusIndex === 0 ? prevFocusIndex = numFocusable : prevFocusIndex--;
				}

				this.setState({ focusIndex: prevFocusIndex });
			}
		}, {
			key: 'setFocus',
			value: function setFocus(id) {
				this.setState({ currentFocus: id });
			}
		}, {
			key: 'getListLength',
			value: function getListLength(qty) {
				if (qty !== this.state.listLength) {
					this.setState({ listLength: qty });
				}
			}
		}, {
			key: 'getNumFocusableItems',
			value: function getNumFocusableItems() {
				var offset = 0;
				if (this.refs.footer) {
					offset += 1;
				}
				if (this.refs.header) {
					offset += 1;
				}
				return this.state.listLength - 1 + offset;
			}
		}, {
			key: 'selectItem',
			value: function selectItem(itemId) {
				if (itemId) {
					var index = itemId.replace('item-', '');
					this.selectItemByIndex(index);
				}
			}
		}, {
			key: 'selectItemByIndex',
			value: function selectItemByIndex(index) {
				if (index >= 0 && index < this.state.items.length) {
					this.setState({
						isOpen: false,
						selectedIndex: index,
						searchTerm: ''
					});
					var data = this.state.items[index].data;
					if (this.props.onSelect) {
						this.props.onSelect(data);
					}
				}
			}
		}, {
			key: 'handleDeleteSelected',
			value: function handleDeleteSelected() {
				this.setState({
					selectedIndex: null,
					isOpen: true
				});

				this.focusInput();

				if (this.props.onUnselect) {
					this.props.onUnselect();
				}
			}
		}, {
			key: 'handleClose',
			value: function handleClose() {
				this.setState({
					isOpen: false,
					focusIndex: null,
					currentFocus: null
				});
			}
		}, {
			key: 'handleEscape',
			value: function handleEscape(event) {
				if (this.state.isOpen && event) {
					_EventUtil2.default.trap(event);
				}
				this.handleClose();
			}
		}, {
			key: 'handleCancel',
			value: function handleCancel() {
				this.setState({
					isOpen: false,
					focusIndex: null,
					currentFocus: null
				});
			}
		}, {
			key: 'handleClick',
			value: function handleClick() {
				this.setState({ isOpen: true });
			}
		}, {
			key: 'handleBlur',
			value: function handleBlur(event) {
				this.handleClose();
				if (this.props.onBlur) {
					var target = event.target || event.currentTarget;
					this.props.onBlur(target.value);
				}
			}
		}, {
			key: 'handleFocus',
			value: function handleFocus() {
				this.setState({ isOpen: true });
			}
		}, {
			key: 'handleChange',
			value: function handleChange(event) {
				var target = event.target || event.currentTarget;
				this.setState({ searchTerm: this.normalizeSearchTerm(target.value) });
				if (this.props.onChange) {
					this.props.onChange(target.value);
				}
			}
		}, {
			key: 'handleKeyDown',
			value: function handleKeyDown(event) {
				if (event.keyCode) {
					//If user hits esc key, close menu
					event.keyCode === _KEYS2.default.ESCAPE ? this.handleEscape(event) : this.handleClick();

					//If user hits down key, advance aria activedescendant to next item
					if (event.keyCode === _KEYS2.default.DOWN) {
						_EventUtil2.default.trapImmediate(event);
						this.state.focusIndex === null ? this.setFirstIndex() : this.increaseIndex();
					}
					//If user hits up key, advance aria activedescendant to previous item
					else if (event.keyCode === _KEYS2.default.UP) {
							_EventUtil2.default.trapImmediate(event);
							var numFocusable = this.getNumFocusableItems();
							this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable }) : this.decreaseIndex();
						}
						//If user hits enter, select current activedescendant item
						else if (event.keyCode === _KEYS2.default.ENTER && this.state.focusIndex !== null) {
								_EventUtil2.default.trapImmediate(event);
								//If the focus is on the first fixed Action Item in Menu, click it
								if (this.refs.header && this.state.focusIndex === 0) {
									_reactDom2.default.findDOMNode(this.refs.header).click();
								}
								//If the focus is on the last fixed Action Item in Menu, click it
								else if (this.refs.footer && this.state.focusIndex === this.state.listLength + 1) {
										_reactDom2.default.findDOMNode(this.refs.footer).click();
									}
									//If not, then select menu item
									else {
											this.selectItem(this.state.currentFocus);
										}
							}
				}
			}
		}, {
			key: 'handlePillKeyDown',
			value: function handlePillKeyDown(event) {
				if (event.keyCode) {
					if (event.keyCode === _KEYS2.default.DELETE || event.keyCode === _KEYS2.default.BACKSPACE) {
						_EventUtil2.default.trapImmediate(event);
						this.handleDeleteSelected();
					}
				}
			}
		}, {
			key: 'getHeader',
			value: function getHeader() {
				if (this.props.headerRenderer) {
					var Header = this.props.headerRenderer;
					var headerActive = false;
					this.state.focusIndex === 0 ? headerActive = true : headerActive = false;

					return _react2.default.createElement(Header, _extends({ ref: 'header' }, this.props, {
						focusIndex: this.state.focusIndex,
						isActive: headerActive,
						onClose: this.handleClose.bind(this),
						searchTerm: this.state.searchTerm,
						setFocus: this.setFocus.bind(this)
					}));
				}
			}
		}, {
			key: 'getFooter',
			value: function getFooter() {
				if (this.props.footerRenderer) {
					var Footer = this.props.footerRenderer;
					var footerActive = false;
					var numFocusable = this.getNumFocusableItems();
					this.state.focusIndex === numFocusable ? footerActive = true : footerActive = false;

					return _react2.default.createElement(Footer, _extends({ ref: 'footer' }, this.props, {
						focusIndex: this.state.focusIndex,
						isActive: footerActive,
						onClose: this.handleClose.bind(this),
						setFocus: this.setFocus.bind(this)
					}));
				}
			}
		}, {
			key: 'normalizeSearchTerm',
			value: function normalizeSearchTerm(string) {
				return (string || '').toString().replace(/^\s+/, '');
			}
		}, {
			key: 'renderMenuContent',
			value: function renderMenuContent() {
				if (this.state.isOpen) {
					return _react2.default.createElement(_menu2.default, {
						ref: 'menu',
						emptyMessage: this.props.emptyMessage,
						filterWith: this.props.filterWith,
						focusIndex: this.state.focusIndex,
						footer: this.getFooter(),
						getListLength: this.getListLength.bind(this),
						header: this.getHeader(),
						iconCategory: this.props.iconCategory,
						iconInverse: this.props.iconInverse,
						iconName: this.props.iconName,
						items: this.state.items,
						label: this.props.label,
						listItemLabelRenderer: this.props.listItemLabelRenderer,
						listLength: this.state.listLength,
						onSelect: this.selectItem.bind(this),
						searchTerm: this.state.searchTerm,
						sectionDividerRenderer: this.props.sectionDividerRenderer,
						setFocus: this.setFocus.bind(this)
					});
				}
			}
		}, {
			key: 'renderInlineMenu',
			value: function renderInlineMenu() {
				if (this.state.isOpen) {
					return _react2.default.createElement(
						'div',
						{ className: 'ignore-react-onclickoutside slds-lookup__menu', role: 'listbox', ref: 'scroll' },
						this.renderMenuContent()
					);
				}
			}
		}, {
			key: 'renderSeparateMenu',
			value: function renderSeparateMenu() {
				return this.state.isOpen ? _react2.default.createElement(
					_dialog2.default,
					{
						className: 'slds-lookup__menu slds-show',
						closeOnTabKey: true,
						contentsClassName: 'slds-lookup__menu slds-show',
						inheritTargetWidth: true,
						onClose: this.handleCancel.bind(this),
						flippable: this.props.flippable,
						constrainToScrollParent: this.props.constrainToScrollParent,
						targetElement: this.input,
						verticalAlign: 'bottom'
					},
					this.renderMenuContent()
				) : null;
			}
		}, {
			key: 'renderInput',
			value: function renderInput() {
				var _this2 = this;

				return _react2.default.createElement(_input2.default, {
					ariaActivedescendant: this.state.currentFocus ? this.state.currentFocus : '',
					ariaAutocomplete: 'list',
					ariaDescribedby: this.props.describedById,
					ariaExpanded: this.state.isOpen,
					assistiveText: this.props.assistiveText,
					className: 'slds-lookup__search-input',
					iconRight: _react2.default.createElement(_inputIcon2.default, {
						assistiveText: 'Search',
						category: 'utility',
						name: 'search'
					}),
					id: this.inputRefId(),
					onBlur: this.handleBlur.bind(this),
					onChange: this.handleChange.bind(this),
					onClick: this.handleClick.bind(this),
					onFocus: this.handleFocus.bind(this),
					onKeyDown: this.handleKeyDown.bind(this),
					inputRef: function inputRef(component) {
						_this2.input = component;
						if (_this2.focusOnRender) {
							_reactDom2.default.findDOMNode(_this2.input).focus();
							_this2.focusOnRender = false;
						}
					},
					placeholder: this.props.placeholder,
					role: 'combobox',
					type: 'text',
					value: this.state.searchTerm
				});
			}
		}, {
			key: 'renderSelectedItem',
			value: function renderSelectedItem() {
				var selectedItem = this.props.options[this.state.selectedIndex].label;
				var renderIcon = this.props.iconName ? _react2.default.createElement(_icon2.default, { category: this.props.iconCategory, className: 'slds-icon slds-pill__icon', inverse: this.props.iconInverse, name: this.props.iconName }) : null;
				var labelClassName = this.props.iconName ? 'slds-pill__label' : 'slds-pill__label slds-m-left--x-small';

				// i18n
				return _react2.default.createElement(
					'div',
					{ className: 'slds-pill__container' },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:void(0)', className: 'slds-pill', ref: 'pill-' + this.state.selectedIndex, onKeyDown: this.handlePillKeyDown.bind(this) },
						renderIcon,
						_react2.default.createElement(
							'span',
							{ className: labelClassName },
							selectedItem
						),
						_react2.default.createElement(_button2.default, {
							assistiveText: 'Press delete to remove',
							className: 'slds-pill__remove slds-button--icon-bare',
							iconName: 'close',
							onClick: this.handleDeleteSelected.bind(this),
							ref: 'clearSelectedItemButton',
							tabIndex: '-1',
							variant: 'icon'
						})
					)
				);
			}
		}, {
			key: 'renderLabel',
			value: function renderLabel() {
				if (this.props.label) {
					var inputLabel = void 0;
					var required = this.props.required ? _react2.default.createElement(
						'span',
						{ className: 'slds-required' },
						'*'
					) : null;
					if (this.isSelected()) {
						// inline style override
						inputLabel = _react2.default.createElement(
							'span',
							{ className: 'slds-form-element__label', style: { width: '100%' } },
							required,
							this.props.label
						);
					} else {
						inputLabel = _react2.default.createElement(
							'label',
							{ className: 'slds-form-element__label', htmlFor: this.inputRefId(), style: { width: '100%' } },
							required,
							this.props.label
						);
					}
					return inputLabel;
				}
			}
		}, {
			key: 'inputRefId',
			value: function inputRefId() {
				return this.props.label + 'Lookup';
			}
		}, {
			key: 'focusInput',
			value: function focusInput() {
				this.focusOnRender = true;
			}
		}, {
			key: 'isSelected',
			value: function isSelected() {
				var hasSelection = !isNaN(parseInt(this.state.selectedIndex)) && this.state.selectedIndex >= 0;
				return hasSelection;
			}
		}, {
			key: 'getClassName',
			value: function getClassName() {
				return (0, _classnames2.default)(this.props.className, 'slds-form-element slds-lookup', {
					'slds-has-selection': this.isSelected(),
					'slds-is-open': this.state.isOpen
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var isInline = void 0;
				/* eslint-disable react/prop-types */
				if (this.props.isInline) {
					isInline = true;
				} else if (this.props.modal !== undefined) {
					isInline = !this.props.modal;
				}
				/* eslint-enable react/prop-types */

				var formElementControlClasses = _defineProperty({
					'slds-form-element__control': true
				}, 'slds-input-has-icon slds-input-has-icon--' + this.props.iconPosition, !this.isSelected());

				return _react2.default.createElement(
					'div',
					{ className: this.getClassName(), 'data-select': 'single', 'data-scope': 'single' },
					this.renderLabel(),
					_react2.default.createElement(
						'div',
						{ className: (0, _classnames2.default)(formElementControlClasses) },
						this.isSelected() ? this.renderSelectedItem() : null,
						!this.isSelected() ? this.renderInput() : null
					),
					isInline ? this.renderInlineMenu() : this.renderSeparateMenu()
				);
			}
		}]);

		return Lookup;
	}(_react2.default.Component);

	Lookup.displayName = displayName;
	Lookup.propTypes = propTypes;
	Lookup.defaultProps = defaultProps;

	module.exports = Lookup;
	module.exports.DefaultHeader = _defaultHeader2.default;
	module.exports.DefaultSectionDivider = _defaultSectionDivider2.default;
	module.exports.DefaultFooter = _defaultFooter2.default;
});