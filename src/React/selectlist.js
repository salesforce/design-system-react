// SELECTLIST CONTROL

// core
import {Landmark} from '../landmark';
import {SelectlistCore} from "../Core/selectlist";

// framework specific
import React from 'react';
import classNames from 'classnames';

// TO-DO: Let's strip out react-bootstrap and just use conventional bootstrap since this will most often be used in existing apps (for now)
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export var Selectlist = React.createClass(Object.assign({}, SelectlistCore, {	
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		name: React.PropTypes.string
	},
	
	getInitialState () {
		return Object.assign(this.__getInitialState(), {
			wrapperClasses: {}
		});
	},
		
	menuItems () {
		return this.props.collection.map((menuItem) => {
			return <MenuItem eventKey={menuItem.id} key={menuItem.id} onSelect={this.handleMenuItemClicked}>
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
			<DropdownButton className={classNames(this.cssClasses.CONTROL, this.state.wrapperClasses)} disabled={this.state.disabled} title={selection ? selection.name : 'None selected'} key={this.props.id}>{this.menuItems()}<input name={this.props.name} className="hidden hidden-field" readOnly aria-hidden="true" type="text" value={JSON.stringify(selection)}></input></DropdownButton>
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