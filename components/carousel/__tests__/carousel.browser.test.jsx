import { render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import IconSettings from '../../icon-settings';
import Carousel from '../index';

const makeItems = (length) =>
	Array.from({ length }, (_, i) => ({
		id: `item-${i + 1}`,
		heading: `Carousel Item ${i + 1}`,
		description: `Description for carousel item #${i + 1}`,
		imageAssistiveText: `Item ${i + 1}`,
		src: '/assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	}));

// These tests let React's real scheduler run, because wrapping the steps in `act()`
// queues the autoplay step and the translation into one flush and hides the ordering bug
// they exist to catch. Tell React this file is not an act environment so the resulting
// state updates don't log "not wrapped in act" warnings.
let previousActEnvironment;
beforeAll(() => {
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
});

// Long enough that autoplay only steps when a test finishes the dwell
const AUTOPLAY_INTERVAL = 60000;
const WRAPPER_WIDTH = 400;

const getTranslateX = (container) => {
	const panels = container.querySelector('.slds-carousel__panels');
	const match = /translateX\((-?[\d.]+)px\)/.exec(panels.style.transform);
	return match ? Number(match[1]) : NaN;
};

const renderAutoplayCarousel = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ width: `${WRAPPER_WIDTH}px` }}>
				<Carousel
					id="test-carousel"
					hasAutoplay
					isAutoplayOn
					isInfinite
					autoplayInterval={AUTOPLAY_INTERVAL}
					{...props}
				/>
			</div>
		</IconSettings>
	);

// Autoplay times each panel with a keyframe-less animation on the stage
const getDwell = (container) =>
	container
		.querySelector('.slds-carousel__stage')
		.getAnimations()
		.find(
			(animation) => animation.effect.getTiming().duration === AUTOPLAY_INTERVAL
		);

// Ends the current dwell and waits for the next one, which starts only after React
// commits the step. No wall clock is involved, so a slow runner can't skip or add a step.
const tick = async (container) => {
	const dwell = getDwell(container);
	dwell.finish();
	// A finished animation drops out of `getAnimations()`, so wait for a new one.
	await expect
		.poll(() => {
			const next = getDwell(container);
			return next !== undefined && next !== dwell;
		})
		.toBe(true);
};

// Steps autoplay `ticks` times and records `read()` before the first step and after each.
const collectAtTicks = async (container, ticks, read) => {
	const seen = [read()];
	for (let i = 1; i <= ticks; i += 1) {
		// eslint-disable-next-line no-await-in-loop
		await tick(container);
		seen.push(read());
	}
	return seen;
};

const collectTranslations = (container, ticks) =>
	collectAtTicks(container, ticks, () => getTranslateX(container));

// `n * width + 0` normalizes -0 to 0, which toEqual would otherwise distinguish.
const toTranslations = (panelIndexes, stageWidth) =>
	panelIndexes.map((n) => -n * stageWidth + 0);

// Browser-mode counterpart of the autoplay tests in carousel.test.jsx. jsdom
// reports `offsetWidth` as 0, so every translation computes to 0 there and a
// stale `translateX` can't be observed. In real Chromium the stage has a real
// width, so we can assert the panels strip actually moves on each tick.
describe('SLDS Carousel autoplay translation (browser)', () => {
	describe('one item per panel', () => {
		const items = makeItems(4);
		const render1 = () => renderAutoplayCarousel({ items, itemsPerPanel: 1 });

		it('translates the panels by one stage width at each autoplay interval', async () => {
			const { container } = render1();

			const stage = container.querySelector('.slds-carousel__stage');
			expect(stage.offsetWidth).toBe(WRAPPER_WIDTH);
			expect(getTranslateX(container)).toBe(0);

			// One stage width further left per tick, then back to the start
			// (isInfinite: true).
			expect(await collectTranslations(container, items.length)).toEqual(
				toTranslations([0, 1, 2, 3, 0], WRAPPER_WIDTH)
			);
		});

		it('keeps translating correctly through two full loops', async () => {
			const { container } = render1();

			// Two loops, plus the tick that lands back on the first panel again.
			expect(await collectTranslations(container, items.length * 2)).toEqual(
				toTranslations([0, 1, 2, 3, 0, 1, 2, 3, 0], WRAPPER_WIDTH)
			);
		});
	});

	// Mirrors the ThreeItemsPerPanel story's props: three per panel with
	// previous/next navigation (which narrows the stage by 88px). The story only
	// has two panels, which is too few to show the strip drifting from the active
	// panel, so this uses twelve items for four panels. The story doesn't
	// autoplay, so these turn autoplay and looping on to observe the transform
	// moving on a timer.
	describe('three items per panel', () => {
		const items = makeItems(12);
		const render3 = () =>
			renderAutoplayCarousel({
				items,
				itemsPerPanel: 3,
				hasPreviousNextPanelNavigation: true,
			});

		it('translates by one stage width (three items) per autoplay interval', async () => {
			const { container } = render3();

			const stage = container.querySelector('.slds-carousel__stage');
			const stageWidth = stage.offsetWidth;
			// Wrapper minus the 44px margin on each side for the navigation buttons.
			expect(stageWidth).toBe(WRAPPER_WIDTH - 88);
			expect(getTranslateX(container)).toBe(0);

			// A panel is three items wide, which is the stage width, not one item's.
			expect(await collectTranslations(container, 4)).toEqual(
				toTranslations([0, 1, 2, 3, 0], stageWidth)
			);
		});

		it('keeps translating correctly through two full loops', async () => {
			const { container } = render3();
			const stageWidth = container.querySelector(
				'.slds-carousel__stage'
			).offsetWidth;

			// Four panels, two loops: 8 ticks, ending back on the first panel.
			expect(await collectTranslations(container, 8)).toEqual(
				toTranslations([0, 1, 2, 3, 0, 1, 2, 3, 0], stageWidth)
			);
		});

		it('moves the focusable items to the active panel at each tick', async () => {
			const { container } = render3();
			// Items outside the active panel get tabindex -1.
			const focusableHeadings = () =>
				[
					...container.querySelectorAll(
						'.slds-carousel__panel-action[tabindex="0"] .slds-carousel__content-title'
					),
				].map((el) => el.textContent);

			expect(focusableHeadings()).toEqual([
				'Carousel Item 1',
				'Carousel Item 2',
				'Carousel Item 3',
			]);

			await tick(container);

			expect(focusableHeadings()).toEqual([
				'Carousel Item 4',
				'Carousel Item 5',
				'Carousel Item 6',
			]);
		});
	});

	describe('hover', () => {
		// Park the real pointer away from where the next test renders its carousel
		afterEach(async () => {
			const parking = document.createElement('div');
			parking.style.cssText =
				'position: fixed; left: 600px; top: 600px; width: 10px; height: 10px;';
			document.body.append(parking);
			await userEvent.hover(parking);
			parking.remove();
		});

		it('pauses the dwell while the pointer is over the carousel and resumes on leave', async () => {
			const { container } = renderAutoplayCarousel({
				items: makeItems(4),
				itemsPerPanel: 1,
			});
			const carousel = container.querySelector('.slds-carousel');

			expect(getDwell(container).playState).toBe('running');

			await userEvent.hover(carousel);
			expect(getDwell(container).playState).toBe('paused');

			await userEvent.unhover(carousel);
			expect(getDwell(container).playState).toBe('running');
		});

		it('starts the next dwell paused while the pointer stays over the carousel', async () => {
			const { container } = renderAutoplayCarousel({
				items: makeItems(4),
				itemsPerPanel: 1,
			});
			await userEvent.hover(container.querySelector('.slds-carousel'));

			await tick(container);

			expect(getTranslateX(container)).toBe(-WRAPPER_WIDTH);
			expect(getDwell(container).playState).toBe('paused');
		});

		it('pauses when the pointer moves over a carousel it was already over', async () => {
			const { container } = renderAutoplayCarousel({
				items: makeItems(4),
				itemsPerPanel: 1,
			});
			expect(getDwell(container).playState).toBe('running');

			// A carousel that mounts under the pointer gets `pointermove` but no `pointerenter`
			container
				.querySelector('.slds-carousel__stage')
				.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));

			await expect.poll(() => getDwell(container).playState).toBe('paused');
		});
	});

	describe('hidden tab', () => {
		const setHidden = (hidden) => {
			Object.defineProperty(document, 'hidden', {
				configurable: true,
				get: () => hidden,
			});
			document.dispatchEvent(new Event('visibilitychange'));
		};
		afterEach(() => {
			delete document.hidden;
		});

		it('pauses the dwell while the tab is hidden and resumes with the time it had left', async () => {
			const { container } = renderAutoplayCarousel({
				items: makeItems(4),
				itemsPerPanel: 1,
			});
			const dwell = getDwell(container);
			dwell.currentTime = 1000;

			setHidden(true);
			expect(dwell.playState).toBe('paused');
			expect(dwell.currentTime).toBe(1000);

			setHidden(false);
			expect(dwell.playState).toBe('running');
			expect(getTranslateX(container)).toBe(0);
		});

		it('starts the next dwell paused while the tab is hidden', async () => {
			const { container } = renderAutoplayCarousel({
				items: makeItems(4),
				itemsPerPanel: 1,
			});
			setHidden(true);

			await tick(container);

			expect(getTranslateX(container)).toBe(-WRAPPER_WIDTH);
			expect(getDwell(container).playState).toBe('paused');
		});
	});
});

