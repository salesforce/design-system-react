declare module '@salesforce/design-system-react/components/menu-dropdown/button-trigger' {
	import React from 'react';
	type Props = {
		/**
		 * Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the triggering button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to allow functionality and accessibility.
		 * ```
		 * <Dropdown>
		 *   <Trigger>
		 *   <Button iconCategory="utility" iconName="settings" />
		 *   </Trigger>
		 * </Dropdown>
		 * ```
		 */
		children?: React.ReactElement;
		/**
		 * CSS classes to be added to triggering button.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
		 */
		id?: string;
		/**
		 * Informs the trigger on the open/close state of the dropdown menu
		 */
		isOpen?: boolean;
		/**
		 * By Default the dropdown menu is inside a `Dialog` component.
		 */
		menu?: React.ReactNode;
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
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn?: 'hover' | 'click' | 'hybrid';
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef?: (v: any) => any;
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName?: any[] | Record<string, any> | string;
	};
	/**
	 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
