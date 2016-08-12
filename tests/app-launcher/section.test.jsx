/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;
const should = chai.should();

import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';

const {
	Simulate
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

describe.only('SLDS APP LAUNCHER SECTION *******************************************', () => {
	const handles = {
		section: null
	};

	const defaultSectionProps = {
		title: 'All Items'
	};

	const createSection = (props) => React.createElement(
		AppLauncherSection,
		assign({}, defaultSectionProps, props),
		[<AppLauncherTile title="Marketing Cloud" />, <AppLauncherTile title="Support Cloud" />]
	);

	function mountSection (props) {
		handles.section = mount(createSection(props));
	}

	describe('App Launcher Section', () => {
		beforeEach(() => {
			mountSection({
				toggleable: true
			});
		});

		it('modal section exists', () => {
			should.exist(handles.section);
		});

		it('modal section has "slds-is-open" class when open', () => {
			expect(handles.section.find('.slds-section').node.className).to.include('slds-is-open');
		});

		it('section has a title', () => {
			should.exist(handles.section.find('.slds-section__title'));
		});

		it('ul has proper classes', () => {
			should.exist(handles.section.find('ul.slds-grid.slds-grid--pull-padded.slds-wrap'));
		});

		it('li exists', () => {
			expect(handles.section.find('li').length).to.equal(2);
		});
	});
});
