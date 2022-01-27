/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { useContext, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import CellFixed from './cell-fixed';
import Icon from '../../icon';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from '../column-check-props';

import Link from './link';
import InteractiveLink from '../interactive-link';
import CellContext from '../private/cell-context';
import TableContext from '../private/table-context';
import useContextHelper from './context-helper';

// ## Constants
import {
	DATA_TABLE_HEADER_CELL,
	DATA_TABLE_COLUMN,
} from '../../../utilities/constants';

// ### Prop Types
const propTypes = {
	assistiveText: PropTypes.shape({
		actionsHeader: PropTypes.string,
		columnSort: PropTypes.string,
		columnSortedAscending: PropTypes.string,
		columnSortedDescending: PropTypes.string,
		selectAllRows: PropTypes.string,
		selectRow: PropTypes.string,
	}),
	cellRef: PropTypes.func,
	fixedHeader: PropTypes.bool,
	id: PropTypes.string.isRequired,
	/**
	 * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
	 */
	isDefaultSortDescending: PropTypes.bool,
	/**
	 * Indicates if column is sorted.
	 */
	isSorted: PropTypes.bool,
	/**
	 * The column label.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * The function to execute on sort.
	 */
	onSort: PropTypes.func,
	/**
	 * The property which corresponds to this column.
	 */
	property: PropTypes.string,
	/**
	 * Whether or not the column is sortable.
	 */
	sortable: PropTypes.bool,
	/**
	 * The current sort direction.
	 */
	sortDirection: PropTypes.oneOf(['desc', 'asc']),
	/**
	 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
	 */
	width: PropTypes.string,
};

/**
 * Used internally, renders each individual column heading.
 */
const DataTableHeaderCell = (props) => {
	const [sortDirection, setSortDirection] = useState(null);
	const prevIsSorted = useRef(null);
	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);

	useEffect(() => {
		checkProps(DATA_TABLE_COLUMN, props);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (prevIsSorted.current === true && props.isSorted === false) {
			setSortDirection(null);
		}
		prevIsSorted.current = props.isSorted;
	}, [props.isSorted]);

	const handleSort = (e) => {
		e.preventDefault();

		const oldSortDirection = props.sortDirection || sortDirection;
		// UX pattern: If sortable, and the DataTable's parent has not defined the sort order, then ascending (that is A->Z) is the default sort order on first click. Some columns, such as "last viewed" or "recently updated," should sort descending first, since that is what the user probably wants. Who wants to see the oldest files first?
		const newSortDirection = (function sortDirectionFunction(
			direction,
			isDefaultSortDescending
		) {
			switch (direction) {
				case 'asc':
					return 'desc';
				case 'desc':
					return 'asc';
				case null:
					return isDefaultSortDescending ? 'desc' : 'asc';
				default:
					return 'asc';
			}
		})(oldSortDirection, props.isDefaultSortDescending);
		const data = {
			property: props.property,
			sortDirection: newSortDirection,
		};

		setSortDirection(newSortDirection);

		if (isFunction(props.onSort)) {
			props.onSort(data, e);
		}
	};

	const { fixedHeader, isSorted, label, sortable, width, property } = props;

	const labelType = typeof label;
	// This decides which arrow to render--which is current sort order if the column is sorted OR the future sort order if the arrow is clicked in the future.
	const effectiveSortDirection =
		props.sortDirection ||
		sortDirection ||
		(props.isDefaultSortDescending && 'desc');
	const expandedSortDirection =
		effectiveSortDirection === 'desc' ? 'descending' : 'ascending';
	const ariaSort = isSorted ? expandedSortDirection : 'none';

	const getFixedLayoutSubRenders = (isHidden) => {
		if (sortable) {
			// Don't make the anchor interactable when it's hidden
			const SortLink = isHidden ? Link : InteractiveLink;
			return (
				<SortLink
					href="#"
					className="slds-th__action slds-text-link_reset"
					onClick={handleSort}
					role="button"
				>
					<span className="slds-assistive-text">
						{props.assistiveTextForColumnSort || props.assistiveText.columnSort}{' '}
					</span>
					<span
						className="slds-truncate"
						title={labelType === 'string' ? label : undefined}
					>
						{label}
					</span>
					<Icon
						className="slds-is-sortable__icon"
						category="utility"
						name={effectiveSortDirection === 'desc' ? 'arrowdown' : 'arrowup'}
						size="x-small"
					/>
					{effectiveSortDirection ? (
						<span className="slds-assistive-text" aria-atomic="true">
							{effectiveSortDirection === 'asc'
								? props.assistiveTextForColumnSortedAscending ||
								  props.assistiveText.columnSortedAscending
								: props.assistiveTextForColumnSortedDescending ||
								  props.assistiveText.columnSortedDescending}
						</span>
					) : null}
				</SortLink>
			);
		}
		return (
			<span
				className="slds-p-horizontal_x-small slds-th__action"
				style={{ display: 'flex' }}
			>
				<span
					className="slds-truncate"
					title={labelType === 'string' ? label : undefined}
				>
					{label}
				</span>
			</span>
		);
	};

	const getHeaderCellContent = (isHidden) =>
		props.fixedLayout ? (
			getFixedLayoutSubRenders(isHidden)
		) : (
			<div
				className="slds-truncate"
				title={labelType === 'string' ? label : undefined}
			>
				{label}
			</div>
		);

	return (
		<th
			id={`${props.id}-${property}-th`}
			aria-label={labelType === 'string' ? label : undefined}
			aria-sort={ariaSort}
			className={classNames({
				'slds-is-sortable': sortable,
				'slds-is-sorted': isSorted,
				[`slds-is-sorted_${effectiveSortDirection}`]: effectiveSortDirection,
				'slds-is-sorted_asc': isSorted && !effectiveSortDirection, // default for hover, up arrow is ascending which means A is at the top of the table, and Z is at the bottom. You have to think about row numbers abstracting, and not the visual order on the table.
			})}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			ref={(ref) => {
				if (props.cellRef) {
					props.cellRef(ref);
					if (ref && hasFocus) {
						ref.focus();
					}
				}
			}}
			scope="col"
			style={
				fixedHeader || width
					? {
							height: fixedHeader ? 0 : null,
							lineHeight: fixedHeader ? 0 : null,
							width: width || null,
					  }
					: null
			}
			tabIndex={tabIndex}
		>
			{fixedHeader
				? React.cloneElement(getHeaderCellContent(true), {
						style: {
							display: 'flex',
							height: 0,
							overflow: 'hidden',
							paddingBottom: 0,
							paddingTop: 0,
							visibility: 'hidden',
						},
				  })
				: getHeaderCellContent()}
			{fixedHeader ? (
				<CellFixed>
					{React.cloneElement(getHeaderCellContent(), {
						style: {
							alignItems: 'center',
							display: 'flex',
							flex: '1 1 auto',
							lineHeight: 1.25,
							width: '100%',
						},
						tabIndex: sortable ? 0 : null,
					})}
				</CellFixed>
			) : null}
		</th>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
DataTableHeaderCell.displayName = DATA_TABLE_HEADER_CELL;
DataTableHeaderCell.propTypes = propTypes;

export default DataTableHeaderCell;
