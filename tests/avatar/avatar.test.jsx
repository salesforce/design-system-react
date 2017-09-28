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
			wrapper = shallow(<SLDSAvatar />);
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
				const circleClass = !!wrapper.find('.slds-avatar_circle');
				expect(circleClass).to.be.true;
			});
		});

		describe('variant is an entity', () => {
			beforeEach(() => {
				wrapper.setProps({ variant: 'entity' });
			});

			it('displays as a square (no circle class)', () => {
				const avatar = wrapper.find('.slds-avatar_circle');
				expect(avatar.node).to.be.undefined;
			});
		});
	});

	describe('Initials avatar fallback check', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = shallow(<SLDSAvatar />);
		});

		it('renders "iniitals prop" initials if they are passed in directly', () => {
			const avatar = wrapper.setProps({ initials: 'AW' });
			const abbr = wrapper.find('abbr');
			expect(abbr.node.props.children).to.equal('AW');
		});

		it('renders fallback initials abbr node if initials or label prop exists', () => {
			const avatar = wrapper.setProps({ label: 'test' });
			const abbr = !!wrapper.find('abbr');
			expect(abbr).to.be.true;
		});

		it('calls buildInitials in abbr node if no initials prop', () => {
			const spy = sinon.spy(SLDSAvatar.prototype, 'buildInitials');
			wrapper.setProps({ label: 'Jane Doe' });
			const abbr = wrapper.find('abbr');
			expect(spy.calledOnce).to.equal(true);
		});

		it('renders first two letters of one word if label is one word', () => {
			const avatar = wrapper.setProps({ label: 'Acme' });
			const abbr = wrapper.find('abbr');
			expect(abbr.node.props.children).to.equal('Ac');
		});

		it('renders first letters of each word if label is two words', () => {
			const avatar = wrapper.setProps({ label: 'Acme Communications' });
			const abbr = wrapper.find('abbr');
			expect(abbr.node.props.children).to.equal('AC');
		});

		it('renders first letters of first and last word if label is more than two words', () => {
			const avatar = wrapper.setProps({ label: 'Acme Communications Inc.' });
			const abbr = wrapper.find('abbr');
			expect(abbr.node.props.children).to.equal('AI');
		});
	});

	describe('Icon avatar fallback check', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = mount(<SLDSAvatar />);
		});

		it('renders expected assistiveText', () => {
			wrapper.setProps({ variant: 'entity', assistiveText: 'entity icon avatar' });
			const span = wrapper.find('.slds-assistive-text');
			expect(span.node.innerHTML).to.equal('entity icon avatar');
		});

		it('renders account icon', () => {
			wrapper.setProps({ variant: 'entity' });
			const span = !!wrapper.find('.slds-icon-standard-account').node;
			expect(span).to.be.true;
		});

		it('renders user icon', () => {
			wrapper.setProps({ variant: 'user' });
			const span = !!wrapper.find('.slds-icon-standard-user').node;
			expect(span).to.be.true;
		});
	});
});
