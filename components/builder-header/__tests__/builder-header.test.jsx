import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import BuilderHeader from '../';
import BuilderHeaderToolbar from '../toolbar';
import IconSettings from '../../icon-settings';

describe('SLDSBuilderHeader', () => {
	describe('Links are clickable', () => {
		let onClickBack;
		let onClickHelp;

		beforeEach(() => {
			onClickBack = vi.fn();
			onClickHelp = vi.fn();
		});

		it('triggers when Back link is clicked', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<BuilderHeader events={{ onClickBack, onClickHelp }} />
				</IconSettings>
			);

			const links = container.querySelectorAll(
				'.slds-builder-header__item-action'
			);
			expect(links.length).toBeGreaterThanOrEqual(2);

			// First link should be Back
			fireEvent.click(links[0]);
			expect(onClickBack).toHaveBeenCalledTimes(1);
		});

		it('triggers when Help link is clicked', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<BuilderHeader events={{ onClickBack, onClickHelp }} />
				</IconSettings>
			);

			const links = container.querySelectorAll(
				'.slds-builder-header__item-action'
			);
			expect(links.length).toBeGreaterThanOrEqual(2);

			// Second link should be Help
			fireEvent.click(links[1]);
			expect(onClickHelp).toHaveBeenCalledTimes(1);
		});
	});

	describe('Toolbar actions', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('renders the actions slot', () => {
			const { container, getByRole } = render(
				<BuilderHeaderToolbar actions={<button type="button">Save</button>} />
			);

			expect(
				container.querySelector('.slds-builder-toolbar__actions')
			).toContainElement(getByRole('button', { name: 'Save' }));
		});

		it('still renders the deprecated onRenderActions and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container, getByRole } = render(
				<BuilderHeaderToolbar
					onRenderActions={() => <button type="button">Save</button>}
				/>
			);

			expect(
				container.querySelector('.slds-builder-toolbar__actions')
			).toContainElement(getByRole('button', { name: 'Save' }));

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(messages.some((m) => m.includes('onRenderActions'))).toBe(true);
		});
	});
});
