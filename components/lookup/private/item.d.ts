declare module '@salesforce/design-system-react/components/lookup/private/item' {
	import React from 'react';
	type Props = {
		data?: Record<string, any>;
		handleItemFocus?: (v: any) => any;
		href?: string;
		iconCategory?: string;
		id?: string;
		index?: number;
		isActive?: boolean;
		isDisabled?: boolean;
		listItemLabelRenderer?: (v: any) => any;
		onSelect?: (v: any) => any;
		searchTerm?: string;
		setFocus?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
