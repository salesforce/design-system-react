/* eslint-disable react/display-name, jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { POPOVER_TOOLTIP } from '../../../utilities/constants';
import Tooltip from '../../tooltip';

import AnchoredNubbin from '../__examples__/anchored-nubbin';
import Base from '../__examples__/base';
import ButtonGroupExample from '../__examples__/button-group';
import ButtonExample from '../__examples__/button';
import LearnMoreExample from '../__examples__/learn-more';
import WithDelay from '../__examples__/with-delay';

import Icon from '../../icon';
import Button from '../../button';

const getPopoverTooltip = (props) => (
	<Tooltip {...props}>
		<Button label="Trigger Tooltip" />
	</Tooltip>
);

const getPopoverTooltipAlign = (props) => {
	/* eslint-disable react/prop-types */
	const children = [];

	const align = [
		'top',
		'top left',
		'top right',
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
			<div
				key={value}
				data-ignore-axe-duplicate-id-aria
				style={{ margin: '100px auto' }}
			>
				<Tooltip {...props} align={value}>
					{props.trigger}
				</Tooltip>
			</div>
		);
	});

	return <div key="container">{children}</div>;
};

const content =
	'Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.';

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator((getStory) => (
		<div
			className="slds-p-around_medium slds-m-horizontal_x-large"
			style={{
				margin: '150px auto',
				width: '500px',
			}}
		>
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Base />)
	.add('Learn More', () => <LearnMoreExample />)
	.add('Button Group', () => <ButtonGroupExample />)
	.add('Button', () => <ButtonExample />)
	.add('Open', () =>
		getPopoverTooltip({
			align: 'bottom',
			isOpen: true,
			id: 'myPopoverId',
			dialogClassName: 'dialog-classname',
			content,
		})
	)
	.add('Alignment (Button)', () =>
		getPopoverTooltipAlign({
			id: 'myPopoverId',
			isOpen: true,
			content,
			trigger: <Button label="Trigger Tooltip" />,
		})
	)
	.add('Alignment (span)', () =>
		getPopoverTooltipAlign({
			id: 'myPopoverId',
			isOpen: true,
			content,
			trigger: (
				<span tabIndex="0" key="trigger">
					Trigger Tooltip
				</span>
			),
		})
	)
	.add('Alignment (icon)', () =>
		getPopoverTooltipAlign({
			id: 'myPopoverId',
			isOpen: true,
			content: <span>{content}</span>, // react/no-unescaped-entities
			trigger: (
				<Icon
					assistiveText={{ label: 'Case Icon' }}
					category="standard"
					name="case"
					size="small"
					tabIndex="0"
				/>
			),
		})
	)
	.add('With Delay', () => <WithDelay />)
	.add('With Anchored Nubbin', () => <AnchoredNubbin />);
