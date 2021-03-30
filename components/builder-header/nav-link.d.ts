declare module '@salesforce/design-system-react/components/builder-header/nav-link' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Used for the icon next to the link text.
		 * * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		iconPath?: string;
		/**
		 * Text for the link.
		 */
		label?: string;
		/**
		 * Triggered when the link is clicked.
		 */
		onClick?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
