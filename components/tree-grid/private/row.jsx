import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TREE_GRID_ROW } from '../../../utilities/constants';
import Button from '../../button';
import TreeGridCell from './cell';

const TreeGridRow = (props) => {
	const [isOpen, setExpansion] = useState(false);
	return (
		<React.Fragment>
			<tr
				aria-level={props.level}
				aria-posinset="1"
				aria-selected="false"
				aria-setsize="4"
				className={classNames(
					`slds-hint-parent`
					// props.isSelected ? `slds-is-selected` : null
				)}
				tabIndex="0"
			>
				{!props.isSingleSelect ? (
					<td
						className="slds-text-align_right"
						role="gridcell"
						style={{ width: '3.25rem' }}
					>
						<div className="slds-checkbox">
							<input
								type="checkbox"
								name="options"
								id={`${props.id}-checkbox`}
								value={`${props.id}-checkbox`}
								checked={props.isSelected}
								aria-labelledby={`${
									props.id
								}-check-button-label column-group-header`}
							/>
							<label
								className="slds-checkbox__label"
								htmlFor={`${props.id}-checkbox`}
								id={`${props.id}-check-button-label`}
							>
								<span className="slds-checkbox_faux" />
								<span className="slds-form-element__label slds-assistive-text">
									Select item {props.id}
								</span>
							</label>
						</div>
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
					/>
				</td>
			</tr>
			{isOpen && props.row.nodes
				? props.row.nodes.map((row, i) => (
						<TreeGridRow
							id={`${props.id}-sub-row-${i}`}
							level={props.level + 1}
							columns={props.columns}
							row={row}
							isOpen={false}
						/>
					))
				: null}
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
