/* eslint-disable react/display-name */
/* eslint-disable no-script-url */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { POPOVER } from '../../utilities/constants';
import Popover from '../../components/popover';

import Icon from '../../components/icon';
import Button from '../../components/button';

const getPopover = (props) => (
	<div>
		<Popover {...props}>
			<Button label="Trigger Popover" />
		</Popover>
		<Button label="Not Trigger Popover" />
	</div>
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

const panelContent = (<div>
	<dl className="slds-popover__body-list">
		<dt className="slds-m-bottom--small">
			<div className="slds-media slds-media--center">
				<div className="slds-media__figure">
					<Icon
						assistiveText="Opportunity Icon"
						category="standard"
						name="opportunity"
						size="small"
						tabIndex="0"
					/>
				</div>
				<div className="slds-media__body">
					<p id="alternative-heading" className="slds-text-heading--small slds-hyphenate">Opportunities (2+)</p>
				</div>
			</div>
		</dt>
		<dd className="slds-tile">
			<p className="slds-truncate" title="Tesla - Mule ESB"><a href="javascript:void(0);">Tesla - Mule ESB</a></p>
			<div className="slds-tile__detail">
				<dl className="slds-dl--horizontal slds-text-body--small">
					<dt className="slds-dl--horizontal__label">
						<p className="slds-truncate" title="Value">Value</p>
					</dt>
					<dd className="slds-dl--horizontal__detail slds-tile__meta">
						<p className="slds-truncate" title="$500,000">$500,000</p>
					</dd>
					<dt className="slds-dl--horizontal__label">
						<p className="slds-truncate" title="Close Date">Close Date</p>
					</dt>
					<dd className="slds-dl--horizontal__detail slds-tile__meta">
						<p className="slds-truncate" title="Dec 15, 2015">Dec 15, 2015</p>
					</dd>
				</dl>
			</div>
		</dd>
		<dd className="slds-tile">
			<p className="slds-truncate"><a href="javascript:void(0);">Tesla - Anypoint Studios</a></p>
			<div className="slds-tile__detail">
				<dl className="slds-dl--horizontal slds-text-body--small">
					<dt className="slds-dl--horizontal__label">
						<p className="slds-truncate" title="Value">Value</p>
					</dt>
					<dd className="slds-dl--horizontal__detail slds-tile__meta">
						<p className="slds-truncate" title="$60,000">$60,000</p>
					</dd>
					<dt className="slds-dl--horizontal__label">
						<p className="slds-truncate" title="Close Date">Close Date</p>
					</dt>
					<dd className="slds-dl--horizontal__detail slds-tile__meta">
						<p className="slds-truncate" title="Jan 15, 2016">Jan 15, 2016</p>
					</dd>
				</dl>
			</div>
		</dd>
		<dd className="slds-m-top--x-small slds-text-align--right"><a href="javascript:void(0);" title="View all Opportunities">View All</a></dd>
	</dl>
</div>
);

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
	.add('Base', () => getPopover({
		body: panelContent,
		heading: 'My Popover',
		id: 'myPopoverId'
	}))
	.add('With Footer, no heading', () => getPopover({
		ariaLabelledby: 'alternative-heading',
		body: panelContent,
		footer: <p id="footer">Footer</p>,
		id: 'myPopoverId'
	}))
	.add('Styling', () => getPopover({
		body: panelContent,
		heading: 'My Popover',
		id: 'myPopoverId',
		className: 'sample-classname',
		closeButtonAssistiveText: 'Shut it now!',
		containerClassName: 'sample-container-classname',
		containerStyle: { background: containerBackgroundColor },
		style: { background: popoverBackgroundColor }
	}))
	.add('Open', () => getPopover({
		body: panelContent,
		heading: 'My Popover',
		isOpen: true,
		id: 'myPopoverId'
	}))
	.add('Alignment (Button)', () => getPopoverAlign({
		body: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		id: 'myPopoverId',
		isOpen: true,
		heading: 'My Popover',
		trigger: (<Button label="Trigger Popover" tabIndex="0" />)
	}))
	.add('Alignment (span)', () => getPopoverAlign({
		body: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		heading: 'My Popover',
		id: 'myPopoverId',
		isOpen: true,
		trigger: (<span tabIndex="0" key="trigger">Trigger Popover</span>)
	}))
	.add('Alignment (icon)', () => getPopoverAlign({
		body: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
		heading: 'My Popover',
		id: 'myPopoverId',
		isOpen: true,
		trigger: (<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
			size="small"
			tabIndex="0"
		/>)
	}));
