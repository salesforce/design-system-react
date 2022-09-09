declare module '@salesforce/design-system-react/components/builder-header/toolbar' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `actions`: Used for the aria-label for the actions section of the toolbar.
		 * * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			actions?: string;
		}>;
		/**
		 * Provide children of the type `<ButtonGroup />` to define the structure of the toolbar section.
		 * ```
		 * <BuilderHeader>
		 *   <BuilderHeaderToolbar>
		 *     <ButtonGroup />
		 *     <ButtonGroup />
		 *   </BuilderHeaderToolbar>
		 * </BuilderHeader>
		 * ```
		 */
		children?: React.ReactNode;
		/**
		 * Renders the actions section of the header.
		 */
		onRenderActions?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
