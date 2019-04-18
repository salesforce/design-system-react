import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Button from '~/components/button';
import IconSettings from '~/components/icon-settings';
import log from '~/utilities/log';

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
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default with 1 item', () => <Default action={action} items={ITEMS} />)
	.add('Default with navigation indicators', () => <Default action={action} items={ITEMS} hasNavigation />)
	.add('Default with AutoPlay', () => <Default action={action} items={ITEMS} hasAutoplay />)
	.add('Default with 3 items', () => (
		<Default action={action} items={ITEMS_WITH_BUTTONS} itemsPerPanel={3} hasNavigation />
	))
	.add('3 items and AutoPlay', () => <Default action={action} items={ITEMS_WITH_BUTTONS} itemsPerPanel={3} hasAutoplay />)
	.add('Default with 5 Items', () => (
		<Default action={action} items={ITEMS_WITH_BUTTONS} itemsPerPanel={5} hasNavigation />
	))
	.add('With custom items', () => {
		const onButtonClick = (event, data) => {
			event.preventDefault();
			log({
				action,
				event,
				eventName: 'Item Clicked',
				data,
			});
		};
		const onRenderItem = (item) => (
			<div className="slds-carousel-custom-rendering">
				<div className="slds-carousel__content-title">
					{item.heading}
				</div>
				<div className="slds-carousel__image">
					<img src={item.src} alt={item.imageAssistiveText} />
				</div>
				<Button
					className="slds-button_outline-brand slds-m-around_small"
					label="Button1"
					onClick={(event) => {
						onButtonClick(event, item);
					}}
					tabIndex={item.isInCurrentPanel ? '0' : '-1'}
				/>
				<Button
					className="slds-button_outline-brand slds-m-around_small"
					label="Button2"
					onClick={(event) => {
						onButtonClick(event, item);
					}}
					tabIndex={item.isInCurrentPanel ? '0' : '-1'}
				/>
			</div>
		);
		return (
			<Default action={action} items={ITEMS} itemsPerPanel={3} onRenderItem={onRenderItem} />
		);
	});
