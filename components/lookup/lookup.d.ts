declare module '@salesforce/design-system-react/components/lookup/lookup' {
	import React from 'react';
	type Props = {
		/**
		 * If present, the label associated with this `input` is overwritten
		 * by this text and is visually not shown.
		 */
		assistiveText?: Record<string, any> | string;
		/**
		 * Class names to be added to the tag classed with `slds-lookup`.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
		 */
		constrainToScrollParent?: boolean;
		/**
		 * ID for aria-describedby (e.g. for an error message or a description)
		 */
		describedById?: string;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: string;
		/**
		 * This prop is passed onto the `input`. Prevents dropdown menu from opening. Also applies disabled styling to input.
		 */
		disabled?: boolean;
		/**
		 * Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
		 */
		emptyMessage?: string | React.ReactElement;
		/**
		 * Custom function to filter the Lookup items when typing into input field. The default function is case-insensitive and uses the searchTerm to filter Lookup items on their labels.
		 */
		filterWith?: (v: any) => any;
		/**
		 * If true, the menu is constrained to the window and may be flipped up. Has no effect if `isInline` is `true`. In other components, its opposite is used `hasStaticAlignment`.
		 */
		flippable?: boolean;
		/**
		 * Custom component for Lookup footer. The default footer allows user to add new item - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default footer, pass in <code>Lookup.DefaultFooter</code>.
		 */
		footerRenderer?: (v: any) => any;
		/**
		 * Custom component for Lookup header. The default header has a search icon and shows the search term - see <a href='http://www.lightningdesignsystem.com/components/lookups/#base'>Lightning Design System Lookup > Base</a>. To use the default header, pass in <code>Lookup.DefaultHeader</code>.
		 */
		headerRenderer?: (v: any) => any;
		/**
		 * Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view categories.
		 */
		iconCategory?: string;
		/**
		 * If true, icon color is white. If false, icon color is the default text color.
		 */
		iconInverse?: boolean;
		/**
		 * Name of icon. Please refer to <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to view icon names.
		 */
		iconName?: string;
		/**
		 * Determines whether the input's icon will display that icon on the left or the right.
		 */
		iconPosition?: 'left' | 'right';
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline?: boolean;
		/**
		 * Whether or not the dropdown menu is open. This overrides the default behavior.
		 */
		isOpen?: boolean;
		/**
		 * Form label for input.
		 */
		label?: string;
		/**
		 * Custom component that overrides the default Lookup Item component.
		 */
		listItemLabelRenderer?: (v: any) => any;
		/**
		 * Triggered when input focus is removed.
		 */
		onBlur?: (v: any) => any;
		/**
		 * Triggered when the contents of the input changes.
		 */
		onChange?: (v: any) => any;
		/**
		 * Triggered when input is focused.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Function called when the lookup dropdown would like hide. This will turn the Lookup into into a controlled component. Please use with `isOpen`.
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Function called when the lookup dropdown would like show. This will turn the Lookup into into a controlled component. Please use with `isOpen`.
		 */
		onRequestOpen?: (v: any) => any;
		/**
		 * Triggered when the user scrolls in the dropdown menu.
		 */
		onScroll?: (v: any) => any;
		/**
		 * Triggered when an item is selected from the dropdown menu.
		 */
		onSelect?: (v: any) => any;
		/**
		 * Triggered when an item is an item is removed from the input.
		 */
		onUnselect?: (v: any) => any;
		/**
		 * Item added to the dropdown menu.
		 */
		options: any[] /*.isRequired*/;
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder?: string;
		/**
		 * If true, adds asterisk next to input label to indicate it is a required field.
		 */
		required?: boolean;
		/**
		 * Text passed on to header search input of dropdown menu.
		 */
		searchTerm?: string;
		/**
		 * Custom component that overrides the default section divider
		 */
		sectionDividerRenderer?: (v: any) => any;
		/**
		 * Index of current selected item. To clear the selection, pass in -1.
		 */
		selectedItem?: number;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
