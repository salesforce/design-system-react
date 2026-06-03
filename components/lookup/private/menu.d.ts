import React from 'react';
type Props = {
	boldRegex?: RegExp;
	emptyMessage?: string | React.ReactElement;
	filterWith?: (v: any) => any;
	focusIndex?: number;
	getListLength?: (v: any) => any;
	iconCategory?: string;
	items?: any[];
	label?: string;
	listLength?: number;
	searchTerm?: string;
	setFocus?: (v: any) => any;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
