// Core
import Lib from '../../core/lib';

// Framework specific
import React from 'react';
import classNames from 'classnames';

var SelectlistItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		var disabled = !!Lib.getProp(this.props.item, 'disabled');

		var html;
		switch (Lib.getProp(this.props.item, '_itemType')) {
		case 'header':
			html = <li className="dropdown-header">{Lib.getProp(this.props.item, 'name')}</li>;
			break;
		case 'divider':
			html = <li className="divider"></li>;
			break;
		case 'item':
		default:
			html = (
				<li className={classNames({ disabled: disabled })} disabled={disabled}>
					<a href="#" onClick={this.handleClicked}>{Lib.getProp(this.props.item, 'name')}</a>
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
