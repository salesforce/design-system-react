/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { forwardRef } from 'react';
import classNames from 'classnames';
import { LAYOUT } from '../../utilities/constants';
import type { LayoutProps } from './types';

const HORIZONTAL_ALIGN_CLASS: Record<
	NonNullable<LayoutProps['horizontalAlign']>,
	string
> = {
	center: 'slds-grid_align-center',
	space: 'slds-grid_align-space',
	spread: 'slds-grid_align-spread',
	end: 'slds-grid_align-end',
};

const VERTICAL_ALIGN_CLASS: Record<
	NonNullable<LayoutProps['verticalAlign']>,
	string
> = {
	start: 'slds-grid_vertical-align-start',
	center: 'slds-grid_vertical-align-center',
	end: 'slds-grid_vertical-align-end',
	stretch: 'slds-grid_vertical-stretch',
};

const PULL_TO_BOUNDARY_CLASS: Record<
	NonNullable<LayoutProps['pullToBoundary']>,
	string
> = {
	small: 'slds-grid_pull-padded',
	medium: 'slds-grid_pull-padded-medium',
	large: 'slds-grid_pull-padded-large',
};

/**
 * Layout is a grid container. It mirrors `lightning-layout` and always renders
 * `slds-grid`, with typed alignment, wrapping, and boundary-pull modifiers.
 */
const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
	const {
		horizontalAlign,
		verticalAlign,
		pullToBoundary,
		multipleRows,
		className,
		children,
		...rest
	} = props;

	return (
		<div
			ref={ref}
			className={classNames(
				'slds-grid',
				horizontalAlign && HORIZONTAL_ALIGN_CLASS[horizontalAlign],
				verticalAlign && VERTICAL_ALIGN_CLASS[verticalAlign],
				pullToBoundary && PULL_TO_BOUNDARY_CLASS[pullToBoundary],
				{ 'slds-wrap': multipleRows },
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
});

Layout.displayName = LAYOUT;

export default Layout;
