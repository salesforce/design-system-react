import React from 'react';
import { storiesOf } from '@storybook/react';

import Carousel from '~/components/carousel';
import Card from '~/components/card';
import { ITEMS } from '~/components/carousel/__examples__/carousel-items';
import { CAROUSEL } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Button from './../../button';

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
	.add('Default With 1 Item', () => <Default itemsPerPanel={1} />)
	.add('Default With Navigation Indicators', () => (
		<Default itemsPerPanel={1} hasNavigation />
	))
	.add('Default With 3 Items', () => (
		<Default itemsPerPanel={3} hasNavigation />
	))
	.add('Default With 5 Items', () => (
		<Default itemsPerPanel={5} hasNavigation />
	))
	.add('With Custom Items', () => {
		const onRenderItem = (item) => (
			<div className="slds-carousel-custom-rendering">
				<div className="slds-carousel__content-title">
					{item.heading} With Custom Rendering
				</div>
				<div className="slds-carousel__image">
					<img src={item.src} alt={item.imageAssistiveText} />
				</div>
				<Button
					label="Button1"
					className="slds-button_outline-brand slds-m-around_small"
				/>
				<Button
					label="Button2"
					className="slds-button_outline-brand slds-m-around_small"
				/>
			</div>
		);
		return (
			<div style={{ maxWidth: '1280px' }}>
				<Carousel itemsPerPanel={3} items={ITEMS} onRenderItem={onRenderItem} />
			</div>
		);
	});
