declare module '@salesforce/design-system-react/components/color-picker/private/swatch' {
	import React from 'react';
	type Props = {
		color: string /*.isRequired*/;
	};

	function Component(props: Props): React.ReactNode;
	export default Component;
}
