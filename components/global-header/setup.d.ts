import React from 'react';
type Props = {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderSetup trigger button. The default is `Setup`.
	 */
	assistiveText?: Partial<{
		triggerButton?: string;
	}>;
	/**
	 * A `Dropdown` component. The props from this dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the dropdown.
	 */
	dropdown?: React.ReactNode;
};
/**
 * A GlobalHeaderSetup component.
 */
declare function Component(props: Props): React.JSX.Element;
export default Component;
