/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Card from '~/components/card';
import Carousel from '~/components/carousel';
import { ITEMS } from '~/components/carousel/__examples__/carousel-items';

import { renderMarkup } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import '../../../styles/carousel/carousel.css';

test('Carousel Component Default Snapshot - 1 item, no navigation', () => {
	expect(renderMarkup(Default)).toMatchSnapshot();
});
test('Carousel Component Default Snapshot - 3 items and navigation', () => {
	expect(
		renderMarkup(Default, {
			itemsPerPanel: 3,
			hasPreviousNextPanelNavigation: true,
		})
	).toMatchSnapshot();
});

test('Carousel Component With Custom Rendering', () => {
	const onRenderItem = (item) => (
		<div className="slds-carousel-custom-rendering">
			<div className="slds-carousel__content-title">
				{item.heading} With Custom Rendering
			</div>
			<div className="slds-carousel__image">
				<img src={item.src} alt={item.imageAssistiveText} />
			</div>
		</div>
	);

	expect(
		renderMarkup(Carousel, {
			id: 'Custom Rendering',
			itemsPerPanel: 2,
			items: ITEMS,
			onRenderItem,
		})
	).toMatchSnapshot();
});
