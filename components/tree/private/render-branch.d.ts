declare module '@salesforce/design-system-react/components/tree/private/render-branch' {
	import React from 'react';
	type Props = {
		/**
		 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
		 */
		htmlId: number | string /*.isRequired*/;
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
		 * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
		 */
		onExpand: (v: any) => any /*.isRequired*/;
		/**
		 * Function that will run whenever an item or branch is clicked.
		 */
		onSelect?: (v: any) => any;
		/**
		 * Highlights term if found in node label
		 */
		searchTerm?: string;
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
