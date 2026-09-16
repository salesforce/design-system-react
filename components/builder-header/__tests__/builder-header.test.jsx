import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import BuilderHeader from '../';
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
					<BuilderHeader
						events={{ onClickBack, onClickHelp }}
					/>
				</IconSettings>
			);

			const links = container.querySelectorAll('.slds-builder-header__item-action');
			expect(links.length).toBeGreaterThanOrEqual(2);

			// First link should be Back
			fireEvent.click(links[0]);
			expect(onClickBack).toHaveBeenCalledTimes(1);
		});

		it('triggers when Help link is clicked', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<BuilderHeader
						events={{ onClickBack, onClickHelp }}
					/>
				</IconSettings>
			);

			const links = container.querySelectorAll('.slds-builder-header__item-action');
			expect(links.length).toBeGreaterThanOrEqual(2);

			// Second link should be Help
			fireEvent.click(links[1]);
			expect(onClickHelp).toHaveBeenCalledTimes(1);
		});
	});
});
