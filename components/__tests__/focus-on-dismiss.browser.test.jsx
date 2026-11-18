import { useState } from 'react';
import { render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import Button from '../button';
import ButtonStateful from '../button-stateful';
import Combobox from '../combobox';
import DatePicker from '../date-picker';
import DockedComposer from '../docked-composer';
import IconSettings from '../icon-settings';
import MenuDropdown from '../menu-dropdown';
import Modal from '../modal';
import Popover from '../popover';
import Settings from '../settings';

// Dismissing an overlay must never drop focus to <body>: the next Tab would
// start over from the top of the page, and a screen reader loses its place.
// Where a component documents where focus goes on close (back to its trigger
// or input), check that too. Real focus needs a real browser.

// Dialog positioning and react-modal set state outside act(); this is not an
// act environment, like the other browser tests that open overlays.
let previousActEnvironment;
let appNode;
beforeAll(() => {
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
	appNode = document.createElement('div');
	appNode.id = 'focus-on-dismiss-app';
	document.body.appendChild(appNode);
	Settings.setAppElement(appNode);
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
	appNode.remove();
});

const renderInApp = (ui) =>
	render(
		<IconSettings iconPath="/assets/icons">
			{/* Before the component, so an overlay opening below it can't cover it */}
			<button type="button">Outside</button>
			<div className="slds-p-around_medium">{ui}</div>
		</IconSettings>,
		{ container: appNode.appendChild(document.createElement('div')) }
	);

const outsideButton = () =>
	[...appNode.querySelectorAll('button')].find(
		(button) => button.textContent === 'Outside'
	);

// Lets effects, timers and Floating UI positioning settle.
const settle = () =>
	new Promise((resolve) => {
		requestAnimationFrame(() => setTimeout(resolve, 0));
	});

const expectFocusNotOnBody = () => {
	expect(document.activeElement).not.toBe(document.body);
	expect(document.activeElement).not.toBe(null);
};

// A click outside moves focus to whatever was clicked; the overlay must not
// pull it back, and must not drop it.
const expectFocusOnOutside = () => {
	expectFocusNotOnBody();
	expect(document.activeElement).toBe(outsideButton());
};

describe('Dismissing never drops focus to <body> (browser)', () => {
	describe('Popover', () => {
		const renderPopover = () => {
			renderInApp(
				<Popover
					body={<p>Popover body</p>}
					heading="Heading"
					id="dismiss-popover"
				>
					<Button label="Open popover" />
				</Popover>
			);
			return [...appNode.querySelectorAll('button')].find(
				(button) => button.textContent === 'Open popover'
			);
		};
		const open = async (trigger) => {
			await userEvent.click(trigger);
			const dialog = document.getElementById('dismiss-popover-popover');
			await vi.waitFor(() => {
				expect(dialog.style.pointerEvents).not.toBe('none');
			});
			await settle();
			return dialog;
		};
		const expectClosed = () =>
			vi.waitFor(() => {
				expect(document.getElementById('dismiss-popover-popover')).toBeNull();
			});

		it('returns focus to the trigger on Escape', async () => {
			const trigger = renderPopover();
			await open(trigger);
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(trigger);
		});

		it('returns focus to the trigger from the close button', async () => {
			const trigger = renderPopover();
			const dialog = await open(trigger);
			await userEvent.click(dialog.querySelector('.slds-popover__close'));
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(trigger);
		});

		it('leaves focus on what a click outside focused', async () => {
			const trigger = renderPopover();
			await open(trigger);
			await userEvent.click(outsideButton());
			await expectClosed();
			await settle();
			expectFocusOnOutside();
		});
	});

	describe('MenuDropdown', () => {
		const renderMenu = () => {
			const { container } = renderInApp(
				<MenuDropdown
					id="dismiss-menu"
					label="Open menu"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{ label: 'Menu Item Two', value: 'B0' },
					]}
				/>
			);
			return container.querySelector('#dismiss-menu button');
		};
		const open = async (trigger) => {
			await userEvent.click(trigger);
			await vi.waitFor(() => {
				expect(
					document.querySelector('.slds-dropdown [role="menu"]')
				).toBeTruthy();
			});
			await settle();
		};
		const expectClosed = () =>
			vi.waitFor(() => {
				expect(
					document.querySelector('.slds-dropdown [role="menu"]')
				).toBeNull();
			});

		it('returns focus to the trigger on Escape', async () => {
			const trigger = renderMenu();
			await open(trigger);
			await userEvent.keyboard('{ArrowDown}');
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(trigger);
		});

		it('returns focus to the trigger when an option is selected', async () => {
			const trigger = renderMenu();
			await open(trigger);
			await userEvent.click(
				[...document.querySelectorAll('.slds-dropdown [role="menuitem"]')][1]
			);
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(trigger);
		});

		it('leaves focus on what a click outside focused', async () => {
			const trigger = renderMenu();
			await open(trigger);
			await userEvent.click(outsideButton());
			await expectClosed();
			await settle();
			expectFocusOnOutside();
		});
	});

	describe('Combobox', () => {
		const options = [
			{ id: '1', label: 'Acme' },
			{ id: '2', label: 'Salesforce.com, Inc.' },
		];
		const ReadOnlyCombobox = () => {
			const [selection, setSelection] = useState([]);
			return (
				<Combobox
					id="dismiss-combobox"
					events={{
						onSelect: (event, data) => setSelection(data.selection),
					}}
					labels={{ label: 'Account', placeholder: 'Select an account' }}
					options={options}
					selection={selection}
					variant="readonly"
				/>
			);
		};
		const renderCombobox = () => {
			renderInApp(<ReadOnlyCombobox />);
			return document.getElementById('dismiss-combobox');
		};
		const listbox = () => document.querySelector('#dismiss-combobox-listbox');
		const open = async (input) => {
			await userEvent.click(input);
			await vi.waitFor(() => {
				expect(listbox()).toBeTruthy();
			});
			await settle();
		};
		const expectClosed = () =>
			vi.waitFor(() => {
				expect(input().getAttribute('aria-expanded')).toBe('false');
			});
		const input = () => document.getElementById('dismiss-combobox');

		it('keeps focus on the input on Escape', async () => {
			await open(renderCombobox());
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(input());
		});

		it('keeps focus on the input when an option is selected', async () => {
			await open(renderCombobox());
			await userEvent.click(listbox().querySelectorAll('[role="option"]')[1]);
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(input());
		});

		it('leaves focus on what a click outside focused', async () => {
			await open(renderCombobox());
			await userEvent.click(outsideButton());
			await expectClosed();
			await settle();
			expectFocusOnOutside();
		});
	});

	describe('DatePicker', () => {
		const renderDatePicker = () => {
			renderInApp(
				<DatePicker
					id="dismiss-date-picker"
					labels={{ label: 'Date' }}
					onChange={() => {}}
					value={null}
				/>
			);
			return document.getElementById('dismiss-date-picker');
		};
		const calendar = () => document.querySelector('.slds-datepicker');
		const openFromButton = async () => {
			await userEvent.click(
				appNode.querySelector('.slds-form-element button[aria-haspopup]')
			);
			await vi.waitFor(() => {
				expect(calendar()).toBeTruthy();
			});
			await settle();
		};
		const expectClosed = () =>
			vi.waitFor(() => {
				expect(calendar()).toBeNull();
			});

		it('returns focus to the input on Escape in the calendar', async () => {
			const input = renderDatePicker();
			await openFromButton();
			expect(calendar().contains(document.activeElement)).toBe(true);
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(input);
		});

		it('keeps focus on the input on Escape in the input', async () => {
			const input = renderDatePicker();
			await userEvent.click(input);
			await vi.waitFor(() => {
				expect(calendar()).toBeTruthy();
			});
			await settle();
			input.focus();
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(input);
		});

		it('returns focus to the input when a date is selected', async () => {
			const input = renderDatePicker();
			await openFromButton();
			await userEvent.click(
				calendar().querySelector('td[aria-selected] span.slds-day')
			);
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(input);
		});

		it('does not drop focus on a click outside', async () => {
			renderDatePicker();
			await openFromButton();
			await userEvent.click(outsideButton());
			await expectClosed();
			await settle();
			expectFocusNotOnBody();
		});
	});

	describe('Modal', () => {
		const ModalWithOpener = () => {
			const [isOpen, setIsOpen] = useState(false);
			return (
				<>
					<Button label="Open modal" onClick={() => setIsOpen(true)} />
					<Modal
						heading="Modal heading"
						isOpen={isOpen}
						onRequestClose={() => setIsOpen(false)}
					>
						<p className="slds-p-around_medium">Modal body</p>
					</Modal>
				</>
			);
		};
		const renderModal = () => {
			renderInApp(<ModalWithOpener />);
			return [...appNode.querySelectorAll('button')].find(
				(button) => button.textContent === 'Open modal'
			);
		};
		const open = async (opener) => {
			await userEvent.click(opener);
			await vi.waitFor(() => {
				const content = document.querySelector('.ReactModal__Content');
				expect(content?.contains(document.activeElement)).toBe(true);
			});
			await settle();
		};
		const expectClosed = () =>
			vi.waitFor(() => {
				expect(document.querySelector('.slds-modal')).toBeNull();
			});

		it('returns focus to the opener on Escape', async () => {
			const opener = renderModal();
			await open(opener);
			await userEvent.keyboard('{Escape}');
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(opener);
		});

		it('returns focus to the opener from the close button', async () => {
			const opener = renderModal();
			await open(opener);
			await userEvent.click(document.querySelector('.slds-modal__close'));
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(opener);
		});

		it('returns focus to the opener on a click outside', async () => {
			const opener = renderModal();
			await open(opener);
			// The backdrop area around the container is the `.slds-modal` section.
			await userEvent.click(document.querySelector('.slds-modal'), {
				position: { x: 5, y: 5 },
			});
			await expectClosed();
			await settle();
			expect(document.activeElement).toBe(opener);
		});
	});

	describe('DockedComposer', () => {
		const ComposerWithOpener = () => {
			const [isMounted, setIsMounted] = useState(false);
			return (
				<>
					<Button label="Open composer" onClick={() => setIsMounted(true)} />
					{isMounted ? (
						<DockedComposer
							body={<p>Composer body</p>}
							defaultIsOpen
							events={{ onRequestClose: () => setIsMounted(false) }}
							header="New message"
							id="dismiss-composer"
						/>
					) : null}
				</>
			);
		};
		const renderComposer = async () => {
			renderInApp(<ComposerWithOpener />);
			const opener = [...appNode.querySelectorAll('button')].find(
				(button) => button.textContent === 'Open composer'
			);
			await userEvent.click(opener);
			await vi.waitFor(() => {
				expect(document.activeElement).toBe(
					document.querySelector('.slds-docked-composer')
				);
			});
			return opener;
		};

		it('moves focus to the expand button when minimized', async () => {
			await renderComposer();
			await userEvent.click(
				document.getElementById('dismiss-composer-minimize-button')
			);
			await settle();
			expect(document.activeElement).toBe(
				document.getElementById('dismiss-composer-expand-button')
			);
		});

		it('moves focus to the minimize button when expanded again', async () => {
			await renderComposer();
			await userEvent.click(
				document.getElementById('dismiss-composer-minimize-button')
			);
			await settle();
			await userEvent.click(
				document.getElementById('dismiss-composer-expand-button')
			);
			await settle();
			expect(document.activeElement).toBe(
				document.getElementById('dismiss-composer-minimize-button')
			);
		});

		it('returns focus to the opener when closed', async () => {
			const opener = await renderComposer();
			await userEvent.click(
				document.getElementById('dismiss-composer-close-button')
			);
			await vi.waitFor(() => {
				expect(document.querySelector('.slds-docked-composer')).toBeNull();
			});
			await settle();
			expect(document.activeElement).toBe(opener);
		});
	});

	describe('ButtonStateful', () => {
		const StatefulButton = () => {
			const [isActive, setIsActive] = useState(false);
			return (
				<ButtonStateful
					isActive={isActive}
					onClick={(event, data) => setIsActive(data.isActive)}
				/>
			);
		};

		it.each([['selects'], ['deselects']])(
			'keeps focus on the button when a click %s it and the mouse leaves',
			async (action) => {
				const { container } = renderInApp(<StatefulButton />);
				const button = container.querySelector('.slds-button');
				await userEvent.click(button);
				if (action === 'deselects') {
					await userEvent.click(button);
				}
				await userEvent.unhover(button);
				await settle();
				expect(document.activeElement).toBe(button);
			}
		);

		it('keeps focus on the button when Space toggles it', async () => {
			const { container } = renderInApp(<StatefulButton />);
			const button = container.querySelector('.slds-button');
			button.focus();
			await userEvent.keyboard(' ');
			await settle();
			expect(button).toHaveClass('slds-is-selected');
			expect(document.activeElement).toBe(button);
		});
	});
});
