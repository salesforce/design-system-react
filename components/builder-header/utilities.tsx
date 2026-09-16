import React, { type ReactNode } from 'react';

import {
	BUILDER_HEADER_UTILITIES,
	BUILDER_HEADER_NAV_DROPDOWN,
	BUILDER_HEADER_NAV_LINK,
} from '../../utilities/constants';

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
	 */
	children?: ReactNode;
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
				React.isValidElement(child) &&
				((child.type as { displayName?: string }).displayName ===
					BUILDER_HEADER_NAV_LINK ||
					(child.type as { displayName?: string }).displayName ===
						BUILDER_HEADER_NAV_DROPDOWN)
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
