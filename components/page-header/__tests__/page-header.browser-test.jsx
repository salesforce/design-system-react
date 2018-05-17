import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import IconSettings from '../../icon-settings';
import PageHeader from '../../page-header';
import SLDSButtonStateful from '../../button-stateful';
import SLDSButtonGroup from '../../button-group';
import SLDSButton from '../../button';
import SLDSMenuDropdown from '../../menu-dropdown';

chai.use(chaiEnzyme());

const recordHomeContentRight = (
	<div>
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
		<SLDSButtonGroup key="">
			<SLDSButton label="Edit" />
			<SLDSButton label="Delete" />
			<SLDSButton label="Clone" />
			<SLDSMenuDropdown
				assistiveText="More Options"
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
	</div>
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

describe('PageHeader: ', function () {
	const defaultPropsRecordHome = {
		iconAssistiveText: 'User',
		iconCategory: 'standard',
		iconName: 'user',
		label: 'Record Type',
		title: 'Record Title',
		variant: 'recordHome',
		contentRight: recordHomeContentRight,
		details: recordHomeDetails,
	};

	describe('Renders basic props', function () {
		it('renders correct Icon prop', function () {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			const svg = wrapper.find('.slds-media__figure .slds-icon-standard-user');
			expect(svg).to.exist;
		});

		it('renders correct Label prop', () => {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			// Need to find the prop this way because PageHeader is being rendered inside of the IconSettings
			const childrenProps = wrapper.component.props.props.children.props;
			expect(childrenProps.label).to.equal('Record Type');
		});

		it('renders correct Title prop', () => {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			// Need to find the prop this way because PageHeader is being rendered inside of the IconSettings
			const childrenProps = wrapper.component.props.props.children.props;
			expect(childrenProps.title).to.equal('Record Title');
		});

		it('renders ContentRight prop', () => {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			const statefulBtn = wrapper.find('.slds-not-selected');
			const buttonGroup = wrapper.find('.slds-button-group');
			expect(statefulBtn).to.have.length(1);
			expect(buttonGroup).to.have.length(1);
		});

		it('renders Fields prop', () => {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			const field1Title = wrapper.find('.slds-text-title').first();
			const field1Content = wrapper.find('.slds-text-body--regular').first();
			expect(field1Title.text()).to.equal('Description');
			expect(field1Content.text()).to.equal(
				'Description that demonstrates truncation with content. Description that demonstrates truncation with content.'
			);
		});
	});

	describe('Truncation works in all the ways Donielle can think of', () => {
		it('field content truncates if this.props.truncate is true', () => {
			const wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<PageHeader {...defaultPropsRecordHome} />
				</IconSettings>
			);
			const field1Content = wrapper.find('.slds-text-body--regular').first();
			expect(field1Content.hasClass('slds-truncate')).to.equal(true);
		});

		/*
		it('field content does NOT show PopoverTooltip if text is NOT truncated', () => {
			const wrapper = mount(<IconSettings iconPath="/assets/icons"><PageHeader {...defaultPropsRecordHome} />)
			wrapper.update();
			const nonTruncatedText = wrapper.find('.slds-text-body--regular').at(1);
			expect(nonTruncatedText.node.tabIndex).to.equal(-1);
		});

		it('field content shows PopoverTooltip if text truncates', () => {
			const wrapper = mount(<IconSettings iconPath="/assets/icons"><PageHeader {...defaultPropsRecordHome} />)
			wrapper.update();
			const truncatedText = wrapper.find('.slds-text-body--regular').first();
			expect(truncatedText.node.tabIndex).to.equal(0);
		});
		*/
	});
});
