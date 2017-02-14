/* eslint-disable react/display-name */
/* eslint-disable no-script-url */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { POPOVER } from '../../utilities/constants';
import Header from './header';
import AlternativeHeader from './alternative-header';
import ControlledWithFooter from './controlled-with-footer';

import Popover from '../../components/popover';
import Button from '../../components/button';

const getPopover = (props) => (
	<div>
		<Popover {...props}>
			<Button label="Trigger Popover" />
			<br />
			<a href="#"> Focusable Not Trigger Popover</a>
		</Popover>
	</div>
);

const getPopoverNubbins = (props) => {
/* eslint-disable react/prop-types */
	const children = [];

	const align = [
		'top',
		'top left',
		'top right',
		'right',
		'bottom',
		'bottom left',
		'bottom right',
		'left'
	];

	align.forEach((value) => {
		children.push(
			<div key={value} style={{ margin: '150px auto' }}>
				<Popover
					align={value}
					assistiveText="This is a popover."
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					hasStaticAlignment
					heading="My Popover"
					isOpen
					{...props}
				>
					{props.trigger}
				</Popover>
			</div>
		);
	});

	return (
		<div key="container">
			{children}
		</div>
	);
};

const bodyContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const popoverBackgroundColor = 'rgb(255, 80, 121)';
const containerBackgroundColor = 'rgb(255, 127, 80)';

storiesOf(POPOVER, module)
	.addDecorator(getStory => <div
		className="slds-p-around--medium slds-m-horizontal--x-large"
		style={{
			margin: '300px auto',
			textAlign: 'center',
			width: '500px' }}
	>{getStory()}</div>)
	.add('Header', () => <Header />)
	.add('Controlled w/ Footer', () => <ControlledWithFooter log={action} />)
	.add('AlternativeHeader', () => <AlternativeHeader />)
	.add('Alignment (Button)', () => getPopoverNubbins({
		trigger: (<Button label="Trigger Popover" tabIndex="0" />)
	}))
	.add('Alignment (ButtonIcon)', () => getPopoverNubbins({
		body: bodyContent,
		hasStaticAlignment: true,
		heading: 'My Popover',
		id: 'myPopoverId',
		isOpen: true,
		trigger: (<Button
			assistiveText="Case Icon"
			iconCategory="utility"
			iconName="filter"
			iconSize="small"
			iconVariant="border"
			variant="icon"
		/>)
	}))
	.add('Styling (dev-only)', () => getPopover({
		body: bodyContent,
		heading: 'My Popover',
		id: 'myPopoverId',
		isOpen: true,
		className: 'sample-classname',
		closeButtonAssistiveText: 'Shut it now!',
		containerClassName: 'sample-container-classname',
		containerStyle: { background: containerBackgroundColor },
		style: { background: popoverBackgroundColor }
	}));
