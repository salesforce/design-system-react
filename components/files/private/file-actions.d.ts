declare module '@salesforce/design-system-react/components/files/private/file-actions' {
	import React from 'react';
	type Props = {
		/**
		 *  Action to be done on clicking download button; doesnt show download button if empty
		 */
		onClickDownload?: (v: any) => any;
		/**
		 *  Dropdown for More Actions; doesn't show More actions button if empty
		 */
		moreActionsDropdown?: React.ReactNode;
		/**
		 *  Labels for the file component
		 */
		hasNoVisibleTitle?: boolean;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
