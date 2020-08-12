/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { expect } from 'chai';

import SLDSPill from '../../pill';
import SLDSIcon from '../..//icon';
import SLDSAvatar from '../..//avatar';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

describe('SLDSPill', () => {
	const LABEL = 'Pill Label';
	const LABEL_TITLE = 'Full pill label verbiage mirrored here';

	describe('Linked', () => {
		const onClick = sinon.stub();
		const onRemove = sinon.stub();
		const onFocus = sinon.stub();
		const onBlur = sinon.stub();

		beforeEach(
			mountComponent(
				<SLDSPill
					tabIndex="0"
					labels={{
						label: LABEL,
						title: LABEL_TITLE,
						removeTitle: 'Remove',
					}}
					assistiveText={{
						remove: 'Remove assistive text',
					}}
					className="extra-class"
					onClick={onClick}
					onRemove={onRemove}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			)
		);

		afterEach(unmountComponent);

		it('has correct style and attributes', function () {
			expect(this.wrapper).to.have.className('slds-pill');
			expect(this.wrapper).to.have.className('slds-pill_link');
			expect(this.wrapper).to.have.className('extra-class');
			expect(this.wrapper.find('.slds-pill[role="button"]')).to.be.present();
		});

		it('renders label as a link', function () {
			const anchor = this.wrapper.find('.slds-pill__action');
			expect(anchor.exists()).to.be.true;
			expect(anchor.prop('title')).to.equal(LABEL_TITLE);
			const label = this.wrapper.find('.slds-pill__label');
			expect(label.text()).to.equal(LABEL);
		});

		it('renders remove button', function () {
			const removeButton = this.wrapper.find('.slds-pill__remove');
			expect(removeButton.exists()).to.be.true;
		});

		it('renders assistive text in remove button', function () {
			const removeButton = this.wrapper.find('.slds-pill__remove');
			expect(removeButton.exists()).to.be.true;
			const assistiveText = removeButton.find('.slds-assistive-text');
			expect(assistiveText.exists()).to.be.true;
			expect(assistiveText.text()).to.equal('Remove assistive text');
		});

		it('focuses and blurs', function () {
			this.wrapper.simulate('focus');
			expect(this.wrapper).to.containMatchingElement(document.activeElement);
			expect(onFocus.calledOnce).to.be.true;
			this.wrapper.simulate('blur');
			expect(document.activeElement).to.equal(document.querySelector('body'));
			expect(onBlur.calledOnce).to.be.true;
		});

		it('reponds to link clicks', function () {
			const pillLink = this.wrapper.find('.slds-pill__action');
			expect(pillLink).to.exist;
			pillLink.simulate('click');
			expect(onClick.calledOnce).to.be.true;
		});

		it('responds to remove clicks', function () {
			const removeButton = this.wrapper.find('.slds-pill__remove');
			expect(removeButton).to.exist;
			removeButton.simulate('click');
			expect(onRemove.calledOnce).to.be.true;
		});
	});

	describe('Linked With Href', () => {
		const HREF = 'https://www.salesforce.com';

		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					href={HREF}
				/>
			)
		);

		afterEach(unmountComponent);

		it('uses href', function () {
			expect(this.wrapper).to.have.className('slds-pill_link');
			const anchor = this.wrapper.find('.slds-pill__action');
			expect(anchor).to.exist;
			expect(anchor).to.have.prop('href', HREF);
		});
	});

	describe('Link style on', () => {
		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
				/>
			)
		);

		afterEach(unmountComponent);

		it('forces link style', function () {
			expect(this.wrapper).to.have.className('slds-pill_link');
			const anchor = this.wrapper.find('.slds-pill__action');
			expect(anchor).to.exist;
		});
	});

	describe('Bare Linked With Role', () => {
		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					bare
				/>
			)
		);

		afterEach(unmountComponent);

		it('has correct style and attributes', function () {
			expect(this.wrapper).to.have.className('slds-pill');
			expect(this.wrapper).to.have.className('slds-pill_bare');
			expect(this.wrapper.find('.slds-pill[role="button"]').exists()).to.be
				.true;
		});
	});

	describe('Linked With Error', () => {
		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					hasError
				/>
			)
		);

		afterEach(unmountComponent);

		it('has correct style and attributes', function () {
			expect(this.wrapper).to.have.className('slds-has-error');
		});
	});

	describe('Linked With Icon', () => {
		const onClick = sinon.stub();

		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					onClick={onClick}
					icon={<SLDSIcon title="Account" category="standard" name="account" />}
				/>
			)
		);

		afterEach(unmountComponent);

		it('renders icon to the left from label', function () {
			const icon = this.wrapper.find(SLDSIcon);
			expect(icon.exists()).to.be.true;
			expect(icon.prop('title')).to.equal('Account');
			expect(icon.prop('category')).to.equal('standard');
			expect(icon.prop('name')).to.equal('account');
		});
	});

	describe('Linked With Avatar', () => {
		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
					}}
					avatar={
						<SLDSAvatar
							variant="user"
							title="User avatar"
							imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
						/>
					}
				/>
			)
		);

		afterEach(unmountComponent);

		it('renders icon to the left from label', function () {
			const avatar = this.wrapper.find(SLDSAvatar);
			expect(avatar.exists()).to.be.true;
			expect(avatar.prop('title')).to.equal('User avatar');
			expect(avatar.prop('variant')).to.equal('user');
			expect(avatar.prop('imgSrc')).to.equal(
				'https://lightningdesignsystem.com/assets/images/avatar2.jpg'
			);
		});
	});

	describe('Option', () => {
		const onRemove = sinon.stub();

		beforeEach(
			mountComponent(
				<SLDSPill
					labels={{
						label: LABEL,
						title: LABEL_TITLE,
						removeTitle: 'Remove',
					}}
					variant="option"
					onRemove={onRemove}
				/>
			)
		);

		afterEach(unmountComponent);

		it('has correct style', function () {
			expect(this.wrapper).to.have.className('slds-pill');
			expect(this.wrapper).to.not.have.className('slds-pill_link');
			const anchor = this.wrapper.find('.slds-pill__action');
			expect(anchor).to.not.exist;
		});
	});

	describe('Linked Custom', () => {
		const onClick = sinon.stub();
		const onRemove = sinon.stub();

		beforeEach(
			mountComponent(
				<SLDSPill onClick={onClick} onRemove={onRemove}>
					<div className="abc">this is a custom label</div>
				</SLDSPill>
			)
		);

		afterEach(unmountComponent);

		it('has correct style', function () {
			expect(this.wrapper).to.have.className('slds-pill');
			expect(this.wrapper).to.have.className('slds-pill_link');
			const child = this.wrapper.find('.abc');
			expect(child.exists()).to.be.true;
			expect(child.text()).to.equal('this is a custom label');
		});

		it('renders remove button', function () {
			const removeButton = this.wrapper.find('.slds-pill__remove');
			expect(removeButton.exists()).to.be.true;
		});

		it('reponds to link clicks', function () {
			const pillLink = this.wrapper.find('.slds-pill');
			expect(pillLink).to.exist;
			pillLink.simulate('click');
			expect(onClick.calledOnce).to.be.true;
		});

		it('responds to remove clicks', function () {
			const removeButton = this.wrapper.find('.slds-pill__remove');
			expect(removeButton).to.exist;
			removeButton.simulate('click');
			expect(onRemove.calledOnce).to.be.true;
		});
	});
});
