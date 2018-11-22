/* eslint-disable react/no-find-dom-node */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import IconSettings from '~/components/icon-settings';
import SLDSPillContainer from '~/components/pill-container';
import { mountComponent, unmountComponent } from '~/tests/enzyme-helpers';
import { expect } from 'chai';

const { Simulate } = TestUtils;

describe('SLDSPillContainer', () => {
	describe('Pill Container', () => {
		let clickData = {};
		let removeData = {};

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
								icon: {
									category: 'standard',
									name: 'account',
								},
								id: '2',
								label: 'Pill Label 2',
								title: 'Full pill label verbiage mirrored here',
							},
							{
								avatar: {
									imgSrc:
										'https://lightningdesignsystem.com/assets/images/avatar1.jpg',
									title: 'User 3',
								},
								id: '3',
								label: 'Pill Label 3',
								title: 'Full pill label verbiage mirrored here',
							},
						]}
						onClickPill={(event, data) => {
							clickData = data;
						}}
						onRequestRemovePill={(event, data) => {
							removeData = data;
						}}
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('Renders the Pill Container correctly', function() {
			let currentPill = 1;

			expect(this.wrapper.find('.slds-pill_container').length).to.eql(1);
			expect(this.wrapper.find('ul.slds-listbox').length).to.eql(1);

			this.wrapper.find('ul.slds-listbox .slds-pill').forEach((pill) => {
				expect(pill.find('.slds-pill__label').text()).to.eql(
					`Pill Label ${currentPill}`
				);

				Simulate.click(pill.getDOMNode());
				expect(clickData.option.id).to.eql(`${currentPill}`);

				Simulate.click(pill.find('.slds-pill__remove').getDOMNode());
				expect(removeData.option.id).to.eql(`${currentPill}`);

				if (currentPill === 2) {
					expect(
						pill.find('.slds-icon_container.slds-icon-standard-account').length
					).to.eql(1);
				} else if (currentPill === 3) {
					expect(
						pill.find('.slds-avatar.slds-avatar_circle.slds-avatar_medium')
							.length
					).to.eql(1);
				}

				currentPill++;
			});
		});
	});
});
