declare module '@salesforce/design-system-react/components/progress-indicator' {
	import React from 'react';

	type Step = {
		id: string | number;
		label: string | JSX.Element;
		assistiveText?: string;
	};

	type StepState = {
		isCompleted: boolean;
		isDisabled: boolean;
		isError: boolean;
		isSelected: boolean;
		step: Step;
	};

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
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Stores all completed steps. It is an array of step objects.
		 */
		completedSteps?: Step[];
		/**
		 * Stores all disabled steps. It is an array of step objects. Steps are still clickable/focusable,
		 * this only disables cursor change and removes onClick and onFocus event callbacks.
		 */
		disabledSteps?: Step[];
		/**
		 * Stores all error steps. It is an array of step objects and usually there is only one error step, the current step. If an error occurs a second error icon should be placed to the left of related confirmation buttons (e.g. Cancel, Save) and an Error Popover should appear indicating there are errors. These additional items are NOT part of this component. This note was included for visibility purposes. Please refer to [SLDS website](https://www.lightningdesignsystem.com/components/progress-indicator/) for full details **
		 */
		errorSteps?: Step[];
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Determines the orientation of the progress indicator
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Triggered when an individual step is clicked. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
		 * ```
		 * const handleStepClick = function(event, data) { console.log(data); };
		 *   <ProgressIndicator onStepClick={handleStepClick} />
		 * ```
		 */
		onStepClick?: (
			event: React.ChangeEvent<HTMLInputElement>,
			data: StepState
		) => void;
		/**
		 * Triggered when an individual step is focused. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
		 * ```
		 * const handleStepFocus = function(event, data) { console.log(data); };
		 *   <ProgressIndicator onStepFocus={handleStepFocus} />
		 * ```
		 */
		onStepFocus?: (
			event: React.ChangeEvent<HTMLInputElement>,
			data: StepState
		) => void;
		/**
		 * Represents the currently selected or active step. It is a step object.
		 */
		selectedStep: Step /* .isRequired */;
		/**
		 * It is an array of step objects in the following form:
		 * ```
		 *  [{
		 *    id: <number> or <string>, has to be unique
		 *    label: <string>, representing the tooltip content
		 *    assistiveText: <string>, The default is `[Step props.index + 1]: [status]`. Status is if the step has been completed or in an error state.
		 *  }],
		 *  ```
		 */
		steps: Step[] /* .isRequired */;
		/**
		 * Stores all steps with opened tooltips. This property is mainly for development purposes. The tooltip should only show on hover for the user.
		 */
		tooltipIsOpenSteps?: Step[];
		/**
		 * Determines component style.
		 */
		variant?: 'base' | 'modal' | 'setup-assistant';
		/**
		 * Please select one of the following:
		 * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		tooltipPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	};
	/**
	 * Progress Indicator is a component that communicates to the user the progress of a particular process.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
