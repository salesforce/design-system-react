// DROPDOWN CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Framework specific
import React from 'react';
import { PicklistObject } from '../picklist/picklist';
import isIcon from '../mixins/custom-prop-types/icon.js';

// Children
import PicklistItems from '../picklist/picklist-items';
import Button from '../button/button';

export const DropdownObject = Lib.merge(PicklistObject, {
	displayName: CONTROL,

	propTypes: {
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		disabled: React.PropTypes.bool,
		icon: isIcon,
		id: React.PropTypes.string,
		renderArrow: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		]),
		swapIcon: React.PropTypes.bool
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
		const triggerId = this._getTriggerId();
		
		return (
			<div className="slds-dropdown-trigger" id={this.state.id} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<Button id={triggerId} icon={this._getIcon()} iconStyle={this._getStyle()} disabled={this.props.disabled} aria-haspopup="true" />
				<PicklistItems id={this._getMenuId()} labelledBy={triggerId} getMenuItemId={this._getMenuItemId} collection={this._collection} selection={this._getSelection()._item} show={!this.props.disabled} onSelected={this._handleMenuItemSelected} />
			</div>
		);
	}
});

let Dropdown = Lib.merge({}, DropdownCore, DropdownObject);

Dropdown = Lib.runHelpers('react', CONTROL, Dropdown);
Dropdown = React.createClass(Dropdown);

export default Dropdown;
