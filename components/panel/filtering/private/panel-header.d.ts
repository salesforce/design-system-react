declare module '@salesforce/design-system-react/components/panel/filtering/private/panel-header' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `closeButton`: Localized description of the close button for the panel for screen readers
		 */
		assistiveText?: Partial<{
			closeButton?: string;
		}>;
		/**
		 * Label for button that cancels modified filters
		 */
		cancelLabel?: string;
		/**
		 * The heading of the filtering panel
		 */
		heading?: React.ReactNode;
		/**
		 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
		 */
		modified?: boolean;
		/**
		 * When the panel's cancel button is clicked in order to reset filter panel to previous state.
		 */
		onRequestCancel?: (v: any) => any;
		/**
		 * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * When the panel's save button is clicked in order to confirm filter panel state.
		 */
		onRequestSave?: (v: any) => any;
		/**
		 * Label for button that saves modified filters
		 */
		saveLabel?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
