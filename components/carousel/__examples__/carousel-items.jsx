/* eslint-disable  import/prefer-default-export */
import React from 'react';
import Carousel from '~/components/carousel';
import CarouselItem from '~/components/carousel/private/carousel-item';

export const ITEMS = [
	{
		id: 1,
		heading: 'Carousel Item 1',
		description: 'Description for #1',
		src: 'assets/images/carousel/carousel-01.jpg',
		CTALabel: 'Get Started',
		href: 'https://www.salesforce.com',
	},
	{
		id: 2,
		heading: 'Carousel Item 2',
		description:
			"Description for #2 will be  much longer than others. It'll look ok",
		src: 'assets/images/carousel/carousel-02.jpg',
		CTALabel: 'Get Started',
		href: 'https://www.salesforce.com',
	},
	{
		id: 3,
		heading: 'Carousel Item 3',
		description: 'Description for #3',
		src: 'assets/images/carousel/carousel-03.jpg',
		CTALabel: 'Get Started',
		href: 'https://www.salesforce.com',
	},
	{
		id: 4,
		heading: 'Carousel Item 4',
		description: 'Description for #4',
		src: 'assets/images/carousel/carousel-02.jpg',
		CTALabel: 'Get Started',
		href: 'https://www.salesforce.com',
	},
	{
		id: 5,
		heading: 'Carousel Item 5',
		description: 'Description for #3',
		src: 'assets/images/carousel/carousel-01.jpg',
		CTALabel: 'Learn More',
		href: 'https://www.salesforce.com',
	},
	{
		id: 6,
		heading: 'Carousel Item 6',
		description: 'Description for #6',
		src: 'assets/images/carousel/carousel-03.jpg',
		CTALabel: 'Learn More',
		href: 'https://www.salesforce.com',
	},
	{
		id: 7,
		heading: 'Carousel Item 7',
		description: 'Description for #6',
		src: 'assets/images/carousel/carousel-02.jpg',
		CTALabel: 'Learn More',
		href: 'https://www.salesforce.com',
	},
];
