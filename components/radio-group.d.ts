declare module '@salesforce/design-system-react/components/radio-group' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `label`: This label appears in the legend.
		 * * `required`: Text to help identify the group as required
		 */
		assistiveText?: Partial<{
			label?: string;
			required?: string;
		}>;
		/**
		 * Children are expected to be Radio components.
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * Custom CSS classes added to the node.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `error`: Message to display when any of Checkboxes are in an error state.
		 * * `label`: This label appears above the radio group.
		 */
		labels?: Partial<{
			error?: string;
			label?: string;
		}>;
		/**
		 * This event fires when the radio selection changes.
		 */
		onChange?: (v: any) => any;
		/**
		 * Disable all radio inputs.
		 */
		disabled?: boolean;
		/**
		 * Adds an indicator that this field is required.
		 */
		required?: boolean;
		/**
		 * The name of this radio group.
		 */
		name?: string;
		/**
		 * The ID of the error message, for linking to radio inputs with aria-describedby.
		 */
		errorId?: string;
		/**
		 * Variants of radio groups such as Radio Button Group
		 */
		variant?: 'base' | 'button-group';
	};
	/**
	 * A styled select list that can have a single entry checked at any one time.
	 * The RadioGroup component wraps [Radio](/components/radios) components, which should be used as children.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
