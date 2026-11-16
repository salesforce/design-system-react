/*
 * Story-wide perf checks (plan D2, checks 1, 7, 9, 11, 13 and 14). Every
 * story is a fixture; see tests/perf/README.md for what each metric means.
 */
import React, { StrictMode, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { stories, isPortalError } from './stories';
import { resetIds } from './generate-id-mock';
import {
	checkBudget,
	renderCounted,
	settle,
	trackConsoleErrors,
	trackListeners,
	trackObservers,
	trackTimers,
} from './helpers';

vi.mock(
	'../../utilities/generate-id',
	async () => (await import('./generate-id-mock')).default
);

// Something that opens on click: a menu, combobox, popover or dialog trigger.
const TRIGGER =
	'[aria-haspopup]:not([aria-haspopup="false"]):not([disabled]), [aria-expanded="false"]:not([disabled])';

const bodyNodesOutside = (container: Element) =>
	Array.from(document.body.children)
		.filter((child) => child !== container && !child.contains(container))
		.reduce((sum, child) => sum + 1 + child.querySelectorAll('*').length, 0);

// Strip what legitimately differs between two renders: generated ids (and the
// attributes that point at them) and React's useId output.
const normalize = (html: string) =>
	html
		.replace(/slds-perf-id-\d+/g, 'ID')
		.replace(/_r_[0-9a-z]+_|«r[0-9a-z]+»|:r[0-9a-z]+:/g, 'RID');

beforeEach(() => {
	resetIds();
	document.body.innerHTML = '';
});

describe.each(stories.map((s) => [s.key, s] as const))(
	'%s',
	(key, { Story }) => {
		it('mount: commits and DOM size (checks 1, 7)', async () => {
			const result = renderCounted(<Story />);
			await settle();
			checkBudget(
				key,
				{
					commits: result.commitCount,
					domNodes: result.container.querySelectorAll('*').length,
					portalNodes: bodyNodesOutside(result.container),
				},
				{ commits: 1, portalNodes: 0 }
			);
			result.unmount();
		});

		it('cleanup on unmount and idle listeners (checks 9, 11)', async () => {
			const user = userEvent.setup({ delay: null });
			const listeners = trackListeners();
			const timers = trackTimers();
			const observers = trackObservers();
			const errors = trackConsoleErrors();
			const host = document.createElement('div');
			document.body.appendChild(host);
			const root = createRoot(host);
			let idleGlobalListeners: number;
			try {
				await act(async () => root.render(<Story />));
				await settle();
				idleGlobalListeners = listeners.global().length;

				const trigger = host.querySelector<HTMLElement>(TRIGGER);
				if (trigger) {
					await user.click(trigger);
					await settle();
				}

				act(() => root.unmount());
				host.remove();
				await settle();
			} finally {
				listeners.restore();
				timers.restore();
				observers.restore();
				errors.restore();
			}

			checkBudget(
				key,
				{
					idleGlobalListeners,
					nonPassiveScrollListeners: listeners.nonPassive.length,
					leakedListeners: listeners.leaked().length,
					pendingTimers: timers.pending,
					liveObservers: observers.live,
					leftoverBodyNodes: document.body.querySelectorAll('*').length,
					consoleErrors: errors.count,
				},
				{
					idleGlobalListeners: 0,
					nonPassiveScrollListeners: 0,
					leakedListeners: 0,
					pendingTimers: 0,
					liveObservers: 0,
					leftoverBodyNodes: 0,
					consoleErrors: 0,
				}
			);
		});

		it('concurrent-safe: StrictMode and startTransition (check 13)', async () => {
			const mount = async (node: React.ReactElement, transition: boolean) => {
				resetIds();
				const host = document.createElement('div');
				document.body.appendChild(host);
				const root = createRoot(host);
				await act(async () => {
					if (transition) startTransition(() => root.render(node));
					else root.render(node);
				});
				await settle();
				const html = normalize(document.body.innerHTML);
				act(() => root.unmount());
				host.remove();
				document.body.innerHTML = '';
				return html;
			};

			const plain = await mount(<Story />, false);
			const errors = trackConsoleErrors();
			let strict: string;
			try {
				strict = await mount(
					<StrictMode>
						<Story />
					</StrictMode>,
					true
				);
			} finally {
				errors.restore();
			}

			checkBudget(
				key,
				{
					strictModeErrors: errors.count,
					strictModeDomMismatch: strict === plain ? 0 : 1,
				},
				{ strictModeErrors: 0, strictModeDomMismatch: 0 }
			);
		});

		it('SSR cost (check 14)', () => {
			const errors = trackConsoleErrors();
			let markup: string | undefined;
			try {
				markup = renderToStaticMarkup(<Story />);
			} catch (error) {
				if (!isPortalError(error)) throw error;
			} finally {
				errors.restore();
			}
			// Portal-rendered stories can't be server-rendered (as in the snapshot
			// suite); their SSR cost isn't measured.
			if (markup === undefined) return;
			checkBudget(
				key,
				{
					ssrBytes: new TextEncoder().encode(markup).length,
					ssrErrors: errors.count,
				},
				{ ssrErrors: 0 }
			);
			expect(markup.length).toBeGreaterThan(0);
		});
	}
);
