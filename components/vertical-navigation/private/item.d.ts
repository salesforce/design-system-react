declare module '@salesforce/design-system-react/components/vertical-navigation/private/item' {
	import React from 'react';
	type Props = {
		/**
		 * Item to be rendered.
		 */
		item?: Partial<{
			id: string /*.isRequired*/;
			label: string /*.isRequired*/;
			url?: string;
			icon?: any;
			notificationBadge?: any;
		}>;
		/**
		 * Whether item is selected or not.
		 */
		isSelected?: boolean;
		/**
		 * ID of the category this item belongs to.
		 */
		categoryId: string /*.isRequired*/;
		/**
		 * Function that will run whenever an item is selected.
		 */
		onSelect?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
