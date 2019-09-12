import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import findIndex from 'lodash.findindex';

import { TREE_GRID_ITEM } from '../../../utilities/constants';
import Checkbox from '../../checkbox';
import TreeGridCell from './cell';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';

const Item = (props) => {
	const isFocused = props.treeIndex === props.focusedNodeIndex;

	const handleExpansion = (event) => {
		props.onExpand(event, {
			node: props.row,
			expanded: !props.row.expanded,
		});
	};

	const handleSelection = (event) => {
		props.onSelect(event, {
			node: props.row,
			selected: !props.row.selected,
		});
	};

	const findNextNode = (flattenedNodes, node) => {
		const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
		const index = findIndex(nodes, { id: node.id });
		return flattenedNodes[(index + 1) % flattenedNodes.length];
	};

	const findPreviousNode = (flattenedNodes, node) => {
		const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
		let index = findIndex(nodes, { id: node.id }) - 1;
		if (index < 0) {
			index += flattenedNodes.length;
		}
		return flattenedNodes[index];
	};

	const handleKeyDownDown = (event) => {
		const flattenedNode = findNextNode(props.flattenedNodes, props.row);
		props.onFocus(event, flattenedNode);
	};

	const handleKeyDownUp = (event) => {
		const flattenedNode = findPreviousNode(props.flattenedNodes, props.row);
		props.onFocus(event, flattenedNode);
	};

	const handleKeyDownLeft = (event) => {
		props.onExpand(event, {
			node: props.row,
			expanded: false,
		});
	};

	const handleKeyDownRight = (event) => {
		props.onExpand(event, {
			node: props.row,
			expanded: true,
		});
	};

	const handleKeyDownEnter = (event) => {
		handleSelection(event);
	};

	const handleKeyDown = (event) => {
		mapKeyEventCallbacks(event, {
			callbacks: {
				[KEYS.DOWN]: { callback: (e) => handleKeyDownDown(e) },
				[KEYS.UP]: { callback: (e) => handleKeyDownUp(e) },
				[KEYS.LEFT]: { callback: (e) => handleKeyDownLeft(e) },
				[KEYS.RIGHT]: { callback: (e) => handleKeyDownRight(e) },
				[KEYS.ENTER]: { callback: (e) => handleKeyDownEnter(e) },
			},
		});
	};

	const getTabIndex = () => {
		const initialFocus = props.treeIndex === props.flattenedNodes[0].treeIndex;
		return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
	};

	return (
		<React.Fragment>
			<tr
				id={props.id}
				aria-level={props.level}
				aria-posinset={props.pos}
				aria-setsize={props.levelCount}
				aria-selected={props.row.selected ? 'true' : 'false'}
				tabIndex={getTabIndex()}
				className={classNames(
					`slds-hint-parent`,
					props.row.selected ? `slds-is-selected` : null
				)}
				onClick={(event) =>
					props.selectRows === 'single' ? props.onSelect(event,props.row) : null
				}
				onKeyDown={handleKeyDown}
				ref={(component) => {
					if (component && isFocused) {
						component.focus();
					}
				}}
			>
				{props.selectRows === 'multiple' ? (
					<td
						className="slds-text-align_right"
						role="gridcell"
						style={{ width: '3.25rem' }}
					>
						<Checkbox
							name="options"
							assistiveText={{
								label: `Select item ${props.id}`,
							}}
							id={`${props.id}-checkbox`}
							checked={props.row.selected}
							onChange={handleSelection}
							tabIndex="-1"
						/>
					</td>
				) : null}
				{props.columns.map((col, i) => (
					<TreeGridCell
						key={shortid.generate()}
						id={`${props.id}-col-${i}`}
						isPrimaryColumn={col.props.isPrimaryColumn}
						isChildOpen={props.row.expanded}
						hasChildren={props.row.nodes !== undefined}
						onClickExpand={handleExpansion}
					>
						{col.props.typeAttributes
							? props.row[col.props.typeAttributes.label.fieldName]
							: props.row[col.props.property]}
					</TreeGridCell>
				))}
				<td role="gridcell" style={{ width: '3.25rem' }}>
					{React.cloneElement(props.moreActionsDropdown, {
						onSelect: (event, obj) => {
							const object = { selection: obj, row: props.row };
							props.moreActionsDropdown.props.onSelect(event, object);
						},
					})}
				</td>
			</tr>
		</React.Fragment>
	);
};

Item.displayName = TREE_GRID_ITEM;

Item.propTypes = {
	id: PropTypes.string,
	level: PropTypes.number,
	columns: PropTypes.arrayOf(PropTypes.object),
	row: PropTypes.object,
	onSelect: PropTypes.func,
	onExpand: PropTypes.func,
};

export default Item;
