declare module '@salesforce/design-system-react/components/data-table/private/row' {
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
		canSelectRows?: boolean | 'checkbox' | 'radio';
		className?: string;
		columns?: Partial<{
			Cell?: (v: any) => any;
			props?: Record<string, any>;
		}>[];
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
		 */
		fixedLayout?: boolean;
		id: string /*.isRequired*/;
		item: Record<string, any> /*.isRequired*/;
		onToggle?: (v: any) => any;
		rowActions?: React.ReactElement;
		selection?: any[];
		tableId?: string;
	};
	/**
	 * Used internally, provides row rendering to the DataTable.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
