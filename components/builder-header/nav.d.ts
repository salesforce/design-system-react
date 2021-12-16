declare module '@salesforce/design-system-react/components/builder-header/nav' {
	import React from 'react';
	type Props = {
		/**
		 * Provide children of the types `<BuilderHeaderNavLink />` or `<BuilderHeaderNavDropdown />` to define the structure of the navigation section.
		 * ```
		 * <BuilderHeader>
		 *   <BuilderHeaderNav>
		 *     <BuilderHeaderNavLink />
		 *     <BuilderHeaderNavDropdown />
		 *   </BuilderHeaderNav>
		 * </BuilderHeader>
		 * ```
		 */
		children?: React.ReactNode;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
