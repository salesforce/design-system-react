import React from 'react';
type Props = {
	/**
	 * Contents of label section
	 */
	content?: React.ReactNode;
	/**
	 * An array of react elements, presumably anchor <a> elements.
	 */
	trail?: any[];
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
