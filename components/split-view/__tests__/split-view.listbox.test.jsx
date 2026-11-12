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
				<SplitViewListbox selection={[]} {...props} />
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
				selection: [listOptions[1].id],
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

	describe('List item content', () => {
		it('titles each text span with its own text', () => {
			const { getAllByText } = renderListbox({
				options: listOptions,
				events: {
					onSelect: vi.fn(),
				},
			});

			const bottomLeft = getAllByText(listOptions[0].bottomLeftText)[0];
			const bottomRight = getAllByText(listOptions[0].bottomRightText)[0];
			expect(bottomLeft).toHaveAttribute(
				'title',
				listOptions[0].bottomLeftText
			);
			expect(bottomRight).toHaveAttribute(
				'title',
				listOptions[0].bottomRightText
			);
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
						onSelect: (event, { selection }) => {
							currentSelection = selection;
							rerender(
								<IconSettings iconPath="/assets/icons">
									<SplitViewListbox
										options={listOptions}
										selection={currentSelection}
										events={{
											onSelect: (event, { selection }) => {
												currentSelection = selection;
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
					currentSelection = [listOptions[1].id];

					const rendered = renderListbox({
						options: listOptions,
						selection: currentSelection,
						events: {
							onSelect: (event, { selection }) => {
								currentSelection = selection;
								rerender(
									<IconSettings iconPath="/assets/icons">
										<SplitViewListbox
											options={listOptions}
											selection={currentSelection}
											events={{
												onSelect: (event, { selection }) => {
													currentSelection = selection;
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
								onSelect: (event, { selection: nextSelection }) => {
									setSelection(nextSelection);
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

	describe('renderListItem', () => {
		it('is called with { isFocused, isSelected, isUnread, item } and renders inside each option', () => {
			const renderListItem = vi.fn(({ item }) => (
				<span className="custom-item">{item.label}</span>
			));
			const { container } = renderListbox({
				options: listOptions,
				selection: [listOptions[1].id],
				unread: [listOptions[2].id],
				events: { onSelect: vi.fn() },
				renderListItem,
			});

			const anchors = container.querySelectorAll('li > a');
			expect(anchors).toHaveLength(listOptions.length);
			expect(anchors[0].querySelector('.custom-item')).toHaveTextContent(
				listOptions[0].label
			);
			// The unread indicator still wraps the custom content
			expect(
				anchors[2].querySelector('.slds-indicator_unread')
			).toBeInTheDocument();
			expect(renderListItem).toHaveBeenCalledWith({
				isFocused: true,
				isSelected: true,
				isUnread: false,
				item: listOptions[1],
			});
			expect(renderListItem).toHaveBeenCalledWith({
				isFocused: false,
				isSelected: false,
				isUnread: true,
				item: listOptions[2],
			});
		});

		it('still renders the deprecated listItem component and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const LegacyItem = ({ item }) => (
				<span className="legacy-item">{item.label}</span>
			);
			const { container } = renderListbox({
				options: listOptions,
				events: { onSelect: vi.fn() },
				listItem: LegacyItem,
			});

			expect(container.querySelectorAll('.legacy-item')).toHaveLength(
				listOptions.length
			);
			expect(
				consoleError.mock.calls.some((args) => {
					const message = args.join(' ');
					return (
						message.includes('`listItem`') &&
						message.includes('`renderListItem`')
					);
				})
			).toBe(true);
			consoleError.mockRestore();
		});

		it('prefers renderListItem over listItem', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = renderListbox({
				options: listOptions,
				events: { onSelect: vi.fn() },
				listItem: () => <span className="legacy-item" />,
				renderListItem: () => <span className="custom-item" />,
			});

			expect(container.querySelectorAll('.custom-item')).toHaveLength(
				listOptions.length
			);
			expect(container.querySelectorAll('.legacy-item')).toHaveLength(0);
			consoleError.mockRestore();
		});
	});

	describe('Control model', () => {
		const getAnchors = (container) => container.querySelectorAll('li > a');

		it('reports the requested selection as ids and does not change it until the parent does', () => {
			const onSelect = vi.fn();
			const { container, rerender } = renderListbox({
				options: listOptions,
				selection: [listOptions[1].id],
				events: { onSelect },
			});

			fireEvent.click(getAnchors(container)[2]);

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'click' }),
				{
					selection: ['option3'],
					selectedItems: [listOptions[2]],
					item: listOptions[2],
				}
			);
			// Controlled: still renders the passed selection
			expectItemSelected(container, 1);

			rerender(
				<IconSettings iconPath="/assets/icons">
					<SplitViewListbox
						options={listOptions}
						selection={['option3']}
						events={{ onSelect }}
					/>
				</IconSettings>
			);
			expectItemSelected(container, 2);
		});

		it('reports meta-click toggles as ids', () => {
			const onSelect = vi.fn();
			const { container } = renderListbox({
				multiple: true,
				options: listOptions,
				selection: ['option2', 'option4'],
				events: { onSelect },
			});

			fireEvent.click(getAnchors(container)[3], { metaKey: true });
			expect(onSelect.mock.lastCall[1].selection).toEqual(['option2']);

			fireEvent.click(getAnchors(container)[0], { metaKey: true });
			expect(onSelect.mock.lastCall[1].selection).toEqual([
				'option1',
				'option2',
				'option4',
			]);
		});

		it('starts a shift-click range at the first selected item when nothing was clicked yet', () => {
			const onSelect = vi.fn();
			const { container } = renderListbox({
				multiple: true,
				options: listOptions,
				selection: ['option2'],
				events: { onSelect },
			});

			fireEvent.click(getAnchors(container)[3], { shiftKey: true });

			expect(onSelect.mock.lastCall[1].selection).toEqual([
				'option2',
				'option3',
				'option4',
			]);
		});

		it('orders shift-click range indexes numerically', () => {
			const manyOptions = Array.from({ length: 12 }, (_, index) => ({
				id: `item${index}`,
				label: `Item ${index}`,
			}));
			const onSelect = vi.fn();
			const { container } = renderListbox({
				multiple: true,
				options: manyOptions,
				events: { onSelect },
			});

			const anchors = getAnchors(container);
			fireEvent.click(anchors[9]);
			fireEvent.click(anchors[11], { shiftKey: true });

			expect(onSelect.mock.lastCall[1].selection).toEqual([
				'item9',
				'item10',
				'item11',
			]);
		});

		it('deselects all on ctrl+a when every option is selected', () => {
			const onSelect = vi.fn();
			const { container } = renderListbox({
				multiple: true,
				options: listOptions,
				// Not the `options` array itself
				selection: listOptions.map((item) => item.id),
				events: { onSelect },
			});

			fireEvent.keyDown(container.querySelector('ul'), {
				key: 'a',
				ctrlKey: true,
			});

			expect(onSelect).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'keydown' }),
				{ selection: [], selectedItems: [], item: null }
			);
		});

		it('does not warn when selection and unread are ids', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			renderListbox({
				options: listOptions,
				selection: ['option2'],
				unread: ['option3'],
				events: { onSelect: vi.fn() },
			});

			expect(
				consoleError.mock.calls.some((args) =>
					args.join(' ').includes('will be removed')
				)
			).toBe(false);
			consoleError.mockRestore();
		});

		describe('deprecated item objects in selection and unread', () => {
			// Warnings are emitted once per module lifetime, so use a fresh module
			const importFreshListbox = async () => {
				vi.resetModules();
				const { default: FreshListbox } = await import('../listbox');
				return FreshListbox;
			};

			it('matches objects by id and warns once', async () => {
				const FreshListbox = await importFreshListbox();
				const consoleError = vi
					.spyOn(console, 'error')
					.mockImplementation(() => {});
				const onSelect = vi.fn();
				// Copies: matched by id, not identity
				const { container, rerender } = render(
					<FreshListbox
						options={listOptions}
						selection={[{ ...listOptions[1] }]}
						unread={[{ ...listOptions[2] }]}
						events={{ onSelect }}
					/>
				);

				expectItemSelected(container, 1);
				const listItems = container.querySelectorAll('li');
				expect(listItems[2].className).toContain('slds-is-unread');
				expect(listItems[1].className).not.toContain('slds-is-unread');

				fireEvent.click(getAnchors(container)[3]);
				expect(onSelect.mock.lastCall[1]).toEqual({
					selection: ['option4'],
					selectedItems: [listOptions[3]],
					item: listOptions[3],
				});

				rerender(
					<FreshListbox
						options={listOptions}
						selection={[listOptions[3]]}
						unread={[listOptions[2]]}
						events={{ onSelect }}
					/>
				);
				expectItemSelected(container, 3);

				const messages = consoleError.mock.calls.map((args) => args.join(' '));
				expect(
					messages.filter((m) => m.includes('`selection={[item]}`'))
				).toHaveLength(1);
				expect(
					messages.filter((m) => m.includes('`unread={[item]}`'))
				).toHaveLength(1);
				consoleError.mockRestore();
			});

			it('matches objects by identity when items have no id', async () => {
				const FreshListbox = await importFreshListbox();
				const consoleError = vi
					.spyOn(console, 'error')
					.mockImplementation(() => {});
				const optionsWithoutIds = listOptions.map(
					({ id: _id, ...item }) => item
				);
				const onSelect = vi.fn();
				const { container } = render(
					<FreshListbox
						multiple
						options={optionsWithoutIds}
						selection={[optionsWithoutIds[1]]}
						unread={[optionsWithoutIds[0]]}
						events={{ onSelect }}
					/>
				);

				expectItemSelected(container, 1);
				expect(container.querySelectorAll('li')[0].className).toContain(
					'slds-is-unread'
				);

				fireEvent.click(getAnchors(container)[3], { metaKey: true });
				expect(onSelect.mock.lastCall[1].selectedItems).toEqual([
					optionsWithoutIds[3],
					optionsWithoutIds[1],
				]);
				consoleError.mockRestore();
			});
		});
	});
});
