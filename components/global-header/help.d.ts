declare module '@salesforce/design-system-react/components/global-header/help' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `triggerButton`: Assistive text for the GlobalHeaderHelp trigger button. The default is `Help and Training`.
		 */
		assistiveText?: Partial<{
			triggerButton?: string;
		}>;
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
		 */
		popover?: React.ReactNode;
	};
	/**
	 * A GlobalHeaderHelp component.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
