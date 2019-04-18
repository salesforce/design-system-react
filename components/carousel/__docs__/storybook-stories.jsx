import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '~/components/button';
import Carousel from '~/components/carousel';

import Default from '../__examples__/default';

import { ITEMS, ITEMS_WITH_BUTTONS } from '../__examples__/carousel-items';
import { CAROUSEL } from '../../../utilities/constants';

storiesOf(CAROUSEL, module)
	.addDecorator((getStory) => (
		<div
			style={{
				bottom: '1rem',
				left: '1rem',
				overflow: 'auto',
				position: 'absolute',
				right: '1rem',
				top: '1rem',
			}}
		>
			{getStory()}
		</div>
	))
	.add('Default with 1 item', () => <Default items={ITEMS} />)
	.add('Default with navigation indicators', () => <Default items={ITEMS} hasNavigation />)
	.add('Default with AutoPlay', () => <Default items={ITEMS} hasAutoplay />)
	.add('Default with 3 items', () => (
		<Default items={ITEMS_WITH_BUTTONS} itemsPerPanel={3} hasNavigation />
	))
	.add('3 items and AutoPlay', () => <Default items={ITEMS_WITH_BUTTONS} itemsPerPanel={3} hasAutoplay />)
	.add('Default with 5 Items', () => (
		<Default items={ITEMS_WITH_BUTTONS} itemsPerPanel={5} hasNavigation />
	))
	.add('With custom items', () => {
		const onRenderItem = (item) => (
			<div className="slds-carousel-custom-rendering">
				<div className="slds-carousel__content-title">
					{item.heading}
				</div>
				<div className="slds-carousel__image">
					<img src={item.src} alt={item.imageAssistiveText} />
				</div>
				<Button
					label="Button1"
					className="slds-button_outline-brand slds-m-around_small"
					tabIndex={item.isInCurrentPanel ? 0 : -1}
				/>
				<Button
					label="Button2"
					className="slds-button_outline-brand slds-m-around_small"
					tabIndex={item.isInCurrentPanel ? 0 : -1}
				/>
			</div>
		);
		return (
			<div style={{ maxWidth: '1280px' }}>
				<Carousel itemsPerPanel={3} items={ITEMS} onRenderItem={onRenderItem} />
			</div>
		);
	});
