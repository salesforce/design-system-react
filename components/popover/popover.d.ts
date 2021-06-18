declare module '@salesforce/design-system-react/components/popover/popover' {
	import React from 'react';
	type Props = {
		/**
		 * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
		 */
		align?:
			| 'top'
			| 'top left'
			| 'top right'
			| 'right'
			| 'right top'
			| 'right bottom'
			| 'bottom'
			| 'bottom left'
			| 'bottom right'
			| 'left'
			| 'left top'
			| 'left bottom';
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `closeButton`: This is a visually hidden label for the close button.
		 */
		assistiveText?: Partial<{
			closeButton?: string;
		}>;
		/**
		 * HTML `id` of heading for popover. Only use if your header is within your popover body.
		 */
		ariaLabelledby?: string;
		/**
		 * Multiple children of any kind are allowed, but the first child must serve as the trigger component. Many props will be passed into this trigger related to popover interactions. The trigger needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * The contents of the popover. This should also accept arrays.
		 */
		body: React.ReactNode | any[] /*.isRequired*/;
		/**
		 * CSS classes to be added to the popover footer. That is the element with `.slds-popover__body` on it.
		 */
		classNameBody?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to the popover footer. That is the element with `.slds-popover__footer` on it.
		 */
		classNameFooter?: any[] | Record<string, any> | string;
		/**
		 * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
		 */
		disabled?: boolean;
		/**
		 * A footer is an optional. Buttons are often placed here.
		 */
		footer?: React.ReactNode;
		/**
		 * An object of CSS styles that are applied to the `slds-popover__footer` DOM element.
		 */
		footerStyle?: Record<string, any>;
		/**
		 * Used with `walkthrough` variant to provide action buttons (ex: "Next" / "Skip" / etc) for a walkthrough popover footer. Accepts either a single node or array of nodes for multiple buttons.
		 */
		footerWalkthroughActions?: React.ReactNode | React.ReactNode[];
		/**
		 * Determines if the popover has a close button or not. Default is `false`
		 */
		hasNoCloseButton?: boolean;
		/**
		 * Determines if the popover has a nubbin or not. Default is `false`
		 */
		hasNoNubbin?: boolean;
		/**
		 * Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen. When enabled, `position` `absolute` is used.
		 */
		hasStaticAlignment?: boolean;
		/**
		 * Removes `display:inline-block` from the trigger button.
		 */
		hasNoTriggerStyles?: boolean;
		/**
		 * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag, or in an h2 within the popover body if used with `variant="walkthrough-action"`. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
		 */
		heading?: string | React.ReactNode;
		/**
		 * Icon displayed in the `feature` variant
		 */
		icon?: React.ReactNode;
		/**
		 * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
		 */
		id?: string;
		/**
		 * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
		 */
		isOpen?: boolean;
		/**
		 * This function is passed onto the triggering `Button`. Triggered when the trigger button is clicked. You will want this if Popover is to be a controlled component.
		 */
		onClick?: (v: any) => any;
		/**
		 * This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM. This function returns `{event, { trigger, componentWillUnmount }`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
		 */
		onClose?: (v: any) => any;
		/**
		 * Called when a key is pressed.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown?: (v: any) => any;
		/**
		 * This function is triggered when the Dialog child component (that is the actual popover) is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
		 */
		onOpen?: (v: any) => any;
		/**
		 * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Callback that returns an element or React `ref` to align the Popover with. If the target element has not been rendered yet, the popover will use the triggering element as the attachment target instead. NOTE: `position="relative"` is not compatible with custom targets that are not the triggering element.
		 */
		onRequestTargetElement?: (v: any) => any;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing. NOTE: this setting is not compatible with custom targets outside the trigger
		 */
		position?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Used with `walkthrough` variant to provide the step text (ex: "Step 1 of 4") for a walkthrough popover footer. If used with `variant="walkthrough-action"`, it will be placed in the popover body.
		 */
		stepText?: string;
		/**
		 * An object of CSS styles that are applied to the `slds-popover` DOM element.
		 */
		style?: Record<string, any>;
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay?: boolean | ((v: any) => any);
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName?: any[] | Record<string, any> | string;
		/**
		 * Determines the type of the popover. `error` and `warning` allows the  content body to scroll. Default is `base` _Tested with snaphots._
		 */
		variant?:
			| 'base'
			| 'error'
			| 'feature'
			| 'walkthrough'
			| 'walkthrough-action'
			| 'warning';
	};
	/**
	 * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked. Multiple popovers open at the same time, each with focus trap is not supported.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
