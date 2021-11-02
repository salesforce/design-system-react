declare module '@salesforce/design-system-react/components/data-table/private/head' {
	import React from 'react';
	type Props = {
		assistiveText?: Partial<{
			actionsHeader?: string;
			columnSort?: string;
			columnSortedAscending?: string;
			columnSortedDescending?: string;
			selectAllRows?: string;
			selectRow?: string;
		}>;
		allSelected?: boolean;
		headerRefs?: (v: any) => any;
		indeterminateSelected?: boolean;
		canSelectRows?: boolean | 'checkbox' | 'radio';
		columns?: Partial<{
			Cell?: (v: any) => any;
			props?: Record<string, any>;
		}>[];
		fixedHeader?: boolean;
		id?: string;
		onToggleAll?: (v: any) => any;
		onSort?: (v: any) => any;
		showRowActions?: boolean;
	};
	/**
	 * Used internally, provides header row rendering to the DataTable.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
