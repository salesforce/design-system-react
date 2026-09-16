import Default from '../__examples__/default';
import Override from '../__examples__/override';

export default {
	title: 'Components/PortalSettings',
	decorators: [
		(Story) => <div className="slds-p-around_medium">{Story()}</div>,
	],
};

export const DefaultNotUsed = {
	name: 'Default, not used',
	render: () => <Default />,
};

export const OverrideStory = {
	name: 'Override',
	render: () => <Override />,
};
