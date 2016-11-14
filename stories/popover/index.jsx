/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { POPOVER } from '../../utilities/constants';
import Popover from '../../components/popover';

import Icon from '../../components/icon';
import Button from '../../components/button';

const getPopover = (props) => (
	<Popover {...props}>
		<Button label="Trigger Popover" />
	</Popover>
);

const getPopoverAlign = (props) => {
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
				<Popover {...props} align={value} assistiveText="This is a popover.">
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

storiesOf(POPOVER, module)
	.addDecorator(getStory => <div
		className="slds-p-around--medium slds-m-horizontal--x-large"
		style={{
			margin: '100px auto',
			textAlign: 'center',
			width: '500px' }}
	>{getStory()}</div>)
	.add('Base', () => getPopover({
		id: 'myPopoverId',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi laudantium molestias reprehenderit nostrum quod natus saepe ea corrupti odit minima?'
	}))
	.add('Open', () => getPopover({
		align: 'bottom',
		isOpen: true,
		id: 'myPopoverId',
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
	}))
	.add('Alignment (Button)', () => getPopoverAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<Button label="Trigger Popover" tabIndex="0" />)
	}))
	.add('Alignment (span)', () => getPopoverAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<span tabIndex="0" key="trigger">Trigger Popover</span>)
	}))
	.add('Alignment (icon)', () => getPopoverAlign({
		id: 'myPopoverId',
		isOpen: true,
		content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		trigger: (<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
			size="small"
			tabIndex="0"
		/>)
	}));
