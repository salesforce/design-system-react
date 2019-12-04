import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import MediaObject from '../../media-object';
import Icon from '../../icon';
import { MEDIA_OBJECT } from '../../../utilities/constants';

import Default from '../__examples__/default';
import VerticallyCentered from '../__examples__/vertically-centered';

const DemoMediaObject = (props) => <MediaObject {...props} />;
DemoMediaObject.displayName = 'DemoMediaObject';
storiesOf(MEDIA_OBJECT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => (
		<DemoMediaObject
			body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
			figure={<Icon category="standard" name="user" size="medium" />}
		/>
	))
	.add('Figure Vertical Center', () => (
		<DemoMediaObject
			body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
			figure={<Icon category="standard" name="user" size="medium" />}
			verticalCenter
		/>
	))
	.add('Docs site Default', () => <Default />)
	.add('Docs site VerticallyCentered', () => <VerticallyCentered />);