// Manual navigation shares the translation with autoplay: the strip must land on the
// requested panel after each click, not lag a click behind.
describe.each([
	{ label: 'one item per panel', itemCount: 4, itemsPerPanel: 1 },
	{ label: 'three items per panel', itemCount: 12, itemsPerPanel: 3 },
])(
	'SLDS Carousel manual navigation translation (browser), $label',
	({ itemCount, itemsPerPanel }) => {
		const renderNavigationCarousel = () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<div style={{ width: `${WRAPPER_WIDTH}px` }}>
						<Carousel
							id="test-carousel"
							hasPreviousNextPanelNavigation
							items={makeItems(itemCount)}
							itemsPerPanel={itemsPerPanel}
						/>
					</div>
				</IconSettings>
			);
			const [previousButton, nextButton] = container.querySelectorAll(
				'.slds-is-absolute button'
			);
			return {
				container,
				previousButton,
				nextButton,
				stageWidth: container.querySelector('.slds-carousel__stage')
					.offsetWidth,
			};
		};

		it('moves to the next panel on each next button click', async () => {
			const { container, nextButton, stageWidth } = renderNavigationCarousel();

			for (let panel = 1; panel <= 3; panel += 1) {
				// eslint-disable-next-line no-await-in-loop
				await userEvent.click(nextButton);
				// eslint-disable-next-line no-await-in-loop
				await expect
					.poll(() => getTranslateX(container))
					.toBe(-panel * stageWidth);
			}
		});

		it('moves back on each previous button click', async () => {
			const { container, previousButton, nextButton, stageWidth } =
				renderNavigationCarousel();

			await userEvent.click(nextButton);
			await userEvent.click(nextButton);
			await expect.poll(() => getTranslateX(container)).toBe(-2 * stageWidth);

			await userEvent.click(previousButton);
			await expect.poll(() => getTranslateX(container)).toBe(-stageWidth);

			await userEvent.click(previousButton);
			await expect.poll(() => getTranslateX(container)).toBe(0);
		});

		it('moves to the panel of the indicator that was clicked', async () => {
			const { container, stageWidth } = renderNavigationCarousel();

			await userEvent.click(
				container.querySelector('#indicator-id-test-carousel-2')
			);
			await expect.poll(() => getTranslateX(container)).toBe(-2 * stageWidth);

			await userEvent.click(
				container.querySelector('#indicator-id-test-carousel-1')
			);
			await expect.poll(() => getTranslateX(container)).toBe(-stageWidth);
		});

		it('moves to the next panel on the right arrow key', async () => {
			const { container, nextButton, stageWidth } = renderNavigationCarousel();

			nextButton.focus();
			await userEvent.keyboard('{ArrowRight}');
			await expect.poll(() => getTranslateX(container)).toBe(-stageWidth);

			await userEvent.keyboard('{ArrowRight}');
			await expect.poll(() => getTranslateX(container)).toBe(-2 * stageWidth);
		});
	}
);
