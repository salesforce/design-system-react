declare module '@salesforce/design-system-react/components/tooltip' {
	import React from 'react';
	type Props = {
		/**
		 * Alignment of the Tooltip relative to the element that triggers it.
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
			| 'left bottom' /*.isRequired*/;
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `tooltipTipLearnMoreIcon`: This text is inside the info icon within the tooltip content and exists to "complete the sentence" for assistive tech users.
		 * * `triggerLearnMoreIcon`: This text is inside the info icon that triggers the tooltip in order to have text within the link.
		 */
		assistiveText?: Partial<{
			tooltipTipLearnMoreIcon?: string;
			triggerLearnMoreIcon?: string;
		}>;
		/**
		 * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
		 */
		children?: React.ReactNode;
		/**
		 * Content inside Tooltip.
		 */
		content: React.ReactNode /*.isRequired*/;
		/**
		 * CSS classes to be added to the popover dialog. That is the element with `.slds-popover` on it.
		 */
		dialogClassName?: any[] | Record<string, any> | string;
		/**
		 * Enabling this hides the default nubbin, replacing it with one attached directly to the tooltip trigger. Note: `hasStaticAlignment` should be set to `true` if using this feature as auto-flipping anchored nubbins are not currently supported.
		 */
		hasAnchoredNubbin?: boolean;
		/**
		 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment?: boolean;
		/**
		 * Delay on Tooltip closing in milliseconds. Defaults to 50
		 */
		hoverCloseDelay?: number;
		/**
		 * Delay on Tooltip opening in milliseconds. Defaults to 0
		 */
		hoverOpenDelay?: number;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `learnMoreAfter`: This label appears in the tooltip after the info icon.
		 * * `learnMoreBefore`: This label appears in the tooltip before the info icon.
		 */
		labels?: Partial<{
			learnMoreAfter?: string;
			learnMoreBefore?: string;
		}>;
		/**
		 * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
		 */
		isOpen?: boolean;
		/**
		 * Callback that returns an element or React `ref` to align the Tooltip with.
		 */
		onRequestTargetElement?: (v: any) => any;
		/**
		 * CSS classes to be added to tag with `slds-tooltip-trigger`.
		 */
		triggerClassName?: any[] | Record<string, any> | string;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		position?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Custom styles to be added to wrapping triggering `div`.
		 */
		triggerStyle?: Record<string, any>;
		/**
		 * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background). This used to be `variant`.
		 */
		theme?: 'info' | 'error';
		/**
		 * Determines the type of the tooltip.
		 */
		variant?: 'base' | 'learnMore' | 'list-item';
	};
	/**
	 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
