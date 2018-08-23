/* eslint-disable react/display-name, jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { POPOVER_TOOLTIP } from '../../../utilities/constants';
import PopoverTooltip from '../../popover-tooltip';

import ButtonGroupExample from '../__examples__/button-group';
import ButtonExample from '../__examples__/button';
import LearnMoreExample from '../__examples__/learn-more';

import Icon from '../../icon';
import Button from '../../button';

const getPopoverTooltip = (props) => (
	<PopoverTooltip {...props}>
		<Button label="Trigger Tooltip" />
	</PopoverTooltip>
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
			<div key={value} style={{ margin: '100px auto' }}>
				<PopoverTooltip {...props} align={value}>
					{props.trigger}
				</PopoverTooltip>
			</div>
		);
	});

	return <div key="container">{children}</div>;
};

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator((getStory) => (
		<div
			className="slds-p-around--medium slds-m-horizontal--x-large"
			style={{
				margin: '150px auto',
				width: '500px',
			}}
		>
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getPopoverTooltip({
			align: 'bottom',
			id: 'myPopoverId',
			content:
				'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		})
	)
	.add('Learn More', () => <LearnMoreExample />)
	.add('Button Group', () => <ButtonGroupExample />)
	.add('Button', () => <ButtonExample />)
	.add('Open', () =>
		getPopoverTooltip({
			align: 'bottom',
			isOpen: true,
			id: 'myPopoverId',
			content:
				'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		})
	)
	.add('Alignment (Button)', () =>
		getPopoverTooltipAlign({
			id: 'myPopoverId',
			isOpen: true,
			content:
				'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
			trigger: <Button label="Trigger Tooltip" />,
		})
	)
	.add('Alignment (span)', () =>
		getPopoverTooltipAlign({
			id: 'myPopoverId',
			isOpen: true,
			content:
				'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
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
			content: (
				<span>
					<Icon category="utility" inverse name="close" size="x-small" />wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie
				</span>
			), // react/no-unescaped-entities
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
	);
