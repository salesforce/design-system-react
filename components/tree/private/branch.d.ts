declare module '@salesforce/design-system-react/components/tree/private/branch' {
	import React from 'react';
	type Props = {
		/**
		 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
		 */
		getNodes?: (v: any) => any;
		/**
		 * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
		 */
		htmlId: number | string /*.isRequired*/;
		/**
		 * All tree nodes must have a unique HTML `id` for users of assistive technology. If no `id` key is present in the  is provided, one will be generated.
		 */
		index?: number;
		/**
		 * Determines if nodes in the top-level of the tree.
		 */
		initial?: boolean;
		/*
		 * Class names to be added to the top-level `ul` element.
		 */
		initalClassName?: any[] | Record<string, any> | string;
		initialStyle?: Record<string, any>;
		/**
		 * The text of the tree item.
		 */
		label?: React.ReactNode | string;
		/**
		 * The number of nestings. Determines the ARIA level and style alignment.
		 */
		level: number /*.isRequired*/;
		/**
		 * The current node that is being rendered.
		 */
		node: Record<string, any> /*.isRequired*/;
		/**
		 * Function that will run whenever an item or branch is selected (click or keyboard).
		 */
		onSelect?: (v: any) => any;
		/**
		 * This function triggers when the expand or collapse icon is clicked.
		 */
		onExpand: (v: any) => any /*.isRequired*/;
		/**
		 * Highlights term if found in node label
		 */
		searchTerm?: string;
		/**
		 * Unique id used for a prefix of all tree nodes. This is the prefix for subsequent `htmlId` props.
		 */
		treeId?: string;
		/**
		 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
		 */
		treeIndex?: string;
		/**
		 * Flattened tree structure.
		 */
		flattenedNodes?: Record<string, any>[];
		/**
		 * Tree indexes of nodes that are currently selected.
		 */
		selectedNodeIndexes?: string[];
		/**
		 * Tree index of the node that is currently focused.
		 */
		focusedNodeIndex?: string;
		/**
		 * Callback for when a node is blurred.
		 */
		onNodeBlur?: (v: any) => any;
		/**
		 * Sets focus on render.
		 */
		treeHasFocus?: boolean;
		/**
		 * This node's parent.
		 */
		parent?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
