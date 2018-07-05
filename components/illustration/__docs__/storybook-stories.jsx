import React from 'react';
import { storiesOf } from '@storybook/react';

import { ILLUSTRATION } from '../../../utilities/constants';

import Illustration from '../../illustration';

import ImageWithText from '../__examples__/image-text.jsx';
import HeadingOnly from '../__examples__/heading-only.jsx';
import MessageOnly from '../__examples__/message-only.jsx';
import HeadingWithMessage from '../__examples__/heading-message.jsx';

storiesOf(ILLUSTRATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Image and Text', () => <ImageWithText />)
	.add('Heading Only', () => <HeadingOnly />)
	.add('Message Only', () => <MessageOnly />)
	.add('Heading and Message', () => <HeadingWithMessage />);
