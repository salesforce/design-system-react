// SELECTLIST CONTROL

// core
import {Landmark} from '../Landmark';
import {SelectlistCore} from '../SelectlistCore';

// framework specific
import React from 'react';
// TO-DO: Get rid of all these requires
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export var Selectlist = React.createClass(Object.assign({}, Landmark, SelectlistCore, {
	propTypes: {
		disabled: React.PropTypes.bool,
		selected: React.PropTypes.number,
		collection: React.PropTypes.array
	},
		
	menuItems () {
		console.log(this.props.collection);
		return this.props.collection.map((menuItem) => {
			return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
					{menuItem.name}
				</MenuItem>;
		});
	},
	
	render () {
		return (
			<div className={this.cssClasses.CONTROL} {...this.props}>
				<ul>{this.menuItems}</ul>
				<DropdownButton disabled={this.props.disabled} title={this.selection() ? this.selection().name : 'None selected'} key={this.props.id}>{this.menuItems()}</DropdownButton>
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
}) );