import Default from '../__examples__/default';
import StepsComplete from '../__examples__/steps-complete';
import Splash from '../__examples__/splash';
import InfoOnly from '../__examples__/info-only';
import TrailHead from '../__examples__/trailhead';
import TrailHeadComplete from '../__examples__/trailhead-complete';

export default {
	title: 'Components/WelcomeMat',
	decorators: [
		(Story) => <div className="slds-p-around_medium">{Story()}</div>,
	],
};

export const Default2 = {
	name: 'Default',
	render: () => <Default isOpen />,
};

export const StepsComplete2 = {
	name: 'Steps Complete',
	render: () => <StepsComplete isOpen />,
};

export const InfoOnly2 = {
	name: 'Info Only',
	render: () => <InfoOnly isOpen />,
};

export const Splash2 = {
	name: 'Splash',
	render: () => <Splash isOpen />,
};

export const Trailhead = {
	render: () => <TrailHead isOpen />,
};

export const TrailheadComplete = {
	render: () => <TrailHeadComplete isOpen />,
};
