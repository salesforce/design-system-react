import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ScopedNotification from '../';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

const renderNotification = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<ScopedNotification {...props}>
				<p>Notification text</p>
			</ScopedNotification>
		</IconSettings>
	);

describe('ScopedNotification icon', () => {
	it("uses a string assistiveText on the icon as the icon's label", () => {
		const { container } = renderNotification({
			icon: <Icon category="utility" name="info" assistiveText="Information" />,
		});
		expect(container.querySelector('.slds-assistive-text').textContent).toBe(
			'Information'
		);
	});

	it("lets the icon's assistiveText win over assistiveText.icon", () => {
		const { container } = renderNotification({
			assistiveText: { icon: 'From notification' },
			icon: (
				<Icon
					category="utility"
					name="info"
					assistiveText={{ label: 'From icon' }}
				/>
			),
		});
		expect(container.querySelector('.slds-assistive-text').textContent).toBe(
			'From icon'
		);
	});
});
