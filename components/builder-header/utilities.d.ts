declare module '@salesforce/design-system-react/components/builder-header/utilities' {
	import React from 'react';
	type Props = {
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
    children?: React.ReactNode,
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
