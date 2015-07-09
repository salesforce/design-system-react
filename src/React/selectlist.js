var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
import {SelectlistCore} from '../SelectlistCore';

export class Selectlist extends SelectlistCore {
	onBeforeInitialize (collection, options) {
		var self = this;
		
		this.component = React.createClass({
			handleMenuItemClicked: function (eventKey, href, target) {
				self._setSelection(eventKey);
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
						<DropdownButton title={self.selection.name} key={self.selection.id}>{this.menuItems()}</DropdownButton>
					</div>
				);
			}
		});
	}
}