declare module '@salesforce/design-system-react/components/brand-band' {
	import React from 'react';
	type Props = {
		/**
		 * Primary application grid layout or a white background component such as a `Card` should be passed into this component.
		 */
		children?: React.ReactNode;

		/**
		 * CSS classes that are applied to the component
		 */
		className?: any[] | Record<string, any> | string;

		/**
		 * Id of component, if desired. If not provided an id is automatically generated
		 */
		id?: string;

		/**
		 * Image of the brand band
		 */
		image?: 'default' | 'none' | 'user' | 'group';

		/**
		 * Background size of the brand band. Default is 'contain'
		 */
		backgroundSize?: 'contain' | 'cover';
		/**
		 * Size of the brand band. Default is 'medium'
		 */
		size?: 'small' | 'medium' | 'large';

		/**
		 * Custom styles to be passed to the component
		 */
		style?: Record<string, any>;
	};
	/**
	 * The brand band provides theming capability that adds personality and improves information density and contrast.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
