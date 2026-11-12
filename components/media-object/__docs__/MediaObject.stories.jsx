import IconSettings from '../../icon-settings';
import MediaObject from '../../media-object';
import Icon from '../../icon';

import Default from '../__examples__/default';
import VerticallyCentered from '../__examples__/vertically-centered';

const DemoMediaObject = (props) => <MediaObject {...props} />;
DemoMediaObject.displayName = 'DemoMediaObject';

export default {
	title: 'Components/MediaObject',
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">{Story()}</IconSettings>
			</div>
		),
	],
};

export const Base = {
	render: () => (
		<DemoMediaObject
			body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
			figure={<Icon category="standard" name="user" size="medium" />}
		/>
	),
};

export const FigureVerticalCenter = {
	render: () => (
		<DemoMediaObject
			body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
			figure={<Icon category="standard" name="user" size="medium" />}
			verticalCenter
		/>
	),
};

export const DocsSiteDefault = {
	render: () => <Default />,
};

export const DocsSiteVerticallyCentered = {
	name: 'Docs site VerticallyCentered',
	render: () => <VerticallyCentered />,
};
