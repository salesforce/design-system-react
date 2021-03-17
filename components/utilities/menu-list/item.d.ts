declare module '@salesforce/design-system-react/components/utilities/menu-list/item' {
	import React from 'react';
	type Props = {
		'aria-disabled'?: boolean;
		className?: any[] | Record<string, any> | string;
		checkmark?: boolean;
		data?: Record<string, any>;
		divider?: 'top' | 'bottom';
		href?: string;
		id: string /*.isRequired*/;
		index: number /*.isRequired*/;
		inverted?: boolean;
		isSelected?: boolean;
		label?: string;
		labelRenderer?: (v: any) => any;
		leftIcon?: Partial<{
			category?: string;
			name?: string;
		}>;
		onSelect: (v: any) => any /*.isRequired*/;
		rightIcon?: Partial<{
			category?: string;
			name?: string;
		}>;
		tooltipContent?: React.ReactNode | string;
		tooltipTemplate?: React.ReactNode;
		type?: string;
		value?: PropTypes.any;
	};
	/**
	 * Component description.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
