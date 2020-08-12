import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';

import IconSettings from '../../icon-settings';
import ExpandableSection from '../../expandable-section';

const { expect } = chai;
const should = chai.should();

describe('SLDSExpandableSection', () => {
	const handles = {
		section: null,
	};

	const defaultSectionProps = {
		title: 'All Items',
	};

	const defaultChildren = 'Expandable section children';

	const createSection = (props, children) =>
		React.createElement(
			ExpandableSection,
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

	describe('App Launcher Section', () => {
		let onToggleOpen;

		beforeEach(() => {
			onToggleOpen = sinon.spy();

			mountSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);
		});

		it('section exists', () => {
			should.exist(handles.section);
		});

		it('section has custom class', () => {
			expect(
				handles.section.find('div').at(0).hasClass('this-is-a-custom-class')
			).to.eql(true);
		});

		it('section has "slds-is-open" class when open', () => {
			expect(handles.section.find('.slds-section')).to.have.className(
				'slds-is-open'
			);
		});

		it('section renders children properly', () => {
			expect(handles.section.find('.slds-section__content').text()).to.eql(
				'Children test!'
			);
		});

		it('section uses passed in id properly', () => {
			expect(
				handles.section.find('#test-id-expanded-section-content').length
			).to.eql(1);
		});

		it('section has a title', () => {
			should.exist(handles.section.find('.slds-section__title'));
		});

		it('renders custom section title', () => {
			expect(handles.section.find('h3 .slds-truncate').text()).to.equal(
				'Section Title'
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

	describe('Expandable Section (non-collapsible)', () => {
		beforeEach(() => {
			mountSection({ nonCollapsible: true });
		});

		it('does not render toggle if non-collapsible is true', () => {
			should.not.exist(
				handles.section.find(
					'.slds-button .slds-button_icon .slds-m-right_small'
				)
			);
		});
	});

	describe('Expandable Section (closed)', () => {
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
