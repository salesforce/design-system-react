import React from 'react';
import Wizard from './wizard';

export default function (element) {
	const collection = [
		{ text: 'Campaign' },
		{ text: 'Recipients' },
		{ text: 'Template' }
	];
	
	React.render(<Wizard collection={collection} step={collection[0]} />, element);
}
