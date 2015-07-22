// SELECTLIST CONTROL

// core
import {Landmark} from '../Landmark';
import {SelectlistCore} from '../SelectlistCore';

// framework specific
import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export var Selectlist = React.createClass(Object.assign({}, SelectlistCore, {
	propTypes: {
		disabled: React.PropTypes.bool,
		selected: React.PropTypes.number,
		collection: React.PropTypes.array
	},
		
	menuItems () {
		return this.props.collection.map((menuItem) => {
			return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
					{menuItem.name}
				</MenuItem>;
		});
	},
	
	render () {
		var selection = this.getSelection();
		
		return (
			<div className={this._cssClasses.CONTROL} {...this.props}>
				<DropdownButton disabled={this.props.disabled} title={selection ? selection.name : 'None selected'} key={this.props.id}>{this.menuItems()}</DropdownButton>
			</div>
		);
	},
	
	componentWillMount () {
		this.__constructor(this.props);
	},
	
	handleMenuItemClicked (eventKey, href, target) {
		this.setSelectionByKey('id', eventKey);
	}
}));