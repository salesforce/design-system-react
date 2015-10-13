// Framework specific
import React from 'react';
import classNames from 'classnames';

const SelectlistItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		let html;

		switch (this.props.item.getType()) {
			case 'header':
				html = <li className="dropdown-header">{this.props.item.getText()}</li>;
				break;
			case 'divider':
				html = <li className="divider"></li>;
				break;
			default:
				const disabled = this.props.item.getDisabled();

				html = (
					<li className={classNames({ disabled })} disabled={disabled}>
						<a href="#" onClick={this.handleClicked}>{this.props.item.getText()}</a>
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
