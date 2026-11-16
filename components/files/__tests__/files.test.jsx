import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Files from '../';
import File from '../file';
import IconSettings from '../../icon-settings';
import MenuDropdown from '../../menu-dropdown';

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

	it('renders more actions without a <style> element', () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File
					id="file-actions"
					labels={{ title: 'Proposal.pdf' }}
					moreActionsDropdown={
						<MenuDropdown
							id="file-actions-menu"
							options={[{ label: 'Menu Item One', value: 'A0' }]}
						/>
					}
				/>
			</IconSettings>
		);
		// SLDS's button-group class rounds the trigger's corners, so there's
		// nothing for a CSP without 'unsafe-inline' in style-src to block.
		expect(
			container.querySelector('.slds-button-group .slds-dropdown-trigger')
		).toHaveClass('slds-button_last');
		expect(container.querySelectorAll('style')).toHaveLength(0);
	});

	it('keeps the deprecated injectMoreActionsStyles as a no-op', () => {
		expect(File.injectMoreActionsStyles()).toBeNull();
	});
});

describe('File without href', () => {
	it('defaults href to # so onClickImage handles the click without navigating', () => {
		const onClickImage = vi.fn();
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File labels={{ title: 'One.pdf' }} onClickImage={onClickImage} />
			</IconSettings>
		);
		const link = container.querySelector('a.slds-file__crop');
		expect(link.getAttribute('href')).toBe('#');
		const notPrevented = fireEvent.click(link);
		expect(notPrevented).toBe(false);
		expect(onClickImage).toHaveBeenCalledTimes(1);
	});
});
