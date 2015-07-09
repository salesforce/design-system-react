// SELECTLIST COMPONENT

var React = require('react');
import {SelectlistCore} from "../SelectlistCore";
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

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
		return typeof(this.state.selectedKey) === 'undefined' ? 'None Selected' : 
			this.props.model.items[this.state.selectedKey].name;
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

export default Selectlist;
