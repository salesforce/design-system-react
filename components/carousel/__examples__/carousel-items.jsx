/* eslint-disable  import/prefer-default-export */

export const ITEMS = [
	{
		id: 1,
		heading: 'Visit App Exchange',
		description: 'Extend Salesforce with the #1 business marketplace.',
		imageAssistiveText: 'Appy',
		src: 'assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 2,
		heading: 'Click to Customize',
		description:
			'Use the Object Manager to add fields, build layouts, and more.',
		imageAssistiveText: 'Apps',
		src: 'assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 3,
		heading: 'Download SalesforceA',
		description: 'Get the mobile app that\'s just for Salesforce admins.',
		imageAssistiveText: 'SalesforceA',
		src: 'assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 4,
		heading: 'Carousel Item 4',
		description: 'Description for carousel item #4',
		imageAssistiveText: 'Apps',
		src: 'assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 5,
		heading: 'Carousel Item 5',
		description: 'Description for carousel item #5',
		imageAssistiveText: 'Appy',
		src: 'assets/images/carousel/carousel-01.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 6,
		heading: 'Carousel Item 6',
		description: 'Description for carousel item #6',
		imageAssistiveText: 'SalesforceA',
		src: 'assets/images/carousel/carousel-03.jpg',
		href: 'https://www.salesforce.com',
	},
	{
		id: 7,
		heading: 'Carousel Item 7',
		description: 'Description for carousel item #7',
		imageAssistiveText: 'Apps',
		src: 'assets/images/carousel/carousel-02.jpg',
		href: 'https://www.salesforce.com',
	},
];

export const ITEMS_WITH_BUTTONS = ITEMS.map((item) => {
	return { ...item, buttonLabel: item.id > 4 ? 'Get Started' : 'Learn More'}
});
