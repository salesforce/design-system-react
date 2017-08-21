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
		removeSingleSelectedOption: PropTypes.string,
		removePill: PropTypes.string
	}),
	/**
	 * Pass in an `<Input />` component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.` _Tested with Mocha framework._
	 */
	children: PropTypes.node,
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
	 * Renders selected listbox items within the `input`.
	 */
	isInlineListbox: PropTypes.bool,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: This label appears above the input.
	 * * `placeholder`: Input placeholder
	 * * `removePillTitle`: Title on `X` icon
	 */
	labels: shape({
		label: PropTypes.string,
		placeholderReadOnly: PropTypes.string,
		placeholder: PropTypes.string,
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
		removeSingleSelectedOption: 'Remove selected option',
		removePill: ', Press delete or backspace to remove'
	},
	events: {},
	labels: {
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
			activeOptionIndex: -1
		};
	}

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

	getId = () => this.props.id || this.generatedId;
	
	getIsOpen = () => !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);

	getIsActiveOption = () => this.state.activeOption && this.state.activeOptionIndex !== -1;

	handleClickOutside = () => {
		this.handleRequestClose();
	}

	componentWillUnmount () {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
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

	getNewActiveOptionIndex = ({ activeOptionIndex,
		offset,
		options }) => {
		const newIndex = activeOptionIndex + offset;
		const hasNewIndex = options.length > newIndex && newIndex >= 0;
		return hasNewIndex ? newIndex : activeOptionIndex;
	}

	handleKeyDownDown = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}

		// takes current/previous state and returns an object with the new state
		this.setState((prevState) => ({
			activeOption: this.props.options[this.getNewActiveOptionIndex({
				activeOptionIndex: prevState.activeOptionIndex,
				offset: 1,
				options: this.props.options
			})],
			activeOptionIndex: this.getNewActiveOptionIndex({
				activeOptionIndex: prevState.activeOptionIndex,
				offset: 1,
				options: this.props.options
			})
		}));
	}

	handleKeyDownUp = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey && this.state.isOpen) {
			this.setState(
				(prevState) => ({
					activeOption: this.props.options[this.getNewActiveOptionIndex({
						activeOptionIndex: prevState.activeOptionIndex,
						offset: -1,
						options: this.props.options
					})],
					activeOptionIndex: this.getNewActiveOptionIndex({
						activeOptionIndex: prevState.activeOptionIndex,
						offset: -1,
						options: this.props.options
					})
				})
			);
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

	isSelected = ({ selection, option }) => !!find(selection, option);

	handleSelect = (event, { option }) => {
		let selection;

		if (!this.isSelected({ selection, option })) {
			selection = [...this.props.selection, option];
		} else {
			selection = reject(this.props.selection, option);
		}

		if (this.props.events.onSelect) {
			this.props.events.onSelect(event, { selection });
		}

		this.handleClose();
	}

	requestOpenMenu = () => {
		if (this.props.multiple
			|| (!this.props.multiple && this.props.selection.length === 0)) {
			this.openDialog();
		}
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

	renderMenu = () => (
		<Menu
			activeOption={this.state.activeOption}
			activeOptionIndex={this.state.activeOptionIndex}
			emptyMessage={this.props.emptyMessage}
			inputId={this.getId()}
			inputValue={this.props.value}
			options={this.props.options}
			optionsRenderer={this.props.optionsRenderer}
			onSelect={this.handleSelect}
			clearActiveOption={this.clearActiveOption}
			selection={this.props.selection}
			variant={`combobox-${this.props.variant}`}
		/>
	);

	handleRemoveSelectedOption = (event, { option }) => {
		if (this.inputRef) {
			this.inputRef.focus();
		}

		if (this.props.events.onRequestRemoveSelectedOption) {
			this.props.events.onRequestRemoveSelectedOption(event, { selection: reject(this.props.selection, option) });
		}
	}

	handleInputChange = (event) => {
		this.requestOpenMenu();
		this.props.events.onChange(event, { value: event.target.value });
	}

	renderInlineSingle = ({
		assistiveText,
		labels,
		props
	}) => {
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
								role: 'combobox'
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
							readOnly={!!props.selection.length}
							role="textbox"
							value={value}
						/>
						{props.isInline
							? this.getInlineMenu({ menuRenderer: this.renderMenu({ labels }) })
							: this.getDialog({ menuRenderer: this.renderMenu({ labels }) })}
					</div>
				</div>
			</div>
		);
	}

	renderInlineMultiple = ({
		assistiveText,
		labels,
		props
	}) => (
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
						assistiveText={assistiveText}
						id={this.getId()}
						isInline
						labels={labels}
						selection={props.selection}
						events={{
							onRequestRemove: this.handleRemoveSelectedOption
						}}
					/>
					: null}
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
							role: 'combobox'
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
						role="textbox"
						value={props.value}
					/>
					{props.isInline
						? this.getInlineMenu({ menuRenderer: this.renderMenu({ labels }) })
						: this.getDialog({ menuRenderer: this.renderMenu({ labels }) })}
				</div>
			</div>
		</div>
	);

	renderBase = ({
		assistiveText,
		labels,
		props
	}) => (
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
							role: 'combobox'
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
						role="textbox"
						value={props.value}
					/>
					{props.isInline
						? this.getInlineMenu({ menuRenderer: this.renderMenu({ labels }) })
						: this.getDialog({ menuRenderer: this.renderMenu({ labels }) })}
				</div>
			</div>
			<SelectedListBox
				assistiveText={assistiveText}
				events={{
					onRequestRemove: this.handleRemoveSelectedOption
				}}
				id={this.getId()}
				labels={labels}
				selection={props.selection}
			/>
		</div>
	);

	renderReadOnlySingle = ({
		labels,
		props
	}) => {
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
								role: 'combobox'
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
							? this.getInlineMenu({ menuRenderer: this.renderMenu({ labels }) })
							: this.getDialog({ menuRenderer: this.renderMenu({ labels }) })}
					</div>
				</div>
			</div>
		);
	}

	render () {
		const props = this.props;

		// Merge objects of strings with their default object
		const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
		const labels = assign({}, defaultProps.labels, props.labels);
		const subRenders = {
			base: {
				single: this.renderBase,
				multiple: this.renderBase	// same
			},
			'inline-listbox': {
				single: this.renderInlineSingle,
				multiple: this.renderInlineMultiple
			},
			readonly: {
				single: this.renderReadOnlySingle,
				multiple: this.renderReadOnlyMultiple
			}
		};
		const variantExists = subRenders[this.props.variant][this.props.multiple ? 'multiple' : 'single'];

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
				? subRenders[this.props.variant][this.props.multiple ? 'multiple' : 'single']({
					assistiveText,
					labels,
					props
				})
				: subRenders.base.multiple({
					assistiveText,
					labels,
					props
				})}
			</div>
		);
	}
}
/* eslint-enable jsx-a11y/role-supports-aria-props */

Combobox.displayName = COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export default Combobox;
