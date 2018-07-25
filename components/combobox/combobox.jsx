/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/role-has-required-aria-props */

import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash.assign';
import find from 'lodash.find';
import reject from 'lodash.reject';
import isEqual from 'lodash.isequal';
import findIndex from 'lodash.findindex';

import isBoolean from 'lodash.isboolean';
import isFunction from 'lodash.isfunction';

import classNames from 'classnames';

import shortid from 'shortid';

import Dialog from '../utilities/dialog';
import InnerInput from '../../components/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Menu from './private/menu';
import Label from '../forms/private/label';
import SelectedListBox from './private/selected-listbox';

import KEYS from '../../utilities/key-code';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

import checkProps from './check-props';

import { COMBOBOX } from '../../utilities/constants';

let currentOpenDropdown;

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `optionSelectedInMenu`: Added before selected menu items in Read-only variants (Picklists). The default is `Current Selection:`.
	 * * `removeSingleSelectedOption`: Used by inline-listbox, single-select variant to remove the selected item (pill). This is a button with focus. The default is `Remove selected option`.
	 * * `removePill`: Used by multiple selection Comboboxes to remove a selected item (pill). Focus is on the pill. This is not a button. The default  is `, Press delete or backspace to remove`.
	 * * `selectedListboxLabel`: This is a label for the selected listbox. The grouping of pills for multiple selection Comboboxes. The default is `Selected Options:`.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
		optionSelectedInMenu: PropTypes.string,
		removeSingleSelectedOption: PropTypes.string,
		removePill: PropTypes.string,
		selectedListboxLabel: PropTypes.string,
	}),
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them.
	 * This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need. _Tested with snapshot testing._
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-combobox`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to top level tag with `.slds-form-element` and not on `.slds-combobox_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
	 */
	classNameContainer: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames). Autocomplete/bass variant menu height should not scroll and should be determined by number items which should be no more than 10. _Tested with snapshot testing._
	 */
	classNameMenu: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to tag with `.slds-dropdown__header`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	classNameMenuSubHeader: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Event Callbacks
	 * * `onBlur`: Called when `input` removes focus.
	 * * `onChange`: Called when keyboard events occur within `input`
	 * * `onClose`: Triggered when the menu has closed.
	 * * `onFocus`: Called when `input` receives focus.
	 * * `onOpen`: Triggered when the menu has opened.
	 * * `onRequestClose`: Function called when the menu would like to hide. Please use with `isOpen`.
	 * * `onRequestOpen`:  Function called when the menu would like to show. Please use with `isOpen`.
	 * * `onRequestRemoveSelectedOption`: Function called when a single selection option is to be removed.
	 * * `onSelect`: Function called when a menu item is selected
	 * * `onSubmit`: Function called when user presses enter or submits the `input`
	 * _Tested with Mocha testing._
	 */
	events: PropTypes.shape({
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onClose: PropTypes.func,
		onFocus: PropTypes.func,
		onOpen: PropTypes.func,
		onRequestClose: PropTypes.func,
		onRequestOpen: PropTypes.func,
		onRequestRemoveSelectedOption: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func,
	}),
	/**
	 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error. _Tested with snapshot testing._
	 */
	errorText: PropTypes.string,
	/**
	 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * HTML id for component. _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: This label appears above the input.
	 * * `multipleOptionsSelected`: This label is used by the readonly variant when multiple options are selected. The default is `${props.selection.length} options selected`. This will override the entire string.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 * * `placeholder`: Input placeholder
	 * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
	 * * `removePillTitle`: Title on `X` icon
	 * _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		multipleOptionsSelected: PropTypes.string,
		noOptionsFound: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		placeholder: PropTypes.string,
		placeholderReadOnly: PropTypes.string,
		removePillTitle: PropTypes.string,
	}),
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) _Tested with snapshot testing._
	 */
	isOpen: PropTypes.bool,
	/**
	 * Sets the dialog width to the width of one of the following:
	 * * `target`: Sets the dialog width to the width of the target. (Menus attached to `input` typically follow this UX pattern),
	 * * `menu`: Consider setting a `menuMaxWidth` if using this value. If not, width will be set to width of largest menu item.
	 * * `none`: Does not set a width on the dialog. _Tested with snapshot testing._
	 */
	inheritWidthOf: PropTypes.oneOf(['target', 'menu', 'none']),
	/**
	 * Accepts a custom menu item rendering function that becomes a custom component. The checkmark is still rendered in readonly variants. This function is passed the following props:
	 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
	 * * `option`: Object, option data for item being rendered that is passed into Combobox
	 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
	 *
	 * _Tested with snapshot testing._
	 */
	menuItem: PropTypes.func,
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	menuPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
	/**
	 * Sets a maximum width that the menu will be used if `inheritWidthOf` is set to `menu`. (Example: 500px) _Tested with snapshot testing._
	 *
	 */
	menuMaxWidth: PropTypes.string,
	/**
	 * Allows multiple selections _Tested with mocha testing._
	 */
	multiple: PropTypes.bool,
	/**
	 * Item added to the dropdown menu.
	 * To add an item as a separator, set item `type` as `separator`. Note: At the moment, we don't support two consecutive separators. _Tested with snapshot testing._
	 */
	options: PropTypes.array.isRequired,
	/**
	 * Determines the height of the menu based on SLDS CSS classes. This only applies to the readonly variant. This is a `number`.
	 */
	readOnlyMenuItemVisibleLength: PropTypes.oneOf([5, 7, 10]),
	/**
	 * Limits auto-complete input submission to one of the provided options. _Tested with mocha testing._
	 */
	predefinedOptionsOnly: PropTypes.bool,
	/**
	 * Applies label styling for a required form element. _Tested with snapshot testing._
	 */
	required: PropTypes.bool,
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object. _Tested with snapshot testing._
	 */
	selection: PropTypes.array,
	/**
	 * Value of input. This is a controlled component, so you will need to control the input value. _Tested with snapshot testing._
	 */
	value: PropTypes.string,
	/**
	 * Changes styles of the input. Currently `entity` is not supported. _Tested with snapshot testing._
	 */
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'readonly']),
};

