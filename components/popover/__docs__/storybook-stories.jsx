/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { POPOVER } from '../../../utilities/constants';

import CustomTarget from '../__examples__/custom-target';
import Header from '../__examples__/header';
import Error from '../__examples__/error';
import Feature from '../__examples__/feature';
import Walkthrough from '../__examples__/walkthrough';
import EditDialog from '../__examples__/edit-dialog';
import WalkthroughAction from '../__examples__/walkthrough-action';
import Warning from '../__examples__/warning';
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
		'top right',
		'top left',
		'right',
		'right top',
		'right bottom',
		'bottom',
		'bottom left',
		'bottom right',
		'left',
		'left top',
		'left bottom',
	];

	align.forEach((value) => {
		children.push(
			<div key={value} style={{ margin: '150px auto' }}>
				<Popover
					align={value}
					assistiveText={{ closeButton: 'This is a popover.' }}
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					hasStaticAlignment
					heading="My Popover"
					id={value}
					isOpen
					position="overflowBoundaryElement"
					{...props}
				>
					{props.trigger}
				</Popover>
			</div>
		);
	});

	return (
		<div key="container" data-ignore-axe-duplicate-id-active>
			{children}
		</div>
	);
};

const bodyContent =
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const popoverBackgroundColor = 'rgb(255, 80, 121)';
const containerBackgroundColor = 'rgb(255, 127, 80)';

storiesOf(POPOVER, module)
	.addDecorator((getStory) => (
		<div
			className="slds-p-around_medium slds-m-horizontal_x-large"
			style={{
				margin: '300px auto',
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
		})
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
					assistiveText={{ icon: 'Case Icon' }}
					iconCategory="utility"
					iconName="filter"
					iconSize="small"
					iconVariant="border"
					variant="icon"
				/>
			),
		})
	)
	.add('Custom Target', () => <CustomTarget />)
	.add('Custom Target - Open', () => <CustomTarget isOpen />)
	.add('Styling (dev-only)', () =>
		getPopover({
			body: bodyContent,
			heading: 'My Popover',
			id: 'myPopoverId',
			isOpen: true,
			className: 'sample-classname',
			assistiveText: {
				closeButton: 'Shut it now!',
			},
			containerClassName: 'sample-container-classname',
			containerStyle: { background: containerBackgroundColor },
			style: { background: popoverBackgroundColor },
		})
	)
	.add('Error', () => <Error />)
	.add('Error w/ Footer', () => <Error footer="Footer Item" />)
	.add('Error - Open', () => <Error isOpen />)
	.add('Feature', () => <Feature action={action} />)
	.add('Feature - Open', () => <Feature action={action} isOpen />)
	.add('Warning', () => <Warning />)
	.add('Warning  - Open', () => <Warning isOpen />)
	.add('Walkthrough', () => <Walkthrough action={action} />)
	.add('Walkthrough - Open', () => <Walkthrough action={action} isOpen />)
	.add('Walkthrough Action', () => <WalkthroughAction />)
	.add('Walkthrough Action - Open', () => <WalkthroughAction isOpen />)
	.add('Edit Dialog', () => <EditDialog />)
	.add('Edit Dialog - Open', () => <EditDialog isOpen />)
	.add('Edit Dialog - Disabled', () => <EditDialog disabled />);
