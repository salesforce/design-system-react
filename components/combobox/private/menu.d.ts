declare module '@salesforce/design-system-react/components/combobox/private/menu' {
	import React from 'react';
	type Props = {
		/*
		 * Active descendant in menu
		 */
		activeOption?: Record<string, any>;
		/*
		 * Index of active descendant in menu
		 */
		activeOptionIndex?: number;
		/**
		 * CSS classes to be added to container `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		classNameMenu?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to menu sub header `span` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		classNameMenuSubHeader?: any[] | Record<string, any> | string;
		/**
		 * Sets the dialog width to the width of one of the following:
		 * `target`: (Menus attached to `input` typically follow this UX pattern),
		 *  `menu`: Consider setting a menuMaxWidth if using this value. If not, width will be set to width of largest menu item.
		 *  'none'
		 */
		inheritWidthOf?: 'target' | 'menu' | 'none';
		/*
		 * Id used for assistive technology
		 */
		inputId?: string;
		/**
		 * Determines the height of the menu based on SLDS CSS classes.
		 */
		itemVisibleLength?: 5 | 7 | 10;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
		 */
		labels?: Partial<{
			noOptionsFound?: React.ReactNode | string;
			/*.isRequired*/
		}>;
		/**
		 * Accepts a custom menu item rendering function that becomes a custom component and is passed in the following props:
		 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
		 * * `option`: Object, option data for item being rendered that is passed into Combobox
		 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
		 *
		 * _Tested with snapshot testing._
		 */
		onRenderMenuItem?: (v: any) => any;
		/**
		 * Accepts a ref function or object (React.createRef() or otherwise) to store the menu DOM reference once available
		 */
		menuRef?: ((v: any) => any) | Record<string, any>;
		/*
		 * Sets a maximum width that the menu will be if `inheritWidthOf` is menu.
		 */
		maxWidth?: string;
		/*
		 * Callback when option is selected with keyboard or mouse
		 */
		onSelect?: (v: any) => any;
		/*
		 * Menu options
		 */
		options?: any[];
		/*
		 * Callback to remove active descendent
		 */
		resetActiveOption?: (v: any) => any;
		/*
		 * Selected options
		 */
		selection?: any[];
		/*
		 * Adds loading spinner below the options
		 */
		hasMenuSpinner?: boolean;
		/*
		 * Object for creating Add item below the options
		 */
		optionsAddItem?: Partial<{
			id?: string;
			icon?: React.ReactNode;
			label?: string | ((v: any) => any);
		}>[];
		/*
		 * Object for creating Search item on top of the options
		 */
		optionsSearchEntity?: Partial<{
			id?: string;
			icon?: React.ReactNode;
			label?: string | ((v: any) => any);
		}>[];
		/**
		 * Accepts a tooltip that is displayed when hovering on disabled menu items.
		 */
		tooltipMenuItemDisabled?: React.ReactElement;
		/**
		 * Changes styles of the menu option
		 */
		variant?: 'icon-title-subtitle' | 'checkbox';
		isSelected?: (v: any) => any;
		assistiveText?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
