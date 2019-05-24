import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import IconSettings from '../../icon-settings';
import SetupAssistant from '../../setup-assistant';
import SetupAssistantStep from '../../setup-assistant/step';

/* eslint-disable react/no-find-dom-node */

describe('SLDS Setup Assistant', () => {
	const handles = {
		setupAssistant: null,
	};

	describe('Setup Assistant & Setup Assistant Step events', () => {
		let onStepToggleIsOpenObject;
		let onToggleIsOpenObject;

		beforeEach(() => {
			handles.setupAssistant = mount(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant
						id="setup-assistant-event-test-1"
						onStepToggleIsOpen={(event, data) => {
							onStepToggleIsOpenObject = { event, data };
						}}
					>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-1"
							isExpandable
							isOpen
						/>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-2"
							isExpandable
							isOpen
							onToggleIsOpen={(event, data) => {
								onToggleIsOpenObject = { event, data };
							}}
						/>
					</SetupAssistant>
				</IconSettings>
			);
		});

		it('renders setup assistant', () => {
			expect(handles.setupAssistant.length).to.equal(1);
		});

		it('handles onStepToggleIsOpen correctly', () => {
			const expandButton = handles.setupAssistant.find(
				'#setup-assistant-event-test-1-step-1 .slds-setup-assistant__step-summary-title button'
			);
			expandButton.simulate('click');
			expect(typeof onStepToggleIsOpenObject.event).to.eql('object');
			expect(typeof onStepToggleIsOpenObject.data).to.eql('object');
			expect(onStepToggleIsOpenObject.data.index).to.eql(0);
			expect(onStepToggleIsOpenObject.data.isOpen).to.eql(true);
			expect(typeof onStepToggleIsOpenObject.data.step).to.eql('object');
		});

		it('handles onToggleIsOpen correctly', () => {
			const expandButton = handles.setupAssistant.find(
				'#setup-assistant-event-test-1-step-2 .slds-setup-assistant__step-summary-title button'
			);
			expandButton.simulate('click');
			expect(typeof onToggleIsOpenObject.event).to.eql('object');
			expect(typeof onToggleIsOpenObject.data).to.eql('object');
			expect(onToggleIsOpenObject.data.index).to.eql(1);
			expect(onToggleIsOpenObject.data.isOpen).to.eql(true);
			expect(typeof onToggleIsOpenObject.data.step).to.eql('object');
		});
	});
});
