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
		selection: React.PropTypes.number,
		collection: React.PropTypes.array
	},
	
	getInitialState () {
		return this.__getInitialState();
	},
		
	menuItems () {
		return this.props.collection.map((menuItem) => {
			return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
					{menuItem.name}
				</MenuItem>;
		});
	},
	
	componentWillReceiveProps(nextProps) {
		this.__initializeOptions(nextProps);
	},
	
	render () {
		var selection = this.getSelection();
		
		return (
			<DropdownButton className={this.cssClasses.CONTROL} disabled={this.state.disabled} title={selection ? selection.name : 'None selected'} key={this.props.id}>{this.menuItems()}</DropdownButton>
		);
	},
	
	componentWillMount () {
		this.elements = {
			wrapper: {
				toggleClass: function (cssClass, state) {
					Landmark.log(cssClass, state);
				}
			}
		}
		
		this.__constructor(this.props);
	},
	
	handleMenuItemClicked (eventKey, href, target) {
		this.setSelectionByKey('id', eventKey);
	}
}));