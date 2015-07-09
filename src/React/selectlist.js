// SELECTLIST COMPONENT

import {SelectlistCore} from '../SelectlistCore';
var React = require('react'); // TO-DO: Get rid of all these requires
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

export class Selectlist extends SelectlistCore {
	onBeforeInitialize (element, collection, options) {
		var self = this;
		this.Component = React.createClass({ // TO-DO: Saving this here for now even though it's clearly wrong
			handleMenuItemClicked: function (eventKey, href, target) {
				self.setSelectionByKey('id', eventKey);
			},
			
			menuItems: function() {
				return self._collection.map((menuItem) => {
					return <MenuItem eventKey={menuItem.id} onSelect={this.handleMenuItemClicked}>
							{menuItem.name}
						</MenuItem>;
				});
			},
			
			render () {
				return (
					<div>
						<ul>{this.menuItems}</ul>
						<DropdownButton title={self.selection.name} key={this.props.id}>{this.menuItems()}</DropdownButton>
					</div>
				);
			}
		});
	}
	
	onInitialized (element, collection, options) {
		this.component = React.render(React.createElement(this.Component, {
			id: 'selectlist1' // TO-DO: Obviously this isn't how we'll really set the ID in the end
		}), element);
	}
	
	onSelected () {
		this.component.forceUpdate(); // TO-DO: We shouldn't have to force this, but we also don't want to manage state in two places. What's the best way to get the best of both worlds?
	}
	
	get selection () {
		return super.selection || { name: 'None selected' }; // TO-DO: Another hack...
	}
};