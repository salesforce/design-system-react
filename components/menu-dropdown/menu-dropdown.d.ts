declare module '@salesforce/design-system-react/components/menu-dropdown/menu-dropdown' {
	import React from 'react';
	type Props = {
		/**
		 * Aligns the menu center, right, or left respective to the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align?: 'center' | 'left' | 'right';
		/**
		 * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
		 */
		assistiveText?: Record<string, any>;
		/**
		 * CSS classes to be added to triggering button.
		 */
		buttonClassName?: any[] | Record<string, any> | string;
		/**
		 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
		 */
		buttonInverse?: boolean;
		/**
		 * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
		 */
		buttonVariant?: 'base' | 'neutral' | 'brand' | 'destructive' | 'icon';
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark?: boolean;
		/**
		 * If you need custom content _and_ a list, use a `<Popover>` instead.
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to dropdown menu.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * By default, these class names will be added to the absolutely-positioned `Dialog` component.
		 */
		containerClassName?: any[] | Record<string, any> | string;
		/**
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
		 */
		disabled?: boolean;
		/**
		 * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment?: boolean;
		/**
		 * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint?: boolean;
		/**
		 * Delay on menu closing in milliseconds.
		 */
		hoverCloseDelay?: number;
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		/**
		 * If omitted, icon position is centered.
		 */
		iconPosition?: 'left' | 'right';
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant?:
			| 'bare'
			| 'container'
			| 'border'
			| 'border-filled'
			| 'small'
			| 'more';
		/**
		 * Determines the size of the icon.
		 */
		iconSize?: 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Adds inverse class to the dropdown
		 */
		inverse?: boolean;
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen?: boolean;
		/**
		 * This prop is passed onto the triggering `Button`. Text within the trigger button.
		 */
		label?: string | React.ReactNode;
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer?: (v: any) => any;
		/**
		 * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
		 */
		length?: null | '5' | '7' | '10' | 5 | 7 | 10;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Style applied to menu element (that is the `.slds-dropdown` element)
		 */
		menuStyle?: Record<string, any>;
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
		 */
		nubbinPosition?:
			| 'top left'
			| 'top'
			| 'top right'
			| 'bottom left'
			| 'bottom'
			| 'bottom right';
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
		 */
		openOn?: 'hover' | 'click' | 'hybrid';
		/**
		 * Called when a key pressed.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown?: (v: any) => any;
		/**
		 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseEnter?: (v: any) => any;
		/**
		 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseLeave?: (v: any) => any;
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		onSelect?: (v: any) => any;
		/**
		 * Triggered when the dropdown is opened.
		 */
		onOpen?: (v: any) => any;
		/**
		 * Triggered when the dropdown is closed.
		 */
		onClose?: (v: any) => any;
		/**
		 * An array of menu item objects. `className` and `id` object keys are applied to the `li` DOM node. `divider` key can have a value of `top` or `bottom`. `rightIcon` and `leftIcon` are not actually `Icon` components, but prop objects that get passed to an `Icon` component. The `href` key will be added to the `a` and its default click event will be prevented. Here is a sample:
		 * ```
		 * [{
		 *   className: 'custom-li-class',
		 *     divider: 'bottom',
		 *     label: 'A Header',
		 *     type: 'header'
		 *  }, {
		 *     href: 'http://sfdc.co/',
		 *     id: 'custom-li-id',
		 *     label: 'Has a value',
		 *   leftIcon: {
		 *    name: 'settings',
		 *    category: 'utility'
		 *   },
		 *   rightIcon: {
		 *    name: 'settings',
		 *    category: 'utility'
		 *   },
		 *     type: 'item',
		 *     value: 'B0'
		 *  }, {
		 *   tooltipContent: 'Displays a tooltip when hovered over with this content. The `tooltipMenuItem` prop must be set for this to work.',
		 *   type: 'divider'
		 * }]
		 * ```
		 */
		options?: any[];
		/**
		 * An object of CSS styles that are applied to the triggering button.
		 */
		style?: Record<string, any>;
		/**
		 * Write <code>"-1"</code> if you don't want the user to tab to the button.
		 */
		tabIndex?: string;
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay?: boolean | ((v: any) => any);
		/**
		 * Current selected menu item.
		 */
		value?: number | string | any[];
		/**
		 * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
		 */
		tooltip?: React.ReactNode;
		/**
		 * Accepts a `Tooltip` component to be used as the template for menu item tooltips that appear via the `tooltipContent` options object attribute. Must be present for `tooltipContent` to work
		 */
		tooltipMenuItem?: React.ReactNode;
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName?: any[] | Record<string, any> | string;
		/**
		 * Whether this dropdown supports multi select.
		 */
		multiple?: boolean;
		/**
		 *  To adjust the width of the menu dropdown
		 */
		width?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'bottom' | 'large';
	};
	/**
	 * The MenuDropdown component is a variant of the Lightning Design System Menu component. This component
	 * may require a polyfill such as [classList](https://github.com/yola/classlist-polyfill) due to
	 * [react-onclickoutside](https://github.com/Pomax/react-onclickoutside) if Internet Explorer 11
	 * support is needed.
	 *
	 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
