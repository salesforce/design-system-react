declare module '@salesforce/design-system-react/components/utilities/utility-icon' {
	import React from 'react';
	type Props = {
		assistiveText?: Record<string, any>;
		category?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
		/**
		 * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
		 */
		icon?: Record<string, any>;
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name?: string;
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		path?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
