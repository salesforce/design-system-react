import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import IconSettings from '../../icon-settings';

import AppLauncherLink from '../../app-launcher/link';

const { expect } = chai;
const should = chai.should();

describe('SLDS APP LAUNCHER LINK *******************************************', () => {
	let div;

	const handles = {
		link: null,
	};

	const createLink = (props) => React.createElement(AppLauncherLink, props);

	function mountLink(props) {
		div = document.createElement('div');
		document.body.appendChild(div);

		handles.link = mount(
			<IconSettings iconPath="/assets/icons">{createLink(props)}</IconSettings>
		);
	}

	function cleanDom() {
		document.body.removeChild(div);
	}

	describe('Default App Launcher Link', () => {
		let onClick;

		beforeEach(() => {
			onClick = sinon.spy();

			mountLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				search: 'ccounts',
				title: 'Accounts Title',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders link', () => {
			should.exist(handles.link);
		});

		it('renders link with proper classes', () => {
			should.exist(handles.link.find('a.slds-truncate'));
		});

		it('renders link with custom classes', () => {
			should.exist(handles.link.find('a.this-is-a-custom-class'));
		});

		it('renders link children', () => {
			expect(handles.link.find('span').at(0).text()).to.eql('Accounts');
		});

		it('renders link title', () => {
			expect(handles.link).to.have.attr('title', 'Accounts Title');
		});

		it('has an href attribute', () => {
			expect(handles.link).to.have.attr('href', 'https://www.salesforce.com/');
		});

		it('clicking link fires callback and ignores href', () => {
			handles.link.simulate('click');
			expect(onClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('search string highlights link children', () => {
			expect(
				handles.link.containsAllMatchingElements(
					// eslint-disable-line no-unused-expressions
					[<span>A</span>, <mark>ccounts</mark>]
				)
			).to.be.true;
		});
	});

	describe('App Launcher Link (title prop not provided)', () => {
		beforeEach(() => {
			mountLink({
				children: 'Accounts',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('uses children to render title when not provided title prop', () => {
			expect(handles.link).to.have.attr('title', 'Accounts');
		});
	});
});
