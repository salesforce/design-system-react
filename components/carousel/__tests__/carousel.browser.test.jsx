import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import IconSettings from '../../icon-settings';
import Carousel from '../index';

const items = Array.from({ length: 4 }, (_, i) => ({
	id: `item-${i + 1}`,
	heading: `Carousel Item ${i + 1}`,
	description: `Description for carousel item #${i + 1}`,
	imageAssistiveText: `Item ${i + 1}`,
	src: '/assets/images/carousel/carousel-01.jpg',
	href: 'https://www.salesforce.com',
}));

const AUTOPLAY_INTERVAL = 100;
const STAGE_WIDTH = 400;

// Browser-mode counterpart of the autoplay tests in carousel.test.jsx. jsdom
// reports `offsetWidth` as 0, so every translation computes to 0 there and a
// stale `translateX` can't be observed. In real Chromium the stage has a real
// width, so we can assert the panels strip actually moves on each tick.
describe('SLDS Carousel autoplay translation (browser)', () => {
	const getTranslateX = (container) => {
		const panels = container.querySelector('.slds-carousel__panels');
		const match = /translateX\((-?[\d.]+)px\)/.exec(panels.style.transform);
		return match ? Number(match[1]) : NaN;
	};

	const renderAutoplayCarousel = () =>
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: `${STAGE_WIDTH}px` }}>
					<Carousel
						id="test-carousel"
						hasAutoplay
						isAutoplayOn
						isInfinite
						autoplayInterval={AUTOPLAY_INTERVAL}
						items={items}
						itemsPerPanel={1}
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

	it('translates the panels by one stage width at each autoplay interval', async () => {
		const { container } = renderAutoplayCarousel();

		const stage = container.querySelector('.slds-carousel__stage');
		expect(stage.offsetWidth).toBe(STAGE_WIDTH);
		expect(getTranslateX(container)).toBe(0);

		// One stage width further left per tick, then back to the start
		// (isInfinite: true).
		expect(await collectTranslations(container, items.length)).toEqual(
			[0, -1, -2, -3, 0].map((n) => n * STAGE_WIDTH + 0)
		);
	});

	it('keeps translating correctly through two full loops', async () => {
		const { container } = renderAutoplayCarousel();

		const oneLoop = [0, -1, -2, -3].map((n) => n * STAGE_WIDTH + 0);

		// Two loops, plus the tick that lands back on the first panel again.
		expect(await collectTranslations(container, items.length * 2)).toEqual([
			...oneLoop,
			...oneLoop,
			0,
		]);
	});
});
