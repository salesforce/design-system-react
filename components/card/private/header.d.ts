declare module '@salesforce/design-system-react/components/card/private/header' {
	import React from 'react';
	type Props = {
		/**
		 * Adds a filter input to the card header
		 */
		filter?: React.ReactNode;
		/**
		 * Set the HTML `id` of the card filter.
		 */
		filterId?: string;
		/**
		 * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed in the media object from Card. Use `design-system-react/components/media-object` to create your own.
		 */
		header?: React.ReactNode;
		/**
		 * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
		 */
		headerActions?: React.ReactNode;
		/**
		 * Set the HTML `id` of the card header actions.
		 */
		headerActionsId?: string;
		/**
		 * The heading is the name of the related item group.
		 */
		heading?: React.ReactElement | string;
		/*.isRequired*/
		/**
		 * Set the HTML `id` of the card heading.
		 */
		headingId?: string;
		/**
		 * Icon associated with grouped items
		 */
		icon?: React.ReactNode;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
