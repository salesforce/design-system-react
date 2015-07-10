// SELECTLIST COMPONENT

import {Landmark} from '../Landmark';
import {SelectlistCore} from '../SelectlistCore';

var React = require('react'); // TO-DO: Get rid of all these requires
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

export var Selectlist = React.createClass(Landmark.extend({
	menuItems () {
		return this._collection.map((menuItem) => {
			return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
					{menuItem.name}
				</MenuItem>;
		});
	},
	
	render () {
		return (
			<div>
				<ul>{this.menuItems}</ul>
				<DropdownButton title={this.selection() ? this.selection().name : 'None selected'} key={this.props.id}>{this.menuItems()}</DropdownButton>
			</div>
		);
	},
	
	componentWillMount () {
		this.__constructor(this.props);
	},
	
	handleMenuItemClicked (eventKey, href, target) {
		this.setSelectionByKey('id', eventKey);
	},
	
	onSelected () {
		this.forceUpdate(); // TO-DO: We shouldn't have to force this, but we also don't want to manage state in two places. What's the best way to get the best of both worlds?
	}
}, SelectlistCore));