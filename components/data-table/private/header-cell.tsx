/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useContext,
	useEffect,
	useRef,
	useState,
	SyntheticEvent,
	ReactNode,
} from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

import CellFixed from './cell-fixed';
import Icon from '../../icon';

import checkProps from '../column-check-props';

import Link from './link';
import InteractiveLink from '../interactive-link';
import CellContext from './cell-context';
import TableContext from './table-context';
import useContextHelper from './context-helper';

import {
	DATA_TABLE_HEADER_CELL,
	DATA_TABLE_COLUMN,
} from '../../../utilities/constants';

interface AssistiveText {
	actionsHeader?: string;
	columnSort?: string;
	columnSortedAscending?: string;
	columnSortedDescending?: string;
	selectAllRows?: string;
	selectRow?: string;
}

export interface DataTableHeaderCellProps {
	assistiveText?: AssistiveText;
	cellRef?: (ref: HTMLElement | null) => void;
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id: string;
	isDefaultSortDescending?: boolean;
	isSorted?: boolean;
	label?: string | ReactNode;
	onSort?: (
		data: { property: string; sortDirection: 'asc' | 'desc' },
		event: SyntheticEvent
	) => void;
	property?: string;
	sortable?: boolean;
	sortDirection?: 'desc' | 'asc';
	width?: string;
	/** @deprecated */
	assistiveTextForColumnSort?: string;
	/** @deprecated */
	assistiveTextForColumnSortedAscending?: string;
	/** @deprecated */
	assistiveTextForColumnSortedDescending?: string;
}

/**
 * Used internally, renders each individual column heading.
 */
const DataTableHeaderCell: React.FC<DataTableHeaderCellProps> = (props) => {
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
		null
	);
	const prevIsSorted = useRef<boolean | null>(null);
	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(DATA_TABLE_COLUMN, props);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (prevIsSorted.current === true && props.isSorted === false) {
			setSortDirection(null);
		}
		prevIsSorted.current = props.isSorted ?? null;
	}, [props.isSorted]);

	const handleSort = (e: SyntheticEvent) => {
		e.preventDefault();

		const oldSortDirection = props.sortDirection || sortDirection;
		const newSortDirection = (function sortDirectionFunction(
			direction: 'asc' | 'desc' | null,
			isDefaultSortDescending?: boolean
		): 'asc' | 'desc' {
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
			property: props.property || '',
			sortDirection: newSortDirection,
		};

		setSortDirection(newSortDirection);

		if (isFunction(props.onSort)) {
			props.onSort(data, e);
		}
	};

	const { fixedHeader, isSorted, label, sortable, width, property } = props;

	const labelType = typeof label;
	const effectiveSortDirection =
		props.sortDirection ||
		sortDirection ||
		(props.isDefaultSortDescending ? 'desc' : undefined);
	const expandedSortDirection =
		effectiveSortDirection === 'desc' ? 'descending' : 'ascending';
	const ariaSort = isSorted ? expandedSortDirection : 'none';

	const getFixedLayoutSubRenders = (isHidden?: boolean) => {
		if (sortable) {
			const SortLink = isHidden ? Link : InteractiveLink;
			return (
				<SortLink
					href="#"
					className="slds-th__action slds-text-link_reset"
					onClick={handleSort}
					role="button"
				>
					<span className="slds-assistive-text">
						{props.assistiveTextForColumnSort || props.assistiveText?.columnSort}{' '}
					</span>
					<span
						className="slds-truncate"
						title={labelType === 'string' ? (label as string) : undefined}
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
								  props.assistiveText?.columnSortedAscending
								: props.assistiveTextForColumnSortedDescending ||
								  props.assistiveText?.columnSortedDescending}
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
					title={labelType === 'string' ? (label as string) : undefined}
				>
					{label}
				</span>
			</span>
		);
	};

	// `getFixedLayoutSubRenders` already returns a single element (a sort link or a
	// span), so return it directly rather than wrapping it in a Fragment. The
	// callers below `cloneElement` this result to inject `style`, which React only
	// applies to real elements — a Fragment silently drops it (and warns).
	const getHeaderCellContent = (isHidden?: boolean): React.ReactElement =>
		props.fixedLayout ? (
			getFixedLayoutSubRenders(isHidden)
		) : (
			<div
				className="slds-truncate"
				title={labelType === 'string' ? (label as string) : undefined}
			>
				{label}
			</div>
		);

	return (
		<th
			id={`${props.id}-${property}-th`}
			aria-label={labelType === 'string' ? (label as string) : undefined}
			aria-sort={ariaSort}
			className={classNames({
				'slds-is-sortable': sortable,
				'slds-is-sorted': isSorted,
				[`slds-is-sorted_${effectiveSortDirection}`]: effectiveSortDirection,
				'slds-is-sorted_asc': isSorted && !effectiveSortDirection,
				'slds-has-focus': hasFocus,
			})}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			ref={(ref) => {
				if (props.cellRef) {
					props.cellRef(ref);
				}
				if (ref && hasFocus) {
					ref.focus();
				}
			}}
			scope="col"
			style={
				fixedHeader || width
					? {
							height: fixedHeader ? 0 : undefined,
							lineHeight: fixedHeader ? 0 : undefined,
							width: width || undefined,
					  }
					: undefined
			}
			tabIndex={tabIndex}
		>
			{fixedHeader
				? React.cloneElement(
						getHeaderCellContent(true) as React.ReactElement<{ style?: React.CSSProperties }>,
						{
							style: {
								display: 'flex',
								height: 0,
								overflow: 'hidden',
								paddingBottom: 0,
								paddingTop: 0,
								visibility: 'hidden' as const,
							},
						}
				  )
				: getHeaderCellContent()}
			{fixedHeader ? (
				<CellFixed>
					{React.cloneElement(
						getHeaderCellContent() as React.ReactElement<{
							style?: React.CSSProperties;
							tabIndex?: number;
						}>,
						{
							style: {
								alignItems: 'center',
								display: 'flex',
								flex: '1 1 auto',
								lineHeight: 1.25,
								width: '100%',
							},
							tabIndex: sortable ? 0 : undefined,
						}
					)}
				</CellFixed>
			) : null}
		</th>
	);
};

DataTableHeaderCell.displayName = DATA_TABLE_HEADER_CELL;

export default DataTableHeaderCell;
