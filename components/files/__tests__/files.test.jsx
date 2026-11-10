import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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

describe('File without href', () => {
	it('does not navigate and calls onClickImage', () => {
		const onClickImage = vi.fn();
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File labels={{ title: 'One.pdf' }} onClickImage={onClickImage} />
			</IconSettings>
		);
		const link = container.querySelector('a.slds-file__crop');
		const notPrevented = fireEvent.click(link);
		expect(notPrevented).toBe(false);
		expect(onClickImage).toHaveBeenCalledTimes(1);
	});
});

describe('File loading', () => {
	it('lifts the spinner container without a deprecated Spinner prop', () => {
		const warn = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File isLoading labels={{ title: 'One.pdf' }} />
			</IconSettings>
		);
		expect(container.querySelector('.slds-spinner_container')).toHaveStyle({
			zIndex: '1',
		});
		expect(
			warn.mock.calls.filter(([message]) =>
				String(message).includes('will be removed')
			)
		).toEqual([]);
		warn.mockRestore();
	});
});
