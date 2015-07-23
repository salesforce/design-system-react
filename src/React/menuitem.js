import React from 'react';

export var MenuItem = React.createClass({	
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},
		
	render () {
		return (
			<li>
				<a href="#" onClick={this.handleClicked}>{this.props.item.name}</a>
			</li>
		);
	},
	
	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});