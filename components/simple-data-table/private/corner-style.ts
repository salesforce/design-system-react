/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type React from 'react';

/**
 * SLDS 2 draws `slds-table_bordered` as a rounded box, but the header cells and
 * selected or hovered body cells paint their own square backgrounds, which
 * poke out past the rounded corners. Clipping the table would also clip the
 * row action menus, so the four corner cells take the table's radius instead.
 *
 * `inherit` follows the theme: Cosmos rounds the table, Lightning Blue sets its
 * radius to 0. The value has to inherit through every level, so the row group
 * (`thead`/`tbody`) and the corner rows inherit it as well.
 */
export const inheritRadius: React.CSSProperties = { borderRadius: 'inherit' };

export interface CornerPosition {
	isFirstRow?: boolean;
	isLastRow?: boolean;
	isFirstColumn?: boolean;
	isLastColumn?: boolean;
}

/** The radius style for a cell, or `undefined` when it is not a corner. */
export const getCornerStyle = ({
	isFirstRow,
	isLastRow,
	isFirstColumn,
	isLastColumn,
}: CornerPosition): React.CSSProperties | undefined => {
	const style: React.CSSProperties = {};

	if (isFirstRow && isFirstColumn) style.borderStartStartRadius = 'inherit';
	if (isFirstRow && isLastColumn) style.borderStartEndRadius = 'inherit';
	if (isLastRow && isFirstColumn) style.borderEndStartRadius = 'inherit';
	if (isLastRow && isLastColumn) style.borderEndEndRadius = 'inherit';

	return Object.keys(style).length > 0 ? style : undefined;
};

/** The style for a row that holds corner cells, so the radius reaches them. */
export const getCornerRowStyle = ({
	isFirstRow,
	isLastRow,
}: CornerPosition): React.CSSProperties | undefined =>
	isFirstRow || isLastRow ? inheritRadius : undefined;
