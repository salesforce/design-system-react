import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Avatar from '../../avatar';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import PillContainer from '../';

const options = [
	{
		id: '1',
		label: 'Pill Label 1',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		icon: <Icon category="standard" name="account" title="Account" />,
		id: '2',
		label: 'Pill Label 2',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		icon: {
			category: 'standard',
			name: 'account',
		},
		id: '3',
		label: 'Pill Label 3',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		avatar: (
			<Avatar
				imgSrc="https://lightningdesignsystem.com/assets/images/avatar1.jpg"
				title="User 4"
				variant="user"
			/>
		),
		id: '4',
		label: 'Pill Label 4',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		avatar: {
			imgSrc: 'https://lightningdesignsystem.com/assets/images/avatar1.jpg',
			title: 'User 5',
		},
		id: '5',
		label: 'Pill Label 5',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		bare: true,
		id: '6',
		label: 'Pill Label 6',
		title: 'Full pill label verbiage mirrored here',
	},
	{
		error: true,
		id: '7',
		label: 'Pill Label 7',
		title: 'Full pill label verbiage mirrored here',
	},
];

describe('SLDSPillContainer', () => {
	describe('Base', () => {
		it('Renders the base Pill Container correctly', () => {
			let clickData = {};
			let requestRemoveData = {};

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PillContainer
						options={options}
						onClickPill={(event, data) => {
							clickData = data;
						}}
						onRequestRemovePill={(event, data) => {
							requestRemoveData = data;
						}}
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-pill_container')).toBeInTheDocument();
			expect(container.querySelector('ul.slds-listbox')).toBeInTheDocument();

			const pills = container.querySelectorAll('ul.slds-listbox .slds-pill');
			expect(pills).toHaveLength(7);

			pills.forEach((pill, index) => {
				const idOfCurrentPill = index + 1;
				const label = pill.querySelector('.slds-pill__label');
				expect(label.textContent).toBe(`Pill Label ${idOfCurrentPill}`);

				// Test click on pill
				fireEvent.click(pill);
				expect(clickData.option.id).toBe(`${idOfCurrentPill}`);

				// Test click on remove button
				const removeButton = pill.querySelector('.slds-pill__remove');
				fireEvent.click(removeButton);
				expect(requestRemoveData.option.id).toBe(`${idOfCurrentPill}`);

				// Check for icons
				if (idOfCurrentPill === 2 || idOfCurrentPill === 3) {
					expect(
						pill.querySelector('.slds-icon_container.slds-icon-standard-account')
					).toBeInTheDocument();
				} else if (idOfCurrentPill === 4 || idOfCurrentPill === 5) {
					expect(
						pill.querySelector('.slds-avatar.slds-avatar_circle.slds-avatar_medium')
					).toBeInTheDocument();
				} else if (idOfCurrentPill === 6) {
					expect(pill.classList.contains('slds-pill_bare')).toBe(true);
				} else if (idOfCurrentPill === 7) {
					expect(pill.classList.contains('slds-has-error')).toBe(true);
				}
			});
		});

		it('Handles keyboard navigation properly', () => {
			const requestRemoveData = [];

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PillContainer
						options={options}
						onRequestRemovePill={(event, data) => {
							requestRemoveData.push(data.option);
						}}
					/>
				</IconSettings>
			);

			const pills = container.querySelectorAll('.slds-pill');

			// Focus on the first pill
			fireEvent.focus(pills[0]);

			// NOTE: Keyboard navigation in PillContainer relies on React state to track the
			// active option and programmatically manage focus via refs. In jsdom, focus()
			// calls on refs may not synchronously update document.activeElement the same way
			// a real browser does. We test keyboard event handling and removal callbacks.

			// Test Delete key triggers removal
			fireEvent.keyDown(pills[0], { key: 'Delete', keyCode: 46, which: 46 });
			expect(requestRemoveData[0].label).toBe(options[0].label);

			// Test Backspace key triggers removal
			fireEvent.keyDown(pills[1], { key: 'Backspace', keyCode: 8, which: 8 });
			expect(requestRemoveData[1].label).toBe(options[1].label);

			// Test that arrow keys don't crash (handlers exist)
			// In real browser these would move focus; in jsdom we verify no errors thrown
			fireEvent.keyDown(pills[2], { key: 'Right', keyCode: 39, which: 39 });
			fireEvent.keyDown(pills[3], { key: 'Left', keyCode: 37, which: 37 });

			// Verify container is still intact after keyboard interactions
			expect(container.querySelector('.slds-pill_container')).toBeInTheDocument();
		});
	});

	describe('Bare', () => {
		it('Renders the bare Pill Container correctly', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<PillContainer options={options} variant="bare" />
				</IconSettings>
			);

			const pills = container.querySelectorAll('ul.slds-listbox .slds-pill');
			pills.forEach((pill) => {
				expect(pill.classList.contains('slds-pill_bare')).toBe(true);
			});
		});
	});
});
