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
		image?: 'default' | 'none';

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

		/**
		 * Custom styles to be passed to the component container
		 */
		styleContainer?: Record<string, any>;

		/**
		 * Different brand band styling.
		 * NOTE: using 'lightning-blue' may result in incorrect styling depending on server CSP settings. See opening component documentation above for details.
		 */
		theme?: 'default' | 'lightning-blue';
	};
	/**
	 * The brand band provides theming capability that adds personality and improves information density and contrast.
	 *
	 * NOTE: you may find that themes other than 'default' fail to load the appropriate styling in your application.
	 * If this occurs the cause is very likely to be CSP settings on the server hosting your application protecting against style injections.
	 * Changing these settings is not recommended. Instead, add the following styles to any stylesheet provided by the server itself (such as an external stylesheet):
	 *
	 * When using 'lightning-theme':
	 * .slds-brand-band.dsr-brand-band_lightning-blue:before {
	 *     background-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png), linear-gradient(to top, rgba(175, 197, 222, 0) 0, #1B5F9E);
	 * }
	 * .slds-brand-band.dsr-brand-band_lightning-blue:after {
	 *     background-image: linear-gradient(to bottom, rgba(175, 197, 222, 0) 60%, #AFC5DE);
	 * }
	 *
	 * For more information on the problem, [see this Stack Overflow question](https://stackoverflow.com/questions/17766817/refused-to-apply-inline-style-because-it-violates-the-following-content-security)
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
