declare module '@salesforce/design-system-react/components/panel/filtering/group' {
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
		 * Localized description of the "Add Filter" button in the footer
		 */
		addFilterLabel?: React.ReactNode;
		/**
		 * Label for button that cancels modified filters
		 */
		cancelLabel?: string;
		/**
		 * Pass in `FilterList`'s of `Filters`:
		 *
		 * ```
		 * <FilterGroup
		 *   variant="panel"
		 * >
		 *   <FilterList>
		 *   <Filter
		 *     property="Show Me"
		 *     predicate="All Wackamoles"
		 *   >
		 *   {popoverContents}
		 *   </Filter>
		 *   </FilterList>
		 * </FilterGroup>
		 * ```
		 */
		children?: React.ReactNode;
		/**
		 * Label for the error message at the top of the panel.
		 */
		errorLabel?: string;
		/**
		 * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
		 */
		footer?: React.ReactNode;
		/**
		 * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
		 */
		header?: React.ReactNode;
		/**
		 * The heading within the header of the filtering panel
		 */
		heading?: React.ReactNode | string;
		/**
		 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
		 */
		modified?: boolean;
		/**
		 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
		 */
		onClickAdd?: (v: any) => any;
		/**
		 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
		 */
		onClickRemoveAll?: (v: any) => any;
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
		 * Localized description of the "Remove All" button in the footer
		 */
		removeAllLabel?: React.ReactNode;
		/**
		 * Label for button that saves modified filters
		 */
		saveLabel?: string;
		/**
		 * Adds in default Panel header and footer
		 */
		variant?: 'panel';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
