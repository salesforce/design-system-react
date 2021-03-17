declare module '@salesforce/design-system-react/components/utilities/menu-list/item-label' {
	import React from 'react';
	type Props = {
		data?: Record<string, any>;
		icon?: React.ReactNode;
		index?: number;
		inverted?: boolean;
		isSelected?: boolean;
		label?: string;
		value?: PropTypes.any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
