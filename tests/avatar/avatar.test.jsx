/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import { SLDSAvatar } from '../../components';

describe('SLDSAvatar: ', () => {
	describe('Default Structure', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<SLDSAvatar />);
		});

		it('avatar renders with image', () => {
			const expectedSrc = 'success';
			wrapper.setProps({ imgSrc: expectedSrc });
			const img = wrapper.find('img');
			const src = img.prop('src');
			expect(src).to.equal(expectedSrc);
			// expect(avatar).ton.not.equal(undefined);
		});

		it('renders proper icon size class', function () {
			wrapper.setProps({ size: 'large' });
			const avatar = wrapper.find('.slds-avatar .slds-avatar_large');
			expect(avatar).to.not.be.undefined;
		});

		describe('variant is a user', () => {
			beforeEach(() => {
				wrapper.setProps({ variant: 'user' });
			});

			it('displays as a circle', () => {
				const avatar = wrapper.find('.slds-avatar .slds-avatar_circle');
				expect(avatar).to.not.be.undefined;
			});
		});

		describe('variant is an entity', () => {
			beforeEach(() => {
				wrapper.setProps({ variant: 'entity' });
			});

			it('displays as an account', () => {
				const avatar = wrapper.find('.slds-avatar .slds-avatar_account');
				expect(avatar).to.not.be.undefined;
			});
		});
	});

	describe('Avatar fallback check', () => {
		it('calls error handler if image is not valid', () => {
			const avatar = shallow(<SLDSAvatar
				imgSrc="invalid-url"
			/>);
			const img = avatar.find('img');
			img.simulate('error');
			console.log(avatar.state('imgLoadError'));
			expect(avatar.state('imgLoadError')).to.be.true;
		});
	});
	// it('invokes renderInitialsAvatar fallback if label is passed', () => {
	//   Simulate.{eventName}(
	//   element,
	//   [eventData]
	// )
	// 	expect();
	// });
	// it('invokes renderInitialsAvatar if no label is passed', () => {
	// 	expect();
	// });
	//
	// describe('Initals avatar fallback', () => {
	// 	it('builds expected initials', () => {
	// 		expect();
	// 	});
	// });
	// describe('Icon avatar fallback', () => {
	// 	it('reners w/ aria and assistiveText', () => {
	// 		expect();
	// 	});
	// });
	// 	it('renders entity modifier', () => {
	// 		// const notification = generateNotification(<SLDSNotification variant="toast" theme="success" icon="notification" isOpen texture animated />);
	// 		// const alert = notification.getElementsByTagName('div')[0];
	// 		// expect(alert.className).to.include('slds-notify--toast');
	// 	});
	// 	it('renders assistive text', function () {
	// 		// asstText = this.wrapper.find('.slds-assistive-text');
	// 		// expect(asstText.text()).to.equal('Log a Call');
	// 	});
	// 	it('builds expected initals based on label', function() {
	// 		// expect();
	// 	})
	// 	it('renders base avatar', function () {
	// 		// expect();
	// 	})
	// 	it('base fallback renders initials avatar', function() {
	// 		// expect();
	// 	});
	// 	it('initials fallback renders icon avatar', function() {
	// 		// expect();
	// 	});
	// });
});
