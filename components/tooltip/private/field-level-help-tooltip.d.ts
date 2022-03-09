declare module '@salesforce/design-system-react/components/tooltip/private/field-level-help-tooltip' {
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

	function Component(props: Props): JSX.Element;
	export default Component;
}
