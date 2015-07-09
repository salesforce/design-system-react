//test

var React = require('react');
import {SelectlistCore} from "../SelectlistCore";
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var DATA = {
	selected: 'None selected',
	id: 'selectlist1',
	items: [
		{ id: 0, name: 'tacos', type: 'mexican' },
		{ id: 1, name: 'burrito', type: 'mexican' },
		{ id: 2, name: 'tostada', type: 'mexican' },
		{ id: 3, name: 'hush puppies', type: 'southern' }
	]
};

var menuItemSelected = (eventKey, href, target)=> {
	this.props.model.selected = this.props.model.items[eventKey].name;
};

var Selectlist = React.createClass({
	getInitialState: function() {
		return {
			selectedKey: undefined
		};
	},

	handleMenuItemClicked: function(eventKey, href, target) {
		this.setState({
			selectedKey: eventKey
		});
	},

	menuItems: function() {
		return this.props.model.items.map( (menuItem) => {
			return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
					{menuItem.name}
				</MenuItem>;
		});
	},

	selected: function() {
		self = this;
		return typeof(this.state.selectedKey) === 'undefined' ? 'None Selected' : 
			self.props.model.items[this.state.selectedKey].name;
	},

	render () {
		return (
			<div>
				<h1>SelectList</h1>
				<ul>{this.menuItems}</ul>
				<DropdownButton title={this.selected()} key={this.props.model.id}>{this.menuItems()}</DropdownButton>
			</div>
		);
	}
});

React.render(<Selectlist model={DATA}/>, document.body, () => {});