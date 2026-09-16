import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import VerticalNavigation from '../index';
import { sampleReportCategories } from '../../../utilities/sample-data/vertical-navigation';

const defaultProps = {
	id: 'sample-navigation',
	className: 'sample-navigation',
	categories: sampleReportCategories,
};

describe('SLDSVerticalNavigation', () => {
	describe('Assistive technology', () => {
		it('has items described by category headers', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			const structure = { reports: 5, folders: 3 };
			Object.entries(structure).forEach(([categoryId, itemCount]) => {
				// Find category header
				const header = container.querySelector(`#sample-navigation-${categoryId}`);
				expect(header).toBeInTheDocument();
				expect(header.tagName).toBe('H2');

				// Find items described by this header
				const links = container.querySelectorAll(
					`a[aria-describedby="sample-navigation-${categoryId}"]`
				);
				expect(links).toHaveLength(itemCount);
			});
		});

		it('has proper navigation structure', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			// Root should be a nav element
			const nav = container.querySelector('nav#sample-navigation');
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveClass('slds-nav-vertical', 'sample-navigation');

			// Should have sections for each category
			const sections = container.querySelectorAll('.slds-nav-vertical__section');
			expect(sections).toHaveLength(2); // reports and folders

			// Each section should have a title and list
			sections.forEach((section) => {
				expect(section.querySelector('h2.slds-nav-vertical__title')).toBeInTheDocument();
				expect(section.querySelector('ul')).toBeInTheDocument();
			});
		});

		it('uses aria-current for selected item', () => {
			const { container } = render(
				<VerticalNavigation {...defaultProps} selectedId="my_folders" />
			);

			const selectedLink = container.querySelector('a[data-id="my_folders"]');
			expect(selectedLink).toHaveAttribute('aria-current', 'true');

			// Other links should not have aria-current
			const otherLink = container.querySelector('a[data-id="recent_reports"]');
			expect(otherLink).not.toHaveAttribute('aria-current');
		});
	});

	describe('selectedId prop', () => {
		const selectedId = 'my_folders';

		it('is used to select an item', () => {
			const { container } = render(
				<VerticalNavigation {...defaultProps} selectedId={selectedId} />
			);

			// Find the selected item
			const selectedItem = container.querySelector('li.slds-is-active');
			expect(selectedItem).toBeInTheDocument();

			// Verify it's the correct item
			const link = selectedItem.querySelector('a[data-id="my_folders"]');
			expect(link).toBeInTheDocument();
		});

		it('defaults to first item when no selectedId provided', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			// First item should be selected by default
			const firstItem = container.querySelector('li.slds-is-active');
			expect(firstItem).toBeInTheDocument();

			// Should be the first item from the first category
			const link = firstItem.querySelector('a[data-id="recent_reports"]');
			expect(link).toBeInTheDocument();
		});

		it('marks only one item as selected', () => {
			const { container } = render(
				<VerticalNavigation {...defaultProps} selectedId="my_folders" />
			);

			const selectedItems = container.querySelectorAll('li.slds-is-active');
			expect(selectedItems).toHaveLength(1);
		});
	});

	describe('Item rendering', () => {
		it('renders all categories and items', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			// Check Reports category
			expect(screen.getByText('Reports')).toBeInTheDocument();
			expect(screen.getByText('Recent')).toBeInTheDocument();
			expect(screen.getByText('Private Reports')).toBeInTheDocument();
			expect(screen.getByText('Public Reports')).toBeInTheDocument();
			expect(screen.getByText('All Reports')).toBeInTheDocument();

			// Check Folders category
			expect(screen.getByText('Folders')).toBeInTheDocument();
			expect(screen.getByText('Shared with Me')).toBeInTheDocument();
			expect(screen.getByText('All Folders')).toBeInTheDocument();

			// Check both "Created by Me" items exist (one in Reports, one in Folders)
			const createdByMeLinks = screen.getAllByText('Created by Me');
			expect(createdByMeLinks).toHaveLength(2);
		});

		it('renders items with correct structure', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			// Each item should be an li with proper classes
			const items = container.querySelectorAll('li.slds-nav-vertical__item');
			expect(items.length).toBeGreaterThan(0);

			// Each item should have a link with proper class
			items.forEach((item) => {
				const link = item.querySelector('a.slds-nav-vertical__action');
				expect(link).toBeInTheDocument();
			});
		});

		it('renders links with href from item.url', () => {
			const { container } = render(<VerticalNavigation {...defaultProps} />);

			// The "my_folders" item has a url in the sample data
			const myFoldersLink = container.querySelector('a[data-id="my_folders"]');
			expect(myFoldersLink).toHaveAttribute('href', 'http://www.google.com');

			// Items without url should have href="#"
			const recentReportsLink = container.querySelector('a[data-id="recent_reports"]');
			expect(recentReportsLink).toHaveAttribute('href', '#');
		});
	});

	describe('Item interaction', () => {
		it('calls onSelect when item is clicked', async () => {
			const onSelect = vi.fn();
			const { container } = render(
				<VerticalNavigation {...defaultProps} onSelect={onSelect} />
			);

			const link = container.querySelector('a[data-id="my_folders"]');
			await userEvent.click(link);

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect).toHaveBeenCalledWith(
				expect.any(Object), // event
				expect.objectContaining({
					item: expect.objectContaining({
						id: 'my_folders',
						label: 'Created by Me',
					}),
				})
			);
		});

		it('calls onSelect for items without url', async () => {
			const onSelect = vi.fn();
			const { container } = render(
				<VerticalNavigation {...defaultProps} onSelect={onSelect} />
			);

			const link = container.querySelector('a[data-id="recent_reports"]');
			await userEvent.click(link);

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({
					item: expect.objectContaining({
						id: 'recent_reports',
						label: 'Recent',
					}),
				})
			);
		});

		it('prevents default for items without url', async () => {
			const onSelect = vi.fn((event) => {
				// Check if preventDefault was called
				expect(event.defaultPrevented).toBe(true);
			});

			const { container } = render(
				<VerticalNavigation {...defaultProps} onSelect={onSelect} />
			);

			const link = container.querySelector('a[data-id="recent_reports"]');
			await userEvent.click(link);

			expect(onSelect).toHaveBeenCalled();
		});
	});

	describe('className prop', () => {
		it('applies custom className', () => {
			const { container } = render(
				<VerticalNavigation {...defaultProps} className="custom-class" />
			);

			const nav = container.querySelector('nav');
			expect(nav).toHaveClass('slds-nav-vertical', 'custom-class');
		});

		it('works without className', () => {
			const { container } = render(
				<VerticalNavigation
					{...defaultProps}
					className={undefined}
				/>
			);

			const nav = container.querySelector('nav');
			expect(nav).toHaveClass('slds-nav-vertical');
			expect(nav).not.toHaveClass('undefined');
		});
	});

	describe('id prop', () => {
		it('uses provided id', () => {
			const { container } = render(
				<VerticalNavigation {...defaultProps} id="custom-nav-id" />
			);

			const nav = container.querySelector('nav#custom-nav-id');
			expect(nav).toBeInTheDocument();

			// Category IDs should be based on the nav id
			expect(container.querySelector('#custom-nav-id-reports')).toBeInTheDocument();
			expect(container.querySelector('#custom-nav-id-folders')).toBeInTheDocument();
		});

		it('generates id when not provided', () => {
			const { container } = render(
				<VerticalNavigation
					categories={sampleReportCategories}
				/>
			);

			const nav = container.querySelector('nav');
			expect(nav).toBeInTheDocument();
			expect(nav.id).toBeTruthy(); // Should have some generated ID
		});
	});

	describe('Empty categories', () => {
		it('handles empty categories array', () => {
			const { container } = render(
				<VerticalNavigation id="empty-nav" categories={[]} />
			);

			const nav = container.querySelector('nav#empty-nav');
			expect(nav).toBeInTheDocument();
			expect(nav.querySelector('.slds-nav-vertical__section')).not.toBeInTheDocument();
		});

		it('handles category with empty items', () => {
			const emptyCategory = [
				{
					id: 'empty',
					label: 'Empty Category',
					items: [],
				},
			];

			render(
				<VerticalNavigation id="nav-empty-items" categories={emptyCategory} />
			);

			expect(screen.getByText('Empty Category')).toBeInTheDocument();
			// Should render the category but no items
		});
	});
});
