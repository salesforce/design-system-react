declare module '@salesforce/design-system-react/components/card' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes to be added to the card body (wraps children).
		 */
		bodyClassName?: any[] | Record<string, any> | string;
		/**
		 * The main section of the card. It often contains a `DataTable` or `Tile`.
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to the card.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
		 */
		empty?: boolean | React.ReactNode;
		/**
		 * Adds a filter input to the card header.
		 */
		filter?: React.ReactNode;
		/**
		 * Footer often contains pagination.
		 */
		footer?: React.ReactNode;
		/**
		 * Allows card to have no header, and ignores header related props altogether.
		 */
		hasNoHeader?: boolean;
		/**
		 * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed into the media object from Card if present. Use `design-system-react/components/media-object` to create your own custom header.
		 */
		header?: React.ReactNode;
		/**
		 * The heading is the name of the related item group and should only contain inline elements.
		 */
		heading: React.ReactNode | string /*.isRequired*/;
		/**
		 * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
		 */
		headerActions?: React.ReactNode;
		/**
		 * Icon associated with the items within the `body`.
		 */
		icon?: React.ReactNode;
		/**
		 * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
		 */
		id?: string;
		/**
		 * Custom styles to be added to the card.
		 */
		style?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
