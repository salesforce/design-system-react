declare module '@salesforce/design-system-react/components/global-header/search' {
	import React from 'react';
	type Props = {
		/**
		 * A required `Combobox` component. The props from this combobox will be merged and override any default props.
		 */
		combobox: React.ReactNode /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
