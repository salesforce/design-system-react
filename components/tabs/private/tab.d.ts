declare module '@salesforce/design-system-react/components/tabs/private/tab' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes to be added to the tab.
		 */
		className?: string;

		/**
		 * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
		 */
		id?: string;

		/**
		 * Whether to apply focus to this tab.
		 */
		focus?: boolean;

		/**
		 * When `true`, the class `.slds-active` is applied.
		 */
		selected?: boolean;

		/**
		 * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
		 */
		disabled?: boolean;

		/**
		 * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
		 */
		activeTabClassName?: string;

		/**
		 * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
		 */
		disabledTabClassName?: string;

		/**
		 * The HTML ID of `<TabPanel />` this tab controls.
		 */
		panelId?: string;

		/**
		 * The string or element that is shown as both the title and the label for this tab.
		 */
		children?: string | React.ReactElement;

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant?: 'default' | 'scoped';
	};
	/*
	 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
	 */
	// import '!style-loader!css-loader!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved

	function Component(props: Props): JSX.Element;
	export default Component;
}
