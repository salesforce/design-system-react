// SELECTLIST CONTROL

// core
import {SelectlistCore} from "../Core/selectlist";

// framework specific
import React from 'react';
import classNames from 'classnames';

import {MenuItem} from './menuitem';

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
			return (
				<MenuItem key={menuItem.id} item={menuItem} onSelected={this.handleMenuItemSelected}></MenuItem>
			);
		});
	},
	
	componentWillReceiveProps(nextProps) {
		this.__initializeOptions(nextProps);
	},
		
	render () {
		var selection = this.getSelection();
		
		return (
			<div className={classNames(this.cssClasses.CONTROL, 'btn-group', this.state.wrapperClasses)}>
				<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" disabled={this.state.disabled}>
					<span className="selected-label">{selection ? selection.name : 'None selected'}</span>
					<span className="caret"></span>
					<span className="sr-only">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu" role="menu">
					{this.menuItems()}
				</ul>
				<input name={this.props.name} className="hidden hidden-field" readOnly aria-hidden="true" type="text" value={JSON.stringify(selection)}></input>
			</div>
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
		
		if (this.Landmark.isFunction(this.props.onBeforeSelection)) this.onBeforeSelection = this.props.onBeforeSelection;
		if (this.Landmark.isFunction(this.props.onSelected)) this.onSelected = this.props.onSelected;
	},
	
	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	}
}));