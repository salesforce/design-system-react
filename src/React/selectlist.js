// SELECTLIST CONTROL

// core
import {Landmark} from '../landmark';
import {SelectlistCore} from "../Core/selectlist";

// framework specific
import React from 'react';
import classNames from 'classnames';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export var Selectlist = React.createClass(Object.assign({}, SelectlistCore, {	
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.number,
		collection: React.PropTypes.array
	},
	
	getInitialState () {
		return Object.assign(this.__getInitialState(), {
			wrapperClasses: {}
		});
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
			<DropdownButton className={classNames(this.cssClasses.CONTROL, this.state.wrapperClasses)} disabled={this.state.disabled} title={selection ? selection.name : 'None selected'} key={this.props.id}>{this.menuItems()}</DropdownButton>
		);
	},
	
	componentWillMount () {
		var self = this;
		
		this.elements = {
			wrapper: {
				toggleClass: function (cssClass, state) {
					var wrapperClasses = self.state.wrapperClasses;
					wrapperClasses[cssClass] = state
					
					self.setState({
						wrapperClasses: wrapperClasses
					});
				}
			}
		}
		
		this.__constructor(this.props);
	},
	
	handleMenuItemClicked (eventKey, href, target) {
		this.setSelection({ id: eventKey });
	}
}));