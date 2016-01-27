/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DROPDOWN CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Traits
import Openable from '../../traits/openable';

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
		const isOpen = Openable.isOpen(this);
		const triggerId = this._getTriggerId();
		
		return (
			<div className="slds-dropdown-trigger--click"
					id={this.state.id}
					aria-expanded={isOpen}
					onKeyDown={this._handleKeyPressed}
					onKeyPress={this._handleKeyPressed}>
				<Button
					className=""
					id={triggerId}
					icon={this._getIcon()}
					iconStyle={this._getStyle()}
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					aria-haspopup="true" />
				<PicklistItems
					id={this._getMenuId()}
					labelledBy={triggerId}
					getMenuItemId={this._getMenuItemId}
					collection={this._collection}
					selection={this._getSelection()._item}
					show={ isOpen && !this.props.disabled}
					onSelected={this._handleMenuItemSelected}/>
			</div>
		);
	}
});

let Dropdown = Lib.merge({}, DropdownCore, DropdownObject);

Dropdown = Lib.runHelpers('react', CONTROL, Dropdown);
Dropdown = React.createClass(Dropdown);

export default Dropdown;
