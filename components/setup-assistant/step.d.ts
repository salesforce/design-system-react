declare module '@salesforce/design-system-react/components/setup-assistant/step' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `expandStep`: Button that examples a step
		 * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			expandStep?: string;
		}>;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Detailed description of the step
		 */
		description?: string | React.ReactNode;
		/**
		 * Estimated time for completing the step
		 */
		estimatedTime?: string | React.ReactNode;
		/**
		 * Heading for the step
		 */
		heading?: string | React.ReactNode;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Index of the step within the step array
		 */
		index?: number;
		/**
		 * Dictates whether the step can be expanded / collapsed
		 */
		isExpandable?: boolean;
		/**
		 * If `isExpandable` is true, this prop can be used to control the expanded state. If not provided state will be used instead
		 */
		isOpen?: boolean;
		/**
		 * Function that is called to render a step's available action(s). Typically returns a Button, Button of variant "link," or Checkbox of variant "toggle"
		 */
		onRenderAction?: (v: any) => any;
		/**
		 * Function that is called to render step content. Typically returns a ProgressIndicator and/or ScopedNotification component
		 */
		onRenderContent?: (v: any) => any;
		/**
		 * Function that is called to render content within the media figure. Expects to be returned an Icon or ProgressRing component
		 */
		onRenderFigure?: (v: any) => any;
		/**
		 * Function to handle requests to expand / collapse the step
		 */
		onToggleIsOpen?: (v: any) => any;
		/**
		 * Percentage of step completed. No progress indicator will be shown for the step unless this is provided
		 */
		progress?: number;
		/**
		 * Display number for the step. Only appears if progress indicator is enabled. Determined automatically by parent if not provided.
		 */
		stepNumber?: number;
	};
	/**
	 * Setup Assistant Step component is used to specify individual items within the Setup Assistant
	 * filled with learning and task links along with a recommended sequence that may have progress tracking
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
