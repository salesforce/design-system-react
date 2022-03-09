declare module '@salesforce/design-system-react/components/global-header/private/dropdown-trigger' {
	import React from 'react';
	type Props = {
		/**
		 * An image URL or avatar node to display for the user profile.
		 */
		avatar?: string | React.ReactNode;
		/**
		 * CSS classes to be added to `li` element.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Informs the trigger on the open/close state of the dropdown menu
		 */
		isOpen?: boolean;
		/**
		 * Adds custom styling such as inverse fill and special sizing/spacing
		 */
		globalAction?: boolean;
		/**
		 * The dropdown menu.
		 */
		menu?: React.ReactNode;
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Called when a key pressed.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Called when mouse clicks down on the trigger li.
		 */
		onMouseDown?: (v: any) => any;
		/**
		 * Called when mouse hovers over the trigger `li`.
		 */
		onMouseEnter?: (v: any) => any;
		/**
		 * Called when mouse leaves trigger `li` or the menu.
		 */
		onMouseLeave?: (v: any) => any;
		/**
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn?: 'hover' | 'click' | 'hybrid';
		/**
		 * Set to true if menu is inline and relatively positioned with CSS. This is the typical use case for menus with nubbins.
		 */
		positioned?: boolean;
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef?: (v: any) => any;
	};
	/**
	 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
