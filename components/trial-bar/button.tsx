import classNames from 'classnames';
import Button, { type ButtonProps } from '../button';
import { TRIAL_BAR_BUTTON } from '../../utilities/constants';

/**
 *  A [Button](/components/buttons/) within the Trial Bar.
 */
const TrialBarButton = ({ className, style, ...props }: ButtonProps) => (
	<Button
		{...props}
		inverse
		style={{ border: 0, padding: 0, ...style }}
		className={classNames(
			'slds-m-right_small',
			className as string | string[] | Record<string, boolean>
		)}
	/>
);

TrialBarButton.displayName = TRIAL_BAR_BUTTON;

export default TrialBarButton;
