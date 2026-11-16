import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import File from '../file';
import IconSettings from '../../icon-settings';
import MenuDropdown from '../../menu-dropdown';

// Browser-mode test: checks the more-actions button's corners against the real
// SLDS 2 stylesheet (vitest.setup.browser.ts), which jsdom doesn't apply.
describe('File more actions (browser)', () => {
	it('rounds the more-actions button as the last in its group', () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File
					id="file-actions"
					labels={{ title: 'Proposal.pdf' }}
					onClickDownload={() => {}}
					moreActionsDropdown={
						<MenuDropdown
							id="file-actions-menu"
							options={[{ label: 'Menu Item One', value: 'A0' }]}
						/>
					}
				/>
			</IconSettings>
		);
		const button = container.querySelector(
			'.slds-dropdown-trigger .slds-button'
		);
		const style = getComputedStyle(button);
		expect(style.borderStartStartRadius).toBe('0px');
		expect(style.borderEndStartRadius).toBe('0px');
		expect(style.borderStartEndRadius).not.toBe('0px');
		expect(style.borderEndEndRadius).not.toBe('0px');
	});

	// The `<style>` rule `injectMoreActionsStyles` rendered for
	// `a::before/::after { background: none }` overrode nothing: SLDS gives those
	// pseudo-elements no background.
	it('leaves the menu links without pseudo-element backgrounds', async () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<File
					id="file-actions-open"
					labels={{ title: 'Proposal.pdf' }}
					moreActionsDropdown={
						<MenuDropdown
							id="file-actions-menu-open"
							isOpen
							options={[{ label: 'Menu Item One', value: 'A0' }]}
						/>
					}
				/>
			</IconSettings>
		);
		const link = await waitFor(() => {
			const el = document.querySelector('#file-actions-menu-open-item-0 > a');
			expect(el).not.toBeNull();
			return el;
		});
		for (const pseudo of ['::before', '::after']) {
			const style = getComputedStyle(link, pseudo);
			expect(style.backgroundImage, pseudo).toBe('none');
			expect(style.backgroundColor, pseudo).toBe('rgba(0, 0, 0, 0)');
		}
	});

	// SLDS clips the title scrim (`overflow: hidden`); a menu rendered inside it
	// was cut off at the bottom of the file.
	it('shows the open menu outside a file without a visible title', async () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<File
					id="file-actions-scrim"
					labels={{ title: 'Proposal.pdf' }}
					hasNoVisibleTitle
					moreActionsDropdown={
						<MenuDropdown
							id="file-actions-menu-scrim"
							isOpen
							options={[{ label: 'Menu Item One', value: 'A0' }]}
						/>
					}
				/>
			</IconSettings>
		);
		const menu = await waitFor(() => {
			const el = document
				.querySelector('#file-actions-menu-scrim-item-0')
				?.closest('.slds-dropdown');
			expect(el).not.toBeNull();
			return el;
		});
		expect(container.querySelector('.slds-file').contains(menu)).toBe(false);
		const fileRect = container
			.querySelector('.slds-file')
			.getBoundingClientRect();
		expect(menu.getBoundingClientRect().bottom).toBeGreaterThan(
			fileRect.bottom
		);
	});
});
