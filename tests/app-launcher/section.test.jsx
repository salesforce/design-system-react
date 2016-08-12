/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;
const should = chai.should();

import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

// ///////////////////////
// ////// T O D O ////////
// ///////////////////////

	// optional toggle
	// each tile is wrapped in <li> with classes: slds-col--padded slds-grow-none slds-size--1-of-1 slds-medium-size--1-of-3
	// closed section has class '.slds-is-close'
	// section has title has h3 with text (equals)
	// section has 'toggle' button with classes: slds-button slds-button--icon slds-m-right--small
	// section toggle button has assistive text '.slds-assistive-text' (equals)
	// section can be passed children
	// you can pass an onClick callback to section toggle
	// you can pass initial open state (prop: isOpen)
	// small tiles inclues slds-size--xx-small class on section
	// Remove modal in `cleanDom()`

describe('SLDS APP LAUNCHER SECTION *******************************************', () => {
	const defaultSectionProps = {
		title: 'All Items'
	};

	let body;

	const renderInstance = instance => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body);
	};

	function cleanDom () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createSection = (props) => React.createElement(
		AppLauncherSection,
		assign({}, defaultSectionProps, props),
		[
			<AppLauncherTile title="Marketing Cloud" />,
			<AppLauncherTile title="Support Cloud" />
		]
	);

	const renderAppLauncher = (props) => renderInstance(createSection(props));

	describe('App Launcher Section', () => {
		let modalSection;

		beforeEach(() => {
			renderAppLauncher({
				title: 'App Rocket',
				triggerAssistiveText: 'Custom Icon Assistive Text'
			});
			modalSection = document.documentElement.querySelectorAll('.slds-section')[0];
		});

		afterEach(() => {
			cleanDom();
		});

		it('modal section exists', () => {
			should.exist(modalSection);
		});

		it('modal section has "slds-is-open" class when open', () => {
			expect(modalSection.className).to.include('slds-is-open');
		});

		it('section has a title', () => {
			should.exist(document.querySelectorAll('.slds-section__title'));
		});

		it('ul has proper classes', () => {
			const ul = modalSection.getElementsByTagName('ul')[0];
			should.exist(ul);
			expect(ul.className).to.include('slds-grid slds-grid--pull-padded slds-wrap');
		});

		it('li exists', () => {
			const li = modalSection.getElementsByTagName('li')[0];
			should.exist(li);
		});
	});
});
