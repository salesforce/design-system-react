import React from 'react';
import PropTypes from 'prop-types';

import { BUILDER_HEADER_MISC } from '../../utilities/constants';

const propTypes = {
	/**
	 * Provide custom content in place of Page Type label
	 * ```
	 * <BuilderHeader>
	 *   <BuilderHeaderMisc>
	 *     Custom content
	 *   </BuilderHeaderMisc>
	 * </BuilderHeader>
	 * ```
	 */
	children: PropTypes.node,
};

/**
 * The miscellaneous section of the header.
 */
const BuilderHeaderMisc = (props) => (
	<div className="slds-builder-header__item" style={{ width: '100%' }}>
		<div className="slds-builder-header__item-label">{props.children}</div>
	</div>
);

BuilderHeaderMisc.displayName = BUILDER_HEADER_MISC;
BuilderHeaderMisc.propTypes = propTypes;
export default BuilderHeaderMisc;
