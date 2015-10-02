// Framework specific
import React from 'react';

const PillboxItem = React.createClass({

	propTypes: {
		item: React.PropTypes.object,
		onClick: React.PropTypes.func.isRequired
	},

	render () {
		return (
			<li className="btn btn-default pill" onClick={this._onClick.bind(this, this.props.item)}>
				<span className="pill-name">{this.props.item.getText()}</span>
				<span className="glyphicon glyphicon-close">
					<span className="sr-only">Remove</span>
				</span>
			</li>
		);
	},

	_onClick (item) {
		this.props.onClick(item);
	}
});

export default PillboxItem;
