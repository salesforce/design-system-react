declare module '@salesforce/design-system-react/components/files/private/file-figure' {
	import React from 'react';
	type Props = {
		assistiveText?: Partial<{
			image?: string;
		}>;
		/**
		 *  Whether the file figure is loading
		 */
		isLoading?: boolean;
		/**
		 *  Image/Figure for the file
		 */
		image?: string;
		/**
		 *  Labels for the file figure component
		 */
		labels?: Partial<{
			title: string /*.isRequired*/;
		}>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
