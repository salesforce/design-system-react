declare module '@salesforce/design-system-react/components/utilities/truncate' {
	import React from 'react';
	type Props = {
		containerClassName?: string;
		line?: number;
		prefix?: string;
		suffix?: string;
		text?: string;
		textTruncateChild?: React.ReactNode;
		truncateText?: string;
		wrapper?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
