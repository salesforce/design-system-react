declare module '@salesforce/design-system-react/components/media-object' {
	import React from 'react';
	type Props = {
		/**
		 * Often the body may need to be truncated for correct layout. This is only applicable if using the component within a flexbox container.
		 */
		canTruncate?: boolean;
		/**
		 * Class names to be added to the component's HTML tag with `slds-media` class.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The body is often text such as a heading or paragraph.
		 */
		body?: React.ReactNode;
		/**
		 * The figure is the optional visualization of the text within the body.
		 */
		figure?: React.ReactNode;
		/**
		 * Vertically centers the body with the middle of the figure.
		 */
		verticalCenter?: boolean;
	};
	/**
	 * When you need text and a figure next to each other, use a media object.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
