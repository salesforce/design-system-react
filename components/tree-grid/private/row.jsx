import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TREE_GRID_ROW } from '../../../utilities/constants';
import Button from '../../button';
import Checkbox from '../../checkbox';
import TreeGridCell from './cell';

const TreeGridRow = (props) => {
	const [isOpen, setExpansion] = useState(false);
	const [isSelected, setSelection] = useState(props.isSelected);

	const children = props.row.nodes
		? props.row.nodes.map((row, i) => (
				<TreeGridRow
					id={`${props.id}-sub-row-${i}`}
					level={props.level + 1}
					columns={props.columns}
					row={row}
					isSelected={isSelected}
					isOpen={false}
					onClickMoreActions={(e, o) => props.onClickMoreActions(e, o)}
				/>
			))
		: null;

	const triggerSelection = (event, object) => {
		if (props.onClickSelect) props.onClickSelect(event, object);
		setSelection(!isSelected);
	};

	return (
		<React.Fragment>
			<tr
				aria-level={props.level}
				aria-posinset="1"
				aria-selected="false"
				aria-setsize="4"
				className={classNames(
					`slds-hint-parent`,
					isSelected ? `slds-is-selected` : null
				)}
				tabIndex="0"
			>
				{!props.isSingleSelect ? (
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
							checked={isSelected}
							onChange={(event, object) => triggerSelection(event, object)}
						/>
					</td>
				) : null}
				{props.columns.map((col, i) => (
					<TreeGridCell
						id={`${props.id}-col-${i}`}
						isPrimaryColumn={col.props.isPrimaryColumn}
						isChildOpen={isOpen}
						hasChildren={props.row.nodes !== undefined}
						onClickExpand={() => setExpansion(!isOpen)}
					>
						{col.props.typeAttributes
							? props.row[col.props.typeAttributes.label.fieldName]
							: props.row[col.props.property]}
					</TreeGridCell>
				))}
				<td role="gridcell" style={{ width: '3.25rem' }}>
					<Button
						variant="icon"
						className="slds-button_icon-border-filled"
						iconSize="x-small"
						iconCategory="utility"
						iconName="down"
						assistiveText={{
							icon: `More actions for`,
						}}
						onClick={(e, o) => props.onClickMoreActions(e, o)}
					/>
				</td>
			</tr>
			{isOpen ? children : null}
		</React.Fragment>
	);
};

TreeGridRow.displayName = TREE_GRID_ROW;

TreeGridRow.propTypes = {
	id: PropTypes.string,
	level: PropTypes.number,
	columns: PropTypes.arrayOf(PropTypes.object),
	row: PropTypes.object,
	isOpen: PropTypes.bool,
};

TreeGridRow.defaultProps = {
	level: 1,
	isOpen: false,
};

export default TreeGridRow;
