declare module '@salesforce/design-system-react/components/setup-assistant' {
	import React from 'react';
	type Props = {
		/**
		 * Accepts SetupAssistantStep components only as children.
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Dictates whether this setup assistant has card wrappings and styling
		 */
		isCard?: boolean;
		/**
		 * Function to handle opening / closing of steps when the step is expandable. Passes event object and step `index`, `isOpen`, and `step` props as data.
		 */
		onStepToggleIsOpen?: (event: React.SyntheticEvent, v: any) => any;
		/**
		 * Accepts a progress bar component, which will only be visible if `isCard` is enabled
		 */
		progressBar?: React.ReactNode;
	};
	/**
	 * Setup Assistant provides Administrators with a centralized list of tasks for
	 * onboarding organizations, clouds, or features within the Salesforce Platform.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
