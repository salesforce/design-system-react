/* eslint-disable react/display-name */
/* eslint-disable no-script-url */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { POPOVER } from '../../../utilities/constants';
import Header from '../__examples__/header';
import AlternativeHeader from '../__examples__/alternative-header';
import ControlledWithFooter from '../__examples__/controlled-with-footer';

import Popover from '../../popover';
import Button from '../../button';

const getPopover = (props) => (
	<div>
		<Popover {...props}>
			<Button label="Trigger Popover" />
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
		'left',
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
					position="overflowBoundaryElement"
					{...props}
				>
					{props.trigger}
				</Popover>
			</div>,
		);
	});

	return <div key="container">{children}</div>;
};

const bodyContent =
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const popoverBackgroundColor = 'rgb(255, 80, 121)';
const containerBackgroundColor = 'rgb(255, 127, 80)';

storiesOf(POPOVER, module)
	.addDecorator((getStory) => (
		<div
			className="slds-p-around--medium slds-m-horizontal--x-large"
			style={{
				margin: '300px auto',
				textAlign: 'center',
				width: '500px',
			}}
		>
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Header', () => <Header />)
	.add('Controlled w/ Footer', () => <ControlledWithFooter log={action} />)
	.add('AlternativeHeader', () => <AlternativeHeader />)
	.add('Alignment (Button)', () =>
		getPopoverNubbins({
			trigger: <Button label="Trigger Popover" tabIndex="0" />,
		}),
	)
	.add('Alignment (ButtonIcon)', () =>
		getPopoverNubbins({
			body: bodyContent,
			hasStaticAlignment: true,
			heading: 'My Popover',
			id: 'myPopoverId',
			isOpen: true,
			trigger: (
				<Button
					assistiveText="Case Icon"
					iconCategory="utility"
					iconName="filter"
					iconSize="small"
					iconVariant="border"
					variant="icon"
				/>
			),
		}),
	)
	.add('Styling (dev-only)', () =>
		getPopover({
			body: bodyContent,
			heading: 'My Popover',
			id: 'myPopoverId',
			isOpen: true,
			className: 'sample-classname',
			closeButtonAssistiveText: 'Shut it now!',
			containerClassName: 'sample-container-classname',
			containerStyle: { background: containerBackgroundColor },
			style: { background: popoverBackgroundColor },
		}),
	);
