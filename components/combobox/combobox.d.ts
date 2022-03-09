declare module '@salesforce/design-system-react/components/combobox/combobox' {
	import React from 'react';
	type Props = {
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
		assistiveText?: Partial<{
			label?: string;
			loadingMenuItems?: string;
			optionSelectedInMenu?: string;
			popoverLabel?: string;
			removeSingleSelectedOption?: string;
			removePill?: string;
			selectedListboxLabel?: string;
		}>;
		/**
		 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them.
		 * This is very similar to aria-labelledby?: a label describes the essence of an object, while a description provides more information that the user might need. _Tested with snapshot testing._
		 */
		'aria-describedby'?: string;
		/**
		 * CSS classes to be added to tag with `.slds-combobox`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to top level tag with `.slds-form-element` and not on `.slds-combobox_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
		 */
		classNameContainer?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames). Autocomplete/bass variant menu height should not scroll and should be determined by number items which should be no more than 10. _Tested with snapshot testing._
		 */
		classNameMenu?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to tag with `.slds-dropdown__header`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		classNameMenuSubHeader?: any[] | Record<string, any> | string;
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
		events?: Partial<{
			onBlur?: (event: React.SyntheticEvent) => any;
			onChange?: (event: React.SyntheticEvent, v: any) => any;
			onClose?: (event: React.SyntheticEvent, v: any) => any;
			onFocus?: (event: React.SyntheticEvent, v: any) => any;
			onOpen?: (event: React.SyntheticEvent, v: any) => any;
			onRequestClose?: (event: React.SyntheticEvent, v: any) => any;
			onRequestOpen?: (event: React.SyntheticEvent, v: any) => any;
			onRequestRemoveSelectedOption?: (event: React.SyntheticEvent, v: any) => any;
			onSelect?: (event: React.SyntheticEvent, v: any) => any;
			onSubmit?: (event: React.SyntheticEvent, v: any) => any;
		}>;
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error. _Tested with snapshot testing._
		 */
		errorText?: string;
		/**
		 * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the `labels.label`. The props from the component will be merged and override any default props.
		 */
		fieldLevelHelpTooltip?: React.ReactNode;
		/**
		 * If true, loading spinner appears inside input on right hand side.
		 */
		hasInputSpinner?: boolean;
		/**
		 * Add loading spinner below the options
		 */
		hasMenuSpinner?: boolean;
		/**
		 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment?: boolean;
		/**
		 * HTML id for component. _Tested with snapshot testing._
		 */
		id?: string;
		/**
		 * An [Input](https://react.lightningdesignsystem.com/components/inputs) component.
		 * The props from this component will override any default props.
		 */
		input?: React.ReactNode;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
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
		labels?: Partial<{
			label?: React.ReactNode | string;
			multipleOptionsSelected?: string;
			noOptionsFound?: React.ReactNode | string;
			placeholder?: string;
			placeholderReadOnly?: string;
			removePillTitle?: string;
		}>;
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) _Tested with snapshot testing._
		 */
		isOpen?: boolean;
		/**
		 * Sets the dialog width to the width of one of the following:
		 * * `target`: Sets the dialog width to the width of the target. (Menus attached to `input` typically follow this UX pattern),
		 * * `menu`: Consider setting a `menuMaxWidth` if using this value. If not, width will be set to width of largest menu item.
		 * * `none`: Does not set a width on the dialog. _Tested with snapshot testing._
		 */
		inheritWidthOf?: 'target' | 'menu' | 'none';
		/**
		 * Accepts a custom menu item rendering function that becomes a custom component. It should return a React node. The checkmark is still rendered in readonly variants. This function is passed the following props:
		 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
		 * * `option`: Object, option data for item being rendered that is passed into Combobox
		 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
		 *
		 * _Tested with snapshot testing._
		 */
		onRenderMenuItem?: (v: any) => any;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Sets a maximum width that the menu will be used if `inheritWidthOf` is set to `menu`. (Example: 500px) _Tested with snapshot testing._
		 *
		 */
		menuMaxWidth?: string;
		/**
		 * Allows multiple selections _Tested with mocha testing._
		 */
		multiple?: boolean;
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
		options?: PropTypes.Partial<{
			id: string /*.isRequired*/;
			icon?: React.ReactNode;
			label?: string;
			subTitle?: string;
			title?: string;
			type?: string;
			disabled?: boolean;
			tooltipContent?: React.ReactNode;
		}>[];
		/**
		 * Determines the height of the menu based on SLDS CSS classes. This is a `number`. The default for a `readonly` variant is `5`.
		 */
		menuItemVisibleLength?: 5 | 7 | 10;
		/**
		 * Limits auto-complete input submission to one of the provided options. _Tested with mocha testing._
		 */
		predefinedOptionsOnly?: boolean;
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Combobox's Popover dialog to be a controlled component. _Tested with snapshot testing._
		 */
		popover?: React.ReactNode;
		/**
		 * Applies label styling for a required form element. _Tested with snapshot testing._
		 */
		required?: boolean;
		/**
		 * Accepts an array of item objects. For single selection, pass in an array of one object. For item object keys, see `options` prop. _Tested with snapshot testing._
		 */
		selection?: PropTypes.Partial<{
			id: string /*.isRequired*/;
			icon?: React.ReactNode;
			label?: string;
			subTitle?: string;
			type?: string;
		}>[] /*.isRequired*/;
		/**
		 * This callback exposes the selected listbox reference / DOM node to parent components.
		 */
		selectedListboxRef?: (v: any) => any;
		/**
		 * Disables the input and prevents editing the contents. This only applies for single readonly and inline-listbox variants.
		 */
		singleInputDisabled?: boolean;
		/**
		 * Accepts a tooltip that is displayed when hovering on disabled menu items.
		 */
		tooltipMenuItemDisabled?: React.ReactElement;
		/**
		 * Value of input. _This is a controlled component,_ so you will need to control the input value by passing the `value` from `onChange` to a parent component or state manager, and then pass it back into the componet with this prop. Please see examples for more clarification. _Tested with snapshot testing._
		 */
		value?: string;
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
		defaultValue?: string;
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
		optionsAddItem?: Partial<{
			id?: string;
			icon?: React.ReactNode;
			label?: string | ((v: any) => any);
		}>[];
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
		optionsSearchEntity?: Partial<{
			id?: string;
			icon?: React.ReactNode;
			label?: string | ((v: any) => any);
		}>[];
		/**
		 * Node of type [Combobox](/components/comboboxes/) for creating grouped comboboxes.
		 */
		entityCombobox?: React.ReactNode;
		/**
		 * Defines Combobox variant styling and functionality
		 */
		variant?: 'base' | 'inline-listbox' | 'popover' | 'readonly';
	};
	/**
	 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-definfined options.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
