/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { expect } from 'chai';

import SLDSCombobox from '../../combobox';
import SLDSIconSettings from '../../icon-settings';
import SLDSGlobalHeader from '../../global-header';
import SLDSGlobalHeaderFavorites from '../../global-header/favorites';
import SLDSGlobalHeaderHelp from '../../global-header/help';
import SLDSGlobalHeaderNotifications from '../../global-header/notifications';
import SLDSGlobalHeaderProfile from '../../global-header/profile';
import SLDSGlobalHeaderSearch from '../../global-header/search';
import SLDSGlobalHeaderSetup from '../../global-header/setup';
import SLDSGlobalHeaderTask from '../../global-header/task';

import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

describe('SLDSGlobalHeader', () => {
	describe('SLDSGlobalHeader index', () => {
		beforeEach(
			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderProfile />
						<SLDSGlobalHeaderSetup />
						<SLDSGlobalHeaderFavorites />
						<SLDSGlobalHeaderTask />
						<SLDSGlobalHeaderNotifications />
						<SLDSGlobalHeaderSearch
							combobox={
								<SLDSCombobox
									assistiveText={{ label: 'Search' }}
									id="global-header-search-combobox-test"
									labels={{ placeholder: 'Search Salesforce' }}
									options={[]}
								/>
							}
						/>
						<SLDSGlobalHeaderHelp />
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			)
		);

		afterEach(unmountComponent);

		it('arranges components correctly even if the developer put them out of order', function () {
			const order = [
				'div.slds-global-actions__favorites',
				'button.slds-global-actions__task',
				'button.slds-global-actions__help',
				'button.slds-global-actions__setup',
				'button.slds-global-actions__notifications',
				'button.slds-global-actions__avatar',
			];

			this.wrapper
				.find('ul.slds-global-actions li.slds-global-actions__item')
				.forEach((node, index) => {
					expect(node.find(order[index]).length).to.eql(1);
				});
		});
	});

	describe('SLDSGlobalHeaderFavorites', () => {
		it('handles actionDisabled correctly', function () {
			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderFavorites actionDisabled />
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			).call(this);

			const actionButtonSelector =
				'button.slds-global-actions__favorites-action';

			expect(
				this.wrapper.find(actionButtonSelector).hasClass('slds-is-disabled')
			).to.eql(true);
			expect(
				this.wrapper.find(`${actionButtonSelector}[disabled=true]`).length
			).to.eql(1);

			unmountComponent.call(this);
		});

		it('handles actionSelected correctly', function () {
			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderFavorites actionSelected />
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			).call(this);

			const actionButtonSelector =
				'button.slds-global-actions__favorites-action';

			expect(
				this.wrapper.find(actionButtonSelector).hasClass('slds-is-selected')
			).to.eql(true);
			expect(
				this.wrapper.find(`${actionButtonSelector}[aria-pressed=true]`).length
			).to.eql(1);

			unmountComponent.call(this);
		});

		it('handles onToggleActionSelected correctly', function () {
			let args = {};

			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderFavorites
							onToggleActionSelected={(event, data) => {
								args.event = event;
								args.data = data;
							}}
						/>
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			).call(this);

			const actionButton = this.wrapper.find(
				'button.slds-global-actions__favorites-action'
			);

			actionButton.simulate('click');
			expect(typeof args.event).to.eql('object');
			expect(typeof args.data).to.eql('object');
			expect(typeof args.data.actionSelected).to.eql('boolean');

			args = {};
			actionButton.simulate('keydown', { keyCode: 13 });
			expect(typeof args.event).to.eql('object');
			expect(typeof args.data).to.eql('object');
			expect(typeof args.data.actionSelected).to.eql('boolean');

			unmountComponent.call(this);
		});
	});

	describe('SLDSGlobalHeaderNotifications', () => {
		it('handles notificationCount correctly when no value provided', function () {
			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderNotifications />
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			).call(this);

			expect(this.wrapper.find('.slds-notification-badge').text()).to.eql('');

			unmountComponent.call(this);
		});

		it('handles notificationCount correctly when a value is provided', function () {
			mountComponent(
				<SLDSIconSettings iconPath="/assets/icons">
					<SLDSGlobalHeader>
						<SLDSGlobalHeaderNotifications notificationCount={5} />
					</SLDSGlobalHeader>
				</SLDSIconSettings>
			).call(this);

			expect(this.wrapper.find('.slds-notification-badge').text()).to.eql('5');

			unmountComponent.call(this);
		});
	});
});
