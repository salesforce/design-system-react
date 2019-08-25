import React from 'react';
import shortid from 'shortid';

import { TREE_GRID_BRANCH } from '../../../utilities/constants';

import Item from './item';

const Branch = (props) => {
	let treeIndex = '';
	let children;

	const { getNodes, node, level } = props;

	if (Array.isArray(getNodes(node))) {
		children = getNodes(node).map((n, i) => {
			let child;
			treeIndex = `${i}`;
			if (props.treeIndex) {
				treeIndex = `${props.treeIndex}-${treeIndex}`;
			}

			if (n.type === 'branch') {
				child = (
					<Branch
						key={n.id}
						treeId={`${props.treeId}-${n.id}`}
						level={level + 1}
						levelCount={getNodes(node).length}
						getNodes={getNodes}
						columns={props.columns}
						node={n}
						flattenedNodes={props.flattenedNodes}
						focusedNodeIndex={props.focusedNodeIndex}
						onExpand={props.onExpand}
						onSelect={props.onSelect}
						onFocus={props.onFocus}
						selectRows={props.selectRows}
						treeIndex={treeIndex}
						moreActionsDropdown={props.moreActionsDropdown}
					/>
				);
			} else {
				child = (
					<Item
						key={shortid.generate()}
						id={`${props.treeId}-${node.id}`}
						level={level + 1}
						levelCount={getNodes(node).length}
						pos={i}
						row={n}
						columns={props.columns}
						flattenedNodes={props.flattenedNodes}
						focusedNodeIndex={props.focusedNodeIndex}
						onExpand={props.onExpand}
						onSelect={props.onSelect}
						onFocus={props.onFocus}
						selectRows={props.selectRows}
						treeIndex={treeIndex}
						moreActionsDropdown={props.moreActionsDropdown}
					/>
				);
			}
			return child;
		});
	}

	return (
		<React.Fragment>
			{props.level !== 0 ? (
				<Item
					key={shortid.generate()}
					id={`${props.treeId}-${node.id}`}
					level={props.level}
					levelCount={props.levelCount}
					row={node}
					columns={props.columns}
					flattenedNodes={props.flattenedNodes}
					focusedNodeIndex={props.focusedNodeIndex}
					onExpand={props.onExpand}
					onSelect={props.onSelect}
					onFocus={props.onFocus}
					selectRows={props.selectRows}
					treeIndex={props.treeIndex}
					moreActionsDropdown={props.moreActionsDropdown}
				/>
			) : null}
			{node.expanded || props.level === 0 ? children : null}
		</React.Fragment>
	);
};

Branch.displayName = TREE_GRID_BRANCH;

export default Branch;
