import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import IconSettings from '../../icon-settings';
import SplitViewListbox from '../listbox';

const listOptions = [
	{
		id: 'option1',
		label: 'Riley Shultz',
		topRightText: '99',
		bottomLeftText: 'Biotech, Inc.',
		bottomRightText: 'Nurturing',
	},
	{
		id: 'option2',
		label: 'Jason A. - VP of Sales',
		topRightText: '92',
		bottomLeftText: 'Case Management Solutions',
		bottomRightText: 'Contacted',
	},
	{
		id: 'option3',
		label: 'Josh Smith',
		topRightText: '90',
		bottomLeftText: 'Acme, Inc.',
		bottomRightText: 'Contacted',
	},
	{
		id: 'option4',
		label: 'Bobby Tree',
		topRightText: '89',
		bottomLeftText: 'Salesforce, Inc.',
		bottomRightText: 'Closing',
	},
];

describe('SLDSSplitView - Listbox', () => {
	const renderListbox = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<SplitViewListbox {...props} />
			</IconSettings>
		);
	};

	const expectItemFocused = (container, value) => {
		const anchors = container.querySelectorAll('li > a');

		listOptions.forEach((item, index) => {
			const anchor = anchors[index];
			expect(anchor.tabIndex).toBe(index === value ? 0 : -1);
		});
	};

	const expectItemSelected = (container, value) => {
		const itemIndex = Array.isArray(value) ? value : [value];
		const anchors = container.querySelectorAll('li > a');

		listOptions.forEach((item, index) => {
			const isSelected = itemIndex.includes(index);
			expect(anchors[index].getAttribute('aria-selected')).toBe(
				isSelected ? 'true' : 'false'
			);
		});
	};

	describe('When the component is mounted', () => {
		it('should focus the first selected item', () => {
			const { container } = renderListbox({
				options: listOptions,
				selection: [listOptions[1]],
				events: {
					onSelect: vi.fn(),
				},
			});

			expectItemFocused(container, 1);
		});

		it('should focus the first item when there is no selection', () => {
			const { container } = renderListbox({
				options: listOptions,
				events: {
					onSelect: vi.fn(),
				},
			});

			expectItemFocused(container, 0);
		});
	});

	describe('When a list item is selected', () => {
		describe('and single select only', () => {
			it('should focus the item that is clicked', () => {
				const { container, rerender } = renderListbox({
					options: listOptions,
					events: {
						onSelect: () => {},
					},
				});

				const anchors = container.querySelectorAll('li > a');
				fireEvent.click(anchors[2]);

				expectItemFocused(container, 2);
			});

			it('should select the item that is clicked', () => {
				let currentSelection = [];

				const { container, rerender } = renderListbox({
					options: listOptions,
					selection: currentSelection,
					events: {
						onSelect: (event, { selectedItems }) => {
							currentSelection = selectedItems;
							rerender(
								<IconSettings iconPath="/assets/icons">
									<SplitViewListbox
										options={listOptions}
										selection={currentSelection}
										events={{
											onSelect: (event, { selectedItems }) => {
												currentSelection = selectedItems;
											},
										}}
									/>
								</IconSettings>
							);
						},
					},
				});

				const anchors = container.querySelectorAll('li > a');
				fireEvent.click(anchors[2]);

				expectItemSelected(container, 2);
			});

			describe('and using the keyboard', () => {
				let currentSelection;
				let container;
				let rerender;

				beforeEach(() => {
					currentSelection = [listOptions[1]];

					const rendered = renderListbox({
						options: listOptions,
						selection: currentSelection,
						events: {
							onSelect: (event, { selectedItems }) => {
								currentSelection = selectedItems;
								rerender(
									<IconSettings iconPath="/assets/icons">
										<SplitViewListbox
											options={listOptions}
											selection={currentSelection}
											events={{
												onSelect: (event, { selectedItems }) => {
													currentSelection = selectedItems;
												},
											}}
										/>
									</IconSettings>
								);
							},
						},
					});

					container = rendered.container;
					rerender = rendered.rerender;
				});

				describe('and "ctrl a" keyed', () => {
					it('should not select all list items', () => {
						const ul = container.querySelector('ul');
						fireEvent.keyDown(ul, { key: 'a', ctrlKey: true });

						expectItemSelected(container, [1]);
					});
				});

				it('and arrow key up it should focus the previous item', () => {
					const ul = container.querySelector('ul');
					fireEvent.keyDown(ul, { key: 'ArrowUp' });
					expectItemFocused(container, 0);
				});

				it('and arrow key down it should focus the next item', () => {
					const ul = container.querySelector('ul');
					fireEvent.keyDown(ul, { key: 'ArrowDown' });
					expectItemFocused(container, 2);
				});

				it('and arrow key up followed by click/enter should select the previous item', () => {
					const ul = container.querySelector('ul');
					fireEvent.keyDown(ul, { key: 'ArrowUp' });

					const anchors = container.querySelectorAll('ul li a');
					fireEvent.click(anchors[0]);
					expectItemSelected(container, 0);
				});

				it('and arrow key down followed by click/enter should select the next item', () => {
					const ul = container.querySelector('ul');
					fireEvent.keyDown(ul, { key: 'ArrowDown' });

					const anchors = container.querySelectorAll('ul li a');
					fireEvent.click(anchors[2]);
					expectItemSelected(container, 2);
				});
			});
		});

		describe('and multiple select enabled', () => {
			let container;

			// A controlled wrapper that actually re-renders on every selection change.
			// (The prior harness re-rendered once with a no-op onSelect, so the second
			// interaction's state change never reached the DOM — which is why these
			// were skipped, not any jsdom limitation.)
			const ControlledListbox = ({ initialSelection = [] }) => {
				const [selection, setSelection] = React.useState(initialSelection);
				return (
					<IconSettings iconPath="/assets/icons">
						<SplitViewListbox
							multiple
							options={listOptions}
							selection={selection}
							events={{
								onSelect: (event, { selectedItems }) => {
									setSelection(selectedItems);
								},
							}}
						/>
					</IconSettings>
				);
			};

			beforeEach(() => {
				const rendered = render(<ControlledListbox />);
				container = rendered.container;
			});

			it('should select multiple items when clicked and the metaKey is pressed', () => {
				const anchors = container.querySelectorAll('li > a');

				fireEvent.click(anchors[2]);
				fireEvent.click(anchors[3], { metaKey: true });

				expectItemSelected(container, [2, 3]);
			});

			it('should select multiple items when clicked and the shiftKey is pressed', () => {
				const anchors = container.querySelectorAll('li > a');

				fireEvent.click(anchors[1]);
				fireEvent.click(anchors[3], { shiftKey: true });

				expectItemSelected(container, [1, 2, 3]);
			});

			describe('and "ctrl a" keyed', () => {
				it('should select all list items', () => {
					const ul = container.querySelector('ul');
					fireEvent.keyDown(ul, { key: 'a', ctrlKey: true });

					expectItemSelected(container, [0, 1, 2, 3]);
				});

				it('should de-select all list items when all the list items are already selected', () => {
					const ul = container.querySelector('ul');

					// First ctrl+a selects all...
					fireEvent.keyDown(ul, { key: 'a', ctrlKey: true });
					expectItemSelected(container, [0, 1, 2, 3]);

					// ...second ctrl+a deselects all.
					fireEvent.keyDown(ul, { key: 'a', ctrlKey: true });
					expectItemSelected(container, []);
				});
			});
		});
	});
});
