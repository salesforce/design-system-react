/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// PICKLIST ITEMS - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import DefaultPicklistItem from './picklist-item';

export const CONTROL = 'picklist-items';
const { PropTypes } = React;

const PicklistItems = React.createClass({
	displayName: CONTROL,

	propTypes: {
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
		id: PropTypes.string,
		getMenuItemId: PropTypes.func.isRequired,
		labelledBy: PropTypes.string,
		onSelected: PropTypes.func.isRequired,
		selection: PropTypes.oneOfType([React.PropTypes.object]),
		show: PropTypes.bool.isRequired,
		menuItemRenderer: PropTypes.func,
		/**
		 * Positions dropdown menu with a nubbin
		 */
		position: React.PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right'
		])
	},

	getDefaultProps () {
		return {
			align: 'left'
		};
	},

	_menuItems () {
		// If `menuItemRenderer` exists, use it instead of the default element.
		let PicklistItem = null;
		if (this.props.menuItemRenderer) {
			PicklistItem = this.props.menuItemRenderer();
		} else {
			PicklistItem = DefaultPicklistItem;
		}

		return this.props.collection.map((item, index) => {
			return (
				<PicklistItem
					checkmark={this.props.checkmark}
					id={this.props.getMenuItemId(index)}
					key={index}
					selected={item._item === this.props.selection}
					item={item}
					onSelected={this.props.onSelected}
				/>
			);
		});
	},

	_getPositionClassName () {
		let positionClassName;
		switch (this.props.position) {
			case 'top left':
				positionClassName = 'slds-dropdown--left slds-nubbin--top-left';
				break;
			case 'top':
				positionClassName = 'slds-nubbin--top';
				break;
			case 'top right':
				positionClassName = 'slds-dropdown--right slds-nubbin--top-right';
				break;
			case 'bottom left':
				positionClassName = ' slds-dropdown--bottom slds-dropdown--left slds-nubbin--bottom-left';
				break;
			case 'bottom':
				positionClassName = ' slds-dropdown--bottom slds-nubbin--bottom';
				break;
			case 'bottom right':
				positionClassName = ' slds-dropdown--bottom slds-dropdown--right slds-nubbin--bottom-right';
				break;
			default:
				positionClassName = `slds-dropdown--${this.props.align}`;
		}

		return positionClassName;
	},

	render () {
		return (
			<div
				className={classNames(
					'slds-dropdown',
					this._getPositionClassName(),
					'slds-dropdown--menu',
					{ 'slds-hide': !this.props.show }
				)}
				id={this.props.id}
			>
				<ul className="slds-dropdown__list" role="menu" aria-labelledby={this.props.labelledBy}>
				{this._menuItems()}
				</ul>
			</div>
		);
	}
});

export default PicklistItems;
