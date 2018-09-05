/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

import SLDSAvatar from '../../avatar';
import IconSettings from '../../icon-settings';

chai.use(chaiEnzyme());

describe('SLDSAvatar: ', function() {
	let mountNode;
	let wrapper;

	describe('Default Structure', function() {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('avatar renders with image', () => {
			const expectedSrc = 'success';
			wrapper = mount(<SLDSAvatar imgSrc={expectedSrc} />, {
				attachTo: mountNode,
			});

			const img = wrapper.find('img');
			const src = img.prop('src');
			expect(src).to.equal(expectedSrc);
		});

		it('renders proper icon size class', () => {
			wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar size="large" />
				</IconSettings>,
				{ attachTo: mountNode }
			);

			const avatar = wrapper.find('.slds-avatar_large');
			expect(avatar).to.be.present;
		});

		describe('variant is a user', () => {
			beforeEach(() => {
				wrapper = mount(
					<IconSettings iconPath="/assets/icons">
						<SLDSAvatar variant="user" />
					</IconSettings>,
					{ attachTo: mountNode }
				);
			});

			it('displays as a circle', () => {
				const circleClass = !!wrapper.find('.slds-avatar_circle');
				expect(circleClass).to.be.true;
			});
		});

		describe('variant is an entity', () => {
			beforeEach(() => {
				wrapper = mount(
					<IconSettings iconPath="/assets/icons">
						<SLDSAvatar variant="entity" />
					</IconSettings>,
					{ attachTo: mountNode }
				);
			});

			it('displays as a square (no circle class)', () => {
				const avatar = wrapper.find('.slds-avatar_circle');
				expect(avatar).to.not.be.present;
			});
		});
	});

	describe('Initials avatar fallback check', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		it('renders "initials prop" initials if they are passed in directly', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar initials="AW" />
				</IconSettings>,
				{ attachTo: mountNode }
			);

			const abbr = avatar.find('abbr');
			expect(abbr.text()).to.equal('AW');
		});

		it('renders fallback initials abbr node if initials or label prop exists', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar label="test" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const abbr = !!avatar.find('abbr');
			expect(abbr).to.be.true;
		});

		it('calls buildInitials in abbr node if no initials prop', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar label="Jane Doe" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const abbr = avatar.find('abbr');
			expect(abbr.text()).to.equal('JD');
		});

		it('renders first two letters of one word if label is one word', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar label="Acme" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const abbr = avatar.find('abbr');
			expect(abbr.text()).to.equal('Ac');
		});

		it('renders first letters of each word if label is two words', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar label="Acme Communications" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const abbr = avatar.find('abbr');
			expect(abbr.text()).to.equal('AC');
		});

		it('renders first letters of first and last word if label is more than two words', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar label="Acme Communications Inc." />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const abbr = avatar.find('abbr');
			expect(abbr.text()).to.equal('AI');
		});
	});

	describe('Icon avatar fallback check', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		it('renders expected assistiveText', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar variant="entity" assistiveText="entity icon avatar" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			const span = avatar.find('.slds-assistive-text');
			expect(span.text()).to.equal('entity icon avatar');
		});

		it('renders account icon', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar variant="entity" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			expect(avatar.find('.slds-icon-standard-account')).to.be.present;
		});

		it('renders user icon', () => {
			const avatar = mount(
				<IconSettings iconPath="/assets/icons">
					<SLDSAvatar variant="user" />
				</IconSettings>,
				{ attachTo: mountNode }
			);
			expect(avatar.find('.slds-icon-standard-user')).to.be.present;
		});
	});
});
