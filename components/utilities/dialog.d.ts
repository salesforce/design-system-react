declare module '@salesforce/design-system-react/components/utilities/dialog' {
	import React from 'react';
	type Props = {
		/**
		 * Alignment of the dialog with respect to the target (assuming left-to-right language direction). For example,
		 * a value of 'left bottom' indicates that the dialog will be rendered below and left-aligned with the target.
		 * Note that setting the direction prop to "rtl" will flip the resulting dialog alignment.
		 */
		align?:
			| 'top'
			| 'top left'
			| 'top right'
			| 'right'
			| 'right top'
			| 'right bottom'
			| 'bottom'
			| 'bottom left'
			| 'bottom right'
			| 'left'
			| 'left top'
			| 'left bottom';
		/**
		 * CSS classes to be added to the absolutely positioned element.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to the wrapping `div` of the contents of the dialog.
		 */
		contentsClassName?: any[] | Record<string, any> | string;
		/**
		 * Contents of dialog
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * Closes dialog when tab key is pressed
		 */
		closeOnTabKey?: boolean;
		/**
		 * Props passed along to wrapping div. This allows one less wrapping `div` to be in the markup. dialog children are expected to be wrapper in a single `div`.
		 */
		containerProps?: Record<string, any>;
		/**
		 * Establishes directional context for component. Defaults to left-to-right.
		 */
		direction?: DIRECTIONS.LTR | DIRECTIONS.RTL;
		/**
		 * Will show the nubbin pointing from the dialog to the reference element. Positioning and offsets will be handled.
		 */
		hasNubbin?: boolean;
		/**
		 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements.
		 */
		hasStaticAlignment?: boolean;
		/**
		 * Sets the dialog width to the width of either 'target' (Menus attached to `input` typically follow this UX pattern), 'menu' or 'none.
		 */
		inheritWidthOf?: 'target' | 'menu' | 'none';
		/**
		 * DEPRECATED - do not add checkProp deprecation message at this level. It is handled at higher level components.
		 * TODO - to be removed.
		 * Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px). SHOULD BE OBJECT -----------
		 */
		offset?: string;
		/**
		 * Called when dialog closes and unmounts.
		 */
		onClose?: (v: any) => any;
		/**
		 * Called when a key pressed.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseEnter?: (v: any) => any;
		/**
		 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseLeave?: (v: any) => any;
		/**
		 * Called when dialog opens (that is mounts). The parameters are `undefined, { portal: this.portal }`.
		 */
		onOpen?: (v: any) => any;
		/**
		 * React component to be aligned with. Function should return a DOM `ref` from the parent component.
		 */
		onRequestTargetElement: (v: any) => any /*.isRequired*/;
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		outsideClickIgnoreClass?: string;
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
		 *   />
		 * ```
		 */
		portalMount?: (v: any) => any;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		position?:
			| 'absolute'
			| 'overflowBoundaryElement'
			| 'relative' /*.isRequired*/;
		/**
		 * An object of CSS styles that are applied to the immediate parent `div` of the contents. Use this instead of margin props.
		 */
		style?: Record<string, any>;

		/**
		 * Sets which focus UX pattern to follow. For instance, popovers trap focus and must be exited to regain focus. Dropdowns and Tooltips never have focus.
		 */
		variant?: 'dropdown' | 'popover' | 'tooltip';
	};
	/*
	 * A Dialog is content that is separate from the typical flow of a page. It typically overlays other elements in the document flow. This is achieved with elevation (`z-index`) and one of the following: relative position, absolute position, or a new top-level React render tree (portal). A boundary element is a scrolling ancestor element or the edge of the browser (window/viewport). This element typically has an overflow (overflow-y/overflow-x) style that is scroll, hidden, or auto. Inverted placement is the flipping of the overlay element from top to bottom or left to right in order stay within a boundary element.
	 *
	 * * Dropdown menu (Combobox, DatePicker, et al.) placement is typically bottom-aligned and should be allowed to invert its placement when inside a boundary element this often happens within a modal. Dropdowns should not overflow boundary elements , since most boundary elements scroll vertically and have space for the menu.
	 *
	 * * If they are hidden, left and right placed overlay elements (such as Popover and Tooltip) should be placed within a portal element attached to the DOM <body>, but styled to align to its target/trigger. Since scrolling typically occurs on the vertical axis, this allows them to overflow boundary elements and still allow scrolling of content, yet still invert placement for the browser viewport. Portal elements are only necessary if an original ancestor boundary element exists. **No portals are created by default.**
	 *
	 * * Nubbins/arrows should be repositioned for any new placement/alignment.
	 *
	 * Allow Overflowing of Boundary Element: Allow applications to create a portal element attached to the DOM <body> to be outside of boundary elements if manual testing shows confusing alignment/poor usability/readability. This should be exception and not the default.
	 *
	 * Allow Inverted placement: Allow applications to prevent inverted placement if manual testing shows confusing alignment/poor usability/readability.
	 *
	 * ### How this new Dialog component works
	 * * There is no longer an inline render within components. All overlays should go through `Dialog`. `position: relative` just passes on the markup with some additional event listeners. No positional library is used.
	 * * The default `position: absolute` will run through three renders. It will first render the overlay at `0px/0px` offset of its parent. It will then store the target DOM node, once the DOM node is set, a state change will occur and tell a PopperJS instance to be created on update, once it is created, a third render is done to update the styles created by PopperJS.
	 * * `position: overflowBoundaryElement` will do the same three renders as `absolute` except that the initial render will create a disconnected render tree (portal) on the `body`. Then, the position will change once the target is stored. The portal itself will be rendered multiple times. The first will result in `onOpen` executing. Each update will result in a re-render of the disconnected render-tree.
	 *
	 * This component is private.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
