import React from 'react';

import { BUILDER_HEADER_NAV } from '../../utilities/constants';
import isElementOfType from '../../utilities/is-element-of-type';
import type { ChildrenOf } from '../../types/common';
import BuilderHeaderNavDropdown, {
	type BuilderHeaderNavDropdownProps,
} from './nav-dropdown';
import BuilderHeaderNavLink, {
	type BuilderHeaderNavLinkProps,
} from './nav-link';

export interface BuilderHeaderNavProps {
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
	 * Other children are ignored.
	 */
	children?: ChildrenOf<
		BuilderHeaderNavLinkProps | BuilderHeaderNavDropdownProps
	>;
}

/**
 * The navigation section of the header.
 */
const BuilderHeaderNav = (props: BuilderHeaderNavProps): React.ReactElement => (
	<nav className="slds-builder-header__item slds-builder-header__nav">
		<ul className="slds-builder-header__nav-list">
			{React.Children.map(props.children, (child) => {
				if (
					isElementOfType(child, BuilderHeaderNavLink, BuilderHeaderNavDropdown)
				) {
					return <li className="slds-builder-header__nav-item">{child}</li>;
				}
				return null;
			})}
		</ul>
	</nav>
);

BuilderHeaderNav.displayName = BUILDER_HEADER_NAV;

export default BuilderHeaderNav;
