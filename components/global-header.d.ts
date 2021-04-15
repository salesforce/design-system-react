declare module '@salesforce/design-system-react/components/global-header' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `skipToNav`: The localized text that will be read back for the "Skip to Navigation" accessibility link.
		 * * `skipToContent`: The localized text that will be read back for the "Skip to Main Content" accessibility link.
		 */
		assistiveText?: Partial<{
			skipToNav?: string;
			skipToContent?: string;
		}>;
		/**
		 * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
		 */
		children?: React.ReactNode;
		/**
		 * The Salesforce logo to display in the header.
		 */
		logoSrc?: string;
		/**
		 * Pass in the Global Navigation Bar component
		 */
		navigation?: React.ReactNode;
		/**
		 * Required for accessibility. Should jump the user to the primary content area.
		 */
		onSkipToContent?: (v: any) => any;
		/**
		 * Required for accessibility. Should jump the user to the primary navigation.
		 */
		onSkipToNav?: (v: any) => any;
	};
	/**
	 * The global header is the anchor for the Salesforce platform and spans all other parts of the UI. It accepts children to define the items displayed within.
	 *
	 * Example:
	 * ```
	 * <SLDSGlobalHeader>
	 *   <SLDSGlobalHeaderSearch />
	 *   <SLDSGlobalHeaderButton />
	 *   <SLDSGlobalHeaderDropdown />
	 *   <SLDSGlobalHeaderDropdown />
	 *   <SLDSGlobalHeaderProfile />
	 * </SLDSGlobalHeader>
	 * ```
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
