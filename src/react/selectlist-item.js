// Core
import Landmark from '../landmark';

// Framework specific
import React from 'react';
import classNames from 'classnames';

var SelectlistItem = React.createClass({	
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},
		
	render () {
		var disabled = !!Landmark.getProp(this.props.item, 'disabled');
		
		return (
			<li className={classNames({ disabled: disabled })} disabled={disabled}>
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