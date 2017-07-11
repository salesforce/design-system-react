/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '../utilities/dialog';
import InnerInput from '../../components/forms/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Icon from '../icon';
import Menu from './private/menu';

import assign from 'lodash.assign';

import { shape } from 'airbnb-prop-types';

import isBoolean from 'lodash.isboolean';
import isFunction from 'lodash.isfunction';

import classNames from 'classnames';

import shortid from 'shortid';

import KEYS from '../../utilities/key-code';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';

import { COMBOBOX } from '../../utilities/constants';

let currentOpenDropdown;

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */
const defaultFilter = (term, item) => {
	if (!term) return true;
	return (item.data && item.data.type === 'section') || item.label.match(new RegExp(escapeRegExp(term), 'ig'));
};

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * ``:
	 */
	// assistiveText: shape({
	// }),
	/**
	 * Pass in an `<Input />` component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.` _Tested with Mocha framework._
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Disable input and calendar.
	 */
	disabled: PropTypes.bool,
	/**
	 * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
	 */
	filterWith: PropTypes.func,
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
	 */
	labels: shape({
		label: PropTypes.string
	}),
	/**
	 * Allows multiple selections
	 */
	multiple: PropTypes.bool,
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 */
	isOpen: PropTypes.bool,
	onChange: PropTypes.func,
	/**
	 * Triggered when the menu is closed.
	 */
	onClose: PropTypes.func,
	/**
	 * Triggered when the calendar has opened.
	 */
	onOpen: PropTypes.func,
	/**
	 * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`.
	 */
	onRequestClose: PropTypes.func,
	/**
	 * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`.
	 */
	onRequestOpen: PropTypes.func,
	/**
	 * Function called when a single selection option is to be removed.
	 */
	onRequestRemoveSelectedOption: PropTypes.func,
	/**
	 * Function called when a menu item is selected
	 */
	onSelect: PropTypes.func,
	/**
	 * Item added to the dropdown menu.
	 */
	options: PropTypes.array.isRequired,
	/**
	 * This prevents typing in the input. The default is auto-complete (or not read-only). Setting to true will creata a Picklist.
	 */
	readOnlyInput: PropTypes.bool,
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object.
	 */
	selection: PropTypes.array,
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	variant: PropTypes.oneOf(['base'])
};

const defaultProps = {
	assistiveText: {},
	labels: {},
	filterWith: defaultFilter,
	focusedOption: null,
	selection: [],
	variant: 'base'
};

/**
 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-defined options.
 */
class Combobox extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	getId = () => this.props.id || this.generatedId;
	
	getIsOpen = () => !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);

	handleClickOutside = () => {
		this.handleRequestClose();
	}

	componentWillUnmount () {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
	}

	handleRequestClose = () => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false });
		}

		if (this.inputRef) {
			this.inputRef.focus();
		}
	}

	openDialog = () => {
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({
				isOpen: true
			});
		}
	}

	handleSelectDay = (event, data) => {
		const newDaysInMonth = data.selected
			? this.state.selectedDaysInMonthFromCalendar.filter((item) => item.day !== data.day)
			: this.state.selectedDaysInMonthFromCalendar.concat(data);
		this.setState({ selectedDaysInMonthFromCalendar: newDaysInMonth });
	};

	handleClose = () => {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}

			this.setState({
				isOpen: false
			});

			if (this.props.onClose) {
				this.props.onClose();
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

			if (this.props.onOpen) {
				this.props.onOpen();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen();
		}

		// this.selectedDayCell.focus();
	}

	getInlineMenu ({ menuRenderer }) {
		return !this.props.disabled && this.getIsOpen()
		? <div
			className={classNames('slds-datepicker',
				'slds-dropdown',
				'slds-dropdown--left')}
		>
			{menuRenderer}
		</div>
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
				[KEYS.ENTER]: { callback: this.handleInputSubmit },
				[KEYS.DOWN]: { callback: this.handleKeyDownDown }
			}
		});
	}

	handleKeyDownDown = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}
	}

	handleInputSubmit = (event) => {
		// test if valid number
		if (this.props.onInputSubmit) {
			this.props.onInputSubmit(event, {
				value: event.target.value
			});
		}
		// clear input
		this.inputRef.value = '';
	}

	handleSelect = (event, data) => {
		this.handleClose();

		if (this.props.onSelect) {
			this.props.onSelect(event, data);
		}
	}

	renderMenu = () => {
		return (
			<Menu
				emptyMessage={this.props.emptyMessage}
				options={this.props.options}
				optionsRenderer={this.props.optionsRenderer}
				onSelect={this.handleSelect}
				selection={this.props.selection}
			/>
		);
	}

	handleRemoveSelectedOption = (event) => {
		if (this.props.onRequestRemoveSelectedOption) {
			this.props.onRequestRemoveSelectedOption(event, { option: this.props.selection[0] });
		}
	}

	render () {
		const props = this.props;

		// Merge objects of strings with their default object
		const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
		const labels = assign({}, defaultProps.labels, props.labels);

		const iconLeft = this.props.selection[0] && this.props.selection[0].icon
			? React.cloneElement(this.props.selection[0].icon, {
				containerClassName: 'slds-combobox__input-entity-icon'
			})
			: null;

		const value = this.props.selection[0] && this.props.selection[0].label
									? this.props.selection[0].label
									: this.props.value;

		/* eslint-disable jsx-a11y/role-supports-aria-props */
		return (
			<div
				className="slds-form-element"
			>
				<label className="slds-form-element__label" htmlFor="combobox-unique-id">Search</label>
				<div className="slds-form-element__control">
					<div
						className={classNames(
							'slds-combobox_container', {
								'slds-has-inline-listbox': this.props.selection.length
							}
						)}
					>
						<div
							className={classNames(
								'slds-combobox',
								'slds-dropdown-trigger',
								'slds-dropdown-trigger--click',
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
								aria-controls="listbox-unique-id"
								className="slds-combobox__input"
								containerClassName="slds-combobox__form-element"
								disabled={props.disabled}
								iconRight={this.props.selection.length
									? <InputIcon
										assistiveText={assistiveText.removeSelectedOption}
										category="utility"
										iconPosition="right"
										name="close"
										onClick={this.handleRemoveSelectedOption}
									/>
									: <InputIcon
										assistiveText={assistiveText.openMenu}
										aria-haspopup
										aria-expanded={this.getIsOpen()}
										category="utility"
										name="search"
										onClick={this.openDialog}
									/>}
								iconLeft={iconLeft}
								id={this.getId()}
								placeholder={labels.placeholder}
								onKeyDown={this.handleKeyDown}
								inputRef={(component) => { this.inputRef = component; }}
								onClick={() => {
									this.openDialog();
								}}
								onChange={(event) => {
									this.props.onChange(event, { value: event.target.value });
								}}
								value={value}
							/>
						</div>
					</div>
					{this.props.isInline
						? this.getInlineMenu({ menuRenderer: this.renderMenu({ labels }) })
						: this.getDialog({ menuRenderer: this.renderMenu({ labels }) })}
				</div>
			</div>
		);
	}
}
/* eslint-enable jsx-a11y/role-supports-aria-props */

Combobox.displayName = COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export default Combobox;
