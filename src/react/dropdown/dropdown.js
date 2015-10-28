// DROPDOWN CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Third party
import classNames from 'classnames';

// Framework specific
import React from 'react';
import { PicklistObject } from '../picklist/picklist';
import Button from '../button/button';

export const DropdownObject = Lib.merge(PicklistObject, {
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		icon: React.PropTypes.string,
		swapIcon: React.PropTypes.bool,
		renderArrow: React.PropTypes.bool
	},

	_getIcon () {
		let icon;

		if (this.props.swapIcon && this.props.selection) {
			icon = this.props.selection.icon;
		}

		return icon || this.props.icon;
	},

	_getStyle () {
		return this.props.renderArrow ? 'icon-more' : 'icon-container';
	},

	render () {
		return (
		<div className="slds-dropdown-trigger">
			<Button icon={this._getIcon()} iconStyle={this._getStyle()} disabled={this.props.disabled} />
			<div className={classNames('slds-dropdown', ' slds-dropdown--left', ' slds-dropdown--menu', {'slds-hide': this.props.disabled})}>
				<ul className="slds-dropdown__list" role="menu" ref={this.cssClasses.MENU}>
				{this._menuItems()}
				</ul>
			</div>
		</div>
		);
	}
});

let Dropdown = Lib.merge({}, DropdownCore, DropdownObject);

Dropdown = Lib.runHelpers('react', CONTROL, Dropdown);
Dropdown = React.createClass(Dropdown);

export default Dropdown;
