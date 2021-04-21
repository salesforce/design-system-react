declare module '@salesforce/design-system-react/components/pill-container' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `listboxLabel`: This is a label for the listbox. The default is `Selected Options:`.
		 * * `removePill`: Used to remove a selected item (pill). Focus is on the pill. This is not a button. The default is `Press delete or backspace to remove`.
		 */
		assistiveText?: Partial<{
			listboxLabel?: string;
			removePill?: string;
		}>;
		/**
		 * CSS classes to be added to the pill container
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for pill container
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * * `removePillTitle`: Title on `X` icon
		 */
		labels?: Partial<{
			removePillTitle?: string;
		}>;
		/**
		 * **Array of pill objects.**
		 * Each object can contain:
		 * * `avatar`: An `Avatar` component.
		 * * `error`: Adds error styling
		 * * `icon`: An `Icon` component.
		 * * `id`: A unique identifier string.
		 * * `label`: A primary string of text.
		 * * `title`: Text that appears on mouse hover. Most helpful for long labels.
		 * ```
		 * {
		 * 	id: '2',
		 * 	label: 'Salesforce.com, Inc.',
		 * 	title: 'Salesforce.com, Inc. - Want to work here?',
		 * },
		 * ```
		 * `options` with array length of zero will remove this component from the DOM.
		 */
		options?: Partial<{
			avatar?:
				| React.ReactNode
				| Partial<{
						imgSrc?: string;
						title?: string;
						variant?: string;
				  }>;
			bare?: boolean;
			error?: boolean;
			icon?:
				| React.ReactNode
				| Partial<{
						category?: string;
						name?: string;
				  }>;
			id?: string;
			label?: React.ReactNode | string;
			title?: string;
		}>[];
		/**
		 * Function called when a pill is clicked
		 */
		onClickPill?: (v: any) => any;
		/**
		 * Function called when a pill is requested to be 'removed' via the delete key or 'X' icon click.
		 */
		onRequestRemovePill?: (v: any) => any;
		/**
		 * Custom style object to be passed to the pill container
		 */
		style?: Record<string, any>;
		/**
		 * Specifies the pill styling at the container level. `bare` removes border styling from all pills.
		 */
		variant?: 'base' | 'bare';
	};
	/**
	 * A `PillContainer` is a container that holds one or more pills. Use it for a list of pills in a container that resembles an `input` form field. It is not intended for navigation.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
