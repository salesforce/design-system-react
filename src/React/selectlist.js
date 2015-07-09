var React = require('react');
import {SelectlistCore} from '../SelectlistCore';

export class Selectlist extends SelectlistCore {
	onBeforeInitialize (collection, options) {
		// TO-DO: Of course we actually want this to be dynamic, just leaving it here for simplicty at the moment
		var menuItems = collection.map((menuItem) => {
			return <li>{menuItem.name}</li>; 
		});
		
		this.component = React.createClass({
			render () {
				return (
					<div>
						<ul>{menuItems}</ul>
					</div>
				);
			}
		});
	}
}