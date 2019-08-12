import React from 'react';

import Button from '~/components/button';
import Carousel from '~/components/carousel';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

const items = [
	{
		buttonLabel: 'Get Started',
		id: 1,
		heading: 'Visit App Exchange',
		description: 'Extend Salesforce with the #1 business marketplace.',
		imageAssistiveText: 'Appy',
		src: '/assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Get Started',
		id: 2,
		heading: 'Click to Customize',
		description:
			'Use the Object Manager to add fields, build layouts, and more.',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Get Started',
		id: 3,
		heading: 'Download Salesforce Apps',
		description: "Get the mobile app that's just for Salesforce admins.",
		imageAssistiveText: 'Salesforce Apps',
		src: '/assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Get Started',
		id: 4,
		heading: 'Carousel Item 4',
		description: 'Description for carousel item #4',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Learn More',
		id: 5,
		heading: 'Carousel Item 5',
		description: 'Description for carousel item #5',
		imageAssistiveText: 'Appy',
		src: '/assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Learn More',
		id: 6,
		heading: 'Carousel Item 6',
		description: 'Description for carousel item #6',
		imageAssistiveText: 'Salesforce Apps',
		src: '/assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		buttonLabel: 'Learn More',
		id: 7,
		heading: 'Carousel Item 7',
		description: 'Description for carousel item #7',
		imageAssistiveText: 'Apps',
		src: '/assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
];

class Example extends React.Component {
	static displayName = 'WithCustomItemsExample';

	renderCustomItem = ({ item }) => {
		const onButtonClick = (event) => {
			event.preventDefault();
			log({
				action: this.props.action,
				event,
				eventName: 'Button Clicked',
				data: { item },
			});
		};

		return (
			<div
				className="slds-carousel-custom-rendering"
				style={{
					padding: '0 8px',
					margin: 0,
					textAlign: 'center',
				}}
			>
				<div className="slds-carousel__content-title">{item.heading}</div>
				<div className="slds-carousel__image">
					<img src={item.src} alt={item.imageAssistiveText} />
				</div>
				<Button
					className="slds-button_outline-brand slds-m-around_small"
					label="Button1"
					onClick={(event) => {
						onButtonClick(event);
					}}
					tabIndex={item.isInCurrentPanel ? '0' : '-1'}
				/>
				<Button
					className="slds-button_outline-brand slds-m-around_small"
					label="Button2"
					onClick={(event) => {
						onButtonClick(event);
					}}
					tabIndex={item.isInCurrentPanel ? '0' : '-1'}
				/>
			</div>
		);
	};

	render() {
		return (
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
				<IconSettings iconPath="/assets/icons">
					<div
						style={{
							maxWidth: '1280px',
						}}
					>
						<Carousel
							hasPreviousNextPanelNavigation
							id="carousel-with-custom-items-example"
							items={items}
							itemsPerPanel={3}
							onRenderItem={this.renderCustomItem}
						/>
					</div>
				</IconSettings>
			</div>
		);
	}
}

export default Example;
