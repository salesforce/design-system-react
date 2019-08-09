import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TREE_GRID_CELL } from '../../../utilities/constants';
import Button from '../../button';

const TreeGridCell = (props) =>
	props.isPrimaryColumn ? (
		<th
			key={props.id}
			className="slds-tree__item"
			// data-label={label}
			scope="row"
		>
			<Button
				variant="icon"
				iconSize="x-small"
				iconCategory="utility"
				onClick={props.onClickExpand}
				className={classNames(
					'slds-button',
					'slds-button_icon',
					'slds-m-right_x-small',
					!props.hasChildren ? 'slds-is-disabled' : null
				)}
				iconName={props.isChildOpen ? 'chevrondown' : 'chevronright'}
			/>
			<div className="slds-truncate" title="sometitle">
				<a href="#" tabIndex="-1">
					{props.children}
				</a>
			</div>
		</th>
	) : (
		<td
			key={props.id}
			// data-label={cols[i].label}
			role="gridcell"
		>
			<div className="slds-truncate" title="ss">
				{props.children}
			</div>
		</td>
	);

TreeGridCell.displayName = TREE_GRID_CELL;

TreeGridCell.propTypes = {
	isPrimaryColumn: PropTypes.bool,
	isChildOpen: PropTypes.bool,
	hasChildren: PropTypes.bool,
	onClickExpand: PropTypes.func,
	children: PropTypes.node,
};

TreeGridCell.defaultProps = {
	isPrimaryColumn: false,
	isChildOpen: false,
	hasChildren: false,
};

export default TreeGridCell;
