declare module '@salesforce/design-system-react/components/button-stateful' {
	import React from 'react';
	type Props = {
		/**
		 * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
		 */
		active?: boolean;
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. This should also include the state of the button. If the button has an icon and a visible label, you can omit the <code>icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * Disables the button and adds disabled styling.
		 */
		disabled?: boolean;
		/**
		 * Icon associated with the stateful button. Accepts an `Icon` component
		 */
		icon?: React.ReactNode;
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
		 * If true, button scales to 100% width on small form factors.
		 */
		responsive?: boolean;
		/**
		 * Initial label and icon (optional) of button.
		 */
		stateOne?: Record<string, any>;
		/**
		 * Selected label and icon (optional) of button.
		 */
		stateTwo?: Record<string, any>;
		/**
		 * Deselect label and icon (optional) of button.
		 */
		stateThree?: Record<string, any>;
		/**
		 * Write "-1" if you don't want the user to tab to the button.
		 */
		tabIndex?: string;
		/**
		 * Different types of buttons
		 */
		variant?:
			| 'base'
			| 'neutral'
			| 'brand'
			| 'destructive'
			| 'icon'
			| 'icon-filled';
	};
	/**
	 * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
	 * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
	 * Although not listed in the prop table, all `aria-*` props will be added to the button element if passed in.
	 * If no `aria-*` props are passed in, <code>aria-live='polite'</code> is used for `icon` and `icon-filled` variants,
	 * and <code>aria-live='assertive'</code> is used for the remaining variants.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
