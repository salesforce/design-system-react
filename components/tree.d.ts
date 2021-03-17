declare module '@salesforce/design-system-react/components/tree' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `label`: For users of assistive technology, if set the heading will be hidden. One of `heading` or `assistiveText.label` must be set in order to label the tree.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * Class names to be added to the container element which has the heading and the `ul.slds-tree` element as children.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Class names to be added to the top-level `ul` element of the tree.
		 */
		listClassName?: any[] | Record<string, any> | string;
		/**
		 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
		 */
		getNodes?: (v: any) => any;
		/**
		 * This is the tree's heading and describes its contents. It can be hidden, see `assistiveText`.
		 * */
		heading?: React.ReactNode | string;
		/**
		 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
		 */
		id: string /*.isRequired*/;
		/**
		 * Array of items starting at the top of the tree. The shape each node in the array is:
		 * ```
		 * {
		 *   expanded: boolean,
		 *   id: string,
		 *   label: string or node,
		 *   selected: boolean,
		 *   type: string,
		 *   nodes: array
		 * }
		 * ```
		 * `assistiveText: string` is optional and helpful if the label is not a string. Only `id` and `label` are required. Use `type: 'branch'` for folder and categories.
		 */
		nodes?: (
			| number
			| string
			| Partial<{
					id?: number | string;
					/*.isRequired*/
					label?: React.ReactNode | string;
					/*.isRequired*/
					type: string /*.isRequired*/;
			  }>
		)[] /*.isRequired*/;
		/**
		 * Function that will run whenever an item or branch is selected due to click or keyboard navigation.
		 */
		onClick: (v: any) => any /*.isRequired*/;
		/**
		 * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
		 */
		onExpandClick: (v: any) => any /*.isRequired*/;
		/**
		 * This function triggers when the top-level `ul` element scrolls. This can be used to implement an "infinite scroll" pattern and update the `nodes` prop accordingly.
		 */
		onScroll?: (v: any) => any;
		/**
		 * Highlights term if found in node label. This does not auto-expand branches.
		 */
		searchTerm?: string;
		/**
		 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
		 */
		listStyle?: Record<string, any>;
	};
	/**
	 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
