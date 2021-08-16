declare module '@salesforce/design-system-react/components/global-header/task' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `triggerButton`: Assistive text for the GlobalHeaderTask trigger button. The default is `Global Actions`.
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
	 * A GlobalHeaderTask component.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
