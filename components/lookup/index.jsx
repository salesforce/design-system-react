/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Lookup Component

// Implements the [Lookup design pattern](https://core-210.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.4.0-dev

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import { shape } from 'airbnb-prop-types';
import escapeRegExp from 'lodash.escaperegexp';
import isEqual from 'lodash.isequal';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// Children
import Dialog from '../utilities/dialog';
import Button from '../button';
import Icon from '../icon';
import InnerInput from '../forms/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Pill from './private/pill';

// ### Event Helpers
import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';

import Menu from './menu';
import DefaultFooter from './menu/default-footer';
import DefaultHeader from './menu/default-header';
import DefaultSectionDivider from './menu/default-section-divider';
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
		 * Object of text used for assistive text for screen readers. The object is merged with the default props object on every render.
		 * * `deleteSelectedItem`: Informs user of keyboard keys to press in order to delete a selected item.
		 * * `label` If present, the label associated with this `input` is overwritten by this text and is visually not shown.
		 * * `search`: Describes search icon inside of Lookup input field.
		 */
		assistiveText: shape({
			deleteSelectedItem: PropTypes.string,
			label: PropTypes.string,
			search: PropTypes.string
		}),
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
		emptyMessage: PropTypes.string,
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
		 * Render custom <Icon /> component for Menu Items.
		 */
		icon: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.node
		]),
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
		 * The <input> and <ul> need unique ids for accessibility. If none are passed in through props, random ids are autogenerated at run time.
		 */
		ids: shape({
			input: PropTypes.string,
			menu: PropTypes.string
		}),
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `label`: Form element label.
		 * * `multipleOptionsSelected`: Text to be used when multiple items are selected. "2 Options Selected" is a good pattern to use.
		 */
		labels: shape({
			label: PropTypes.string,
			multipleOptionsSelected: PropTypes.string
		}),
		/**
		 * Custom component that overrides the default Lookup Item component.
		 */
		listItemLabelRenderer: PropTypes.func,
		/**
		 * If true, allows user to select more than one item. Selected items render as pills below <input />.
		 */
		multiple: PropTypes.bool,
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
		 * Index of current selected item. To clear the selection, pass in null or -1.
		 */
		selectedItem: PropTypes.number,
		/**
		 * Array of current selected items' indicies. To clear the selection, pass an empty array.
		 */
		selectedItems: PropTypes.array
	},

	getDefaultProps () {
		return {
			assistiveText: {
				deleteSelectedItem: 'Remove selected item',
				search: 'Type to find items'
			},
			constrainToScrollParent: true,
			filterWith: defaultFilter,
			iconPosition: 'right',
			multiple: false,
			searchTerm: '',
			selectedItem: null,
			selectedItems: []
		};
	},

	getInitialState () {
		// Single select and has a default selected item on load.
		const value = (
			!this.props.multiple
			&& !isNaN(this.props.selectedItem) && this.props.selectedItem >= 0
			&& !!this.props.options[this.props.selectedItem])
			? this.props.options[this.props.selectedItem].label
			: this.normalizeSearchTerm(this.props.searchTerm);

		return {
			currentFocus: null,
			focusIndex: null,
			items: [],
			isOpen: false,
			listLength: this.props.options.length,
			searchTerm: value,
			selectedIndex: this.props.selectedItem,
			selectedIndices: this.props.selectedItems
		};
	},

	componentDidUpdate () {
		if (this.hasSingleSelection()) {
			this.clearInput.focus();
		}
	},

	componentWillReceiveProps (newProps) {
		if (newProps.options) {
			this.modifyItems(newProps.options);
		}

		if (newProps.selectedItem !== this.props.selectedItem || !isEqual(newProps.options, this.props.options)) {
			// Single select and has a default selected item on load.
			const value = (
				!isNaN(newProps.selectedItem) && newProps.selectedItem >= 0
				&& !!newProps.options[newProps.selectedItem])
				? newProps.options[newProps.selectedItem].label
				: this.normalizeSearchTerm(this.props.searchTerm);

			this.setState({
				selectedIndex: newProps.selectedItem,
				searchTerm: value
			});
		} else if (newProps.selectedItems !== this.props.selectedItems || !isEqual(newProps.options, this.props.options)) {
			this.setState({ selectedIndices: newProps.selectedItems });
		}
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(LOOKUP, this.props);

		// Generate unique id for Combobox and Listbox (menu)
		this.generatedInputId = (this.props.uniqueIds && this.props.uniqueIds.input) || shortid.generate();
		this.generatedMenuId = (this.props.uniqueIds && this.props.uniqueIds.menu) || shortid.generate();
	},

	componentDidMount () {
		this.modifyItems(this.props.options);
	},

	hasSingleSelection () {
		const hasSelection = !this.props.multiple && !isNaN(parseInt(this.state.selectedIndex, 10)) && this.state.selectedIndex >= 0;
		return hasSelection;
	},

	hasMultipleSelection () {
		const hasSelection = this.props.multiple && this.state.selectedIndices.length > 0;
		return hasSelection;
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
		return this.state.listLength - 1;
	},

	getValueByIndex (index) {
		return this.props.options[index];
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
			if (this.props.multiple) {
				this.handleMultiSelect(index);
			} else {
				this.handleSingleSelect(index);
			}
			const data = this.state.items[index].data;
			if (this.props.onSelect) {
				this.props.onSelect(data);
			}
		}
	},

	handleSingleSelect (index) {
		this.setState({
			isOpen: false,
			selectedIndex: index,
			searchTerm: this.props.options[index].label
		});
	},

	handleMultiSelect (index) {
		if (this.state.selectedIndices.indexOf(index) === -1) {
			const currentIndices = this.state.selectedIndices.concat(index);
			this.setState({
				selectedIndices: currentIndices
			});
		} else {
			const deselectIndex = this.state.selectedIndices.indexOf(index);
			this.state.selectedIndices.splice(deselectIndex, 1);
		}
	},

	handleDeleteSelected () {
		this.setState({
			selectedIndex: null,
			searchTerm: '',
			isOpen: true
		});

		this.input.focus();

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
		this.handleClose();
		if (this.props.onBlur) {
			const target = event.target || event.currentTarget;
			this.props.onBlur(target.value);
		}
	},

	handleFocus () {
		if (!this.hasSingleSelection()) {
			this.setState({ isOpen: true });
		}
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
				} else if (this.footerComponent && this.state.focusIndex === (this.state.listLength - 1)) {
					// If the focus is on the last fixed Action Item in Menu, click it
					this.footerComponent.handleClick();
				} else {
					// If not, then select menu item
					this.selectItem(this.state.currentFocus);
				}
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
				id={this.generatedMenuId}
				items={this.state.items}
				listItemLabelRenderer={this.props.listItemLabelRenderer}
				listLength={this.state.listLength}
				onSelect={this.selectItem}
				role="listbox"
				searchTerm={this.state.searchTerm}
				sectionDividerRenderer={this.props.sectionDividerRenderer}
				selectedIndices={this.state.selectedIndices}
				setFocus={this.setFocus}
			/>
		);
	},

	renderInlineMenu () {
		return this.state.isOpen ? this.renderMenuContent() : null;
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
		const noSelectionStyles = { boxShadow: 'none' };
		const multipleLabel = this.props.labels && this.props.labels.multipleOptionsSelected ? this.props.labels.multipleOptionsSelected : `${this.state.selectedIndices.length} Option(s) Selected`;
		const inputValue = this.hasMultipleSelection() ? multipleLabel : this.state.searchTerm;
		return (
			<InnerInput
				aria-activedescendant={this.state.currentFocus ? this.state.currentFocus : ''}
				aria-autocomplete="list"
				aria-controls={this.generatedMenuId}
				aria-describedby={this.props.describedById}
				autoComplete="off"
				className="slds-input slds-combobox__input"
				disabled={this.props.disabled}
				id={this.generatedInputId}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onClick={this.handleClick}
				onFocus={this.handleFocus}
				onKeyDown={this.handleKeyDown}
				iconLeft={this.hasSingleSelection() && this.props.iconName ? this.renderSelectedItemIcon() : null}
				iconRight={this.renderInputIcon()}
				inputRef={(component) => {
					this.input = component;
				}}
				placeholder={this.props.placeholder}
				readOnly={this.hasSingleSelection()}
				role="textbox"
				style={!this.hasSingleSelection() ? noSelectionStyles : null}
				tabIndex={this.hasSingleSelection() ? -1 : 0}
				type="text"
				value={inputValue}
			/>
		);
	},

	renderLabel () {
		if (this.props.assistiveText && this.props.assistiveText.label) {
			return <span className="slds-assistive-text">{this.props.assistiveText.label}</span>;
		}
		const required = this.props.required ? <abbr className="slds-required" title="required">*</abbr> : null;
		// eslint-disable-next-line react/prop-types
		const label = this.props.labels && this.props.labels.label ? this.props.labels.label : this.props.label;
		return (
			<label
				className="slds-form-element__label slds-size_12-of-12"
				htmlFor={this.generatedInputId}
			>
				{required}
				{label}
			</label>
		);
	},

	renderPills () {
		const selectedPills = this.state.selectedIndices.map((selectedPill) => {
			const pillLabel = this.getValueByIndex(selectedPill).label;
			return (
				<li
					className="slds-listbox__item"
					key={`pill-${selectedPill}`}
					role="presentation"
				>
					<Pill
						eventData={{
							item: this.props.options[selectedPill],
							index: selectedPill
						}}
						iconName={this.props.iconName}
						iconCategory={this.props.iconCategory}
						events={{
							onRequestRemove: (event, data) => {
								const newData = this.state.selectedIndices;
								newData.splice(this.state.selectedIndices.indexOf(data.index), 1);
								this.setState({ selectedIndices: newData });
							}
						}}
						labels={{
							label: pillLabel
						}}
						variant="option"
					/>
				</li>
			);
		});
		return (
			<div
				id="listbox-selections-unique-id"
				orientation="horizontal"
				role="listbox"
			>
				<ul
					className="slds-listbox slds-listbox_inline slds-p-top_xxx-small"
					role="group"
					aria-label="Selected Options:"
				>
					{selectedPills}
				</ul>
			</div>
		);
	},

	getClassName () {
		return classNames(this.props.className, 'slds-form-element slds-lookup', {
			'slds-has-selection': this.hasSingleSelection(),
			'slds-is-open': this.state.isOpen
		});
	},

	renderSelectedItemIcon () {
		return this.props.iconName
			? (<Icon
				category={this.props.iconCategory}
				containerClassName="slds-combobox__input-entity-icon"
				inverse={this.props.iconInverse}
				name={this.props.iconName}
			/>)
			: null;
	},

	renderInputIcon () {
		return this.hasSingleSelection()
			? <Button
				assistiveText={this.props.assistiveText && this.props.assistiveText.deleteSelectedItem}
				buttonRef={(button) => { this.clearInput = button; }}
				className="slds-input__icon slds-input__icon_right"
				iconName="close"
				onClick={this.handleDeleteSelected}
				variant="icon"
			/>
			: <InputIcon
				assistiveText={this.props.assistiveText && this.props.assistiveText.search}
				category="utility"
				name="search"
			/>;
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

		const comboboxContainerClassName = {
			'slds-combobox_container': true,
			'slds-has-inline-listbox': !this.props.multiple,
			'slds-has-input-focus': this.state.isOpen
		};

		const comboboxClassName = {
			'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click': true,
			'slds-combobox-lookup': !this.state.isOpen,
			'slds-is-open': this.state.isOpen
		};

		const inputContainerClassName = {
			'slds-combobox__form-element slds-input-has-icon': true,
			'slds-input-has-icon_right': (!this.props.iconName && this.hasSingleSelection()) || !this.hasSingleSelection(),
			'slds-input-has-icon_left-right': this.props.iconName && this.hasSingleSelection()
		};

		return (
			<div className="slds-form-element">
				{this.renderLabel()}
				<div className="slds-form-element__control">
					<div className={classNames(comboboxContainerClassName)}>
						<div
							className={classNames(comboboxClassName)}
							aria-expanded={this.state.isOpen}
							aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
							role="combobox"
						>
							<div className={classNames(inputContainerClassName)}>
								{this.renderInput()}

							</div>
							{isInline ? this.renderInlineMenu() : this.renderSeparateMenu()}
						</div>
					</div>
					{/* multiple select - show selected items as pills below input. */}
					{this.hasMultipleSelection() ? this.renderPills() : null}
				</div>
			</div>
		);
	}
});

module.exports = Lookup;
module.exports.DefaultHeader = DefaultHeader;
module.exports.DefaultSectionDivider = DefaultSectionDivider;
module.exports.DefaultFooter = DefaultFooter;
