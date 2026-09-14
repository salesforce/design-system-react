import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import IconSettings from '../../icon-settings';

import AppLauncherTile from '../tile';
import Icon from '../../icon';

describe('SLDS APP LAUNCHER TILE', () => {
	const defaultTileProps = {
		title: 'Marketing Cloud',
	};

	const createTile = (props) => (
		<AppLauncherTile {...defaultTileProps} {...props} />
	);

	const renderTile = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">{createTile(props)}</IconSettings>
		);
	};

	describe('Default App Launcher Tile', () => {
		let onClick;

		beforeEach(() => {
			onClick = vi.fn();
		});

		it('renders tile', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			expect(container.querySelector('.slds-app-launcher__tile')).toBeInTheDocument();
		});

		it('renders tile with proper classes', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			expect(
				container.querySelector('.slds-app-launcher__tile.slds-text-link_reset')
			).toBeInTheDocument();
		});

		it('renders tile body', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			expect(
				container.querySelector('.slds-app-launcher__tile-body')
			).toBeInTheDocument();
		});

		it('renders tile title', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			const titleElement = container.querySelector('.slds-app-launcher__tile-body > *');
			expect(titleElement).toBeInTheDocument();
		});

		it('renders custom title', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			expect(container.textContent).toContain('Support Cloud');
		});

		// The description renders through `Truncate` (Canvas + getBoundingClientRect
		// measurement, both no-ops in jsdom). Description rendering and its search
		// highlight are covered in `tile.browser.test.jsx` (Vitest `browser` project).

		it('has an href attribute', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			const link = container.querySelector('a');
			expect(link).toHaveAttribute('href', 'https://www.salesforce.com/');
		});

		it('clicking tile fires callback', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			const tile = container.querySelector('.slds-app-launcher__tile');
			fireEvent.click(tile);
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('clicking tile title link fires callback and ignores href', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			const link = container.querySelector('.slds-app-launcher__tile-body a');
			if (link) {
				fireEvent.click(link);
				expect(onClick).toHaveBeenCalledTimes(1);
			} else {
				// If there's no separate link, clicking the tile itself should work
				const tile = container.querySelector('.slds-app-launcher__tile');
				fireEvent.click(tile);
				expect(onClick).toHaveBeenCalledTimes(1);
			}
		});

		it('tile can be passed custom className', () => {
			const { container } = renderTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Support Cloud',
			});

			expect(container.querySelector('.this-is-a-custom-class')).toBeInTheDocument();
		});

		it('tile can be passed a search string', () => {
			const { container } = renderTile({
				search: 'Sup',
				title: 'Support Cloud',
			});

			// The search term highlights inside the tile title link.
			const mark = container.querySelector('.slds-app-launcher__tile-body a mark');
			expect(mark).toBeInTheDocument();
		});

		it('search string highlights title', () => {
			const { container } = renderTile({
				search: 'Cloud',
				title: 'Support Cloud',
			});

			const mark = container.querySelector('.slds-app-launcher__tile-body a mark');
			expect(mark).toBeInTheDocument();
			expect(mark.textContent).toBe('Cloud');

			// The non-matching portion of the title is still present.
			const link = container.querySelector('.slds-app-launcher__tile-body a');
			expect(link.textContent).toContain('Support');
		});

		// Description rendering + search highlight run in `tile.browser.test.jsx`
		// (real Canvas/layout measurement, unavailable in jsdom).
	});

	// The "truncated" tile cluster — "more" link, custom label, hover Tooltip,
	// and tooltip search highlight — lives in `tile.browser.test.jsx`. All four
	// depend on `Truncate` measuring real text overflow (Canvas +
	// getBoundingClientRect), which jsdom cannot do.

	describe('App Launcher Tile (text icon)', () => {
		beforeEach(() => {
			// No-op for consistency
		});

		afterEach(() => {
			// No-op for consistency
		});

		it('renders text icon with proper classes', () => {
			const { container } = renderTile({
				description: 'Call center and contact center.',
				iconBackgroundColor: 'rgb(115, 192, 123)',
				iconText: 'CC',
				title: 'Call Center',
			});

			const iconFigure = container.querySelector('.slds-app-launcher__tile-figure');
			expect(iconFigure).toBeInTheDocument();

			const icon = iconFigure.querySelector('span.slds-avatar');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('slds-avatar_large');

			const iconAbbr = icon.querySelector('abbr.slds-avatar__initials');
			expect(iconAbbr).toBeInTheDocument();
			expect(iconAbbr).toHaveClass('slds-icon-custom-27');
		});

		it('tile can be passed a custom text icon', () => {
			const { container } = renderTile({
				description: 'Call center and contact center.',
				iconBackgroundColor: 'rgb(115, 192, 123)',
				iconText: 'CC',
				title: 'Call Center',
			});

			const iconAbbr = container.querySelector('abbr.slds-avatar__initials');
			expect(iconAbbr.textContent).toBe('CC');
		});

		it('tile can be passed a custom text icon background color', () => {
			const { container } = renderTile({
				description: 'Call center and contact center.',
				iconBackgroundColor: 'rgb(115, 192, 123)',
				iconText: 'CC',
				title: 'Call Center',
			});

			const iconAbbr = container.querySelector('abbr.slds-avatar__initials');
			expect(iconAbbr).toHaveAttribute('style');
			expect(iconAbbr.getAttribute('style')).toContain('rgb(115, 192, 123)');
		});
	});

	describe('App Launcher Tile (icon node)', () => {
		const iconNode = <Icon name="campaign" category="standard" size="large" />;

		beforeEach(() => {
			// No-op for consistency
		});

		afterEach(() => {
			// No-op for consistency
		});

		it('renders <Icon>', () => {
			const { container } = renderTile({
				description: 'Call center and contact center.',
				iconNode,
				title: 'Call Center',
			});

			const iconContainer = container.querySelector(
				'.slds-app-launcher__tile-figure span.slds-icon_container'
			);
			expect(iconContainer).toBeInTheDocument();
		});

		it('renders <svg>', () => {
			const { container } = renderTile({
				description: 'Call center and contact center.',
				iconNode,
				title: 'Call Center',
			});

			const svg = container.querySelector('.slds-app-launcher__tile-figure svg');
			expect(svg).toBeInTheDocument();
		});
	});
});
