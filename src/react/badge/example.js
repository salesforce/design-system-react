import React from 'react';
import Badge from './badge';

export default function (element) {

	// badge
	const badge1 = React.createElement(Badge, {

	});
	ReactDOM.render(badge1, document.getElementById('badge'));

	// badge (default)
	const badge2 = React.createElement(Badge, {
		text: 'label',
		theme: 'default'
	});
	ReactDOM.render(badge2, document.getElementById('badge-default'));

	// badge (shade)
	const badge3 = React.createElement(Badge, {
		text: 'label',
		theme: 'shade'
	});
	ReactDOM.render(badge3, document.getElementById('badge-shade'));

	// badge (inverse)
	const badge4 = React.createElement(Badge, {
		text: 'label',
		theme: 'inverse'
	});
	ReactDOM.render(badge4, document.getElementById('badge-inverse'));
}
