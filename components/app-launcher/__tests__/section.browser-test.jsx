import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';

import IconSettings from '../../icon-settings';
import AppLauncherTile from '../../app-launcher/tile';
import AppLauncherSection from '../../app-launcher/section';

const expect = chai.expect;
const should = chai.should();

const { Simulate } = TestUtils;

describe('SLDS APP LAUNCHER SECTION *******************************************', () => {
	const handles = {
		section: null,
	};

	const defaultSectionProps = {
		title: 'All Items',
	};

	const defaultChildren = [
		<AppLauncherTile key="asdf" title="Marketing Cloud" />,
		<AppLauncherTile key="qwer" title="Support Cloud" />,
	];

	const createSection = (props, children) =>
		React.createElement(
			AppLauncherSection,
			assign({}, defaultSectionProps, props),
			children
		);

	function mountSection(props, children = defaultChildren) {
		handles.section = mount(
			<IconSettings iconPath="/assets/icons">
				{createSection(props, children)}
			</IconSettings>
		);
	}

	describe('App Launcher Section (toggleable)', () => {
		let onToggleClick;

		beforeEach(() => {
			onToggleClick = sinon.spy();

			mountSection({
				assistiveText: { collapseSection: 'Collapse Section' },
				onToggleClick,
				title: 'ALL THE ITEMS!',
				toggleable: true,
			});
		});

		it('modal section exists', () => {
			should.exist(handles.section);
		});

		it('modal section has "slds-is-open" class when open', () => {
			expect(handles.section.find('.slds-section')).to.have.className(
				'slds-is-open'
			);
		});

		it('section has a title', () => {
			should.exist(handles.section.find('.slds-section__title'));
		});

		it('ul has proper classes', () => {
			should.exist(
				handles.section.find('ul.slds-grid.slds-grid_pull-padded.slds-wrap')
			);
		});

		it('li exists', () => {
			expect(handles.section.find('li').length).to.equal(2);
		});

		it('renders li with proper classes', () => {
			const li = handles.section.find('li').at(0);
			expect(li).to.have.className('slds-col_padded');
			expect(li).to.have.className('slds-grow-none');
			expect(li).to.have.className('slds-size_1-of-1');
			expect(li).to.have.className('slds-medium-size_1-of-3');
		});

		it('renders custom section title', () => {
			expect(handles.section.find('h3').text()).to.equal('ALL THE ITEMS!');
		});

		it('renders custom toggle assistve text', () => {
			expect(handles.section.find('.slds-assistive-text').text()).to.equal(
				'Collapse Section'
			);
		});

		it('toggling section fires callback', () => {
			handles.section.find('.slds-button').simulate('click');
			expect(onToggleClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});
	});

	describe('App Launcher Section (not toggleable)', () => {
		beforeEach(() => {
			mountSection();
		});

		it('does not render toggle if toggleable is false', () => {
			should.not.exist(
				handles.section.find(
					'.slds-button .slds-button_icon .slds-m-right_small'
				)
			);
		});
	});

	describe('App Launcher Section (closed)', () => {
		beforeEach(() => {
			mountSection({
				toggleable: true,
				isOpen: false,
			});
		});

		it('modal section has "slds-is-close" class when closed', () => {
			should.exist(handles.section.find('.slds-is-close'));
		});
	});

	describe('App Launcher Section (small)', () => {
		beforeEach(() => {
			mountSection(
				{},
				<AppLauncherTile size="small" title="Marketing Clout" />
			);
		});

		it('renders li with proper classes for small tiles', () => {
			should.exist(
				handles.section.find(
					'.slds-col_padded .slds-grow-none .slds-size_xx-small'
				)
			);
		});
	});
});
