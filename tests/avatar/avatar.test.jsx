/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import { SLDSAvatar } from '../../components';

describe('SLDSAvatar: ', () => {
	describe('Default Structure', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = mount(<SLDSAvatar />);
		});

		it('avatar renders with image', () => {
			const expectedSrc = 'success';
			wrapper.setProps({ imgSrc: expectedSrc });
			const img = wrapper.find('img');
			const src = img.prop('src');
			expect(src).to.equal(expectedSrc);
		});

		it('calls error handler if image is not valid', () => {
			const expectedSrc = 'invalid-url';
			wrapper.setProps({ imgSrc: expectedSrc });
			const img = wrapper.find('img');
			img.simulate('error');
			console.log(wrapper.state('imgLoadError'));
			expect(wrapper.state('imgLoadError')).to.be.true;
		});

		it('renders proper icon size class', () => {
			wrapper.setProps({ size: 'large' });
			const avatar = wrapper.find('.slds-avatar_large');
			expect(avatar.node).to.not.be.undefined;
		});


		describe('variant is a user', () => {
			beforeEach(() => {
				wrapper.setProps({ variant: 'user' });
			});

			it('displays as a circle', () => {
				const avatar = wrapper.find('.slds-avatar_circle');
				expect(avatar.node).to.not.be.undefined;
			});
		});
	});

	describe('Avatar fallback check', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = shallow(<SLDSAvatar />);
		});

		it('renders fallback initials abbr node if label exists', () => {
			const avatar = wrapper.setProps({ label: 'test' });
			const abbr = wrapper.find('abbr');
			expect(abbr).to.not.be.undefined;
			expect(abbr).to.not.be.null;
		});
		it('renders first two letters of one word if label is one word', () => {
			const avatar = wrapper.setProps({ label: 'Salesforce' });
			const abbr = wrapper.find('abbr');
			expect(abbr.node.props.children).to.equal('Sa');
		});
		//
		// it('renders icon fallback avatar if no label exists', () => {
		//
		// });
	});

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
