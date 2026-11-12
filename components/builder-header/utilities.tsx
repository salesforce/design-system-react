import React from 'react';

import { BUILDER_HEADER_UTILITIES } from '../../utilities/constants';
import isElementOfType from '../../utilities/is-element-of-type';
import type { ChildrenOf } from '../../types/common';
import BuilderHeaderNavDropdown, {
	type BuilderHeaderNavDropdownProps,
} from './nav-dropdown';
import BuilderHeaderNavLink, {
	type BuilderHeaderNavLinkProps,
} from './nav-link';

export interface BuilderHeaderUtilitiesProps {
	/**
	 * Provide children of the types `<BuilderHeaderNavLink />` or `<BuilderHeaderNavDropdown />` to define the structure of the utilities section.
	 * ```
	 * <BuilderHeader>
	 *   <BuilderHeaderUtilities>
	 *     <BuilderHeaderNavLink />
	 *     <BuilderHeaderNavDropdown />
	 *   </BuilderHeaderUtilities>
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
const BuilderHeaderUtilities = (
	props: BuilderHeaderUtilitiesProps
): React.ReactElement => (
	<div className="slds-builder-header__item slds-builder-header__utilities">
		{React.Children.map(props.children, (child) => {
			if (
				isElementOfType(child, BuilderHeaderNavLink, BuilderHeaderNavDropdown)
			) {
				return (
					<div className="slds-builder-header__utilities-item">{child}</div>
				);
			}
			return null;
		})}
	</div>
);

BuilderHeaderUtilities.displayName = BUILDER_HEADER_UTILITIES;

export default BuilderHeaderUtilities;
