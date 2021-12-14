import React from 'react';
import PropTypes from 'prop-types';

import {
	BUILDER_HEADER_UTILITIES,
	BUILDER_HEADER_NAV_DROPDOWN,
	BUILDER_HEADER_NAV_LINK,
} from '../../utilities/constants';

const propTypes = {
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
	children: PropTypes.node,
};

/**
 * The navigation section of the header.
 */
const BuilderHeaderUtilities = (props) => (
	<div className="slds-builder-header__item slds-builder-header__utilities">
		{React.Children.map(props.children, (child) => {
			if (
				child.type.displayName === BUILDER_HEADER_NAV_LINK ||
				child.type.displayName === BUILDER_HEADER_NAV_DROPDOWN
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
BuilderHeaderUtilities.propTypes = propTypes;
export default BuilderHeaderUtilities;
