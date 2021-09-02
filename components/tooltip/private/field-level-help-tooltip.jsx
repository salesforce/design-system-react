/*
 * Field Level Help Tooltip for input labels
 */
import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../index';
import objectHelpers from '../../../utilities/object';

const propTypes = {
	/*
	 * Assistive Text object from parent component such as Input, Combobox, etc.
	 */
	assistiveText: PropTypes.shape({
		triggerLearnMoreIcon: PropTypes.string,
	}),
	/*
	 * Tooltip from external prop
	 */
	fieldLevelHelpTooltip: PropTypes.node.isRequired,
};

const defaultProps = {
	triggerClassName: 'slds-form-element__icon',
	// This allows `position: absolute` Tooltips to align properly.
	// If not present, tooltip will always be below the info icon // instead of above it.
	triggerStyle: { position: 'static' },
	variant: 'learnMore',
};

const FieldLevelHelpTooltip = ({ fieldLevelHelpTooltip, assistiveText = {} }) =>
	fieldLevelHelpTooltip ? (
		<Tooltip
			{...{
				// internal default props
				...defaultProps,
				// props from external developer
				...fieldLevelHelpTooltip.props,
				// allow backwards compatibility with Input's
				// assistiveText.fieldLevelHelpButton
				// `Input` used to have an `assistiveText.fieldLevelHelpButton`
				// prop and that prop needs to override the default Tooltip
				// "Help" string.
				assistiveText: {
					...fieldLevelHelpTooltip.props.assistiveText,
					...objectHelpers.removeUndefined(assistiveText),
				},
			}}
		/>
	) : null;

FieldLevelHelpTooltip.propTypes = propTypes;
FieldLevelHelpTooltip.displayName = 'FieldLevelHelpTooltip';

export default FieldLevelHelpTooltip;
