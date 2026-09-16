import React, { type ReactNode } from 'react';

import {
	BUILDER_HEADER_NAV,
	BUILDER_HEADER_NAV_DROPDOWN,
	BUILDER_HEADER_NAV_LINK,
} from '../../utilities/constants';

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
	 */
	children?: ReactNode;
}

/**
 * The navigation section of the header.
 */
const BuilderHeaderNav = (
	props: BuilderHeaderNavProps
): React.ReactElement => (
	<nav className="slds-builder-header__item slds-builder-header__nav">
		<ul className="slds-builder-header__nav-list">
			{React.Children.map(props.children, (child) => {
				if (
					React.isValidElement(child) &&
					((child.type as { displayName?: string }).displayName ===
						BUILDER_HEADER_NAV_LINK ||
						(child.type as { displayName?: string }).displayName ===
							BUILDER_HEADER_NAV_DROPDOWN)
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
