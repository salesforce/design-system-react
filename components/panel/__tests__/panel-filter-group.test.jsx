import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import PanelFilterGroup from '../filtering/group';
import IconSettings from '../../icon-settings';

describe('SLDSPanelFilterGroup', () => {
	const renderGroup = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<PanelFilterGroup variant="panel" {...props} />
			</IconSettings>
		);

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders the save/cancel header when isModified', () => {
		const { container } = renderGroup({ isModified: true });
		const header = container.querySelector('.slds-filters__header');
		expect(header.querySelector('h2')).not.toBeInTheDocument();
		expect(header.textContent).toContain('Save');
		expect(header.textContent).toContain('Cancel');
	});

	it('renders the heading when not modified', () => {
		const { container } = renderGroup();
		const header = container.querySelector('.slds-filters__header');
		expect(header.querySelector('h2').textContent).toBe('Filter');
	});

	it('deprecated `modified` still works and warns', () => {
		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		const { container: newContainer, unmount } = renderGroup({
			isModified: true,
		});
		const newMarkup = newContainer.innerHTML;
		unmount();
		expect(errorSpy).not.toHaveBeenCalled();

		const { container: oldContainer } = renderGroup({ modified: true });
		expect(oldContainer.innerHTML).toBe(newMarkup);

		const messages = errorSpy.mock.calls.map((call) => call.join(' '));
		expect(
			messages.some(
				(message) =>
					message.includes('`modified`') &&
					message.includes('`isModified`') &&
					message.includes('version of SLDSFilterGroup.')
			)
		).toBe(true);
	});
});
