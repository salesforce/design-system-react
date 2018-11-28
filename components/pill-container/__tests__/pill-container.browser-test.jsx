/* eslint-disable react/no-find-dom-node */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Avatar from '~/components/avatar';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import SLDSPillContainer from '~/components/pill-container';
import { mountComponent, unmountComponent } from '~/tests/enzyme-helpers';
import { expect } from 'chai';

const { Simulate } = TestUtils;

describe('SLDSPillContainer', () => {
	describe('Base', () => {
		let clickData = {};
		let requestRemoveData = {};

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<SLDSPillContainer
						options={[
							{
								id: '1',
								label: 'Pill Label 1',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								icon: (
									<Icon category="standard" name="account" title="Account" />
								),
								id: '2',
								label: 'Pill Label 2',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								icon: {
									category: 'standard',
									name: 'account',
								},
								id: '3',
								label: 'Pill Label 3',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								avatar: (
									<Avatar
										imgSrc="https://lightningdesignsystem.com/assets/images/avatar1.jpg"
										title="User 4"
										variant="user"
									/>
								),
								id: '4',
								label: 'Pill Label 4',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								avatar: {
									imgSrc:
										'https://lightningdesignsystem.com/assets/images/avatar1.jpg',
									title: 'User 5',
								},
								id: '5',
								label: 'Pill Label 5',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								bare: true,
								id: '6',
								label: 'Pill Label 6',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								error: true,
								id: '7',
								label: 'Pill Label 7',
								title: 'Full pill label verbiage mirrored here',
							},
						]}
						onClickPill={(event, data) => {
							clickData = data;
						}}
						onRequestRemovePill={(event, data) => {
							requestRemoveData = data;
						}}
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('Renders the base Pill Container correctly', function() {
			let idOfCurrentPill = 1;

			expect(this.wrapper.find('.slds-pill_container').length).to.eql(1);
			expect(this.wrapper.find('ul.slds-listbox').length).to.eql(1);

			this.wrapper.find('ul.slds-listbox .slds-pill').forEach((pill) => {
				expect(pill.find('.slds-pill__label').text()).to.eql(
					`Pill Label ${idOfCurrentPill}`
				);

				Simulate.click(pill.getDOMNode());
				expect(clickData.option.id).to.eql(`${idOfCurrentPill}`);

				Simulate.click(pill.find('.slds-pill__remove').getDOMNode());
				expect(requestRemoveData.option.id).to.eql(`${idOfCurrentPill}`);

				if (idOfCurrentPill === 2 || idOfCurrentPill === 3) {
					expect(
						pill.find('.slds-icon_container.slds-icon-standard-account').length
					).to.eql(1);
				} else if (idOfCurrentPill === 4 || idOfCurrentPill === 5) {
					expect(
						pill.find('.slds-avatar.slds-avatar_circle.slds-avatar_medium')
							.length
					).to.eql(1);
				} else if (idOfCurrentPill === 6) {
					expect(pill.find('.slds-pill_bare').length).to.eql(1);
				} else if (idOfCurrentPill === 7) {
					expect(pill.find('.slds-has-error').length).to.eql(1);
				}

				idOfCurrentPill++;
			});
		});
	});
});
