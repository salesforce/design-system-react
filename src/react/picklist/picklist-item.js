// PICKLIST ITEM - REACT FACADE

import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

// Third party
import classNames from 'classnames';

const PicklistItem = React.createClass({

	cssClasses: {
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider'
	},

	propTypes: {
		// TODO: explore if item PropTypes can be done better
		item: React.PropTypes.shape({
			getType: React.PropTypes.func.isRequired,
			getDisabled: React.PropTypes.func.isRequired,
			// getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired,
			// getValue: React.PropTypes.func.isRequired,
			getIcon: React.PropTypes.func.isRequired
		}).isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool
	},
	
	_renderCheckmark () {
		return <Svg className="slds-icon slds-icon--selected slds-icon--x-small slds-icon-text-default slds-m-right--small" icon="utility.check" />;
	},

	_renderIcon () {
		const icon = this.props.item.getIcon();

		if (Lib.isString(icon)) {
			return <Svg className="slds-icon slds-icon--x-small slds-icon-text-default slds-m-left--small slds-shrink-none" icon={icon} />;
		}
	},

	render () {
		let html;

		switch (this.props.item.getType()) {
			case 'header':
				html = <li className={this.cssClasses.HEADER}><span className={this.cssClasses.HEADERTEXT}>{this.props.item.getText()}</span></li>;
				break;
			case 'divider':
				html = <li className={this.cssClasses.DIVIDER}></li>;
				break;
			default:
				const disabled = this.props.item.getDisabled();

				html = (
					<li className={classNames('slds-dropdown__item', {'slds-is-selected': this.props.selected})} disabled={disabled}>
					<a href="#" onClick={this.handleClicked} aria-disabled={disabled}>
						<p className="slds-truncate">
							{this._renderCheckmark()}
							{this.props.item.getText()}
						</p>
						{this._renderIcon()}
					</a>
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

export default PicklistItem;