const defaultProps = {
	assistiveText: {
		optionSelectedInMenu: 'Current Selection:',
		removeSingleSelectedOption: 'Remove selected option',
		removePill: ', Press delete or backspace to remove',
		selectedListboxLabel: 'Selected Options:',
	},
	events: {},
	labels: {
		noOptionsFound: 'No matches found.',
		placeholderReadOnly: 'Select an Option',
		removePillTitle: 'Remove',
	},
	inheritWidthOf: 'target',
	menuPosition: 'absolute',
	readOnlyMenuItemVisibleLength: 5,
	required: false,
	selection: [],
	variant: 'base',
};

/**
 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-definfined options.
 */
class Combobox extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: false,
			activeOption: undefined,
			activeOptionIndex: -1,
			// seeding initial state with this.props.selection[0]
			activeSelectedOption:
				(this.props.selection && this.props.selection[0]) || undefined,
			activeSelectedOptionIndex: 0,
		};
	}

	/**
	 * Lifecycle methods
	 */

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(COMBOBOX, this.props);

		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	}

	componentWillReceiveProps (nextProps) {
		// This logic will maintain the active highlight even when the
		// option order changes. One example would be the server pushes
		// data out as the user has the menu open. This logic clears
		// `activeOption` if the active option is no longer in the options
		// list. If it's in the options list, then find the new index and
		// set `activeOptionIndex`
		if (!isEqual(this.props.options, nextProps.options)) {
			const index = findIndex(nextProps.options, (item) =>
				isEqual(item, this.state.activeOption)
			);
			if (index !== -1) {
				this.setState({ activeOptionIndex: index });
			} else {
				this.setState({ activeOption: undefined, activeOptionIndex: -1 });
			}
		} else if (this.props.isOpen !== nextProps.isOpen) {
			this.setState({ isOpen: nextProps.isOpen });
		}

		// there may be issues with tabindex/focus if the app removes an item
		// from selection while the user is using the listbox
		const selectedOptionsRenderIsInitialRender =
			this.props.selection &&
			this.props.selection.length === 0 &&
			nextProps.selection.length > 0;
		if (selectedOptionsRenderIsInitialRender) {
			this.setState({
				activeSelectedOption: nextProps.selection[0],
				activeSelectedOptionIndex: 0,
			});
		}
	}

	componentWillUnmount () {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
	}

	getDialog ({ menuRenderer }) {
		// FOR BACKWARDS COMPATIBILITY
		const menuPosition = this.props.isInline
			? 'relative'
			: this.props.menuPosition; // eslint-disable-line react/prop-types

		return !this.props.disabled && this.getIsOpen() ? (
			<Dialog
				align="bottom left"
				context={this.context}
				hasStaticAlignment={this.props.hasStaticAlignment}
				inheritWidthOf={this.props.inheritWidthOf}
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				onRequestTargetElement={this.getTargetElement}
				position={menuPosition}
				containerProps={{
					id: `${this.getId()}-listbox`,
					role: 'listbox',
				}}
			>
				{menuRenderer}
			</Dialog>
		) : null;
	}

	getErrorId () {
		return this.props['aria-describedby'] || this.generatedErrorId;
	}

	/**
	 * Shared class property getter methods
	 */

	getId = () => this.props.id || this.generatedId;

	getIsActiveOption = () =>
		this.state.activeOption && this.state.activeOptionIndex !== -1;

	getIsOpen = () =>
		!!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);

	getNewActiveOptionIndex = ({ activeOptionIndex, offset, options }) => {
		// used by menu listbox and selected options listbox
		const nextIndex = activeOptionIndex + offset;
		const skipIndex =
			options.length > nextIndex &&
			nextIndex >= 0 &&
			options[nextIndex].type === 'separator';
		const newIndex = skipIndex ? nextIndex + offset : nextIndex;
		const hasNewIndex = options.length > newIndex && newIndex >= 0;
		return hasNewIndex ? newIndex : activeOptionIndex;
	};

	getTargetElement = () => this.inputRef;

	setInputRef = (component) => {
		this.inputRef = component;
		// yes, this is a render triggered by a render.
		// Dialog/Popper.js cannot place the menu until
		// the trigger/target DOM node is mounted. This
		// way `findDOMNode` is not called and parent
		// DOM nodes are not queried.
		if (!this.state.inputRendered) {
			this.setState({ inputRendered: true });
		}
	};

	handleBlurPill = () => {
		this.setState({ listboxHasFocus: false });
	};

	/**
	 * Menu open/close and sub-render methods
	 */

	handleClickOutside = (event) => {
		this.handleRequestClose(event, {});
	};

	handleClose = (event) => {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}

			this.setState({
				activeOption: undefined,
				activeOptionIndex: -1,
				isOpen: false,
			});

			if (this.props.events.onClose) {
				this.props.events.onClose(event, {});
			}
		}
	};

	handleInputBlur = (event) => {
		// If menu is open when the input's onBlur event fires, it will close before the onClick of the menu item can fire.
		setTimeout(() => {
			this.handleClose(event);
		}, 200);

		if (this.props.events.onBlur) {
			this.props.events.onBlur(event);
		}
	};

	handleInputChange = (event) => {
		this.requestOpenMenu();
		this.props.events.onChange(event, { value: event.target.value });
	};

	handleInputFocus = (event) => {
		if (this.props.events.onFocus) {
			this.props.events.onFocus(event, {});
		}
	};

	handleInputSubmit = (event) => {
		// use menu options
		if (this.getIsActiveOption()) {
			this.handleSelect(event, {
				option: this.state.activeOption,
				selection: this.props.selection,
			});
			// use input value, if not limited to predefined options (in the menu)
		} else if (
			!this.props.predefinedOptionsOnly &&
			event.target.value !== '' &&
			this.props.events.onSubmit
		) {
			this.props.events.onSubmit(event, {
				value: event.target.value,
			});
		}
	};

	/**
	 * Input and menu keyboard event methods
	 */

	handleKeyDown = (event) => {
		// Helper function that takes an object literal of callbacks that are triggered with a key event
		mapKeyEventCallbacks(event, {
			callbacks: {
				[KEYS.DOWN]: { callback: this.handleKeyDownDown },
				[KEYS.ENTER]: { callback: this.handleInputSubmit },
				[KEYS.ESCAPE]: { callback: this.handleClose },
				[KEYS.UP]: { callback: this.handleKeyDownUp },
			},
		});
	};

	handleKeyDownDown = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}

		this.handleNavigateListboxMenu(event, { direction: 'next' });
	};

	handleKeyDownUp = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey && this.state.isOpen) {
			this.handleNavigateListboxMenu(event, { direction: 'previous' });
		}
	};

	handleNavigateListboxMenu = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		// takes current/previous state and returns an object with the new state
		this.setState((prevState) => {
			const newIndex = this.getNewActiveOptionIndex({
				activeOptionIndex: prevState.activeOptionIndex,
				offset: offsets[direction],
				options: this.props.options,
			});

			return {
				activeOption: this.props.options[newIndex],
				activeOptionIndex: newIndex,
			};
		});
	};

	handleNavigateListboxOfPills = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		this.setState((prevState) => {
			const isLastOptionAndRightIsPressed =
				prevState.activeSelectedOptionIndex + 1 ===
					this.props.selection.length && direction === 'next';
			const isFirstOptionAndLeftIsPressed =
				prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
			let newState;

			if (isLastOptionAndRightIsPressed) {
				newState = {
					activeSelectedOption: this.props.selection[0],
					activeSelectedOptionIndex: 0,
					listboxHasFocus: true,
				};
			} else if (isFirstOptionAndLeftIsPressed) {
				newState = {
					activeSelectedOption: this.props.selection[
						this.props.selection.length - 1
					],
					activeSelectedOptionIndex: this.props.selection.length - 1,
					listboxHasFocus: true,
				};
			} else {
				const newIndex = this.getNewActiveOptionIndex({
					activeOptionIndex: prevState.activeSelectedOptionIndex,
					offset: offsets[direction],
					options: this.props.selection,
				});
				newState = {
					activeSelectedOption: this.props.selection[newIndex],
					activeSelectedOptionIndex: newIndex,
					listboxHasFocus: true,
				};
			}

			return newState;
		});
	};

	handleOpen = (event, data) => {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}
		} else {
			currentOpenDropdown = this;

			this.setState({
				isOpen: true,
			});

			if (this.props.events.onOpen) {
				this.props.events.onOpen(event, data);
			}
		}
	};

	handlePillClickListboxOfPills = (event, { option, index }) => {
		// this is clicking the span, not the remove button
		this.setState({
			activeSelectedOption: option,
			activeSelectedOptionIndex: index,
			listboxHasFocus: true,
		});
	};

	/**
	 * Selected options with listbox of pills event methods
	 */

	handleRemoveSelectedOption = (event, { option, index }) => {
		event.preventDefault();
		const onlyOnePillAndInputExists = this.props.selection.length === 1;
		const isReadOnlyAndTwoPillsExists =
			this.props.selection.length === 2 &&
			this.props.variant === 'readonly' &&
			this.props.multiple;
		const lastPillWasRemoved = index + 1 === this.props.selection.length;

		if (
			(onlyOnePillAndInputExists || isReadOnlyAndTwoPillsExists) &&
			this.inputRef
		) {
			this.inputRef.focus();
		} else if (lastPillWasRemoved) {
			// set focus to previous option and index
			this.setState({
				activeSelectedOption: this.props.selection[index - 1],
				activeSelectedOptionIndex: index - 1,
				listboxHasFocus: true,
			});
		} else {
			// set focus to next option, but same index
			this.setState({
				activeSelectedOption: this.props.selection[index + 1],
				activeSelectedOptionIndex: index,
				listboxHasFocus: true,
			});
		}

		if (this.props.events.onRequestRemoveSelectedOption) {
			this.props.events.onRequestRemoveSelectedOption(event, {
				selection: reject(this.props.selection, option),
			});
		}
	};

	handleRequestClose = (event, data) => {
		if (this.props.events.onRequestClose) {
			this.props.events.onRequestClose(event, data);
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false });
		}
	};

	handleRequestFocusListboxOfPills = (event, { ref }) => {
		if (ref) {
			this.activeSelectedOptionRef = ref;
			this.activeSelectedOptionRef.focus();
		}
	};

	handleSelect = (event, { selection, option }) => {
		let newSelection;
		const isSelected = this.isSelected({ selection, option });
		const singleSelectAndSelectedWasNotClicked =
			!this.props.multiple && !isSelected;
		const multiSelectAndSelectedWasNotClicked =
			this.props.multiple && !isSelected;

		if (singleSelectAndSelectedWasNotClicked) {
			newSelection = [option];
		} else if (multiSelectAndSelectedWasNotClicked) {
			newSelection = [...this.props.selection, option];
		} else {
			newSelection = reject(this.props.selection, option);
		}

		if (this.props.events.onSelect) {
			this.props.events.onSelect(event, { selection: newSelection });
		}

		this.handleClose();

		if (this.inputRef) {
			this.inputRef.focus();
		}
	};

	isSelected = ({ selection, option }) => !!find(selection, option);

	openDialog = () => {
		if (this.props.events.onRequestOpen) {
			this.props.events.onRequestOpen();
		} else {
			this.setState({
				isOpen: true,
			});
		}
	};

	requestOpenMenu = () => {
		const isInlineSingleSelectionAndIsNotSelected =
			!this.props.multiple &&
			this.props.selection.length === 0 &&
			this.props.variant === 'inline-listbox';

		if (
			isInlineSingleSelectionAndIsNotSelected ||
			this.props.multiple ||
			this.props.variant === 'readonly'
		) {
			this.openDialog();
		}
	};

	/**
	 * Combobox variant subrenders
	 * (these can probably be broken into function components
	 * if state is passed in as a prop)
	 */

	renderBase = ({ assistiveText, labels, props }) => (
		<div className="slds-form-element__control">
			<div className="slds-combobox_container">
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside',
						{
							'slds-is-open': this.getIsOpen(),
						},
						{
							'slds-has-error': props.errorText,
						},
						props.className
					)}
					aria-expanded={this.getIsOpen()}
					aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					// used on menu's listbox
					aria-owns={`${this.getId()}-listbox`} // eslint-disable-line jsx-a11y/aria-proptypes
					role="combobox"
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={`${this.getId()}-listbox`}
						aria-activedescendant={
							this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								: null
						}
						aria-describedby={this.getErrorId()}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							className: 'slds-combobox__form-element',
							role: 'none',
						}}
						iconRight={
							<InputIcon
								category="utility"
								name="search"
								title={labels.inputIconTitle}
							/>
						}
						id={this.getId()}
						onFocus={this.handleInputFocus}
						onBlur={this.handleInputBlur}
						onKeyDown={this.handleKeyDown}
						inputRef={this.setInputRef}
						onClick={() => {
							this.openDialog();
						}}
						onChange={this.handleInputChange}
						placeholder={labels.placeholder}
						readOnly={
							!!(props.predefinedOptionsOnly && this.state.activeOption)
						}
						required={props.required}
						role="textbox"
						value={
							props.predefinedOptionsOnly
								? (this.state.activeOption && this.state.activeOption.label) ||
									props.value
								: props.value
						}
					/>
					{this.getDialog({
						menuRenderer: this.renderMenu({ assistiveText, labels }),
					})}
				</div>
			</div>
			<SelectedListBox
				activeOption={this.state.activeSelectedOption}
				activeOptionIndex={this.state.activeSelectedOptionIndex}
				assistiveText={assistiveText}
				events={{
					onBlurPill: this.handleBlurPill,
					onClickPill: this.handlePillClickListboxOfPills,
					onRequestFocus: this.handleRequestFocusListboxOfPills,
					onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
					onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
					onRequestRemove: this.handleRemoveSelectedOption,
				}}
				id={this.getId()}
				labels={labels}
				selection={props.selection}
				listboxHasFocus={this.state.listboxHasFocus}
			/>
			{props.errorText && (
				<div className="slds-has-error">
					<div
						id={this.getErrorId()}
						className="slds-form-element__help slds-has-error"
					>
						{props.errorText}
					</div>
				</div>
			)}
		</div>
	);

	renderInlineMultiple = ({ assistiveText, labels, props }) => (
		<div className="slds-form-element__control">
			<div
				className={classNames('slds-combobox_container', {
					'slds-has-inline-listbox': props.selection.length,
				})}
			>
				{props.selection.length ? (
					<SelectedListBox
						activeOption={this.state.activeSelectedOption}
						activeOptionIndex={this.state.activeSelectedOptionIndex}
						assistiveText={assistiveText}
						events={{
							onBlurPill: this.handleBlurPill,
							onClickPill: this.handlePillClickListboxOfPills,
							onRequestFocus: this.handleRequestFocusListboxOfPills,
							onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
							onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
							onRequestRemove: this.handleRemoveSelectedOption,
						}}
						id={this.getId()}
						labels={labels}
						selection={props.selection}
						listboxHasFocus={this.state.listboxHasFocus}
					/>
				) : null}
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside',
						{
							'slds-is-open': this.getIsOpen(),
						},
						{
							'slds-has-error': props.errorText,
						},
						props.className
					)}
					aria-expanded={this.getIsOpen()}
					aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					role="combobox"
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={`${this.getId()}-listbox`}
						aria-activedescendant={
							this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								: null
						}
						aria-describedby={this.getErrorId()}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							'aria-expanded': this.getIsOpen(),
							'aria-haspopup': 'listbox',
							className: 'slds-combobox__form-element',
							role: 'none',
						}}
						iconRight={
							<InputIcon
								category="utility"
								name="search"
								title={labels.inputIconTitle}
							/>
						}
						id={this.getId()}
						onFocus={this.handleInputFocus}
						onBlur={this.handleInputBlur}
						onKeyDown={this.handleKeyDown}
						inputRef={this.setInputRef}
						onClick={() => {
							this.openDialog();
						}}
						onChange={this.handleInputChange}
						placeholder={labels.placeholder}
						readOnly={
							!!(props.predefinedOptionsOnly && this.state.activeOption)
						}
						required={props.required}
						role="textbox"
						value={
							props.predefinedOptionsOnly
								? (this.state.activeOption && this.state.activeOption.label) ||
									props.value
								: props.value
						}
					/>
					{this.getDialog({
						menuRenderer: this.renderMenu({ assistiveText, labels }),
					})}
					{props.errorText && (
						<div id={this.getErrorId()} className="slds-form-element__help">
							{props.errorText}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	renderInlineSingle = ({ assistiveText, labels, props }) => {
		const iconLeft =
			props.selection[0] && props.selection[0].icon
				? React.cloneElement(props.selection[0].icon, {
					containerClassName: 'slds-combobox__input-entity-icon',
				})
				: null;

		const value =
			props.selection[0] && props.selection[0].label
				? props.selection[0].label
				: props.value;

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div className="slds-form-element__control">
				<div
					className={classNames('slds-combobox_container', {
						'slds-has-inline-listbox': props.selection.length,
					})}
				>
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': this.getIsOpen(),
							},
							{
								'slds-has-error': props.errorText,
							},
							props.className
						)}
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
						role="combobox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={`${this.getId()}-listbox`}
							aria-activedescendant={
								this.state.activeOption
									? `${this.getId()}-listbox-option-${
										this.state.activeOption.id
									}`
									: null
							}
							aria-describedby={this.getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							iconRight={
								props.selection.length ? (
									<InputIcon
										assistiveText={{
											icon: assistiveText.removeSingleSelectedOption,
										}}
										buttonRef={(component) => {
											this.buttonRef = component;
										}}
										category="utility"
										iconPosition="right"
										name="close"
										onClick={(event) => {
											this.handleRemoveSelectedOption(event, {
												option: props.selection[0],
											});
										}}
									/>
								) : (
									<InputIcon category="utility" name="search" />
								)
							}
							iconLeft={iconLeft}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={this.setInputRef}
							onClick={() => {
								this.requestOpenMenu();
							}}
							onChange={(event) => {
								if (!props.selection.length) {
									this.handleInputChange(event);
								}
							}}
							placeholder={labels.placeholder}
							readOnly={
								!!(props.predefinedOptionsOnly && this.state.activeOption) ||
								!!props.selection.length
							}
							required={props.required}
							role="textbox"
							value={
								props.predefinedOptionsOnly
									? (this.state.activeOption &&
											this.state.activeOption.label) ||
										props.value
									: value
							}
						/>
						{this.getDialog({
							menuRenderer: this.renderMenu({ assistiveText, labels }),
						})}
						{props.errorText && (
							<div id={this.getErrorId()} className="slds-form-element__help">
								{props.errorText}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	renderMenu = ({ assistiveText, labels }) => {
		const menuVariant = {
			base: 'icon-title-subtitle',
			'inline-listbox': 'icon-title-subtitle',
			readonly: 'checkbox',
		};

		return (
			<Menu
				assistiveText={assistiveText}
				activeOption={this.state.activeOption}
				activeOptionIndex={this.state.activeOptionIndex}
				classNameMenu={this.props.classNameMenu}
				classNameMenuSubHeader={this.props.classNameMenuSubHeader}
				inheritWidthOf={this.props.inheritWidthOf}
				inputId={this.getId()}
				inputValue={this.props.value}
				isSelected={this.isSelected}
				itemVisibleLength={
					this.props.variant === 'readonly'
						? this.props.readOnlyMenuItemVisibleLength
						: null
				}
				labels={labels}
				menuItem={this.props.menuItem}
				menuPosition={this.props.menuPosition}
				maxWidth={this.props.menuMaxWidth}
				options={this.props.options}
				onSelect={this.handleSelect}
				clearActiveOption={this.clearActiveOption}
				selection={this.props.selection}
				variant={menuVariant[this.props.variant]}
			/>
		);
	};

	renderReadOnlyMultiple = ({ assistiveText, labels, props }) => {
		const value =
			props.selection.length > 1
				? labels.multipleOptionsSelected ||
					`${props.selection.length} options selected`
				: (props.selection[0] && props.selection[0].label) || '';

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': this.getIsOpen(),
							},
							{
								'slds-has-error': props.errorText,
							},
							props.className
						)}
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
						role="combobox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={`${this.getId()}-listbox`}
							aria-activedescendant={
								this.state.activeOption
									? `${this.getId()}-listbox-option-${
										this.state.activeOption.id
									}`
									: null
							}
							aria-describedby={this.getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								'aria-expanded': this.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							iconRight={
								<InputIcon category="utility" name="down" variant="combobox" />
							}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={this.setInputRef}
							onClick={() => {
								this.requestOpenMenu();
							}}
							onChange={(event) => {
								if (!props.selection.length) {
									this.handleInputChange(event);
								}
							}}
							placeholder={labels.placeholderReadOnly}
							readOnly
							required={props.required}
							role="textbox"
							value={value}
						/>
						{this.getDialog({
							menuRenderer: this.renderMenu({ assistiveText, labels }),
						})}
					</div>
				</div>
				<SelectedListBox
					activeOption={this.state.activeSelectedOption}
					activeOptionIndex={this.state.activeSelectedOptionIndex}
					assistiveText={assistiveText}
					events={{
						onBlurPill: this.handleBlurPill,
						onClickPill: this.handlePillClickListboxOfPills,
						onRequestFocus: this.handleRequestFocusListboxOfPills,
						onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
						onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
						onRequestRemove: this.handleRemoveSelectedOption,
					}}
					id={this.getId()}
					labels={labels}
					selection={props.selection}
					listboxHasFocus={this.state.listboxHasFocus}
					variant={this.props.variant}
					renderAtSelectionLength={2}
				/>
				{props.errorText && (
					<div className="slds-has-error">
						<div
							id={this.getErrorId()}
							className="slds-form-element__help slds-has-error"
						>
							{props.errorText}
						</div>
					</div>
				)}
			</div>
		);
	};

	renderReadOnlySingle = ({ assistiveText, labels, props }) => {
		const value = (props.selection[0] && props.selection[0].label) || '';

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div // aria attributes have been moved to the `div` wrapping `input` to comply with ARIA 1.1.
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': this.getIsOpen(),
							},
							{
								'slds-has-error': props.errorText,
							},
							props.className
						)}
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
						role="combobox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={`${this.getId()}-listbox`}
							aria-activedescendant={
								this.state.activeOption
									? `${this.getId()}-listbox-option-${
										this.state.activeOption.id
									}`
									: null
							}
							aria-describedby={this.getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								'aria-expanded': this.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							iconRight={
								<InputIcon category="utility" name="down" variant="combobox" />
							}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={this.setInputRef}
							onClick={() => {
								this.requestOpenMenu();
							}}
							onChange={(event) => {
								if (!props.selection.length) {
									this.handleInputChange(event);
								}
							}}
							placeholder={labels.placeholderReadOnly}
							readOnly
							required={props.required}
							role="textbox"
							value={
								(this.state.activeOption && this.state.activeOption.label) ||
								value
							}
						/>
						{this.getDialog({
							menuRenderer: this.renderMenu({ assistiveText, labels }),
						})}
						{props.errorText && (
							<div id={this.getErrorId()} className="slds-form-element__help">
								{props.errorText}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	render () {
		const props = this.props;
		// Merge objects of strings with their default object
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);

		const subRenderParameters = { assistiveText, labels, props: this.props };
		const multipleOrSingle = this.props.multiple ? 'multiple' : 'single';
		const subRenders = {
			base: {
				multiple: this.renderBase, // same
				single: this.renderBase,
			},
			'inline-listbox': {
				multiple: this.renderInlineMultiple,
				single: this.renderInlineSingle,
			},
			readonly: {
				multiple: this.renderReadOnlyMultiple,
				single: this.renderReadOnlySingle,
			},
		};
		const variantExists = subRenders[this.props.variant][multipleOrSingle];

		return (
			<div
				className={classNames('slds-form-element', props.classNameContainer)}
			>
				<Label
					assistiveText={this.props.assistiveText}
					htmlFor={this.getId()}
					label={labels.label}
					required={props.required}
				/>
				{variantExists
					? subRenders[this.props.variant][multipleOrSingle](
						subRenderParameters
					)
					: subRenders.base.multiple(subRenderParameters)}
			</div>
		);
	}
}
/* eslint-enable jsx-a11y/role-supports-aria-props */

Combobox.contextTypes = {
	iconPath: PropTypes.string,
};

Combobox.displayName = COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export default Combobox;
