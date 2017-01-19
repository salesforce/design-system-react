import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MediaObject from '../../components/media-object';
import Icon from '../../components/icon';

import { MEDIA_OBJECT } from '../../utilities/constants';

const DemoMediaObject = (props) => (
	<MediaObject {...props} />
);
DemoMediaObject.displayName = 'DemoMediaObject';

storiesOf(MEDIA_OBJECT, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (<DemoMediaObject
		body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
		figure={<Icon category="standard" name="user" size="medium" />}
	/>))
	.add('Figure Vertical Center', () => (<DemoMediaObject
	body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
	figure={<Icon category="standard" name="user" size="medium" />}
	verticalCenter
	/>));
