/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '../utilities/dialog';
import InnerInput from '../../components/forms/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Menu from './private/menu';
import Label from '../forms/private/label';
import SelectedListBox from './private/selected-listbox';

import assign from 'lodash.assign';
import find from 'lodash.find';
import reject from 'lodash.reject';
import isEqual from 'lodash.isequal';

import { shape } from 'airbnb-prop-types';

import isBoolean from 'lodash.isboolean';
import isFunction from 'lodash.isfunction';

import classNames from 'classnames';

import shortid from 'shortid';

import KEYS from '../../utilities/key-code';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

import { COMBOBOX } from '../../utilities/constants';

let currentOpenDropdown;

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `removePill`: Aids in keyboard interaction with Pills.
	 */
	assistiveText: shape({
		listboxLabel: PropTypes.string,
		label: PropTypes.string,
		optionSelectedInMenu: PropTypes.string,
		removeSingleSelectedOption: PropTypes.string,
		removePill: PropTypes.string
	}),
	/**
	 * CSS classes to be added to tag with `slds-combobox`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Disable input and calendar.
	 */
	disabled: PropTypes.bool,
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
	 */
	events: shape({
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onClose: PropTypes.func,
		onFocus: PropTypes.func,
		onOpen: PropTypes.func,
		onRequestClose: PropTypes.func,
		onRequestOpen: PropTypes.func,
		onRequestRemoveSelectedOption: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func
	}),
	/**
	 * HTML id for component
	 */
	id: PropTypes.string,
	/**
	 * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
	 */
	isInline: PropTypes.bool,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: This label appears above the input.
	 * * `multipleOptionsSelected`: This label is used by the readonly variant when multiple options are selected. The default is `${props.selection.length} options selected`. This will override the entire string.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 * * `placeholder`: Input placeholder
	 * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
	 * * `removePillTitle`: Title on `X` icon
	 */
	labels: shape({
		label: PropTypes.string,
		multipleOptionsSelected: PropTypes.string,
		noOptionsFound: PropTypes.string,
		placeholder: PropTypes.string,
		placeholderReadOnly: PropTypes.string,
		removePillTitle: PropTypes.string
	}),
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 */
	isOpen: PropTypes.bool,
	/**
	 * Allows multiple selections
	 */
	multiple: PropTypes.bool,
	/**
	 * Item added to the dropdown menu.
	 */
	options: PropTypes.array.isRequired,
	/**
	 * Limits auto-complete input submission to one of the provided options.
	 */
	predefinedOptionsOnly: PropTypes.bool,
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object.
	 */
	selection: PropTypes.array,
	/**
	 * Value of input. This is a controlled component, so you will need to control the input value.
	 */
	value: PropTypes.string,
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'readonly'])
};

