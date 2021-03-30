declare module '@salesforce/design-system-react/components/files/file' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 *  * download - description for the download button if present
		 *  * image - description for the file image
		 *  * link - description for the file link
		 *  * loading - description for the loading spinner if present
		 *  * moreActions - description for the more actions dropdown if present
		 */
		assistiveText?: Partial<{
			download?: string;
			image?: string;
			link?: string;
			loading?: string;
			moreActions?: string;
		}>;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Controls different cropping aspect ratios for the component
		 */
		crop?: '16-by-9' | '4-by-3' | '1-by-1';
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Action to be done on clicking download button; doesn't show download button if empty
		 */
		onClickDownload?: (v: any) => any;
		/**
		 * Function that is called when image is clicked; can be used instead of href for more advanced event handling
		 */
		onClickImage?: (v: any) => any;
		/**
		 * Dropdown for more actions button; doesn't show more actions button if empty
		 */
		moreActionsDropdown?: React.ReactNode;
		/**
		 * Icon associated with the file. Accepts an Icon component
		 */
		icon?: React.ReactNode;
		/**
		 * Icon to be shown in top left corner of File component. Accepts an Icon component
		 */
		externalIcon?: React.ReactNode;
		/**
		 * Link to thumbnail image
		 */
		image?: string;
		/**
		 * Controls whether file preview is loading
		 */
		isLoading?: boolean;
		/**
		 * Href attribute for image
		 */
		href?: string;
		/**
		 * Labels for the File Component
		 * * image - title for the file. Required.
		 */
		labels?: Partial<{
			title: string /*.isRequired*/;
		}>;
		/**
		 *  Controls whether the file's title should be visible
		 */
		hasNoVisibleTitle?: boolean;
	};
	/**
	 * File is a component that represents content uploaded as an attachment.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
