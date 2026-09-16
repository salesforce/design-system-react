import Default from '../__examples__/default';

export default {
	title: 'Components/TrialBar',
	decorators: [
		(Story) => <div className="slds-p-around_medium">{Story()}</div>,
	],
};

export const DefaultStory = {
	name: 'Default',
	render: () => <Default />,
};
