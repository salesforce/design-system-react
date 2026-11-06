import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Files from '../';
import File from '../file';
import IconSettings from '../../icon-settings';

describe('Files', () => {
	it("applies its crop to files that don't set their own", () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<Files id="files-crop" crop="1-by-1">
					<File id="file-1" labels={{ title: 'One.pdf' }} />
					<File id="file-2" labels={{ title: 'Two.pdf' }} crop="4-by-3" />
				</Files>
			</IconSettings>
		);
		const crops = Array.from(container.querySelectorAll('.slds-file__crop'));
		expect(crops[0]).toHaveClass('slds-file__crop_1-by-1');
		expect(crops[1]).toHaveClass('slds-file__crop_4-by-3');
	});

	it('defaults a standalone file to a 16-by-9 crop', () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File id="file-alone" labels={{ title: 'Alone.pdf' }} />
			</IconSettings>
		);
		expect(container.querySelector('.slds-file__crop')).toHaveClass(
			'slds-file__crop_16-by-9'
		);
	});
});
