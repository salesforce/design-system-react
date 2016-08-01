/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { POPOVER_TOOLTIP } from '../../utilities/constants';
import PopoverTooltip from '../../components/popover-tooltip';

import Button from '../../components/button';

const getPopoverTooltip = (props) => (
	<PopoverTooltip {...props}>
		<Button label="Trigger Tooltip" />
	</PopoverTooltip>
);

const getPopoverTooltipAlign = (props) => {
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
			<div style={{ margin: '100px auto' }}>
				<PopoverTooltip {...props} align={value}>
					<Button label="Trigger Tooltip" />
				</PopoverTooltip>
			</div>
		);
	});

	return (
		<div style={{ }}>
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
	.add('Alignment', () => getPopoverTooltipAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}));
