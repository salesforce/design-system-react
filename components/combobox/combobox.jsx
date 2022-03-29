/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable max-lines */

import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash.assign';
import find from 'lodash.find';
import reject from 'lodash.reject';
import isEqual from 'lodash.isequal';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';

import classNames from 'classnames';

import shortid from 'shortid';

import Button from '../button';
import Dialog from '../utilities/dialog';
import InnerInput from '../../components/input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Menu from './private/menu';
import Label from '../forms/private/label';
import Popover from '../popover';
import SelectedListBox from '../pill-container/private/selected-listbox';

import FieldLevelHelpTooltip from '../tooltip/private/field-level-help-tooltip';
import KEYS from '../../utilities/key-code';
import KeyBuffer from '../../utilities/key-buffer';
import keyLetterMenuItemSelect from '../../utilities/key-letter-menu-item-select';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';
import menuItemSelectScroll from '../../utilities/menu-item-select-scroll';

import checkProps from './check-props';

import { COMBOBOX } from '../../utilities/constants';
import componentDoc from './component.json';
import { IconSettingsContext } from '../icon-settings';

let currentOpenDropdown;
const documentDefined = typeof document !== 'undefined';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `loading`: Text added to loading spinner.
	 * * `optionSelectedInMenu`: Added before selected menu items in Read-only variants (Picklists). The default is `Current Selection:`.
	 * * `popoverLabel`: Used by popover variant, assistive text for the Popover aria-label.
	 * * `removeSingleSelectedOption`: Used by inline-listbox, single-select variant to remove the selected item (pill). This is a button with focus. The default is `Remove selected option`.
	 * * `removePill`: Used by multiple selection Comboboxes to remove a selected item (pill). Focus is on the pill. This is not a button. The default  is `, Press delete or backspace to remove`.
	 * * `selectedListboxLabel`: This is a label for the selected listbox. The grouping of pills for multiple selection Comboboxes. The default is `Selected Options:`.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
		loadingMenuItems: PropTypes.string,
		optionSelectedInMenu: PropTypes.string,
		popoverLabel: PropTypes.string,
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
	 * * `onSelect`: Function called when a menu item is selected. This includes header and footer items.
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
	 * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the `labels.label`. The props from the component will be merged and override any default props.
	 */
	fieldLevelHelpTooltip: PropTypes.node,
	/**
	 * If true, `{ label: 'None': value: '' }` will be selected.
	 */
	hasDeselect: PropTypes.bool,
	/**
	 * If true, loading spinner appears inside input on right hand side.
	 */
	hasInputSpinner: PropTypes.bool,
	/**
	 * Add loading spinner below the options
	 */
	hasMenuSpinner: PropTypes.bool,
	/**
	 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * HTML id for component. _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * An [Input](https://react.lightningdesignsystem.com/components/inputs) component.
	 * The props from this component will override any default props.
	 */
	input: PropTypes.node,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `deselectOption`: This label appears first in the menu items of a read-only, Picklist-like Combobox. Selecting it, deselects any currently selected value.
	 * * `label`: This label appears above the input.
	 * * `cancelButton`: This label is only used by the dialog variant for the cancel button in the footer of the dialog. The default is `Cancel`
	 * * `doneButton`: This label is only used by the dialog variant for the done button in the footer of the dialog. The default is `Done`
	 * * `multipleOptionsSelected`: This label is used by the readonly variant when multiple options are selected. The default is `${props.selection.length} options selected`. This will override the entire string.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 * * `placeholder`: Input placeholder
	 * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
	 * * `removePillTitle`: Title on `X` icon
	 * _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		deselectOption: PropTypes.string,
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
	 * Accepts a custom menu item rendering function that becomes a custom component. It should return a React node. The checkmark is still rendered in readonly variants. This function is passed the following props:
	 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
	 * * `option`: Object, option data for item being rendered that is passed into Combobox
	 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
	 *
	 * _Tested with snapshot testing._
	 */
	onRenderMenuItem: PropTypes.func,
	/**
	 * This callback exposes the input reference / DOM node to parent components.
	 */
	inputRef: PropTypes.func,
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
	 * **Array of item objects in the dropdown menu.**
	 * Each object can contain:
	 * * `icon`: An `Icon` component. (not used in read-only variant)
	 * * `id`: A unique identifier string.
	 * * `label`: A primary string of text for a menu item or group separator.
	 * * `subTitle`: A secondary string of text added for clarity. (optional)
	 * * `title`: A string of text shown as the title of the selected item (optional)
	 * * `type`: 'separator' is the only type currently used
	 * * `disabled`: Set to true to disable this menu item.
	 * * `tooltipContent`: Content that is displayed in tooltip when item is disabled
	 * ```
	 * {
	 * 	id: '2',
	 * 	label: 'Salesforce.com, Inc.',
	 * 	subTitle: 'Account • San Francisco',
	 * 	title: 'Salesforce',
	 * 	type: 'account',
	 *  disabled: true,
	 *  tooltipContent: "You don't have permission to select this item."
	 * },
	 * ```
	 * Note: At the moment, Combobox does not support two consecutive separators. _Tested with snapshot testing._
	 */
	options: PropTypes.arrayOf(
		PropTypes.PropTypes.shape({
			id: PropTypes.string.isRequired,
			icon: PropTypes.node,
			label: PropTypes.string,
			subTitle: PropTypes.string,
			title: PropTypes.string,
			type: PropTypes.string,
			disabled: PropTypes.bool,
			tooltipContent: PropTypes.node,
		})
	),
	/**
	 * Determines the height of the menu based on SLDS CSS classes. This is a `number`. The default for a `readonly` variant is `5`.
	 */
	menuItemVisibleLength: PropTypes.oneOf([5, 7, 10]),
	/**
	 * Limits auto-complete input submission to one of the provided options. _Tested with mocha testing._
	 */
	predefinedOptionsOnly: PropTypes.bool,
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Combobox's Popover dialog to be a controlled component. _Tested with snapshot testing._
	 */
	popover: PropTypes.node,
	/**
	 * Applies label styling for a required form element. _Tested with snapshot testing._
	 */
	required: PropTypes.bool,
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object. For item object keys, see `options` prop. _Tested with snapshot testing._
	 */
	selection: PropTypes.arrayOf(
		PropTypes.PropTypes.shape({
			id: PropTypes.string.isRequired,
			icon: PropTypes.node,
			label: PropTypes.string,
			subTitle: PropTypes.string,
			type: PropTypes.string,
		})
	).isRequired,
	/**
	 * This callback exposes the selected listbox reference / DOM node to parent components.
	 */
	selectedListboxRef: PropTypes.func,
	/**
	 * Disables the input and prevents editing the contents. This only applies for single readonly and inline-listbox variants.
	 */
	singleInputDisabled: PropTypes.bool,
	/**
	 * Accepts a tooltip that is displayed when hovering on disabled menu items.
	 */
	tooltipMenuItemDisabled: PropTypes.element,
	/**
	 * Value of input. _This is a controlled component,_ so you will need to control the input value by passing the `value` from `onChange` to a parent component or state manager, and then pass it back into the componet with this prop. Please see examples for more clarification. _Tested with snapshot testing._
	 */
	value: PropTypes.string,
	/**
	 * Changes styles of the input and menu. Currently `entity` is not supported.
	 * The options are:
	 * * `base`: An autocomplete Combobox also allows a user to select an option from a list, but that list can be affected by what the user types into the input of the Combobox. The SLDS website used to call the autocomplete Combobox its `base` variant.
	 * * `inline-listbox`: An Entity Autocomplete Combobox or Lookup, is used to search for and select Salesforce Entities.
	 * * `popover`: A dialog Combobox is best used when a listbox, tree, grid, or tree-grid is not the best solution. This variant allows custom content.
	 * * `readonly`: A readonly text input that allows a user to select an option from a pre-defined list of options. It does not allow free form user input, nor does it allow the user to modify the selected value.
	 *
	 *  _Tested with snapshot testing._
	 */
	/**
	 * Default value of input. Provide uncontroled behaviour
	 */
	defaultValue: PropTypes.string,
	/**
	 * **Array of item objects in the dropdown menu that is displayed below the list of `options`. `onSelect` fires when selected.**
	 * Each object can contain:
	 * * `id`: A unique identifier string.
	 * * `icon`: An [Icon](/components/icons/) component to be displayed to the left of the menu item `label`.
	 * * `label`: A primary string of text for a menu item or a function that receives `inputValue` as function parameter and returns text to be displayed in for a menu item.
	 * ```
	 * {
	 * 	id: '1',
	 * 	icon: (
	 *  	<Icon
	 * 			assistiveText={{ label: 'add' }}
	 * 			category="utility"
	 * 			size="x-small"
	 * 			name="add"
	 * 		/>
	 * 	),
	 * 	label: 'New Entity'
	 * }
	 * ```
	 * _Tested with snapshot testing._
	 */
	optionsAddItem: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			icon: PropTypes.node,
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		})
	),
	/**
	 * **Array of item objects in the dropdown menu that is displayed above the list of `options`. `onSelect` fires when selected. **
	 * Each object can contain:
	 * * `id`: A unique identifier string.
	 * * `icon`: An [Icon](/components/icons/) component to be displayed to the left of the menu item `label`.
	 * * `label`: A primary string of text for a menu item or a function that receives `inputValue` as function parameter and returns text to be displayed in for a menu item.
	 * ```
	 * {
	 *	id: '1',
	 *	icon: (
	 *		<Icon
	 *			assistiveText={{ label: 'Add in Accounts' }}
	 *			size="x-small"
	 *			category="utility"
	 *			name="search"
	 *		/>
	 *	),
	 *	label: (searchTerm) => {
	 *		return `${searchTerm} in Accounts`;
	 *	},
	 * }
	 * ```
	 * _Tested with snapshot testing._
	 */
	optionsSearchEntity: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			icon: PropTypes.node,
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		})
	),
	/**
	 * Node of type [Combobox](/components/comboboxes/) for creating grouped comboboxes.
	 */
	entityCombobox: PropTypes.node,
	/**
	 * Defines Combobox variant styling and functionality
	 */
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'popover', 'readonly']),
};

