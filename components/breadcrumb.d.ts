declare module '@salesforce/design-system-react/components/breadcrumb' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `label`: The assistive text for the breadcrumb trail.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Overflow menu of the type [Dropdown](/components/menu-dropdowns)
		 */
		overflowDropdownMenu?: React.ReactNode;
		/**
		 * Custom styles to be passed to the containing `nav` tag
		 */
		styleContainer?: Record<string, any>;
		/**
		 * An array of anchor elements that define the path to the current record.
		 */
		trail: any[] /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
