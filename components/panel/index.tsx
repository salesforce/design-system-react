/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import { PANEL } from '../../utilities/constants';

/**
 * Panel variant types
 */
export type PanelVariant = 'filters';

/**
 * Props for the Panel component
 */
export interface PanelProps {
	/** Panel content */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Panel variant */
	variant?: PanelVariant;
}

/**
 * A panel provides detailed contextual information or contextual filtering options.
 * Filter component should be used as children.
 */
const Panel = ({
	children,
	className,
	variant,
}: PanelProps): React.ReactElement => {
	return (
		<div
			className={classNames(
				'slds-panel',
				'slds-grid',
				'slds-grid_vertical',
				'slds-nowrap',
				{
					'slds-panel_filters': variant === 'filters',
				},
				className as string
			)}
		>
			<div className="slds-form_stacked slds-grow slds-scrollable_y slds-grid slds-grid_vertical">
				{children}
			</div>
		</div>
	);
};

Panel.displayName = PANEL;

export default Panel;















