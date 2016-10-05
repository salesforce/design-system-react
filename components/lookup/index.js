'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _inputIcon = require('../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _utilities = require('../../utilities');

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _defaultFooter = require('./menu/default-footer');

var _defaultFooter2 = _interopRequireDefault(_defaultFooter);

var _defaultHeader = require('./menu/default-header');

var _defaultHeader2 = _interopRequireDefault(_defaultHeader);

var _defaultSectionDivider = require('./menu/default-section-divider');

var _defaultSectionDivider2 = _interopRequireDefault(_defaultSectionDivider);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	 */

// # Lookup Component

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

// ## Dependencies


// ### React


// ### Event Helpers


var displayName = 'Lookup';
var propTypes = {
	/**
  * If true, constrains the menu to the scroll parent. Has no effect if modal is false.
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
  * If true, the menu is constrained to the window and may be flipped up. Has no effect if modal is false.
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
	label: _react.PropTypes.string,
	/**
  * Custom component that overrides the default Lookup Item component.
  */
	listItemLabelRenderer: _react.PropTypes.func,
	/**
  * If true, component renders specifically to work inside Modal.
  */
	modal: _react.PropTypes.bool,
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
	flippable: false,
	iconPosition: 'right',
	modal: false,
	required: false,
	searchTerm: ''
};

/**
 * The Lookup component
 */

var Lookup = function (_React$Component) {
	_inherits(Lookup, _React$Component);

	function Lookup(props) {
		_classCallCheck(this, Lookup);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Lookup).call(this, props));

		_this.state = {
			currentFocus: null,
			focusIndex: null,
			items: [],
			isOpen: false,
			listLength: _this.props.options.length,
			searchTerm: _this.normalizeSearchTerm(_this.props.searchTerm),
			selectedIndex: _this.props.selectedItem
		};
		return _this;
	}

	_createClass(Lookup, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var lookup = this.inputRefName();
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

		//=================================================
		// Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
		// Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.

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

		//=================================================
		// Select menu item (onClick or on key enter/space)

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
			if (this.props.onUnselect) {
				this.props.onUnselect();
			}
		}

		//=================================================
		// Event Listeners on Input

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
				_utilities.EventUtil.trap(event);
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
				event.keyCode === _utilities.KEYS.ESCAPE ? this.handleEscape(event) : this.handleClick();

				//If user hits down key, advance aria activedescendant to next item
				if (event.keyCode === _utilities.KEYS.DOWN) {
					_utilities.EventUtil.trapImmediate(event);
					this.state.focusIndex === null ? this.setFirstIndex() : this.increaseIndex();
				}
				//If user hits up key, advance aria activedescendant to previous item
				else if (event.keyCode === _utilities.KEYS.UP) {
						_utilities.EventUtil.trapImmediate(event);
						var numFocusable = this.getNumFocusableItems();
						this.state.focusIndex === null ? this.setState({ focusIndex: numFocusable }) : this.decreaseIndex();
					}
					//If user hits enter, select current activedescendant item
					else if (event.keyCode === _utilities.KEYS.ENTER && this.state.focusIndex !== null) {
							_utilities.EventUtil.trapImmediate(event);
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
				if (event.keyCode === _utilities.KEYS.DELETE || event.keyCode === _utilities.KEYS.BACKSPACE) {
					_utilities.EventUtil.trapImmediate(event);
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

		/*
  getSectionDivider(){
  	if(this.props.sectionDividerRenderer){
  		const SectionDivider = this.props.sectionDividerRenderer;
  		return <SectionDivider {... this.props} />;
  	}
  }
  */

	}, {
		key: 'normalizeSearchTerm',
		value: function normalizeSearchTerm(string) {
			return (string || '').toString().replace(/^\s+/, '');
		}

		//=================================================
		// Rendering Things

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
		key: 'renderSimpleMenu',
		value: function renderSimpleMenu() {
			if (this.state.isOpen) {
				return _react2.default.createElement(
					'div',
					{ className: 'ignore-react-onclickoutside slds-lookup__menu', role: 'listbox', ref: 'scroll' },
					this.renderMenuContent()
				);
			}
		}
	}, {
		key: 'renderModalMenu',
		value: function renderModalMenu() {
			var targetElem = this.refs[this.inputRefName()];
			if (this.state.isOpen) {
				return _react2.default.createElement(
					_popover2.default,
					{
						className: 'slds-lookup__menu slds-show',
						closeOnTabKey: true,
						inheritTargetWidth: true,
						onClose: this.handleCancel.bind(this),
						flippable: this.props.flippable,
						constrainToScrollParent: this.props.constrainToScrollParent,
						targetElement: targetElem
					},
					this.renderMenuContent()
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			return _react2.default.createElement(
				'span',
				null,
				_react2.default.createElement(_inputIcon2.default, { name: 'search', onClick: this.focusInput.bind(this) }),
				_react2.default.createElement('input', {
					'aria-activedescendant': this.state.currentFocus ? this.state.currentFocus : '',
					'aria-autocomplete': 'list',
					'aria-describedby': this.props.describedById,
					'aria-expanded': this.state.isOpen,
					className: 'slds-lookup__search-input slds-input',
					id: this.inputRefName(),
					onBlur: this.handleBlur.bind(this),
					onChange: this.handleChange.bind(this),
					onClick: this.handleClick.bind(this),
					onFocus: this.handleFocus.bind(this),
					onKeyDown: this.handleKeyDown.bind(this),
					ref: this.inputRefName(),
					placeholder: this.props.placeholder,
					role: 'combobox',
					type: 'text',
					value: this.state.searchTerm
				})
			);
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
						{ className: 'slds-form-element__label', htmlFor: this.inputRefName(), style: { width: '100%' } },
						required,
						this.props.label
					);
				}
				return inputLabel;
			}
		}
	}, {
		key: 'inputRefName',
		value: function inputRefName() {
			return this.props.label + 'Lookup';
		}
	}, {
		key: 'focusInput',
		value: function focusInput() {
			_reactDom2.default.findDOMNode(this.refs[this.inputRefName()]).focus();
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
				this.props.modal ? this.renderModalMenu() : this.renderSimpleMenu()
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