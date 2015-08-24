// Framework specific
import React from 'react';
import classNames from 'classnames';

const SelectlistItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		type: React.PropTypes.string,
		text: React.PropTypes.string,
		disabled: React.PropTypes.bool.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		let html;
		
		switch (this.props.type) {
		case 'header':
			html = <li className="dropdown-header">{this.props.text}</li>;
			break;
		case 'divider':
			html = <li className="divider"></li>;
			break;
		default:
			html = (
				<li className={classNames({ disabled: this.props.disabled })} disabled={this.props.disabled}>
					<a href="#" onClick={this.handleClicked}>{this.props.text}</a>
				</li>
			);
		}
		
		return html;
	},

	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});

export default SelectlistItem;
