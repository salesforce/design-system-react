import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PanelFilterGroup from '../filtering/group';
import IconSettings from '../../icon-settings';

describe('PanelFilterGroup', () => {
	it('ignores and warns about the removed assistiveTextCloseFilterPanel prop', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		render(
			<IconSettings iconPath="/assets/icons">
				<PanelFilterGroup
					assistiveTextCloseFilterPanel="Old close text"
					variant="panel"
				/>
			</IconSettings>
		);

		expect(screen.queryByTitle('Old close text')).toBeNull();
		expect(screen.getByTitle('Close Filter Panel')).toBeInTheDocument();
		expect(consoleError).toHaveBeenCalledWith(
			expect.stringContaining(
				'`assistiveTextCloseFilterPanel` has reached End-of-Life'
			)
		);
		consoleError.mockRestore();
	});

	it('labels the close button from assistiveText.closeButton', () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<PanelFilterGroup
					assistiveText={{ closeButton: 'Close filters' }}
					variant="panel"
				/>
			</IconSettings>
		);

		expect(screen.getByTitle('Close filters')).toBeInTheDocument();
	});
});
