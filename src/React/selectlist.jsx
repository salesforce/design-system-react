//test

var React = require('react');
import {SelectlistCore} from "../SelectlistCore";

var DATA = {
	title: 'Selectlist',
	items: [
		{ id: 1, name: 'tacos', type: 'mexican' },
		{ id: 2, name: 'burrito', type: 'mexican' },
		{ id: 3, name: 'tostada', type: 'mexican' },
		{ id: 4, name: 'hush puppies', type: 'southern' }
	]
};

var menuItems = DATA.items.map((menuItem) => {
	return <li>{menuItem.name}</li>; 
});

var Selectlist = React.createClass({
	render () {
		return (
			<div>
				<h1>{DATA.title}</h1>
				<ul>{menuItems}</ul>
			</div>
		);
	}
});

React.render(<Selectlist/>, document.body, () => {});

