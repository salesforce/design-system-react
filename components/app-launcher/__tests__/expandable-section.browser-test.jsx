import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';

import IconSettings from '../../icon-settings';
import AppLauncherLink from '../../app-launcher/link';
import AppLauncherTile from '../../app-launcher/tile';
import AppLauncherExpandableSection from '../../app-launcher/expandable-section';

const { expect } = chai;
const should = chai.should();

describe('SLDS APP LAUNCHER EXPANDABLE SECTION *******************************************', () => {
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

	const linkChildren = [
		<AppLauncherLink key="asdf">Accounts</AppLauncherLink>,
		<AppLauncherLink key="qwer">Ammnouncements</AppLauncherLink>,
	];

	const createSection = (props, children) =>
		React.createElement(
			AppLauncherExpandableSection,
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

	describe('App Launcher Expandable Section', () => {
		let onToggleOpen;

		beforeEach(() => {
			onToggleOpen = sinon.spy();

			mountSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});
		});

		it('section exists', () => {
			should.exist(handles.section);
		});

		it('section has "slds-is-open" class when open', () => {
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
			expect(li).to.have.className('slds-p-horizontal_small');
			expect(li).to.have.className('slds-size_1-of-1');
			expect(li).to.have.className('slds-medium-size_1-of-3');
		});

		it('renders custom section title', () => {
			expect(handles.section.find('h3 .slds-truncate').text()).to.equal(
				'ALL THE ITEMS!'
			);
		});

		it('renders custom toggle assistve text', () => {
			expect(
				handles.section.find('h3 span.slds-assistive-text').text()
			).to.equal('Collapse Section');
		});

		it('toggling section fires callback', () => {
			handles.section.find('h3 button.slds-button').simulate('click');
			expect(onToggleOpen.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});
	});

	describe('App Launcher Expandable Section (non-collapsible) with links', () => {
		beforeEach(() => {
			mountSection({ nonCollapsible: true }, linkChildren);
		});

		it('does not render toggle if non-collapsible is true', () => {
			should.not.exist(
				handles.section.find(
					'.slds-button .slds-button_icon .slds-m-right_small'
				)
			);
		});

		it('renders li with proper classes', () => {
			const li = handles.section.find('li').at(0);
			expect(li).to.have.className('slds-col_padded');
			expect(li).to.have.className('slds-p-vertical_xx-small');
			expect(li).to.have.className('slds-size_1-of-5');
		});
	});

	describe('App Launcher Expandable Section (closed)', () => {
		beforeEach(() => {
			mountSection({
				isOpen: false,
			});
		});

		it('section does not have "slds-is-open" class when closed', () => {
			expect(handles.section.find('.slds-section.slds-is-open').length).to.eql(
				0
			);
		});
	});
});
