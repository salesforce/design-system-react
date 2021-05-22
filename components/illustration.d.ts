declare module '@salesforce/design-system-react/components/illustration' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes that are applied to the SVG. _Tested with Mocha testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * A heading text. It is required if illustration is present. _Tested with snapshot testing._ _Tested with Mocha testing._
		 */
		heading?: string;
		/**
		 * A custom SVG object to use instead of the supplied SLDS illustrations, look in `design-system-react/icons` for examples and syntax. _Tested with snapshot testing._ _Tested with Mocha testing._
		 */
		illustration?: Record<string, any>;
		/**
		 * Indicates whether the illustration SVGs are from the design-system-react repo. If yes, set to true.
		 */
		internalIllustration: boolean /*.isRequired*/;
		/**
		 * A message body below the heading to further communicate the state of the component. _Tested with snapshot testing._ _Tested with Mocha testing._
		 */
		messageBody?: string | React.ReactNode;
		/**
		 * Name of the illustration. Visit <a href='https://lightningdesignsystem.com/components/illustration/'>Lightning Design System Illustration</a> to reference illustration names. _Tested with snapshot testing._ _Tested with Mocha testing._
		 */
		name?: string;
		/**
		 * Path to the illustration SVG image. _Tested with snapshot testing._
		 */
		path?: string;
		/**
		 * Size of the illustration. _Tested with snapshot testing._ _Tested with Mocha testing._
		 */
		size?: 'small' | 'large';
		/**
		 * Custom styles to be passed to the illustration SVG. _Tested with Mocha testing._
		 */
		style?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
