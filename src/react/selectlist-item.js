// Core
import FuelUX from '../fuelux';

// Framework specific
import React from 'react';
import classNames from 'classnames';

var SelectlistItem = React.createClass({	
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},
		
	render () {
		var disabled = !!FuelUX.getProp(this.props.item, 'disabled');
		
		return (
			<li className={classNames({ disabled: disabled })} disabled={disabled}>
				<a href="#" onClick={this.handleClicked}>{FuelUX.getProp(this.props.item, 'name')}</a>
			</li>
		);
	},
	
	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});

export default SelectlistItem;