// Core
import Landmark from '../landmark';

// Framework specific
import React from 'react';

var SelectlistItem = React.createClass({	
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},
		
	render () {
		return (
			<li>
				<a href="#" onClick={this.handleClicked}>{Landmark.getProp(this.props.item, 'name')}</a>
			</li>
		);
	},
	
	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});

export default SelectlistItem;