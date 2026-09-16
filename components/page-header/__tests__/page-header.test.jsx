import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import PageHeader from '../index';
import PageHeaderControl from '../control';
import SLDSButtonStateful from '../../button-stateful';
import SLDSButtonGroup from '../../button-group';
import SLDSButton from '../../button';
import SLDSMenuDropdown from '../../menu-dropdown';

const recordHomeActions = () => (
	<React.Fragment>
		<PageHeaderControl>
			<SLDSButtonStateful
				key="PageHeaderFollowButton"
				disabled={false}
				iconSize="medium"
				responsive={false}
				stateOne={{ iconCategory: 'utility', iconName: 'add', label: 'Follow' }}
				stateTwo={{
					iconCategory: 'utility',
					iconName: 'check',
					label: 'Following',
				}}
				stateThree={{
					iconCategory: 'utility',
					iconName: 'close',
					label: 'Unfollow',
				}}
			/>
		</PageHeaderControl>
		<PageHeaderControl>
			<SLDSButtonGroup variant="list" id="button-group-page-header-actions">
				<SLDSButton label="Edit" />
				<SLDSButton label="Delete" />
				<SLDSButton label="Clone" />
				<SLDSMenuDropdown
					assistiveText={{ icon: 'More Options' }}
					buttonVariant="icon"
					iconCategory="utility"
					iconName="down"
					iconVariant="border-filled"
					onSelect={() => {
						console.log('selected');
					}}
					openOn="click"
					align="right"
					options={[
						{ label: 'Disable', value: 'A0' },
						{ label: 'Promote', value: 'C0' },
					]}
				/>
			</SLDSButtonGroup>
		</PageHeaderControl>
	</React.Fragment>
);

const recordHomeDetails = [
	{
		label: 'Description',
		content:
			'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
		flavor: '1-of-4',
		truncate: true,
	},
	{ label: 'Last Modified', content: 'August 31, 2016 2:01PM PST' },
	{ label: 'Status', content: 'Status of thing you wanna know' },
];

describe('PageHeader', () => {
	const defaultPropsRecordHome = {
		icon: (
			<Icon assistiveText={{ label: 'User' }} category="standard" name="user" />
		),
		label: 'Record Type',
		title: 'Record Title',
		variant: 'record-home',
		onRenderActions: recordHomeActions,
		details: recordHomeDetails,
	};

	describe('Renders basic props', () => {
		it('renders correct Icon prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			const svg = container.querySelector('.slds-media__figure .slds-icon-standard-user');
			expect(svg).toBeInTheDocument();
		});

		it('renders correct Label prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			// The label is rendered in the component, check it's in the DOM
			expect(container.textContent).toContain('Record Type');
		});

		it('renders correct Title prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			// The title is rendered in the component, check it's in the DOM
			expect(container.textContent).toContain('Record Title');
		});

		it('renders onRenderActions prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			const statefulBtn = container.querySelector('.slds-not-selected');
			const buttonGroup = container.querySelector('.slds-button-group-list');

			expect(statefulBtn).toBeInTheDocument();
			expect(buttonGroup).toBeInTheDocument();
		});

		it('renders Fields prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			const detailBlocks = container.querySelectorAll('.slds-page-header__detail-block');
			expect(detailBlocks.length).toBeGreaterThan(0);

			const field1 = detailBlocks[0];
			expect(field1.querySelector('.slds-text-title').textContent).toBe('Description');
			expect(field1.querySelector('.slds-truncate:last-child').textContent).toBe(
				'Description that demonstrates truncation with content. Description that demonstrates truncation with content.'
			);
		});
	});

	describe('Truncation works in all the ways Donielle can think of', () => {
		it('field content truncates if this.props.truncate is true', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);

			const detailBlocks = container.querySelectorAll('.slds-page-header__detail-block');
			const field1 = detailBlocks[0];
			const truncatedElement = field1.querySelector('.slds-truncate:last-child');

			expect(truncatedElement).toHaveClass('slds-truncate');
		});
	});
});
