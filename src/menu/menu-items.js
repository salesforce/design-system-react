/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MENU ITEMS - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import DefaultMenuItem from './menu-item';

export const CONTROL = 'MenuItems';
const { PropTypes } = React;

const MenuItems = React.createClass({
	displayName: CONTROL,

	propTypes: {
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		children: PropTypes.element,
		/**
		 * Class names added to the list of menu items.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		collection: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
		getMenuItemId: PropTypes.func.isRequired,
		/**
		 * Determines whether a menu item with an icon will display that icon on the left or the right.
		 */
		iconPosition: React.PropTypes.oneOf([
			'left',
			'right'
		]),
		labelledBy: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		selection: PropTypes.oneOfType([PropTypes.object])
	},

	getDefaultProps () {
		return {
			iconPosition: 'right'
		};
	},

	render () {
		// Custom menu items
		const menuItemTypes = {
			item: {
				MenuItem: DefaultMenuItem,
				props: {}
			}
		};

		React.Children.map(this.props.children, (child) => {
			const MenuItem = child.type;

			if (MenuItem.displayName === 'MenuItem') {
				const menuItemType = MenuItem.menuItemType || 'item';
				menuItemTypes[menuItemType] = {
					MenuItem,
					props: child.props
				};
			}
		});

		return (
			<ul className={classNames('slds-dropdown__list', this.props.className)} role="menu" aria-labelledby={this.props.labelledBy}>
				{this.props.collection.map((item, index) => {
					const type = item.getType();
					const menuItemType = menuItemTypes[type] || menuItemTypes.item;
					const MenuItem = menuItemType.MenuItem;

					return (
						<MenuItem
							iconPosition={this.props.iconPosition}
							{...menuItemType.props}
							checkmark={this.props.checkmark}
							disabled={item.getDisabled()}
							href={item.getHref()}
							icon={item.getIcon && item.getIcon()}
							iconCategory={item.getIconCategory()}
							iconName={item.getIconName()}
							id={this.props.getMenuItemId(index)}
							item={item._item}
							key={index}
							onClick={this.props.onClick}
							selected={item._item === this.props.selection}
							contents={item.getText()}
							type={type}
						/>
					);
				})}
			</ul>
		);
	}
});

export default MenuItems;
