// Core
import Lib from '../../core/lib';

// Framework specific
import React from 'react';
import classNames from 'classnames';

const SelectlistItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		const disabled = !!Lib.getProp(this.props.item, 'disabled');

		let html;
		switch (Lib.getProp(this.props.item, '_itemType')) {
		case 'header':
			html = <li className="dropdown-header">{Lib.getProp(this.props.item, 'text')}</li>;
			break;
		case 'divider':
			html = <li className="divider"></li>;
			break;
		default:
			html = (
				<li className={classNames({ disabled: disabled })} disabled={disabled}>
					<a href="#" onClick={this.handleClicked}>{Lib.getProp(this.props.item, 'text')}</a>
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
