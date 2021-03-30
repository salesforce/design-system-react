declare module '@salesforce/design-system-react/components/utilities/dialog/portal' {
	import React from 'react';
	type Props = {
		/*
		 * What tag to use for the portal, defaults to `div`.
		 */
		renderTag?: string;
		/*
		 * What node the portal is rendered to, defaults to `document.body`.
		 */
		renderTo?: PropTypes.any;
		/*
		 * React id prop.
		 */
		id?: string;
		/*
		 * Accepts a _single_ element or component.
		 */
		children?: React.ReactNode;
		/*
		 * ClassName added to .
		 */
		className?: PropTypes.any;
		/*
		 * An object of styles that are applied to the portal.
		 */
		style?: Record<string, any>;
		/*
		 * Triggers when Portal render tree mounts. Pass in an undefined event and `{ portal: [node] }``
		 */
		onMount?: (v: any) => any;
		/*
		 * Triggers when the portal is mounted.
		 */
		onOpen?: (v: any) => any;
		/*
		 * Triggers when Portal re-renders its tree.
		 */
		onUpdate?: (v: any) => any;
		/**
		 * If a dialog is `positione="overflowBoundaryElement"`, it will be rendered in a portal or separate render tree. This `portalMount` callback will be triggered instead of the the default `ReactDOM.unstable_renderSubtreeIntoContainer` and the function will mount the portal itself. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
		 *
		 * ```
		 * <Popover
		 *   isOpen
		 *   portalMount={({ instance, reactElement, domContainerNode }) => {
		 *     portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
		 *   }}
		 *   onOpen={() => {
		 *     expect(portalWrapper.find(`#my-heading`)).to.exist;
		 *     done();
		 *   }}
		 * />
		 * ```
		 */
		portalMount?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
