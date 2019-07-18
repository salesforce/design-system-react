import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { TREE_GRID_ROW } from '../../../utilities/constants';
import Button from '../../button';

const Row = (props) => {
	const row = props.data;
	const { cols } = props;

	return (
		<tr
			aria-level={props.level}
			aria-posinset="1"
			aria-selected={props.isSelected}
			aria-setsize="4"
			className={
				classNames(
					`slds-hint-parent`,
					props.isSelected ? `slds-is-selected` : null
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
							id={`checkbox-${row.id}`}
							value={`checkbox-${row.id}`}
							checked={props.isSelected}
							aria-labelledby={`check-button-label-${row.id} column-group-header`}
						/>
						<label
							className="slds-checkbox__label"
							htmlFor={`checkbox-${row.id}`}
							id={`check-button-label-${row.id}`}
						>
							<span className="slds-checkbox_faux"/>
							<span className="slds-form-element__label slds-assistive-text">
									Select item {row.id}
								</span>
						</label>
					</div>
				</td>) : null
			}
			{row.cols.map(
				(col, i) =>
					i === 0 ? (
						<th
							key={`${col.id}-${cols[i].label}`}
							className="slds-tree__item"
							data-label={cols[i].label}
							scope="row"
						>
							<Button
								variant="icon"
								iconSize="x-small"
								iconCategory="utility"
								className={classNames(
									'slds-button',
									'slds-button_icon',
									'slds-m-right_x-small',
									!row.subRows ? 'slds-is-disabled' : null
								)}
								iconName={props.childOpen ? 'chevrondown' : 'chevronright' }
							/>
							<div className="slds-truncate" title={col.label}>
								<a href={col.href} tabIndex="-1">
									{col.label}
								</a>
							</div>
						</th>
					) : (
						<td
							key={`${col.id}-${cols[i].label}`}
							data-label={cols[i].label}
							role="gridcell"
						>
							<div className="slds-truncate" title={col.label}>
								{col.href ? (
									<a href={col.href} tabIndex="-1">
										{col.label}
									</a>
								) : (
									<>{col.label}</>
								)}
							</div>
						</td>
					)
			)}
			<td role="gridcell" style={{ width: '3.25rem' }}>
				<Button
					variant="icon"
					className="slds-button_icon-border-filled"
					iconSize="x-small"
					iconCategory="utility"
					iconName="down"
					assistiveText={{
						icon: `More actions for ${row.cols[0].labels}`,
					}}
				/>
			</td>
		</tr>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Row.displayName = TREE_GRID_ROW;

// ### Prop Types
Row.propTypes = {
	data: PropTypes.object.isRequired,
	level: PropTypes.number,
	childOpen: PropTypes.bool,
	isSelected: PropTypes.bool,
	isSingleSelect: PropTypes.bool,
};

Row.defaultProps = {
	level: 1,
	childOpen: false
};

export default Row;
