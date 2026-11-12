import React, { type ReactNode } from 'react';

import { BUILDER_HEADER_MISC } from '../../utilities/constants';

export interface BuilderHeaderMiscProps {
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
	children?: ReactNode;
}

/**
 * The miscellaneous section of the header.
 */
const BuilderHeaderMisc = (props: BuilderHeaderMiscProps): React.ReactElement => (
	<div className="slds-builder-header__item" style={{ width: '100%' }}>
		<div className="slds-builder-header__item-label">{props.children}</div>
	</div>
);

BuilderHeaderMisc.displayName = BUILDER_HEADER_MISC;

export default BuilderHeaderMisc;
