// Framework specific
import React from 'react';

// Children
import Button from '../button/button';

export const CONTROL = 'pillbox-item';

const PillboxItem = React.createClass({
	displayName: CONTROL,

	propTypes: {
		// TODO: explore if item PropTypes can be done better
		item: React.PropTypes.shape({
			// getType: React.PropTypes.func.isRequired,
			// getDisabled: React.PropTypes.func.isRequired,
			// getIcon: React.PropTypes.func.isRequired,
			// getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
		onClick: React.PropTypes.func.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<li className="slds-pill">
				<span href="#" className="slds-pill__label">{this.props.item.getText()}</span>
				<Button
					icon="action.close"
					assistiveText={this.props.strings.REMOVE}
					iconStyle="icon-bare"
					onClick={this._onClick} />
			</li>
		);
	},

	_onClick () {
		this.props.onClick(this.props.item);
	}
});

export default PillboxItem;
