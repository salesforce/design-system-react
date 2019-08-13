import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TREE_GRID_ROW } from '../../../utilities/constants';
import Button from '../../button';
import Checkbox from '../../checkbox';
import TreeGridCell from './cell';

class TreeGridRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isSelected: this.props.isSelected,
		};
	}

	render()
	{
		const children = this.props.row.nodes
			? this.props.row.nodes.map((row, i) => (
				<TreeGridRow
					id={`${this.props.id}-sub-row-${i}`}
					level={this.props.level + 1}
					columns={this.props.columns}
					row={row}
					isSelected={this.state.isSelected}
					isOpen={false}
					onClickMoreActions={(e, o) => this.props.onClickMoreActions(e, o)}
				/>
			))
			: null;

		const triggerSelection = (event, object) => {
			const selection = this.state.isSelected;
			this.setState({isSelected: !selection});
			if (this.props.onClickSelect) this.props.onClickSelect(event, object);
		};

		return (
			<React.Fragment>
				<tr
					aria-level={this.props.level}
					aria-posinset="1"
					aria-selected="false"
					aria-setsize="4"
					className={classNames(
						`slds-hint-parent`,
						this.state.isSelected ? `slds-is-selected` : null
					)}
					tabIndex="0"
				>
					{!this.props.isSingleSelect ? (
						<td
							className="slds-text-align_right"
							role="gridcell"
							style={{ width: '3.25rem' }}
						>
							<Checkbox
								name="options"
								assistiveText={{
									label: `Select item ${this.props.id}`,
								}}
								id={`${this.props.id}-checkbox`}
								checked={this.state.isSelected}
								onChange={(event, object) => triggerSelection(event, object)}
							/>
						</td>
					) : null}
					{this.props.columns.map((col, i) => (
						<TreeGridCell
							id={`${this.props.id}-col-${i}`}
							isPrimaryColumn={col.props.isPrimaryColumn}
							isChildOpen={this.state.isOpen}
							hasChildren={this.props.row.nodes !== undefined}
							onClickExpand={() => this.setState({ isOpen: !this.state.isOpen})}
						>
							{col.props.typeAttributes
								? this.props.row[col.props.typeAttributes.label.fieldName]
								: this.props.row[col.props.property]}
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
							onClick={(e, o) => this.props.onClickMoreActions(e, o)}
						/>
					</td>
				</tr>
				{this.state.isOpen ? children : null}
			</React.Fragment>
		);
	}
}

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
