import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import find from 'lodash.find';
import reject from 'lodash.reject';

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
			selection: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if (nextProps.isSelected !== prevState.isSelected) {
			return { isSelected: nextProps.isSelected };
		}
		return null;
	}

	handleExpansion = (event) => {
		const { isOpen } = this.state;
		if (!isOpen) this.props.onExpand(event, this.props.row);
		else this.props.onCollapse(event, this.props.row);
		this.setState({ isOpen: !isOpen });
	};

	handleSelectAll = (event) => {
		const { isSelected } = this.state;
		if(this.props.row.nodes)
		{
			if (!isSelected) {
				this.props.onSelect(event);
				this.setState({ isSelected: true, selection: this.props.row.nodes });
			} else {
				this.props.onSelect(event);
				this.setState({ isSelected: false, selection: [] });
			}
		}
		else {
			this.props.onSelect(event);
		}
	};

	handleSelection = (event, row) => {
		let { selection } = this.state;
		if (find(selection, row)) {
			selection = reject(selection, row);
			this.props.onSelect(event);
			this.setState({ selection, isSelected: false });
		} else {
			selection.push(row);
			this.props.onSelect(event);
			this.setState({ selection, isSelected: false });
		}
	};

	render() {
		console.log(this.state.selection);
		return (
			<React.Fragment>
				<tr
					aria-level={this.props.level}
					aria-posinset="1"
					aria-selected="false"
					aria-setsize="4"
					className={classNames(
						`slds-hint-parent`,
						this.props.isSelected ? `slds-is-selected` : null
					)}
					onClick={() => this.props.isSingleSelect ? this.props.onSelect() : null}
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
								indeterminate={
									this.state.selection.length > 0 &&
									!this.state.isSelected
								}
								checked={this.props.isSelected}
								onChange={() => this.handleSelectAll()}
							/>
						</td>
					) : null}
					{this.props.columns.map((col, i) => (
						<TreeGridCell
							id={`${this.props.id}-col-${i}`}
							isPrimaryColumn={col.props.isPrimaryColumn}
							isChildOpen={this.state.isOpen}
							hasChildren={this.props.row.nodes !== undefined}
							onClickExpand={this.handleExpansion}
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
						/>
					</td>
				</tr>
				{this.state.isOpen && this.props.row.nodes
					? this.props.row.nodes.map((row, i) => (
							<TreeGridRow
								id={`${this.props.id}-sub-row-${i}`}
								level={this.props.level + 1}
								columns={this.props.columns}
								row={row}
								isOpen={false}
								isSingleSelect={this.props.isSingleSelect}
								onExpand={this.props.onExpand}
								onCollapse={this.props.onCollapse}
								isSelected={find(this.state.selection, row)}
								onSelect={(event) => this.handleSelection(event, row)}
							/>
						))
					: null}
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
	onSelect: PropTypes.func,
	onCollapse: PropTypes.func,
};

TreeGridRow.defaultProps = {
	level: 1,
	isOpen: false,
};

export default TreeGridRow;
