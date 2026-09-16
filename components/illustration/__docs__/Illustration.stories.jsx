import SmallImageWithText from '../__examples__/small-image-text.jsx';
import LargeImageWithText from '../__examples__/large-image-text.jsx';
import HeadingOnly from '../__examples__/heading-only.jsx';
import MessageOnly from '../__examples__/message-only.jsx';
import HeadingWithMessage from '../__examples__/heading-message.jsx';

export default {
	title: 'Components/Illustration',
	decorators: [
		(Story) => <div className="slds-p-around_medium">{Story()}</div>,
	],
};

export const SmallImageAndText = {
	name: 'Small Image and Text',
	render: () => <SmallImageWithText />,
};

export const LargeImageAndText = {
	name: 'Large Image and Text',
	render: () => <LargeImageWithText />,
};

export const HeadingOnly1 = {
	name: 'Heading Only',
	render: () => <HeadingOnly />,
};

export const MessageOnly1 = {
	name: 'Message Only',
	render: () => <MessageOnly />,
};

export const HeadingAndMessage = {
	name: 'Heading and Message',
	render: () => <HeadingWithMessage />,
};
