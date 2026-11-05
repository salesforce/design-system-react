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
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(container.querySelector('.slds-section')).toBeInTheDocument();
		});

		it('section has custom class', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(
				container.querySelector('.this-is-a-custom-class')
			).toBeInTheDocument();
		});

		it('section has "slds-is-open" class when open', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(container.querySelector('.slds-section')).toHaveClass(
				'slds-is-open'
			);
		});

		it('section renders children properly', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(
				container.querySelector('.slds-section__content').textContent
			).toBe('Children test!');
		});

		it('section uses passed in id properly', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(
				container.querySelector('#test-id-expanded-section-content')
			).toBeInTheDocument();
		});

		it('section has a title', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(
				container.querySelector('.slds-section__title')
			).toBeInTheDocument();
		});

		it('renders custom section title', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(container.querySelector('h3 .slds-truncate').textContent).toBe(
				'Section Title'
			);
		});

		it('renders custom toggle assistive text', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

			expect(
				container.querySelector('h3 span.slds-assistive-text').textContent
			).toBe('Collapse Section');
		});

		it('toggling section fires callback', () => {
			const { container } = renderSection(
				{
					assistiveText: { toggleSection: 'Collapse Section' },
					className: 'this-is-a-custom-class',
					id: 'test-id',
					onToggleOpen,
					title: 'Section Title',
				},
				'Children test!'
			);

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

			expect(container.querySelector('.slds-section')).not.toHaveClass(
				'slds-is-open'
			);
		});
	});

	describe('Controlled and uncontrolled open state', () => {
		const toggle = (container) =>
			fireEvent.click(container.querySelector('h3 button.slds-button'));
		const section = (container) => container.querySelector('.slds-section');

		it('starts open and toggles when uncontrolled without a callback', () => {
			const { container } = renderSection({});
			expect(section(container)).toHaveClass('slds-is-open');

			toggle(container);
			expect(section(container)).not.toHaveClass('slds-is-open');
		});

		it('toggles when uncontrolled with a callback, reporting the requested state', () => {
			const onToggleOpen = vi.fn();
			const { container } = renderSection({ onToggleOpen });

			toggle(container);
			expect(section(container)).not.toHaveClass('slds-is-open');
			expect(onToggleOpen).toHaveBeenLastCalledWith(expect.anything(), {
				isOpen: false,
			});

			toggle(container);
			expect(section(container)).toHaveClass('slds-is-open');
			expect(onToggleOpen).toHaveBeenLastCalledWith(expect.anything(), {
				isOpen: true,
			});
		});

		it('starts closed with `defaultIsOpen={false}`', () => {
			const { container } = renderSection({ defaultIsOpen: false });
			expect(section(container)).not.toHaveClass('slds-is-open');
			expect(container.querySelector('.slds-section__content')).toHaveAttribute(
				'aria-hidden',
				'true'
			);

			toggle(container);
			expect(section(container)).toHaveClass('slds-is-open');
		});

		it('honors controlled `isOpen` and reports the requested state', () => {
			const onToggleOpen = vi.fn();
			const { container } = renderSection({ isOpen: false, onToggleOpen });

			toggle(container);

			expect(section(container)).not.toHaveClass('slds-is-open');
			expect(onToggleOpen).toHaveBeenCalledWith(expect.anything(), {
				isOpen: true,
			});
		});

		it('honors controlled `isOpen` without a callback', () => {
			const { container } = renderSection({ isOpen: true });

			toggle(container);

			expect(section(container)).toHaveClass('slds-is-open');
		});
	});
});
