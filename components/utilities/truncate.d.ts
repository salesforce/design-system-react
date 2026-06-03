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

declare function Component(props: Props): React.JSX.Element;
export default Component;