const defaultProps = {
	assistiveText: {
		loadingMenuItems: 'Loading',
		optionSelectedInMenu: 'Current Selection:',
		removeSingleSelectedOption: 'Remove selected option',
		removePill: ', Press delete or backspace to remove',
		selectedListboxLabel: 'Selected Options:',
	},
	deselectOption: false,
	events: {},
	labels: {
		deselectOption: 'None',
		cancelButton: 'Cancel',
		doneButton: `Done`,
		noOptionsFound: 'No matches found.',
		optionDisabledTooltipLabel: 'This option is disabled.',
		placeholderReadOnly: 'Select an Option',
		removePillTitle: 'Remove',
	},
	inheritWidthOf: 'target',
	menuPosition: 'absolute',
	optionsSearchEntity: [],
	optionsAddItem: [],
	required: false,
	selection: [],
	singleInputDisabled: false,
	variant: 'base',
};

/**
 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-definfined options.
 */
class Combobox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeOption: undefined,
			activeOptionIndex: -1,
			// seeding initial state with this.props.selection[0]
			activeSelectedOption:
				(this.props.selection && this.props.selection[0]) || undefined,
			activeSelectedOptionIndex: 0,
			listboxHasFocus: false,
			isOpen: typeof props.isOpen === 'boolean' ? props.isOpen : false,
		};

		this.menuKeyBuffer = new KeyBuffer();
		this.menuRef = undefined;
		this.selectedListboxRef = null;

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(COMBOBOX, props, componentDoc);

		this.generatedId = shortid.generate();
		this.generatedErrorId = shortid.generate();
		this.deselectId = `${this.getId()}-deselect`;
	}

	/**
	 * Lifecycle methods
	 */

	componentDidUpdate(nextProps) {
		// This logic will maintain the active highlight even when the
		// option order changes. One example would be the server pushes
		// data out as the user has the menu open. This logic clears
		// `activeOption` if the active option is no longer in the options
		// list. If it's in the options list, then find the new index and
		// set `activeOptionIndex`
		if (!isEqual(this.getOptions(), this.getOptions(nextProps))) {
			const index = findIndex(this.getOptions(nextProps), (item) =>
				isEqual(item, this.state.activeOption)
			);
			if (index !== -1) {
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ activeOptionIndex: index });
			} else {
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ activeOption: undefined, activeOptionIndex: -1 });
			}
		} else if (this.props.isOpen !== nextProps.isOpen) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({
				activeOption: undefined,
				activeOptionIndex: -1,
				isOpen: nextProps.isOpen,
			});
		}

		// there may be issues with tabindex/focus if the app removes an item
		// from selection while the user is using the listbox
		const selectedOptionsRenderIsInitialRender =
			this.props.selection &&
			this.props.selection.length === 0 &&
			nextProps.selection.length > 0;
		if (selectedOptionsRenderIsInitialRender) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({
				activeSelectedOption: nextProps.selection[0],
				activeSelectedOptionIndex: 0,
			});
		}
	}

	componentWillUnmount() {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
	}

	getCustomPopoverProps = (body, { assistiveText, labels }) => {
		/*
		 * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
		 */
		const popoverBody = (
			<div>
				<div className="slds-assistive-text" id={`${this.getId()}-label`}>
					{assistiveText.popoverLabel}
				</div>
				{body}
			</div>
		);

		const popoverFooter = (
			<div>
				<Button
					label={labels.cancelButton}
					onClick={(e) => {
						this.handleClose(e, { trigger: 'cancel' });
					}}
				/>
				<Button
					label={labels.doneButton}
					variant="brand"
					onClick={this.handleClose}
				/>
			</div>
		);

		const defaultPopoverProps = {
			ariaLabelledby: `${this.getId()}-label`,
			align: 'bottom',
			body: popoverBody,
			className: 'slds-popover_full-width',
			footer: popoverFooter,
			footerClassName: 'slds-popover__footer_form',
			hasNoNubbin: true,
			id: this.getId(),
			isOpen: this.state.isOpen,
			hasNoTriggerStyles: true,
			onOpen: this.handleOpen,
			onClose: this.handleClose,
			onRequestClose: this.handleClose,
		};

		/* Merge in passed popover's props if there is any to override the default popover props */
		const popoverProps = assign(
			defaultPopoverProps,
			this.props.popover ? this.props.popover.props : {}
		);
		popoverProps.body = popoverBody;

		// eslint-disable-next-line fp/no-delete
		delete popoverProps.children;
		return popoverProps;
	};

	getDialog({ menuRenderer }) {
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
				onMouseDown={(event) => {
					// prevent onBlur
					event.preventDefault();
				}}
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

	getErrorId() {
		return (
			this.props['aria-describedby'] ||
			(this.props.errorText && this.generatedErrorId)
		);
	}

	/**
	 * Shared class property getter methods
	 */

	getId = () => this.props.id || this.generatedId;

	getIsActiveOption = () =>
		this.state.activeOption && this.state.activeOptionIndex !== -1;

	getIsOpen = () =>
		!!(typeof this.props.isOpen === 'boolean'
			? this.props.isOpen
			: this.state.isOpen);

	getNewActiveOptionIndex = ({ activeOptionIndex, offset, options }) => {
		// used by menu listbox and selected options listbox
		const nextIndex = activeOptionIndex + offset;
		const skipIndex =
			options.length > nextIndex &&
			nextIndex >= 0 &&
			options[nextIndex].type === 'separator';
		const newIndex = skipIndex ? nextIndex + offset : nextIndex;
		const hasNewIndex = options.length > nextIndex && nextIndex >= 0;
		return hasNewIndex ? newIndex : activeOptionIndex;
	};

	getOptions = (props = this.props) => {
		const localProps = props;
		const labels = assign({}, defaultProps.labels, this.props.labels);

		const deselectOption = {
			id: this.deselectId,
			label: labels.deselectOption,
			value: '',
			type: 'deselect',
		};

		const localOptionsSearchEntity = localProps.optionsSearchEntity.map(
			(entity) => ({ ...entity, type: 'header' })
		);

		const localOptionsAddItem = props.optionsAddItem.map((entity) => ({
			...entity,
			type: 'footer',
		}));

		const options = [
			...(localOptionsSearchEntity.length > 0 ? localOptionsSearchEntity : []),
			...(props.hasDeselect ? [deselectOption] : []),
			...(localProps.options && localProps.options.length > 0
				? localProps.options
				: []),
			...(localOptionsAddItem.length > 0 ? localOptionsAddItem : []),
		];
		return options;
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
		if (this.props.inputRef) {
			this.props.inputRef(component);
		}
	};

	setSelectedListboxRef = (ref) => {
		this.selectedListboxRef = ref;
		if (this.props.selectedListboxRef) {
			this.props.selectedListboxRef(ref);
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

	handleClose = (event, { trigger } = {}) => {
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

			if (this.props.variant === 'popover' && trigger === 'cancel') {
				if (this.props.popover.props.onClose) {
					this.props.popover.props.onClose(event, { trigger });
				}
			}

			if (this.props.events.onClose) {
				this.props.events.onClose(event, {});
			}
		}
	};

	handleInputBlur = (event) => {
		// If menu is open when the input's onBlur event fires, it will close before the onClick of the menu item can fire.
		setTimeout(() => {
			const activeElement = documentDefined ? document.activeElement : false;
			// detect if the scrollbar of the combobox-autocomplete/lookup menu is clicked in IE11. If it is, return focus to input, and do not close menu.
			if (
				activeElement &&
				activeElement.tagName === 'DIV' &&
				activeElement.id === `${this.getId()}-listbox`
			) {
				if (this.inputRef) {
					this.inputRef.focus();
				}
			} else if (!this.props.popover) {
				this.handleClose(event);
			}
		}, 200);

		if (this.props.events.onBlur) {
			this.props.events.onBlur(event);
		}
	};

	handleInputChange = (event) => {
		this.requestOpenMenu();
		if (this.props.events && this.props.events.onChange) {
			this.props.events.onChange(event, { value: event.target.value });
		}
	};

	handleInputFocus = (event) => {
		if (this.props.events.onFocus) {
			this.props.events.onFocus(event, {});
		}
	};

	handleInputSubmit = (event) => {
		if (this.state.activeOption && this.state.activeOption.disabled) {
			return;
		}

		if (
			this.state.activeOption &&
			(this.state.activeOption.type === 'header' ||
				this.state.activeOption.type === 'footer')
		) {
			this.state.activeOption.onClick(event);
			return;
		}

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
		const callbacks = {
			[KEYS.DOWN]: { callback: this.handleKeyDownDown },
			[KEYS.ENTER]: { callback: this.handleInputSubmit },
			[KEYS.ESCAPE]: { callback: this.handleClose },
			[KEYS.UP]: { callback: this.handleKeyDownUp },
		};

		if (this.props.variant === 'readonly') {
			if (this.props.selection.length > 2) {
				callbacks[KEYS.TAB] = { callback: this.handleKeyDownTab };
			} else {
				callbacks[KEYS.TAB] = undefined;
			}
			callbacks.other = {
				callback: this.handleKeyDownOther,
				stopPropagation: false,
			};
		}

		// Propagate events when menu is closed
		const stopPropagation = this.getIsOpen();

		// Helper function that takes an object literal of callbacks that are triggered with a key event
		mapKeyEventCallbacks(event, { callbacks, stopPropagation });
	};

	handleKeyDownDown = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey) {
			this.openDialog();
		}

		if (this.props.variant !== 'popover') {
			this.handleNavigateListboxMenu(event, { direction: 'next' });
		}
	};

	handleKeyDownTab = () => {
		if (this.selectedListboxRef) {
			this.setState({
				listboxHasFocus: true,
			});
		}
	};

	handleKeyDownUp = (event) => {
		// Don't open if user is selecting text
		if (!event.shiftKey && this.getIsOpen()) {
			this.handleNavigateListboxMenu(event, { direction: 'previous' });
		}
	};

	handleKeyDownOther = (event) => {
		const activeOptionIndex = keyLetterMenuItemSelect({
			key: event.key,
			keyBuffer: this.menuKeyBuffer,
			keyCode: event.keyCode,
			options: this.getOptions(),
		});

		if (activeOptionIndex !== undefined) {
			if (this.getIsOpen()) {
				menuItemSelectScroll({
					container: this.menuRef,
					focusedIndex: activeOptionIndex,
				});
			}

			this.setState({
				activeOption: this.getOptions()[activeOptionIndex],
				activeOptionIndex,
			});
		}
	};

	handleNavigateListboxMenu = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		// takes current/previous state and returns an object with the new state
		this.setState((prevState) => {
			const newIndex = this.getNewActiveOptionIndex({
				activeOptionIndex: prevState.activeOptionIndex,
				offset: offsets[direction],
				options: this.getOptions(),
			});

			// eslint-disable-next-line react/no-access-state-in-setstate
			if (this.getIsOpen()) {
				menuItemSelectScroll({
					container: this.menuRef,
					focusedIndex: newIndex,
				});
			}

			return {
				activeOption: this.getOptions()[newIndex],
				activeOptionIndex: newIndex,
			};
		});
	};

	handleNavigateSelectedListbox = (event, { direction }) => {
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

			if (this.props.variant === 'readonly') {
				const activeOptionIndex = findIndex(this.getOptions(), (item) =>
					isEqual(item, this.props.selection[0])
				);

				this.setState({
					activeOptionIndex,
					activeOption: this.props.selection[0],
				});

				if (this.menuRef !== null) {
					menuItemSelectScroll({
						container: this.menuRef,
						focusedIndex: activeOptionIndex,
					});
				}
			}
		}
	};

	handlePillFocus = (event, { option, index }) => {
		if (!this.state.listboxHasFocus) {
			this.setState({
				activeSelectedOption: option,
				activeSelectedOptionIndex: index,
				listboxHasFocus: true,
			});
		}
	};

	/**
	 * Selected options with selected listbox event methods
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
			this.handleClose(event, { trigger: 'cancel' });
		}
	};

	handleRequestFocusSelectedListbox = (event, { ref }) => {
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
		const deselectWasClicked = option.id === this.deselectId;

		if (deselectWasClicked) {
			newSelection = [];
		} else if (singleSelectAndSelectedWasNotClicked) {
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

		// if (this.inputRef) {
		// 	this.inputRef.focus();
		// }
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

	renderBase = ({ assistiveText, labels, props, userDefinedProps }) => (
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
					// Not in ARIA 1.2 spec, temporary for SLDS styles
					role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
					aria-expanded={this.getIsOpen()}
					aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					// used on menu's listbox
					aria-owns={this.getIsOpen() ? `${this.getId()}-listbox` : undefined} // eslint-disable-line jsx-a11y/aria-proptypes
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={
							this.getIsOpen() ? `${this.getId()}-listbox` : undefined
						}
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
						hasSpinner={this.props.hasInputSpinner}
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
						defaultValue={props.defaultValue}
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
						{...userDefinedProps.input}
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
					onPillFocus: this.handlePillFocus,
					onRequestFocus: this.handleRequestFocusSelectedListbox,
					onRequestFocusOnNextPill: this.handleNavigateSelectedListbox,
					onRequestFocusOnPreviousPill: this.handleNavigateSelectedListbox,
					onRequestRemove: this.handleRemoveSelectedOption,
				}}
				id={`${this.getId()}-selected-listbox`}
				labels={labels}
				selectedListboxRef={this.setSelectedListboxRef}
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

	renderInlineMultiple = ({
		assistiveText,
		labels,
		props,
		userDefinedProps,
	}) => (
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
						containerRole="listbox"
						containerAriaOrientation="horizontal"
						listboxRole="group"
						listboxAriaOrientation={null}
						events={{
							onBlurPill: this.handleBlurPill,
							onPillFocus: this.handlePillFocus,
							onRequestFocus: this.handleRequestFocusSelectedListbox,
							onRequestFocusOnNextPill: this.handleNavigateSelectedListbox,
							onRequestFocusOnPreviousPill: this.handleNavigateSelectedListbox,
							onRequestRemove: this.handleRemoveSelectedOption,
						}}
						id={`${this.getId()}-selected-listbox`}
						labels={labels}
						selectedListboxRef={this.setSelectedListboxRef}
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
					// Not in ARIA 1.2 spec, temporary for SLDS styles
					role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
					aria-expanded={this.getIsOpen()}
					aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={
							this.getIsOpen() ? `${this.getId()}-listbox` : undefined
						}
						aria-activedescendant={
							this.state.activeOption
								? `${this.getId()}-listbox-option-${this.state.activeOption.id}`
								: null
						}
						aria-describedby={this.getErrorId()}
						defaultValue={props.defaultValue}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							className: 'slds-combobox__form-element',
							role: 'none',
						}}
						hasSpinner={this.props.hasInputSpinner}
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
						{...userDefinedProps.input}
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

	renderInlineSingle = ({ assistiveText, labels, props, userDefinedProps }) => {
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
						// Not in ARIA 1.2 spec, temporary for SLDS styles
						role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					>
						<InnerInput
							defaultValue={props.defaultValue}
							aria-autocomplete="list"
							aria-controls={
								this.getIsOpen() ? `${this.getId()}-listbox` : undefined
							}
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
							disabled={this.props.singleInputDisabled}
							hasSpinner={this.props.hasInputSpinner}
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
							{...userDefinedProps.input}
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

		const readonlyItemVisibleLength =
			this.props.variant === 'readonly' ? 5 : null;

		return (
			<Menu
				assistiveText={assistiveText}
				activeOption={this.state.activeOption}
				activeOptionIndex={this.state.activeOptionIndex}
				classNameMenu={this.props.classNameMenu}
				classNameMenuSubHeader={this.props.classNameMenuSubHeader}
				clearActiveOption={this.clearActiveOption}
				deselectId={this.deselectId}
				inheritWidthOf={this.props.inheritWidthOf}
				inputId={this.getId()}
				inputValue={this.props.value}
				isSelected={this.isSelected}
				itemVisibleLength={
					this.props.menuItemVisibleLength || readonlyItemVisibleLength
				}
				labels={labels}
				hasMenuSpinner={this.props.hasMenuSpinner}
				hasDeselect={this.props.hasDeselect}
				menuItem={this.props.menuItem}
				menuPosition={this.props.menuPosition}
				menuRef={(ref) => {
					this.menuRef = ref;
				}}
				maxWidth={this.props.menuMaxWidth}
				options={this.getOptions()}
				optionsAddItem={this.props.optionsAddItem}
				optionsSearchEntity={this.props.optionsSearchEntity}
				onSelect={this.handleSelect}
				// For backward compatibility, 'menuItem' prop will be deprecated soon
				onRenderMenuItem={
					this.props.onRenderMenuItem
						? this.props.onRenderMenuItem
						: this.props.menuItem
				}
				selection={this.props.selection}
				tooltipMenuItemDisabled={this.props.tooltipMenuItemDisabled}
				variant={menuVariant[this.props.variant]}
			/>
		);
	};

	renderPopover = ({ assistiveText, labels, props }) => {
		const popoverProps = this.getCustomPopoverProps(
			this.props.popover.props.body,
			{ assistiveText, labels }
		);

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
						// Not in ARIA 1.2 spec, temporary for SLDS styles
						role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
						aria-expanded={this.getIsOpen()}
						aria-haspopup="dialog" // eslint-disable-line jsx-a11y/aria-proptypes
					>
						<Popover {...popoverProps}>
							<InnerInput
								aria-autocomplete="none"
								aria-controls={
									this.getIsOpen() ? `${this.getId()}-popover` : undefined
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
										name="down"
										variant="combobox"
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
								readOnly
								required={props.required}
								role="textbox"
								value={props.value}
							/>
						</Popover>
					</div>
				</div>
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

	renderReadOnlyMultiple = ({
		assistiveText,
		labels,
		props,
		userDefinedProps,
	}) => {
		const value =
			props.selection.length > 1
				? labels.multipleOptionsSelected ||
				  `${props.selection.length} options selected`
				: (props.selection[0] && props.selection[0].label) || '';

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
						// Not in ARIA 1.2 spec, temporary for SLDS styles
						role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					>
						<InnerInput
							defaultValue={props.defaultValue}
							aria-autocomplete="list"
							aria-controls={
								this.getIsOpen() ? `${this.getId()}-listbox` : undefined
							}
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
							{...userDefinedProps.input}
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
						onPillFocus: this.handlePillFocus,
						onRequestFocus: this.handleRequestFocusSelectedListbox,
						onRequestFocusOnNextPill: this.handleNavigateSelectedListbox,
						onRequestFocusOnPreviousPill: this.handleNavigateSelectedListbox,
						onRequestRemove: this.handleRemoveSelectedOption,
					}}
					id={`${this.getId()}-selected-listbox`}
					labels={labels}
					selectedListboxRef={this.setSelectedListboxRef}
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

	renderReadOnlySingle = ({
		assistiveText,
		labels,
		props,
		userDefinedProps,
	}) => {
		const activeOptionLabel =
			this.state.activeOption && this.state.activeOption.label;
		const selectedOptionLabel = props.selection[0] && props.selection[0].label;
		let inputValue = activeOptionLabel || selectedOptionLabel || '';

		if (props.selection[0] && props.selection[0].value === '') {
			inputValue = '';
		}

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
						// Not in ARIA 1.2 spec, temporary for SLDS styles
						role="combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
						aria-expanded={this.getIsOpen()}
						aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
					>
						<InnerInput
							defaultValue={props.defaultValue}
							aria-autocomplete="list"
							aria-controls={
								this.getIsOpen() ? `${this.getId()}-listbox` : undefined
							}
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
							disabled={this.props.singleInputDisabled}
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
							value={inputValue}
							{...userDefinedProps.input}
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

	render() {
		const { props } = this;
		// Merge objects of strings with their default object
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const hasRenderedLabel =
			labels.label || (assistiveText && assistiveText.label);
		// declare user defined props
		const userDefinedProps = {};
		if (props.input) {
			// at the moment we only support overriding the input props
			userDefinedProps.input = props.input.props;
		}
		const subRenderParameters = {
			assistiveText,
			labels,
			props: this.props,
			userDefinedProps,
		};
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
			popover: {
				multiple: this.renderPopover, // same
				single: this.renderPopover,
			},
			readonly: {
				multiple: this.renderReadOnlyMultiple,
				single: this.renderReadOnlySingle,
			},
		};
		const variantExists = subRenders[this.props.variant][multipleOrSingle];

		const mainCombobox = (
			<div
				className={classNames('slds-form-element', props.classNameContainer)}
			>
				{props.entityCombobox ? null : (
					<Label
						assistiveText={this.props.assistiveText}
						htmlFor={this.getId()}
						label={labels.label}
						required={props.required}
					/>
				)}
				{this.props.fieldLevelHelpTooltip && hasRenderedLabel ? (
					<FieldLevelHelpTooltip
						fieldLevelHelpTooltip={this.props.fieldLevelHelpTooltip}
					/>
				) : null}
				{variantExists
					? subRenders[this.props.variant][multipleOrSingle](
							subRenderParameters
					  )
					: subRenders.base.multiple(subRenderParameters)}
			</div>
		);

		return props.entityCombobox ? (
			<div className="slds-form-element">
				<Label
					assistiveText={props.assistiveText}
					htmlFor={this.getId()}
					label={labels.label}
					required={props.required}
				/>
				<div className="slds-form-element__control">
					<div className="slds-combobox-group">
						<div className="slds-combobox_object-switcher slds-combobox-addon_start">
							{props.entityCombobox}
						</div>

						<div className="slds-combobox_container slds-combobox-addon_end">
							{mainCombobox}
						</div>
					</div>
				</div>
			</div>
		) : (
			mainCombobox
		);
	}
}

Combobox.contextType = IconSettingsContext;
Combobox.displayName = COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;

export default Combobox;
