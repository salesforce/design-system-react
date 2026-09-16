import Button, { type ButtonProps } from '../button';
import { TRIAL_BAR_BUTTON } from '../../utilities/constants';

/**
 *  A [Button](/components/buttons/) within the Trial Bar.
 */
const TrialBarButton = (props: ButtonProps) => (
	<Button
		{...props}
		inverse
		style={{ border: 0, padding: 0 }}
		className="slds-m-right_small"
	/>
);

TrialBarButton.displayName = TRIAL_BAR_BUTTON;

export default TrialBarButton;
