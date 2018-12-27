/* eslint-disable  import/prefer-default-export */
import React from 'react';
import Carousel from '~/components/carousel';
import CarouselItem from '~/components/carousel/private/item';

const ITEMS = [
	{
		id: 1,
		title: 'Carousel Item 1',
		description: 'Description for #1',
		image: 'assets/images/carousel/carousel-01.jpg',
		buttonText: 'Get Started',
	},
	{
		id: 2,
		title: 'Carousel Item 2',
		description:
			"Description for #2 will be  much longer than others. It'll look ok",
		image: 'assets/images/carousel/carousel-02.jpg',
		buttonText: 'Get Started',
	},
	{
		id: 3,
		title: 'Carousel Item 3',
		description: 'Description for #3',
		image: 'assets/images/carousel/carousel-03.jpg',
		buttonText: 'Get Started',
	},
	{
		id: 4,
		title: 'Carousel Item 4',
		description: 'Description for #4',
		image: 'assets/images/carousel/carousel-02.jpg',
		buttonText: 'Get Started',
	},
	{
		id: 5,
		title: 'Carousel Item 5',
		description: 'Description for #3',
		image: 'assets/images/carousel/carousel-01.jpg',
		buttonText: 'Learn More',
	},
	{
		id: 6,
		title: 'Carousel Item 6',
		description: 'Description for #6',
		image: 'assets/images/carousel/carousel-03.jpg',
		buttonText: 'Learn More',
	},
	{
		id: 7,
		title: 'Carousel Item 7',
		description: 'Description for #6',
		image: 'assets/images/carousel/carousel-02.jpg',
		buttonText: 'Learn More',
	},
];

export const carouselItems = ITEMS.map((item) => (
	<CarouselItem {...item} itemWidth={288} key={item.id} />
));
