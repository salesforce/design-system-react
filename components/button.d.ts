declare module '@salesforce/design-system-react/components/button' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;

		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef?: (v: any) => any;
		/**
		 * CSS classes to be added to button.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Disables the button and adds disabled styling.
		 */
		disabled?: boolean;
		/**
		 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint?: boolean;
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
		/**
		 * CSS classes to be added to icon.
		 */
		iconClassName?: any[] | Record<string, any> | string;
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		iconPath?: string;
		/**
		 * If omitted, icon position is centered.
		 */
		iconPosition?: 'left' | 'right';
		/**
		 * Determines the size of the icon.
		 */
		iconSize?: 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant?:
			| 'bare'
			| 'container'
			| 'border'
			| 'border-filled'
			| 'brand'
			| 'more'
			| 'global-header';
		/**
		 * Id string applied to button node.
		 */
		id?: string;
		/**
		 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
		 */
		inverse?: boolean;
		/**
		 * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText.icon</code> prop.
		 */
		label?: string | React.ReactNode;
		/**
		 * Triggered when focus is removed.
		 */
		onBlur?: (v: any) => any;
		/**
		 * Triggered when the button is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Triggered when component is focused.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Triggered when a key is pressed down
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Triggered when a key is pressed and released
		 */
		onKeyPress?: (v: any) => any;
		/**
		 * Triggered when a key is released
		 */
		onKeyUp?: (v: any) => any;
		/**
		 * Triggered when a mouse button is pressed down
		 */
		onMouseDown?: (v: any) => any;
		/**
		 * Triggered when a mouse arrow hovers
		 */
		onMouseEnter?: (v: any) => any;
		/**
		 * Triggered when a mouse arrow no longer hovers
		 */
		onMouseLeave?: (v: any) => any;
		/**
		 * Triggered when a mouse button is released
		 */
		onMouseUp?: (v: any) => any;
		/**
		 * If true, button scales to 100% width on small form factors.
		 */
		responsive?: boolean;
		/**
		 * Write <code>"-1"</code> if you don't want the user to tab to the button.
		 */
		tabIndex?: string;
		/**
		 * Button type
		 */
		type?: 'reset' | 'submit' | 'button';
		/**
		 * HTML title attribute
		 */
		title?: string;
		/**
		 * [Deprecated] Tooltip on button. Button should be a child of `Tooltip` instead.
		 */
		tooltip?: React.ReactNode;
		/**
		 * Different types of buttons
		 */
		variant?:
			| 'base'
			| 'link'
			| 'neutral'
			| 'brand'
			| 'outline-brand'
			| 'destructive'
			| 'success'
			| 'text-destructive'
			| 'icon';
		/**
		 * Custom styles to be passed to the component
		 */
		style?: Record<string, any>;

		children?: React.ReactNode;
	};
	/**
	 * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
	 * Either a <code>label</code> or <code>assistiveText.icon</code> is required; see the Prop Details table below. For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
	 * Although not listed in the prop table, all `aria-*` and `form*` props will be added to the `button` element if passed in.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
