import React from 'react';
type Props = {
	/**
	 * Assistive text for percentage
	 */
	assistiveText?: Partial<{
		percentage?: string;
	}>;
	/**
	 * Percentage of progress completion, with range of [0, 100]
	 */
	value: string /*.isRequired*/;
};
/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */
declare function Component(props: Props): React.JSX.Element;
export default Component;
