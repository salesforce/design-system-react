import React from 'react';
import Button from '../button';
import { TRIAL_BAR_BUTTON } from '../../utilities/constants';

// This component accepts the same props as Button.
// eslint-disable-next-line react/forbid-foreign-prop-types
const { propTypes } = Button;

/**
 *  A [Button](/components/buttons/) within the Trial Bar.
 */
const TrialBarButton = (props) => (
	<Button
		{...props}
		inverse
		style={{ border: 0, padding: 0 }}
		className="slds-m-right_small"
	/>
);

TrialBarButton.propTypes = propTypes;
TrialBarButton.displayName = TRIAL_BAR_BUTTON;

export default TrialBarButton;
