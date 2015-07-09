var React = require('react');
import {SelectlistCore} from '../SelectlistCore';

export class Selectlist extends SelectlistCore {
	onBeforeInitialize (collection, options) {
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