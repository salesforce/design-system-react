import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import IconSettings from '../../icon-settings';
import ExpandableSection from '../index';

describe('SLDSExpandableSection', () => {
	const defaultChildren = 'Expandable section children';

	const renderSection = (props, children = defaultChildren) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<ExpandableSection title="All Items" {...props}>
					{children}
				</ExpandableSection>
			</IconSettings>
		);
	};

	describe('App Launcher Section', () => {
		let onToggleOpen;

		beforeEach(() => {
			onToggleOpen = vi.fn();
		});

		it('section exists', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('.slds-section')).toBeInTheDocument();
		});

		it('section has custom class', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('.this-is-a-custom-class')).toBeInTheDocument();
		});

		it('section has "slds-is-open" class when open', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('.slds-section')).toHaveClass('slds-is-open');
		});

		it('section renders children properly', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('.slds-section__content').textContent).toBe('Children test!');
		});

		it('section uses passed in id properly', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('#test-id-expanded-section-content')).toBeInTheDocument();
		});

		it('section has a title', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('.slds-section__title')).toBeInTheDocument();
		});

		it('renders custom section title', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('h3 .slds-truncate').textContent).toBe('Section Title');
		});

		it('renders custom toggle assistive text', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			expect(container.querySelector('h3 span.slds-assistive-text').textContent).toBe('Collapse Section');
		});

		it('toggling section fires callback', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				className: 'this-is-a-custom-class',
				id: 'test-id',
				onToggleOpen,
				title: 'Section Title',
			}, 'Children test!');

			const button = container.querySelector('h3 button.slds-button');
			fireEvent.click(button);

			expect(onToggleOpen).toHaveBeenCalledTimes(1);
		});
	});

	describe('Expandable Section (non-collapsible)', () => {
		it('does not render toggle if non-collapsible is true', () => {
			const { container } = renderSection({ nonCollapsible: true });

			// When non-collapsible, there should be no button
			expect(container.querySelector('.slds-button')).not.toBeInTheDocument();
		});
	});

	describe('Expandable Section (closed)', () => {
		it('section does not have "slds-is-open" class when closed', () => {
			const { container } = renderSection({ isOpen: false });

			expect(container.querySelector('.slds-section')).not.toHaveClass('slds-is-open');
		});
	});
});
