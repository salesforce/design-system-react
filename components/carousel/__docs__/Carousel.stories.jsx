import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Carousel from '../';

export default {
	title: 'Components/Carousel',
	component: Carousel,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '800px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		hasAutoplay: {
			control: { type: 'boolean' },
		},
		hasPreviousNextPanelNavigation: {
			control: { type: 'boolean' },
		},
		isInfinite: {
			control: { type: 'boolean' },
		},
		itemsPerPanel: {
			control: { type: 'number' },
		},
		autoplayInterval: {
			control: { type: 'number' },
		},
	},
};

const sampleItems = [
	{
		id: '1',
		heading: 'Visit App Exchange',
		description: 'Discover more apps and solutions for your business.',
		buttonLabel: 'Learn More',
		src: '/assets/images/carousel/carousel-01.jpg',
		href: '#',
	},
	{
		id: '2',
		heading: 'Click to Customize',
		description: 'Customize your Salesforce experience to fit your needs.',
		buttonLabel: 'Customize',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: '#',
	},
	{
		id: '3',
		heading: 'Download Salesforce Today',
		description: 'Get the Salesforce mobile app and work from anywhere.',
		buttonLabel: 'Download',
		src: '/assets/images/carousel/carousel-03.jpg',
		href: '#',
	},
	{
		id: '4',
		heading: 'Explore Lightning',
		description: 'Experience the new Lightning interface.',
		buttonLabel: 'Explore',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: '#',
	},
];

// Default carousel
export const Default = {
	render: () => (
		<Carousel
			items={sampleItems}
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// With navigation arrows
export const WithNavigation = {
	render: () => (
		<Carousel
			items={sampleItems}
			hasPreviousNextPanelNavigation
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// With autoplay
export const WithAutoplay = {
	render: () => (
		<Carousel
			items={sampleItems}
			hasAutoplay
			autoplayInterval={3000}
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// With autoplay and navigation
export const WithAutoplayAndNavigation = {
	render: () => (
		<Carousel
			items={sampleItems}
			hasAutoplay
			hasPreviousNextPanelNavigation
			autoplayInterval={4000}
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// Infinite loop
export const InfiniteLoop = {
	render: () => (
		<Carousel
			items={sampleItems}
			hasPreviousNextPanelNavigation
			isInfinite
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// Three items per panel
export const ThreeItemsPerPanel = {
	render: () => (
		<Carousel
			items={[...sampleItems, ...sampleItems.slice(0, 2)]}
			itemsPerPanel={3}
			hasPreviousNextPanelNavigation
			onItemClick={(event, data) => console.log('Item clicked:', data.item)}
		/>
	),
};

// Controlled carousel
export const Controlled = {
	render: () => {
		const [currentPanel, setCurrentPanel] = useState(0);
		const [isAutoplayOn, setIsAutoplayOn] = useState(false);

		return (
			<div>
				<div className="slds-m-bottom_medium">
					<span className="slds-m-right_small">Current Panel: {currentPanel}</span>
					<span>Autoplay: {isAutoplayOn ? 'On' : 'Off'}</span>
				</div>
				<Carousel
					items={sampleItems}
					currentPanel={currentPanel}
					isAutoplayOn={isAutoplayOn}
					hasAutoplay
					hasPreviousNextPanelNavigation
					onRequestPanelChange={(event, data) => {
						console.log('Panel change requested:', data);
						setCurrentPanel(data.requestedPanel);
					}}
					onRequestAutoplayToggle={(event, data) => {
						console.log('Autoplay toggle requested:', data);
						setIsAutoplayOn(!data.isAutoplayOn);
					}}
					onItemClick={(event, data) => console.log('Item clicked:', data.item)}
				/>
			</div>
		);
	},
};
