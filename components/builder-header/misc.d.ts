import React from 'react';
type Props = {
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
	children?: React.ReactNode;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
