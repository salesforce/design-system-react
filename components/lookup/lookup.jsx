/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Lookup Component

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash.escaperegexp';
import isEqual from 'lodash.isequal';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// Children
import Dialog from '../utilities/dialog';
import Button from '../button';
import Icon from '../icon';
import InputIcon from '../icon/input-icon';
import Input from '../forms/input';

// ### Event Helpers
import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';

import Menu from './menu';
import classNames from 'classnames';

import { LOOKUP } from '../../utilities/constants';

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
const defaultFilter = (term, item) => {
	if (!term) return true;
	return (item.data && item.data.type === 'section') || item.label.match(new RegExp(escapeRegExp(term), 'ig'));
};

/**
 * Lookup is an advanced inline search form. The lookup can parse through single or multi scoped datasets. The parsed dataset can be filtered by single or multi option selects.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 *
 * This component may use a portalMount (a disconnected React subtree mount) within an absolutely positioned DOM node created with [Drop](http://github.hubspot.com/drop/).
 */
const Lookup = React.createClass({
	displayName: LOOKUP,

	propTypes: {
		/**
		 * If present, the label associated with this `input` is overwritten
		 * by this text and is visually not shown.
		 */
		assistiveText: PropTypes.string,
		/**
		 * Class names to be added to the tag classed with `slds-lookup`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
		 */
		constrainToScrollParent: PropTypes.bool,
		/**
		 * ID for aria-describedby (e.g. for an error message or a description)
		 */
		describedById: PropTypes.string,
		/**
		 * This prop is passed onto the `input`. Prevents dropdown menu from opening. Also applies disabled styling to input.
		 */
		disabled: PropTypes.bool,
		/**
		 * Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
		 */
		emptyMessage: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
		/**
		 * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
		 */
		filterWith: PropTypes.func,
		/**
		 * If true, the menu is constrained to the window and may be flipped up. Has no effect if `isInline` is `true`.
		 */
		flippable: PropTypes.bool,
		/**
		 * Custom component for Lookup footer. The default footer allows user to add new item - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>Lookup.DefaultFooter</code>.
		 */
		footerRenderer: PropTypes.func,
		/**
		 * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>Lookup.DefaultHeader</code>.
		 */
		headerRenderer: PropTypes.func,
		/**
		 * Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view categories.
		 */
		iconCategory: PropTypes.string,
		/**
		 * If true, icon color is white. If false, icon color is the default text color.
		 */
		iconInverse: PropTypes.bool,
		/**
		 * Name of icon. Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view icon names.
		 */
		iconName: PropTypes.string,
		/**
		 * Determines whether the input's icon will display that icon on the left or the right.
		 */
		iconPosition: PropTypes.oneOf([
			'left',
			'right'
		]),
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * Form label for input.
		 */
		label: PropTypes.string,
		/**
		 * Custom component that overrides the default Lookup Item component.
		 */
		listItemLabelRenderer: PropTypes.func,
		/**
		 * Triggered when input focus is removed.
		 */
		onBlur: PropTypes.func,
		/**
		 * Triggered when the contents of the input changes.
		 */
		onChange: PropTypes.func,
		/**
		 * Triggered when an item is selected from the dropdown menu.
		 */
		onSelect: PropTypes.func,
		/**
		 * Triggered when an item is an item is removed from the input.
		 */
		onUnselect: PropTypes.func,
		/**
		 * Item added to the dropdown menu.
		 */
		options: PropTypes.array.isRequired,
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		/**
		 * If true, adds asterisk next to input label to indicate it is a required field.
		 */
		required: PropTypes.bool,
		/**
		 * Text passed on to header search input of dropdown menu.
		 */
		searchTerm: PropTypes.string,
		/**
		 * Custom component that overrides the default section divider
		 */
		sectionDividerRenderer: PropTypes.func,
		/**
		 * Index of current selected item. To clear the selection, pass in -1.
		 */
		selectedItem: PropTypes.number

	},

	getDefaultProps () {
		return {
			constrainToScrollParent: true,
			filterWith: defaultFilter,
			iconPosition: 'right',
			searchTerm: ''
		};
	},

	getInitialState () {
		return {
			currentFocus: null,
			focusIndex: null,
			items: [],
			listLength: this.props.options.length,
			searchTerm: this.normalizeSearchTerm(this.props.searchTerm),
			selectedIndex: this.props.selectedItem
		};
	},

	componentDidUpdate (prevProps, prevState) {
		if (!isNaN(parseInt(prevState.selectedIndex, 10)) && isNaN(parseInt(this.state.selectedIndex, 10))) {
			if (this.input) {
				this.input.focus();
			}
		} else if (isNaN(parseInt(prevState.selectedIndex, 10)) && !isNaN(parseInt(this.state.selectedIndex, 10))) {
			if (this.pills[this.state.selectedIndex]) {
				this.pills[this.state.selectedIndex].focus();
			}
		}
	},

	componentWillReceiveProps (newProps) {
		if (newProps.options) {
			this.modifyItems(newProps.options);
		}
		if (newProps.selectedItem !== this.props.selectedItem || !isEqual(newProps.options, this.props.options)) {
			this.setState({ selectedIndex: newProps.selectedItem });
		}
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(LOOKUP, this.props);

		// Keeps track of references of children for keyboard navigation
		this.pills = [];
	},

	componentDidMount () {
		this.modifyItems(this.props.options);
	},

	modifyItems (itemsToModify) {
		const items = itemsToModify.map((item, index) => ({
			id: `item-${index}`,
			label: item.label,
			data: item
		}));

		this.setState({ items });
	},

	setFirstIndex () {
		let nextFocusIndex = 0;
		let filteredItem = this.state.items[0];

		if (this.menuComponent && this.menuComponent.getFilteredItemForIndex) {
			filteredItem = this.menuComponent.getFilteredItemForIndex(nextFocusIndex);
		}

		if (filteredItem && filteredItem.data.type === 'section') {
			nextFocusIndex++;
		}

		this.setState({ focusIndex: nextFocusIndex });
	},

	// =================================================
	// Using down/up keys, set Focus on list item and assign it to aria-activedescendant attribute in input.
	// Need to keep track of filtered list length to be able to increment/decrement the focus index so it's contained to the number of available list items.
	increaseIndex () {
		const numFocusable = this.getNumFocusableItems();
		let nextFocusIndex = this.state.focusIndex < numFocusable ? this.state.focusIndex + 1 : 0;
		const filteredItem = this.menuComponent.getFilteredItemForIndex(nextFocusIndex);

		if (filteredItem && filteredItem.data.type === 'section') {
			nextFocusIndex++;
		}

		this.setState({ focusIndex: nextFocusIndex });
	},

	decreaseIndex () {
		const numFocusable = this.getNumFocusableItems();
		let prevFocusIndex = this.state.focusIndex > 0 ? this.state.focusIndex - 1 : numFocusable;
		const filteredItem = this.menuComponent.getFilteredItemForIndex(prevFocusIndex);

		if (filteredItem && filteredItem.data.type === 'section') {
			prevFocusIndex = prevFocusIndex === 0 ? numFocusable : prevFocusIndex - 1;
		}

		this.setState({ focusIndex: prevFocusIndex });
	},

	setFocus (id) {
		this.setState({ currentFocus: id });
	},

	getListLength (qty) {
		if (qty !== this.state.listLength) {
			this.setState({ listLength: qty });
		}
	},

	getNumFocusableItems () {
		let offset = 0;

		if (this.footerComponent) {
			offset += 1;
		}

		if (this.headerComponent) {
			offset += 1;
		}

		return (this.state.listLength - 1) + offset;
	},

	// =================================================
	// Select menu item (onClick or on key enter/space)
	selectItem (itemId) {
		if (itemId) {
			const index = itemId.replace('item-', '');
			this.selectItemByIndex(index);
		}
	},

	selectItemByIndex (index) {
		if (index >= 0 && index < this.state.items.length) {
			this.setState({
				isOpen: false,
				selectedIndex: index,
				searchTerm: ''
			});
			const data = this.state.items[index].data;
			if (this.props.onSelect) {
				this.props.onSelect(data);
			}
		}
	},

	handleDeleteSelected () {
		this.setState({
			selectedIndex: null,
			isOpen: true
		});

		this.focusInput();

		if (this.props.onUnselect) {
			this.props.onUnselect();
		}
	},

	// =================================================
	// Event Listeners on Input
	handleClose () {
		this.setState({
			isOpen: false,
			focusIndex: null,
			currentFocus: null
		});
	},

	handleClickOutside () {
		this.handleClose();
	},

	handleEscape (event) {
		if (this.state.isOpen && event) {
			EventUtil.trap(event);
		}
		this.handleClose();
	},

	handleCancel () {
		this.setState({
			isOpen: false,
			focusIndex: null,
			currentFocus: null
		});
	},

	handleClick () {
		this.setState({ isOpen: true });
	},

	handleBlur (event) {
		if (this.props.onBlur) {
			const target = event.target || event.currentTarget;
			this.props.onBlur(target.value);
		}
	},

	handleFocus () {
		this.setState({ isOpen: true });
	},

	handleChange (event) {
		const target = event.target || event.currentTarget;
		this.setState({ searchTerm: this.normalizeSearchTerm(target.value) });
		if (this.props.onChange) {
			this.props.onChange(target.value);
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			// If user hits esc key, close menu
			if (event.keyCode === KEYS.ESCAPE) {
				this.handleEscape(event);
			} else {
				this.handleClick();
			}

			// If user hits down key, advance aria activedescendant to next item
			if (event.keyCode === KEYS.DOWN) {
				EventUtil.trapImmediate(event);
				if (this.state.focusIndex === null) {
					this.setFirstIndex();
				} else {
					this.increaseIndex();
				}
			} else if (event.keyCode === KEYS.UP) {
				// If user hits up key, advance aria activedescendant to previous item
				EventUtil.trapImmediate(event);
				const numFocusable = this.getNumFocusableItems();
				if (this.state.focusIndex === null) {
					this.setState({ focusIndex: numFocusable });
				} else {
					this.decreaseIndex();
				}
			} else if ((event.keyCode === KEYS.ENTER) && this.state.focusIndex !== null) {
				// If user hits enter, select current activedescendant item
				EventUtil.trapImmediate(event);
				// If the focus is on the first fixed Action Item in Menu, click it
				if (this.headerComponent && this.state.focusIndex === 0) {
					this.headerComponent.handleClick();
				} else if (this.footerComponent && this.state.focusIndex === (this.state.listLength + 1)) {
					// If the focus is on the last fixed Action Item in Menu, click it
					this.footerComponent.handleClick();
				} else {
					// If not, then select menu item
					this.selectItem(this.state.currentFocus);
				}
			}
		}
	},

	handlePillKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.DELETE || event.keyCode === KEYS.BACKSPACE) {
				EventUtil.trapImmediate(event);
				this.handleDeleteSelected();
			}
		}
	},

	getHeader () {
		const Header = this.props.headerRenderer;
		const headerActive = this.state.focusIndex === 0;

		return (
			<Header
				ref={(header) => { this.headerComponent = header; }}
				{...this.props}
				focusIndex={this.state.focusIndex}
				isActive={headerActive}
				onClose={this.handleClose}
				searchTerm={this.state.searchTerm}
				setFocus={this.setFocus}
			/>
		);
	},

	getFooter () {
		const Footer = this.props.footerRenderer;
		const numFocusable = this.getNumFocusableItems();
		const footerActive = this.state.focusIndex === numFocusable;

		return (
			<Footer
				ref={(footer) => { this.footerComponent = footer; }}
				{... this.props}
				focusIndex={this.state.focusIndex}
				isActive={footerActive}
				onClose={this.handleClose}
				setFocus={this.setFocus}
			/>
		);
	},

	normalizeSearchTerm (string) {
		return (string || '').toString().replace(/^\s+/, '');
	},

	// =================================================
	// Rendering Things
	renderMenuContent () {
		return (
			<Menu
				ref={(menu) => { this.menuComponent = menu; }}
				emptyMessage={this.props.emptyMessage}
				filterWith={this.props.filterWith}
				focusIndex={this.state.focusIndex}
				footer={this.props.footerRenderer ? this.getFooter() : null}
				getListLength={this.getListLength}
				header={this.props.headerRenderer ? this.getHeader() : null}
				iconCategory={this.props.iconCategory}
				iconInverse={this.props.iconInverse}
				iconName={this.props.iconName}
				items={this.state.items}
				label={this.props.label}
				listItemLabelRenderer={this.props.listItemLabelRenderer}
				listLength={this.state.listLength}
				onSelect={this.selectItem}
				searchTerm={this.state.searchTerm}
				sectionDividerRenderer={this.props.sectionDividerRenderer}
				setFocus={this.setFocus}
			/>
		);
	},

	renderInlineMenu () {
		return (this.state.isOpen
			? <div className="ignore-react-onclickoutside slds-lookup__menu" role="listbox">
				{this.renderMenuContent()}
			</div>
			: null
		);
	},

	renderSeparateMenu () {
		return (this.state.isOpen
			? <Dialog
				className="slds-lookup__menu slds-show"
				closeOnTabKey
				contentsClassName="slds-lookup__menu slds-show"
				inheritTargetWidth
				onClose={this.handleCancel}
				flippable={this.props.flippable}
				constrainToScrollParent={this.props.constrainToScrollParent}
				targetElement={this.input}
				verticalAlign="bottom"
			>
				{this.renderMenuContent()}
			</Dialog>
			: null
		);
	},

	renderInput () {
		return (
			<Input
				aria-activedescendant={this.state.currentFocus ? this.state.currentFocus : ''}
				aria-autocomplete="list"
				aria-describedby={this.props.describedById}
				aria-expanded={!!this.state.isOpen}
				assistiveText={this.props.assistiveText}
				className="slds-lookup__search-input"
				disabled={this.props.disabled}
				iconRight={
					<InputIcon
						assistiveText="Search"
						category="utility"
						name="search"
					/>}
				id={this.inputRefId()}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onClick={this.handleClick}
				onFocus={this.handleFocus}
				onKeyDown={this.handleKeyDown}
				inputRef={(component) => {
					this.input = component;
					if (this.focusOnRender) {
						this.input.focus();
						this.focusOnRender = false;
					}
				}}
				placeholder={this.props.placeholder}
				role="combobox"
				type="text"
				value={this.state.searchTerm}
			/>
		);
	},

	renderSelectedItem () {
		const selectedItem = this.props.options[this.state.selectedIndex].label;
		const renderIcon = this.props.iconName
			? (<Icon
				category={this.props.iconCategory}
				className="slds-icon slds-pill__icon"
				inverse={this.props.iconInverse}
				name={this.props.iconName}
			/>)
			: null;
		const labelClassName = this.props.iconName ? 'slds-pill__label' : 'slds-pill__label slds-m-left--x-small';

		// i18n
		return (
			<div className="slds-pill__container">
				{/* eslint-disable no-script-url */}
				<a
					href="javascript:void(0)"
					className="slds-pill"
					ref={(pill) => { this.pills[this.state.selectedIndex] = pill; }}
					onKeyDown={this.handlePillKeyDown}
				>
					{/* eslint-enable no-script-url */}
					{renderIcon}
					<span className={labelClassName}>
						{selectedItem}
					</span>
					<Button
						assistiveText="Press delete to remove"
						className="slds-pill__remove slds-button--icon-bare"
						iconName="close"
						onClick={this.handleDeleteSelected}
						tabIndex="-1"
						variant="icon"
					/>
				</a>
			</div>
		);
	},

	renderLabel () {
		let inputLabel;
		const required = this.props.required
			? <span className="slds-required">*</span>
			: null;
		if (this.isSelected()) {
			// inline style override
			inputLabel = (<span
				className="slds-form-element__label"
				style={{ width: '100%' }}
			>{required}{this.props.label}</span>);
		} else {
			inputLabel = (<label
				className="slds-form-element__label"
				htmlFor={this.inputRefId()}
				style={{ width: '100%' }}
			>{required}{this.props.label}</label>);
		}
		return inputLabel;
	},

	inputRefId () {
		return `${this.props.label}Lookup`;
	},

	focusInput () {
		this.focusOnRender = true;
	},

	isSelected () {
		const hasSelection = !isNaN(parseInt(this.state.selectedIndex, 10)) && this.state.selectedIndex >= 0;
		return hasSelection;
	},

	getClassName () {
		return classNames(this.props.className, 'slds-form-element slds-lookup', {
			'slds-has-selection': this.isSelected(),
			'slds-is-open': this.state.isOpen
		});
	},

	render () {
		let isInline;
		/* eslint-disable react/prop-types */
		if (this.props.isInline) {
			isInline = true;
		} else if (this.props.modal !== undefined) {
			isInline = !this.props.modal;
		}
		/* eslint-enable react/prop-types */

		const formElementControlClasses = {
			'slds-form-element__control': true,
			[`slds-input-has-icon slds-input-has-icon--${this.props.iconPosition}`]: !this.isSelected()
		};

		return (
			<div className={this.getClassName()} data-select="single" data-scope="single">
				{this.props.label ? this.renderLabel() : null}
				<div className={classNames(formElementControlClasses)}>
					{this.isSelected() ? this.renderSelectedItem() : null}
					{!this.isSelected() ? this.renderInput() : null}
				</div>
				{isInline ? this.renderInlineMenu() : this.renderSeparateMenu()}
			</div>
		);
	}
});

module.exports = Lookup;

