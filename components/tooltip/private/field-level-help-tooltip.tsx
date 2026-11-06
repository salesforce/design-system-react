/*
 * Field Level Help Tooltip for input labels
 */
import React from 'react';

import Tooltip, { type TooltipProps } from '../index';

export interface FieldLevelHelpTooltipProps {
	/**
	 * Tooltip from external prop - a Tooltip element to use
	 */
	fieldLevelHelpTooltip: React.ReactElement<TooltipProps> | null;
}

const defaultProps: Partial<TooltipProps> = {
	className: 'slds-form-element__icon',
	// This allows `position: absolute` Tooltips to align properly.
	// If not present, tooltip will always be below the info icon
	// instead of above it.
	style: { position: 'static' },
	variant: 'learnMore',
};

const FieldLevelHelpTooltip = ({
	fieldLevelHelpTooltip,
}: FieldLevelHelpTooltipProps): React.ReactElement | null => {
	if (!fieldLevelHelpTooltip) {
		return null;
	}

	const tooltipProps = fieldLevelHelpTooltip.props as TooltipProps;

	return (
		<Tooltip
			{...{
				// internal default props
				...defaultProps,
				// props from external developer
				...tooltipProps,
			}}
		/>
	);
};

FieldLevelHelpTooltip.displayName = 'FieldLevelHelpTooltip';

export default FieldLevelHelpTooltip;
