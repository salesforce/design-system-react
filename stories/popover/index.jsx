/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { POPOVER_TOOLTIP } from '../../utilities/constants';
import PopoverTooltip from '../../components/popover-tooltip';

import Icon from '../../components/icon';
import Button from '../../components/button';

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
		'left bottom'
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

	return (
		<div key="container">
			{children}
		</div>
	);
};

storiesOf(POPOVER_TOOLTIP, module)
	.addDecorator(getStory => <div
		className="slds-p-around--medium slds-m-horizontal--x-large"
		style={{
			margin: '100px auto',
			textAlign: 'center',
			width: '500px' }}
	>{getStory()}</div>)
	.add('Base', () => getPopoverTooltip({
		align: 'bottom',
		id: 'myPopoverId',
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}))
	.add('Open', () => getPopoverTooltip({
		align: 'bottom',
		isOpen: true,
		id: 'myPopoverId',
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}))
	.add('Alignment (Button)', () => getPopoverTooltipAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<Button label="Trigger Tooltip" />)
	}))
	.add('Alignment (span)', () => getPopoverTooltipAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<span tabIndex="0" key="trigger">Trigger Tooltip</span>)
	}))
	.add('Alignment (icon)', () => getPopoverTooltipAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
			size="small"
		/>)
	}));
