import React from 'react';
type Props = {
	/*
	 * Assistive Text object from parent component such as Input, Combobox, etc.
	 */
	assistiveText?: Partial<{
		triggerLearnMoreIcon?: string;
	}>;
	/*
	 * Tooltip from external prop
	 */
	fieldLevelHelpTooltip: React.ReactNode /*.isRequired*/;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
