/*
 * Field Level Help Tooltip for input labels
 */
import React from 'react';

import Tooltip, { type TooltipProps } from '../index';
import objectHelpers from '../../../utilities/object';

export interface FieldLevelHelpTooltipProps {
	/**
	 * Assistive Text object from parent component such as Input, Combobox, etc.
	 */
	assistiveText?: {
		triggerLearnMoreIcon?: string;
	};
	/**
	 * Tooltip from external prop - a Tooltip element to use
	 */
	fieldLevelHelpTooltip: React.ReactElement<TooltipProps> | null;
}

const defaultProps: Partial<TooltipProps> = {
	triggerClassName: 'slds-form-element__icon',
	// This allows `position: absolute` Tooltips to align properly.
	// If not present, tooltip will always be below the info icon
	// instead of above it.
	triggerStyle: { position: 'static' },
	variant: 'learnMore',
};

const FieldLevelHelpTooltip = ({
	fieldLevelHelpTooltip,
	assistiveText = {},
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
				// allow backwards compatibility with Input's
				// assistiveText.fieldLevelHelpButton
				// `Input` used to have an `assistiveText.fieldLevelHelpButton`
				// prop and that prop needs to override the default Tooltip
				// "Help" string.
				assistiveText: {
					...tooltipProps.assistiveText,
					...objectHelpers.removeUndefined(assistiveText),
				},
			}}
		/>
	);
};

FieldLevelHelpTooltip.displayName = 'FieldLevelHelpTooltip';

export default FieldLevelHelpTooltip;














