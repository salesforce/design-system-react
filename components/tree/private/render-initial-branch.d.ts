import React from 'react';
type Props = {
	/**
	 * HTML `id` of the wrapping container element.
	 */
	htmlId: number | string /*.isRequired*/;
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName?: any[] | Record<string, any> | string;
	/*
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	initialStyle?: Record<string, any>;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
