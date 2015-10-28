// PICKLIST ITEM - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg/svg';
import * as Lib from '../../lib/lib';

// Third party
import classNames from 'classnames';

const PicklistItem = React.createClass({

	cssClasses: {
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider'
	},

	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool
	},
	
	_renderCheckmark () {
		if (this.props.selected) {
			return <Svg className="slds-icon slds-icon--small slds-icon--left" icon="standard.task2" />;
		}
	},

	_renderIcon () {
		const icon = this.props.item.getIcon();

		if (Lib.isString(icon)) {
			return <Svg className="slds-icon slds-icon--small slds-icon--right" icon={icon} />;
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
					<li className={classNames('slds-dropdown__item', 'slds-has-icon--left', {'slds-is-selected': this.props.selected})} disabled={disabled}>
					<a href="#" className="slds-truncate" onClick={this.handleClicked} aria-disabled={disabled}>
						{this._renderCheckmark()}
						{this.props.item.getText()}
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
