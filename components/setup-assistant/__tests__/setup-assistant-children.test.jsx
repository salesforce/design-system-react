import { render } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import IconSettings from '../../icon-settings';
import SetupAssistant from '../';
import SetupAssistantStep from '../step';

const originalDisplayName = SetupAssistantStep.displayName;

describe('SetupAssistant children', () => {
	afterEach(() => {
		SetupAssistantStep.displayName = originalDisplayName;
	});

	it('finds steps by component, not displayName', () => {
		// Storybook docgen and HOCs can change a component's displayName
		SetupAssistantStep.displayName = 'Renamed';
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant id="children-assistant">
					<SetupAssistantStep heading="First" id="children-assistant-1" />
					<SetupAssistantStep heading="Second" id="children-assistant-2" />
				</SetupAssistant>
			</IconSettings>
		);
		expect(
			container.querySelectorAll('.slds-setup-assistant__item')
		).toHaveLength(2);
	});
});
