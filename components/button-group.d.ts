declare module '@salesforce/design-system-react/components/button-group' {
	import React from 'react';
	type Props = {
		/**
		 * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button. _Tested with snapshot testing._
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * CSS classes added to `slds-button-group` or `slds-checkbox_button-group` tag
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * If the `labels.label` prop is set, a `.slds-form-element` classed fieldset element is added as a container. This prop applies classes to that element
		 */
		classNameContainer?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `error`: Message to display when any of Checkboxes are in an error state. _Tested with snapshot testing._
		 * * `label`: This label appears above the button group. _Tested with snapshot testing._
		 */
		labels?: Partial<{
			error?: string;
			label?: string;
		}>;
		/**
		 * Use checkbox variant for "Checkbox Button Group" styling and add Checkbox components as children _Tested with snapshot testing._
		 */
		variant?: 'checkbox' | 'list';
	};
	/**
	 * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, Checkboxes, etc).
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
