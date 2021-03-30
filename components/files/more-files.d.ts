declare module '@salesforce/design-system-react/components/files/more-files' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 *  * count - description for the more files count
		 *  * image - description for the image
		 *  * link - description for the more files link
		 */
		assistiveText?: Partial<{
			count?: string;
			image?: string;
			link?: string;
		}>;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Controls different cropping aspect ratios for the component
		 */
		crop?: '16-by-9' | '4-by-3' | '1-by-1';
		/**
		 * Link to thumbnail image
		 */
		image?: string;
		/**
		 * Controls the number of additional files that is displayed
		 */
		count?: string;
		/**
		 * Href attribute for image
		 */
		href?: string;
	};
	/**
	 * MoreFiles is a component that represents a number of file contents uploaded as an attachment.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
