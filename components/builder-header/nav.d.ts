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

declare function Component(props: Props): React.JSX.Element;
export default Component;
