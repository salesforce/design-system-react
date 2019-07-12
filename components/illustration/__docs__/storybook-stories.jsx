import React from 'react';
import { storiesOf } from '@storybook/react';

import { ILLUSTRATION } from '../../../utilities/constants';

import SmallImageWithText from '../__examples__/small-image-text.jsx';
import LargeImageWithText from '../__examples__/large-image-text.jsx';
import HeadingOnly from '../__examples__/heading-only.jsx';
import MessageOnly from '../__examples__/message-only.jsx';
import HeadingWithMessage from '../__examples__/heading-message.jsx';

storiesOf(ILLUSTRATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Small Image and Text', () => <SmallImageWithText />)
	.add('Large Image and Text', () => <LargeImageWithText />)
	.add('Heading Only', () => <HeadingOnly />)
	.add('Message Only', () => <MessageOnly />)
	.add('Heading and Message', () => <HeadingWithMessage />);