const defaultProps = {
	assistiveText: {
		listboxLabel: 'Selected Options:',
		optionSelectedInMenu: 'Current Selection:',
		removeSingleSelectedOption: 'Remove selected option',
		removePill: ', Press delete or backspace to remove'
	},
	events: {},
	labels: {
		noOptionsFound: 'No matches found.',
		placeholderReadOnly: 'Select an Option',
		removePillTitle: 'Remove'
	},
	selection: [],
	variant: 'base'
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
			activeSelectedOption: (this.props.selection && this.props.selection[0])
				|| undefined,
			activeSelectedOptionIndex: 0
		};
	}

	/**
 	 * Lifecycle methods
   */

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	componentWillReceiveProps (nextProps, prevProps) {
		// clears activeOption if it is no longer in the options list
		// if it's in the options list then find the index and set activeOptionIndex
		// this will maintain the active highlight even when the options change
		if (!isEqual(prevProps.options, nextProps.options)) {
			const index = nextProps.options.findIndex((item) => isEqual(item, this.state.activeOption));
			if (index !== -1) {
				this.setState({ activeOptionIndex: index });
			} else {
				this.setState({ activeOption: undefined, activeOptionIndex: -1 });
			}
		}
	}

	componentWillUnmount () {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
	}

	/**
 	 * Shared class getter methods
   */

	getId = () => this.props.id || this.generatedId;
	
	getIsOpen = () => !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);

	getIsActiveOption = () => this.state.activeOption && this.state.activeOptionIndex !== -1;

	getNewActiveOptionIndex = ({ activeOptionIndex,
		offset,
		options }) => {
		// used by menu listbox and selected options listbox
		const newIndex = activeOptionIndex + offset;
		const hasNewIndex = options.length > newIndex && newIndex >= 0;
		return hasNewIndex ? newIndex : activeOptionIndex;
	}

	isSelected = ({ selection, option }) => !!find(selection, option);

	/**
 	 * Menu open/close and sub-render methods
   */

	handleClickOutside = () => {
		this.handleRequestClose();
	}

	handleRequestClose = () => {
		if (this.props.events.onRequestClose) {
			this.props.events.onRequestClose();
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false });
		}
	}

	openDialog = () => {
		if (this.props.events.onRequestOpen) {
			this.props.events.onRequestOpen();
		} else {
			this.setState({
				isOpen: true
			});
		}
	}

	handleClose = () => {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}

			this.setState({
				activeOption: undefined,
				activeOptionIndex: -1,
				isOpen: false
			});

			if (this.props.events.onClose) {
				this.props.events.onClose();
			}
		}
	}

	handleOpen = () => {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}

			currentOpenDropdown = this;

			this.setState({
				isOpen: true
			});

			if (this.props.events.onOpen) {
				this.props.events.onOpen();
			}
		}

		if (this.props.events.onOpen) {
			this.props.events.onOpen();
		}

		// highlight first option
	}

	requestOpenMenu = () => {
		const isInlineSingleSelectionAndIsNotSelected = !this.props.multiple
			&& this.props.selection.length === 0
			&& this.props.variant !== 'readonly';

		if (isInlineSingleSelectionAndIsNotSelected || this.props.multiple) {
			this.openDialog();
		}
	}

	getInlineMenu ({ menuRenderer }) {
		return !this.props.disabled && this.getIsOpen()
		? menuRenderer
		: null;
	}

	getDialog ({ menuRenderer }) {
		return !this.props.disabled && this.getIsOpen()
			? <Dialog
				constrainToScrollParent
				flippable
				horizontalAlign="left"
				inheritTargetWidth
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				targetElement={this.inputRef}
			>
				{menuRenderer}
			</Dialog>
			: null;
	}

	renderMenu = ({ assistiveText, labels }) => {
		const menuVariant = {
			base: 'icon-title-subtitle',
			'inline-listbox': 'icon-title-subtitle',
			readonly: 'checkbox'
		};

		return (
			<Menu
				assistiveText={assistiveText}
				activeOption={this.state.activeOption}
				activeOptionIndex={this.state.activeOptionIndex}
				labels={labels}
				inputId={this.getId()}
				inputValue={this.props.value}
				isSelected={this.isSelected}
				options={this.props.options}
				// optionsRenderer={this.props.optionsRenderer}
				onSelect={this.handleSelect}
				clearActiveOption={this.clearActiveOption}
				selection={this.props.selection}
				variant={menuVariant[this.props.variant]}
			/>
		);
	}

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
				[KEYS.UP]: { callback: this.handleKeyDownUp }
			}
		});
	}

	handleNavigateListboxMenu = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		// takes current/previous state and returns an object with the new state
		this.setState((prevState) => {
			const newIndex = this.getNewActiveOptionIndex({
				activeOptionIndex: prevState.activeOptionIndex,
				offset: offsets[direction],
				options: this.props.options
			});

			return {
				activeOption: this.props.options[newIndex],
				activeOptionIndex: newIndex
			};
		});
	};

	handleSelect = (event, { selection, option }) => {
		let newSelection;

		if (!this.props.multiple) {
			newSelection = [option];
		} else if (!this.isSelected({ selection, option })) {
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
	}

	handleKeyDownDown = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}

		this.handleNavigateListboxMenu(event, { direction: 'next' });
	}

	handleKeyDownUp = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey && this.state.isOpen) {
			this.handleNavigateListboxMenu(event, { direction: 'previous' });
		}
	}

	handleInputSubmit = (event) => {
		if (this.getIsActiveOption()) {
			this.handleSelect(event, { option: this.state.activeOption });
			// needs testing
		} else if (this.props.events.onSubmit) {
			this.props.events.onSubmit(event, {
				value: event.target.value
			});
		}
	}

	handleInputChange = (event) => {
		this.requestOpenMenu();
		this.props.events.onChange(event, { value: event.target.value });
	}

	handleInputFocus = (event) => {
		if (this.props.events.onFocus) {
			this.props.events.onFocus(event);
		}
	}

	handleInputBlur = (event) => {
		// If menu is open when the input's onBlur event fires, it will close before the onClick of the menu item can fire.
		setTimeout(() => { this.handleClose(); }, 200);

		if (this.props.events.onBlur) {
			this.props.events.onBlur(event);
		}
	}

	/**
 	 * Selected options with listbox of pills event methods
   */

	handleRemoveSelectedOption = (event, { option, index }) => {
		const onlyOnePillAndInputExists = this.props.selection.length === 1;
		const isReadOnlyAndTwoPillsExists = this.props.selection.length === 2
			&& this.props.variant === 'readonly'
			&& this.props.multiple;
		const lastPillWasRemoved = index + 1 === this.props.selection.length;

		if ((onlyOnePillAndInputExists || isReadOnlyAndTwoPillsExists)
			&& this.inputRef) {
			this.inputRef.focus();
		} else if (lastPillWasRemoved) {
			// set focus to previous option and index
			this.setState({
				activeSelectedOption: this.props.selection[index - 1],
				activeSelectedOptionIndex: index - 1,
				listboxHasFocus: true
			});
		} else {
			// set focus to next option, but same index
			this.setState({
				activeSelectedOption: this.props.selection[index + 1],
				activeSelectedOptionIndex: index,
				listboxHasFocus: true
			});
		}

		if (this.props.events.onRequestRemoveSelectedOption) {
			this.props.events.onRequestRemoveSelectedOption(event, {
				selection: reject(this.props.selection, option)
			});
		}
	}

	handlePillClickListboxOfPills = (event, { option, index }) => {
		// this is clicking the span, not the remove button
		this.setState({
			activeSelectedOption: option,
			activeSelectedOptionIndex: index,
			listboxHasFocus: true
		});
	}

	handleNavigateListboxOfPills = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		this.setState((prevState) => {
			const isLastOptionAndRightIsPressed =
				prevState.activeSelectedOptionIndex + 1 === this.props.selection.length
				&& direction === 'next';
			const isFirstOptionAndLeftIsPressed =
				prevState.activeSelectedOptionIndex === 0
				&& direction === 'previous';
			let newState;

			if (isLastOptionAndRightIsPressed) {
				newState = {
					activeSelectedOption: this.props.selection[0],
					activeSelectedOptionIndex: 0,
					listboxHasFocus: true
				};
			} else if (isFirstOptionAndLeftIsPressed) {
				newState = {
					activeSelectedOption: this.props.selection[this.props.selection.length - 1],
					activeSelectedOptionIndex: this.props.selection.length - 1,
					listboxHasFocus: true
				};
			} else {
				const newIndex = this.getNewActiveOptionIndex({
					activeOptionIndex: prevState.activeSelectedOptionIndex,
					offset: offsets[direction],
					options: this.props.selection
				});
				newState = {
					activeSelectedOption: this.props.selection[newIndex],
					activeSelectedOptionIndex: newIndex,
					listboxHasFocus: true
				};
			}

			return newState;
		});
	};

	handleOnRequestFocusListboxOfPills = (event, { ref }) => {
		if (ref) {
			this.activeSelectedOptionRef = ref;
			this.activeSelectedOptionRef.focus();
		}
	};

	handleBlurPill = () => {
		this.setState({ listboxHasFocus: false });
	}

	/**
 	 * Combobox variant renders
   */

	renderBase = ({ assistiveText, labels, props }) => (
		<div className="slds-form-element__control">
			<div className="slds-combobox_container">
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside', {
							'slds-is-open': this.getIsOpen()
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
						aria-activedescendant={this.state.activeOption
							? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
							:	null}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							'aria-expanded': this.getIsOpen(),
							'aria-haspopup': 'listbox',
							className: 'slds-combobox__form-element',
							role: 'none'
						}}
						disabled={props.disabled}
						iconRight={<InputIcon
							category="utility"
							name="search"
							title={labels.inputIconTitle}
						/>}
						id={this.getId()}
						onFocus={this.handleInputFocus}
						onBlur={this.handleInputBlur}
						onKeyDown={this.handleKeyDown}
						inputRef={(component) => { this.inputRef = component; }}
						onClick={() => {
							this.openDialog();
						}}
						onChange={this.handleInputChange}
						placeholder={labels.placeholder}
						readOnly={!!(props.predefinedOptionsOnly && this.state.activeOption)}
						role="textbox"
						value={props.predefinedOptionsOnly
							? (this.state.activeOption && this.state.activeOption.label)
								|| props.value
							: props.value}
					/>
					{props.isInline
						? this.getInlineMenu({ menuRenderer: this.renderMenu({ assistiveText, labels }) })
						: this.getDialog({ menuRenderer: this.renderMenu({ assistiveText, labels }) })}
				</div>
			</div>
			<SelectedListBox
				activeOption={this.state.activeSelectedOption}
				activeOptionIndex={this.state.activeSelectedOptionIndex}
				assistiveText={assistiveText}
				events={{
					onBlurPill: this.handleBlurPill,
					onClickPill: this.handlePillClickListboxOfPills,
					onRequestFocus: this.handleOnRequestFocusListboxOfPills,
					onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
					onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
					onRequestRemove: this.handleRemoveSelectedOption
				}}
				id={this.getId()}
				labels={labels}
				selection={props.selection}
				listboxHasFocus={this.state.listboxHasFocus}
			/>
		</div>
	);

	renderInlineSingle = ({ assistiveText, labels, props }) => {
		const iconLeft = props.selection[0] && props.selection[0].icon
			? React.cloneElement(props.selection[0].icon, {
				containerClassName: 'slds-combobox__input-entity-icon'
			})
			: null;

		const value = props.selection[0] && props.selection[0].label
									? props.selection[0].label
									: props.value;

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div className="slds-form-element__control">
				<div
					className={classNames(
						'slds-combobox_container', {
							'slds-has-inline-listbox': props.selection.length
						}
					)}
				>
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside', {
								'slds-is-open': this.getIsOpen()
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
							aria-activedescendant={this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								:	null}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								className: 'slds-combobox__form-element',
								role: 'none'
							}}
							disabled={props.disabled}
							iconRight={props.selection.length
								? <InputIcon
									assistiveText={assistiveText.removeSingleSelectedOption}
									buttonRef={(component) => { this.buttonRef = component; }}
									category="utility"
									iconPosition="right"
									name="close"
									onClick={(event) => {
										this.handleRemoveSelectedOption(event, { option: props.selection[0] });
									}}
								/>
								: <InputIcon
									category="utility"
									name="search"
								/>}
							iconLeft={iconLeft}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={(component) => { this.inputRef = component; }}
							onClick={() => {
								this.requestOpenMenu();
							}}
							onChange={(event) => {
								if (!props.selection.length) {
									this.handleInputChange(event);
								}
							}}
							placeholder={labels.placeholder}
							readOnly={!!(props.predefinedOptionsOnly && this.state.activeOption) || !!props.selection.length}
							role="textbox"
							value={props.predefinedOptionsOnly
								? (this.state.activeOption && this.state.activeOption.label)
									|| props.value
								: value}
						/>
						{props.isInline
							? this.getInlineMenu({ menuRenderer: this.renderMenu({
								assistiveText,
								labels
							}) })
							: this.getDialog({ menuRenderer: this.renderMenu({ assistiveText,
								labels
							}) })
						}
					</div>
				</div>
			</div>
		);
	}

	renderInlineMultiple = ({	assistiveText, labels, props }) => (
		<div className="slds-form-element__control">
			<div
				className={classNames(
					'slds-combobox_container', {
						'slds-has-inline-listbox': props.selection.length
					}
				)}
			>
				{props.selection.length
					? <SelectedListBox
						activeOption={this.state.activeSelectedOption}
						activeOptionIndex={this.state.activeSelectedOptionIndex}
						assistiveText={assistiveText}
						events={{
							onBlurPill: this.handleBlurPill,
							onClickPill: this.handlePillClickListboxOfPills,
							onRequestFocus: this.handleOnRequestFocusListboxOfPills,
							onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
							onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
							onRequestRemove: this.handleRemoveSelectedOption
						}}
						id={this.getId()}
						labels={labels}
						selection={props.selection}
						listboxHasFocus={this.state.listboxHasFocus}
					/>
					: null}
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside', {
							'slds-is-open': this.getIsOpen()
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
						aria-activedescendant={this.state.activeOption
							? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
							:	null}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							'aria-expanded': this.getIsOpen(),
							'aria-haspopup': 'listbox',
							className: 'slds-combobox__form-element',
							role: 'none'
						}}
						disabled={props.disabled}
						iconRight={<InputIcon
							category="utility"
							name="search"
							title={labels.inputIconTitle}
						/>}
						id={this.getId()}
						onFocus={this.handleInputFocus}
						onBlur={this.handleInputBlur}
						onKeyDown={this.handleKeyDown}
						inputRef={(component) => { this.inputRef = component; }}
						onClick={() => {
							this.openDialog();
						}}
						onChange={this.handleInputChange}
						placeholder={labels.placeholder}
						readOnly={!!(props.predefinedOptionsOnly && this.state.activeOption)}
						role="textbox"
						value={props.predefinedOptionsOnly
							? (this.state.activeOption && this.state.activeOption.label)
								|| props.value
							: props.value}
					/>
					{props.isInline
						? this.getInlineMenu({ menuRenderer: this.renderMenu({ assistiveText, labels }) })
						: this.getDialog({ menuRenderer: this.renderMenu({ assistiveText, labels }) })}
				</div>
			</div>
		</div>
	);

	renderReadOnlySingle = ({	assistiveText, labels, props }) => {
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
							'ignore-react-onclickoutside', {
								'slds-is-open': this.getIsOpen()
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
							aria-activedescendant={this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								:	null}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								'aria-expanded': this.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none'
							}}
							disabled={props.disabled}
							iconRight={<InputIcon
								category="utility"
								name="down"
								variant="combobox"
							/>}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={(component) => { this.inputRef = component; }}
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
							role="textbox"
							value={(this.state.activeOption && this.state.activeOption.label)
								|| value}
						/>
						{props.isInline
							? this.getInlineMenu({ menuRenderer: this.renderMenu({ assistiveText, labels }) })
							: this.getDialog({ menuRenderer: this.renderMenu({ assistiveText, labels }) })}
					</div>
				</div>
			</div>
		);
	}

	renderReadOnlyMultiple = ({ assistiveText, labels, props }) => {
		const value = props.selection.length > 1
			? labels.multipleOptionsSelected || `${props.selection.length} options selected`
			: ((props.selection[0] && props.selection[0].label) || '');

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside', {
								'slds-is-open': this.getIsOpen()
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
							aria-activedescendant={this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								:	null}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								'aria-expanded': this.getIsOpen(),
								'aria-haspopup': 'listbox',
								className: 'slds-combobox__form-element',
								role: 'none'
							}}
							disabled={props.disabled}
							iconRight={<InputIcon
								category="utility"
								name="down"
								variant="combobox"
							/>}
							id={this.getId()}
							onFocus={this.handleInputFocus}
							onBlur={this.handleInputBlur}
							onKeyDown={this.handleKeyDown}
							inputRef={(component) => { this.inputRef = component; }}
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
							role="textbox"
							value={value}
						/>
						{props.isInline
							? this.getInlineMenu({ menuRenderer: this.renderMenu({ assistiveText, labels }) })
							: this.getDialog({ menuRenderer: this.renderMenu({ assistiveText, labels }) })}
					</div>
				</div>
				{props.selection.length > 1 ? <SelectedListBox
					activeOption={this.state.activeSelectedOption}
					activeOptionIndex={this.state.activeSelectedOptionIndex}
					assistiveText={assistiveText}
					events={{
						onBlurPill: this.handleBlurPill,
						onClickPill: this.handlePillClickListboxOfPills,
						onRequestFocus: this.handleOnRequestFocusListboxOfPills,
						onRequestFocusOnNextPill: this.handleNavigateListboxOfPills,
						onRequestFocusOnPreviousPill: this.handleNavigateListboxOfPills,
						onRequestRemove: this.handleRemoveSelectedOption
					}}
					id={this.getId()}
					labels={labels}
					selection={props.selection}
					listboxHasFocus={this.state.listboxHasFocus}
					variant={this.props.variant}
				/>
				: null}
			</div>
		);
	}

	render () {
		const props = this.props;
		// Merge objects of strings with their default object
		const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
		const labels = assign({}, defaultProps.labels, props.labels);

		const subRenderParameters = { assistiveText, labels, props };
		const multipleOrSingle = this.props.multiple ? 'multiple' : 'single';
		const subRenders = {
			base: {
				multiple: this.renderBase,	// same
				single: this.renderBase
			},
			'inline-listbox': {
				multiple: this.renderInlineMultiple,
				single: this.renderInlineSingle
			},
			readonly: {
				multiple: this.renderReadOnlyMultiple,
				single: this.renderReadOnlySingle
			}
		};
		const variantExists = subRenders[this.props.variant][multipleOrSingle];

		return (
			<div
				className="slds-form-element"
			>
				<Label
					assistiveText={props.assistiveText.label}
					htmlFor={this.getId()}
					label={labels.label}
				/>
				{
					variantExists
				? subRenders[this.props.variant][multipleOrSingle](subRenderParameters)
				: subRenders.base.multiple(subRenderParameters)}
			</div>
		);
	}
}
/* eslint-enable jsx-a11y/role-supports-aria-props */

Combobox.displayName = COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export default Combobox;
