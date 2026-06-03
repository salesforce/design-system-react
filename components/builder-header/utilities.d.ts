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

declare function Component(props: Props): React.JSX.Element;
export default Component;
