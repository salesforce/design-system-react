declare module '@salesforce/design-system-react/components/global-navigation-bar/dropdown-trigger' {
	import React from 'react';
	type Props = {
		/**
		 * Whether the item is active or not.
		 */
		active?: boolean;
		/**
		 * Allows alignment of active item with active application background color.
		 */
		activeBackgroundColor?: string;
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * CSS classes to be added to the 'li'.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Allows the dropdown menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
		 */
		isOpen?: boolean;
		/**
		 * Visible label on the dropdown menu trigger button.
		 */
		label?: string;
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
		 * Called when mouse clicks down on the trigger `li`.
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
