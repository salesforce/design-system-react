declare module '@salesforce/design-system-react/components/progress-indicator/private/step' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `completedStep`: Label for a completed step. The default is `Completed Step`
		 * * `disabledStep`: Label for disabled step. The default is `Disabled Step`
		 * * `errorStep`: Label for a step with an error. The default is `Error Step`
		 * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`. You will need to calculate the percentage yourself if changing this string.
		 * * `step`: Label for a step. It will be typically followed by the number of the step such as "Step 1".
		 */
		assistiveText?: Partial<{
			completedStep?: string;
			disabledStep?: string;
			percentage?: string;
			step?: string;
		}>;
		/**
		 * Id for Steps, ranging in [0, steps.length).
		 */
		id?: number | string;
		/**
		 * Index of step. Used for id's if no step ID exists
		 */
		index?: number;
		/**
		 * Determines if the step has been completed
		 */

		isCompleted?: boolean;
		/**
		 * Determines if the step has been disabled
		 */
		isDisabled?: boolean;
		/**
		 * Determines if the step contains an error
		 */
		isError?: boolean;
		/**
		 * Determines if the step is currently selected (active)
		 */
		isSelected?: boolean;
		/**
		 * Label of tooltip attached to the step if applicable.
		 */
		label?: React.ReactNode;
		/**
		 * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to re-define it by passing a function as a prop
		 */
		onClick?: (v: any) => any;
		/**
		 * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to re-define it by passing a function as a prop
		 */
		onFocus?: (v: any) => any;
		/**
		 * Step object. This is passed into event callbacks.
		 */
		step?: Record<string, any>;
		/**
		 * Determines if the tooltip attached to step is always open.
		 * This is mainly for dev test purpose.
		 * Usually the tooltip should only show when hover.
		 */
		tooltipIsOpen?: boolean;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		tooltipPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	};
	/**
	 * Step renders a button icon and its tooltip if applied.
	 * The button is applied with different css classes under different conditions.
	 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
