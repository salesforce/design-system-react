declare module '@salesforce/design-system-react/components/menu-picklist' {
	import React from 'react';
	type Props = {
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef?: (v: any) => any;
		className?: string;
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark?: boolean;
		disabled?: boolean;
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: string;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline?: boolean;
		/**
		 * Form element label
		 */
		label?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `multipleOptionsSelected`: Text to be used when multiple items are selected. "2 Options Selected" is a good pattern to use.
		 */
		labels?: Partial<{
			multipleOptionsSelected: string;
		}>;
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer?: (v: any) => any;
		/**
		 * Triggered when the trigger button is clicked to open.
		 */
		onClick?: (v: any) => any;
		/**
		 * Triggered when an item is selected. Passes in the option object that has been selected and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
		 */
		onSelect?: (v: { option: any; optionIndex: number }) => any;
		/**
		 * Triggered when a pill is removed. Passes in the option object that has been removed and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
		 */
		onPillRemove?: (v: { option: any; optionIndex: number }) => any;
		/**
		 * Menu item data.
		 */
		options: any[] /*.isRequired*/;
		/**
		 * Text present in trigger button if no items are selected.
		 */
		placeholder?: string;
		/**
		 * Add styling of a required form element.
		 */
		required?: boolean;
		/**
		 * Current selected item.
		 */
		value?: React.ReactNode;
		/**
		 * Initial selected item index.
		 */
		initValueIndex?: number;
	};
	/**
	 * ** MenuPicklist is deprecated. Please use a read-only Combobox instead.**
	 *
	 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
	 *
	 * @deprecated
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
