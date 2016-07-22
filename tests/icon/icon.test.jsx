/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */

import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;
const should = chai.should();

import { SLDSIcon } from '../../components';

const { findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass } = TestUtils;

describe('SLDSIcon: ', function () {
	const defaultProps = {};
	let body;

	const renderIcon = inst => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(inst, body);
	};

	function removeIcon () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createIcon = (props) => React.createElement(SLDSIcon, assign({}, defaultProps, props));
	const getIcon = (props) => renderIcon(createIcon(props));

	describe('Standard Icon Props Render', () => {
		let component;
		let svg;
		let iconContainer;
		let asstText;

		beforeEach(() => {
			component = getIcon({
				assistiveText: 'Log a Call',
				category: 'standard',
				name: 'log_a_call',
				backgroundColor: 'goldenrod', // rgb(218, 165, 32)
				size: 'large'
			});
			iconContainer = findRenderedDOMComponentWithClass(component, 'slds-icon_container');
			svg = findRenderedDOMComponentWithTag(component, 'svg');
			asstText = findRenderedDOMComponentWithClass(component, 'slds-assistive-text');
		});

		afterEach(() => {
			removeIcon();
		});

		it('renders container class', () => {
			should.exist(iconContainer);
		});

		it('renders assistive text', () => {
			expect(asstText.textContent).to.equal('Log a Call');
		});

		it('renders icon name class on svg', () => {
			// also tests that all '_' are replaced with '-'
			expect(svg.className.baseVal).to.include('slds-icon-standard-log-a-call');
		});

		it('renders custom background color', () => {
			expect(svg.style.backgroundColor).to.equal('rgb(218, 165, 32)'); // goldenrod
		});

		it('renders icon size class', () => {
			expect(svg.className.baseVal).to.include('slds-icon--large');
		});
	});

	describe('Custom Icon Props Render', () => {
		let component;
		let iconContainer;
		let svg;
		let asstText;

		beforeEach(() => {
			component = getIcon({
				assistiveText: 'Heart',
				category: 'custom',
				name: 'custom1',
				size: 'small'
			});
			iconContainer = findRenderedDOMComponentWithClass(component, 'slds-icon_container');
			svg = findRenderedDOMComponentWithTag(component, 'svg');
			asstText = findRenderedDOMComponentWithClass(component, 'slds-assistive-text');
		});

		afterEach(() => {
			removeIcon();
		});

		it('renders container class', () => {
			should.exist(iconContainer);
		});

		it('renders assistive text', () => {
			expect(asstText.textContent).to.equal('Heart');
		});

		it('renders icon name class on svg', () => {
			expect(svg.className.baseVal).to.include('slds-icon-custom-custom1');
		});

		it('renders icon size class', () => {
			expect(svg.className.baseVal).to.include('slds-icon--small');
		});
	});

	describe('Action Icon Props Render', () => {
		let component;
		let iconContainer;
		let svg;
		let asstText;

		beforeEach(() => {
			component = getIcon({
				assistiveText: 'Announcements',
				category: 'action',
				name: 'announcement',
				size: 'large',
				title: 'custom title',
				className: 'slds-m-around--x-small'
			});
			iconContainer = findRenderedDOMComponentWithClass(component, 'slds-icon_container');
			svg = findRenderedDOMComponentWithTag(component, 'svg');
			asstText = findRenderedDOMComponentWithClass(component, 'slds-assistive-text');
		});

		afterEach(() => {
			removeIcon();
		});

		it('renders container class', () => {
			should.exist(iconContainer);
		});

		it('renders assistive text', () => {
			expect(asstText.textContent).to.equal('Announcements');
		});

		it('renders round container', () => {
			expect(iconContainer.className).to.include('slds-icon_container--circle');
		});

		it('renders name class on container', () => {
			expect(iconContainer.className).to.include('slds-icon-action-announcement');
		});

		it('renders icon size class', () => {
			expect(svg.className.baseVal).to.include('slds-icon--large');
		});

		it('renders title', () => {
			expect(iconContainer.getAttribute('title')).to.equal('custom title');
		});
	});

	describe('Utility Icon Props Render', () => {
		let component;
		let iconContainer;
		let svg;

		beforeEach(() => {
			component = getIcon({
				category: 'utility',
				name: 'open_folder',
				size: 'medium'
			});
			iconContainer = scryRenderedDOMComponentsWithTag(component, 'span')[0];
			svg = findRenderedDOMComponentWithTag(component, 'svg');
		});

		afterEach(() => {
			removeIcon();
		});

		it('does NOT render container class', () => {
			expect(iconContainer.className).to.not.include('slds-icon_container');
		});

		it('renders icon custom classes', () => {
			expect(svg.className.baseVal).to.include('slds-icon-text-default');
		});

		it('medium size does not render size class', () => {
			expect(svg.className.baseVal).to.not.include('slds-icon--medium');
		});

		it('utility icons do not render name class on svg', () => {
			expect(svg.className.baseVal).to.not.include('slds-icon-utility-open-folder');
		});
	});
});
