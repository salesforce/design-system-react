import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

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

const AUTOPLAY_INTERVAL = 100;
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

// Waits for each autoplay tick in real time and records the translation once the
// carousel has settled. Fake timers inside `act()` flush effects in a fixed order and
// hide a race between the interval and the translation effect, so real timers are used.
const collectTranslations = async (container, ticks) => {
	const seen = [getTranslateX(container)];
	const start = performance.now();
	for (let i = 1; i <= ticks; i += 1) {
		// Sample halfway between ticks.
		const wait = start + AUTOPLAY_INTERVAL * (i + 0.5) - performance.now();
		// eslint-disable-next-line no-await-in-loop
		await new Promise((resolve) => {
			setTimeout(resolve, Math.max(0, wait));
		});
		seen.push(getTranslateX(container));
	}
	return seen;
};

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

			await collectTranslations(container, 1);

			expect(focusableHeadings()).toEqual([
				'Carousel Item 4',
				'Carousel Item 5',
				'Carousel Item 6',
			]);
		});
	});
});
