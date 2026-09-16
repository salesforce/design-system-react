import Sprite from '../__examples__/sprite';
import IconPath from '../__examples__/icon-path';
import OnRequestIconPath from '../__examples__/on-request-icon-path';

export default {
	title: 'Components/IconSettings',
	decorators: [
		(Story) => <div className="slds-p-around_medium">{Story()}</div>,
	],
};

export const BaseIconPath = {
	name: 'Base: Icon path',
	render: () => <IconPath />,
};

export const BaseSpriteImportsNoTest = {
	name: 'Base: Sprite imports NoTest',
	render: () => <Sprite />,
};

export const BaseOnRequestIconPathNoTest = {
	name: 'Base: OnRequestIconPath NoTest',
	render: () => <OnRequestIconPath />,
};
