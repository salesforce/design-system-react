import React from 'react';
import shortid from 'shortid';

import { TREE_GRID_BRANCH } from '../../../utilities/constants';

import Item from './item';

const Branch = (props) => {
	let children;

	const { getNodes, node, level } = props;

	if (Array.isArray(getNodes(node))) {
		children = getNodes(node).map((n, i) => {
			let child;
			if (n.type === 'branch') {
				child = (
					<Branch
						key={n.id}
						level={level + 1}
						getNodes={getNodes}
						columns={props.columns}
						node={n}
						onExpand={props.onExpand}
						onSelect={props.onSelect}
					/>
				);
			} else {
				child = (
					<Item
						key={shortid.generate()}
						level={level + 1}
						row={n}
						parent={node}
						columns={props.columns}
						onExpand={props.onExpand}
						onSelect={props.onSelect}
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
					level={props.level}
					row={node}
					columns={props.columns}
					parent={props.parent}
					onExpand={props.onExpand}
					onSelect={props.onSelect}
				/>
			) : null}
			{node.expanded || props.level === 0 ? children : null}
		</React.Fragment>
	);
};

Branch.displayName = TREE_GRID_BRANCH;

export default Branch;
