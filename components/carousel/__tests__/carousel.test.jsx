import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import IconSettings from '../../icon-settings';
import Carousel from '../index';

import KEYS from '../../../utilities/key-code';

const items = [
	{
		id: 1,
		heading: 'Visit App Exchange',
		description: 'Extend Salesforce with the #1 business marketplace.',
		imageAssistiveText: 'Appy',
		src: '/assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 2,
		heading: 'Click to Customize',
		description:
			'Use the Object Manager to add fields, build layouts, and more.',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 3,
		heading: 'Download Salesforce Apps',
		description: "Get the mobile app that's just for Salesforce admins.",
		imageAssistiveText: 'Salesforce Apps',
		src: '/assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 4,
		heading: 'Carousel Item 4',
		description: 'Description for carousel item #4',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 5,
		heading: 'Carousel Item 5',
		description: 'Description for carousel item #5',
		imageAssistiveText: 'Appy',
		src: '/assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 6,
		heading: 'Carousel Item 6',
		description: 'Description for carousel item #6',
		imageAssistiveText: 'Salesforce Apps',
		src: '/assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 7,
		heading: 'Carousel Item 7',
		description: 'Description for carousel item #7',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
];

describe('SLDS Carousel', () => {
	const defaultCarouselProps = {
		hasAutoplay: true,
		hasPreviousNextPanelNavigation: true,
		id: 'test-carousel',
		isInfinite: true,
		items,
	};

	const renderCarousel = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Carousel {...defaultCarouselProps} {...props} />
			</IconSettings>
		);
	};

	describe('Carousel interactions - one item per panel', () => {
		let container;

		beforeEach(() => {
			const result = renderCarousel({
				itemsPerPanel: 1,
			});
			container = result.container;
		});

		it('renders carousel', () => {
			expect(container.querySelector('.slds-carousel')).toBeInTheDocument();
		});

		it('handles autoplay toggle correctly', () => {
			const autoplayButton = container.querySelector(
				'.slds-carousel__autoplay button'
			);
			expect(autoplayButton).toBeInTheDocument();

			// Initially should show pause icon (autoplay is on)
			expect(autoplayButton.innerHTML).toContain('#pause');

			// Click to stop autoplay
			fireEvent.click(autoplayButton);
			expect(autoplayButton.innerHTML).toContain('#play');

			// Click to start autoplay
			fireEvent.click(autoplayButton);
			expect(autoplayButton.innerHTML).toContain('#pause');
		});

		it('handles previous button presses correctly', () => {
			const previousButton = container.querySelectorAll(
				'.slds-is-absolute button.slds-button_icon-border-filled'
			)[0];

			// Click previous (should wrap to item 7)
			fireEvent.click(previousButton);
			let activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-7 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			let activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-6`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Click previous again (should go to item 6)
			fireEvent.click(previousButton);
			activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-6 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-5`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');
		});

		it('handles next button presses correctly', () => {
			const nextButton = container.querySelectorAll(
				'.slds-is-absolute button.slds-button_icon-border-filled'
			)[1];

			// Click next (should go to item 2)
			fireEvent.click(nextButton);
			let activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-2 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			let activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-1`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Click next again (should go to item 3)
			fireEvent.click(nextButton);
			activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-3 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-2`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');
		});

		it('handles keyboard navigation correctly', () => {
			const carousel = container.querySelector('.slds-carousel');

			// Navigate right (next item)
			fireEvent.keyDown(carousel, { keyCode: KEYS.RIGHT });
			let activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-2 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			let activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-1`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Navigate left (previous item)
			fireEvent.keyDown(carousel, { keyCode: KEYS.LEFT });
			activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-1 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-0`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');
		});

		it('handles indicator button presses correctly', () => {
			// Click indicator 2 (item 3)
			const indicator2 = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-2`
			);
			fireEvent.click(indicator2);
			let activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-3 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			expect(indicator2).toHaveAttribute('tabindex', '0');

			// Click indicator 6 (item 7)
			const indicator6 = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-6`
			);
			fireEvent.click(indicator6);
			activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-7 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');
			expect(indicator6).toHaveAttribute('tabindex', '0');
		});
	});

	describe('Carousel interactions - three items per panel', () => {
		let container;

		beforeEach(() => {
			const result = renderCarousel({
				itemsPerPanel: 3,
			});
			container = result.container;
		});

		it('handles previous button presses correctly', () => {
			const previousButton = container.querySelectorAll(
				'.slds-is-absolute button.slds-button_icon-border-filled'
			)[0];

			// Click previous (should wrap to item 7 visible)
			fireEvent.click(previousButton);
			let activeLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-7 a`
			);
			expect(activeLink).toHaveAttribute('tabindex', '0');

			// Click previous again (should show items 4, 5, 6)
			fireEvent.click(previousButton);
			const link6 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-6 a`
			);
			const link5 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-5 a`
			);
			const link4 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-4 a`
			);
			expect(link6).toHaveAttribute('tabindex', '0');
			expect(link5).toHaveAttribute('tabindex', '0');
			expect(link4).toHaveAttribute('tabindex', '0');

			// Click previous again (should show items 1, 2, 3)
			fireEvent.click(previousButton);
			const link3 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-3 a`
			);
			const link2 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-2 a`
			);
			const link1 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-1 a`
			);
			expect(link3).toHaveAttribute('tabindex', '0');
			expect(link2).toHaveAttribute('tabindex', '0');
			expect(link1).toHaveAttribute('tabindex', '0');
		});

		it('handles next button presses correctly', () => {
			const nextButton = container.querySelectorAll(
				'.slds-is-absolute button.slds-button_icon-border-filled'
			)[1];

			// Click next (should show items 4, 5, 6)
			fireEvent.click(nextButton);
			let link4 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-4 a`
			);
			let link5 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-5 a`
			);
			let link6 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-6 a`
			);
			expect(link4).toHaveAttribute('tabindex', '0');
			expect(link5).toHaveAttribute('tabindex', '0');
			expect(link6).toHaveAttribute('tabindex', '0');

			let activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-1`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Click next again (should show item 7)
			fireEvent.click(nextButton);
			const link7 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-7 a`
			);
			expect(link7).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-2`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Click next again (should wrap to items 1, 2, 3)
			fireEvent.click(nextButton);
			const link1 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-1 a`
			);
			const link2 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-2 a`
			);
			const link3 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-3 a`
			);
			expect(link1).toHaveAttribute('tabindex', '0');
			expect(link2).toHaveAttribute('tabindex', '0');
			expect(link3).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-0`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');
		});

		it('handles keyboard navigation correctly', () => {
			const carousel = container.querySelector('.slds-carousel');

			// Navigate right (next panel - items 4, 5, 6)
			fireEvent.keyDown(carousel, { keyCode: KEYS.RIGHT });
			const link4 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-4 a`
			);
			const link5 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-5 a`
			);
			const link6 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-6 a`
			);
			expect(link4).toHaveAttribute('tabindex', '0');
			expect(link5).toHaveAttribute('tabindex', '0');
			expect(link6).toHaveAttribute('tabindex', '0');

			let activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-1`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');

			// Navigate left (previous panel - back to items 1, 2, 3)
			fireEvent.keyDown(carousel, { keyCode: KEYS.LEFT });
			const link1 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-1 a`
			);
			const link2 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-2 a`
			);
			const link3 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-3 a`
			);
			expect(link1).toHaveAttribute('tabindex', '0');
			expect(link2).toHaveAttribute('tabindex', '0');
			expect(link3).toHaveAttribute('tabindex', '0');
			activeIndicator = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-0`
			);
			expect(activeIndicator).toHaveAttribute('tabindex', '0');
		});

		it('handles indicator button presses correctly', () => {
			// Click indicator 2 (item 7)
			const indicator2 = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-2`
			);
			fireEvent.click(indicator2);
			const link7 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-7 a`
			);
			expect(link7).toHaveAttribute('tabindex', '0');
			expect(indicator2).toHaveAttribute('tabindex', '0');

			// Click indicator 1 (items 4, 5, 6)
			const indicator1 = container.querySelector(
				`#indicator-id-${defaultCarouselProps.id}-1`
			);
			fireEvent.click(indicator1);
			const link4 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-4 a`
			);
			const link5 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-5 a`
			);
			const link6 = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-6 a`
			);
			expect(link4).toHaveAttribute('tabindex', '0');
			expect(link5).toHaveAttribute('tabindex', '0');
			expect(link6).toHaveAttribute('tabindex', '0');
			expect(indicator1).toHaveAttribute('tabindex', '0');
		});
	});

	describe('Carousel events', () => {
		it('calls onRequestAutoplayToggle correctly', () => {
			const onRequestAutoplayToggle = vi.fn();
			const { container } = renderCarousel({
				itemsPerPanel: 1,
				onRequestAutoplayToggle,
			});

			const autoplayButton = container.querySelector(
				'.slds-carousel__autoplay button'
			);
			fireEvent.click(autoplayButton);

			expect(onRequestAutoplayToggle).toHaveBeenCalledTimes(1);
			const callArgs = onRequestAutoplayToggle.mock.calls[0];
			expect(callArgs[0]).toBeTruthy(); // event object
			expect(callArgs[1]).toBeTruthy(); // data object
			expect(callArgs[1].isAutoplayOn).toBe(true);
		});

		it('calls onRequestPanelChange correctly', () => {
			const onRequestPanelChange = vi.fn();
			const { container } = renderCarousel({
				itemsPerPanel: 1,
				onRequestPanelChange,
			});

			const carousel = container.querySelector('.slds-carousel');
			fireEvent.keyDown(carousel, { keyCode: KEYS.RIGHT });

			expect(onRequestPanelChange).toHaveBeenCalledTimes(1);
			const callArgs = onRequestPanelChange.mock.calls[0];
			expect(callArgs[0]).toBeTruthy(); // event object
			expect(callArgs[1]).toBeTruthy(); // data object
			expect(callArgs[1].currentPanel).toBe(0);
			expect(callArgs[1].requestedPanel).toBe(1);
		});

		it('calls onItemClick correctly', () => {
			const onItemClick = vi.fn();
			const { container } = renderCarousel({
				itemsPerPanel: 1,
				onItemClick,
			});

			const itemLink = container.querySelector(
				`#content-id-${defaultCarouselProps.id}-1 a`
			);
			fireEvent.click(itemLink);

			expect(onItemClick).toHaveBeenCalledTimes(1);
			const callArgs = onItemClick.mock.calls[0];
			expect(callArgs[0]).toBeTruthy(); // event object
			expect(callArgs[1]).toBeTruthy(); // data object
			expect(callArgs[1].item).toBeTruthy();
			expect(callArgs[1].item.id).toBe(1);
		});
	});
});
