declare module '@salesforce/design-system-react/components/expandable-section' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * * `toggleSection`: Label for the icon that expands / collapses the section
		 */
		assistiveText?: Partial<{
			toggleSection?: string;
		}>;
		/**
		 * Contents of the section
		 */
		children?: React.ReactNode;
		/**
		 * Class names to be added to the `slds-section` classed node
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Unique identifier for the expandable section. The id is automatically generated if not provided
		 */
		id?: string;
		/**
		 * Specifies whether the section is expanded or collapsed. If not provided, component will use its own state to manage this itself
		 */
		isOpen?: boolean;
		/**
		 * Specifies whether the section can be expanded or collapsed. Defaults to `false`
		 */
		nonCollapsible?: boolean;
		/**
		 * Callback for when the section is expanded or collapsed. Passes event object and data object with `isOpen` bool.
		 */
		onToggleOpen?: (v: any) => any;
		/**
		 * The title for the section
		 */
		title: string /*.isRequired*/;
	};
	/**
	 * Toggle visibility of section content with the Expandable Section
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
