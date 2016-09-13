/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Picklist Component

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
// Based on SLDS v2.1.0-rc.2

// ### React
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Children
import Dialog from '../../utilities/dialog';
import Icon from '../icon';
import List from '../menu-list/list';
import ListItemLabel from '../menu-list/list-item-label';

// ### Traits

// #### KeyboardNavigable
import KeyboardNavigable from '../../utilities/keyboard-navigable';

import EventUtil from '../../utilities/EventUtil';
import KEYS from '../../utilities/KEYS';

import { MENU_PICKLIST } from '../../utilities/constants';

/**
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */
const MenuPicklist = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_PICKLIST,

	mixins: [KeyboardNavigable],

	// ### Prop Types
	propTypes: {
		className: PropTypes.string,
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		disabled: PropTypes.bool,
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id: PropTypes.string,
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * If true, component renders specifically to work inside Modal.
		 */
		modal: PropTypes.bool,
		onClick: PropTypes.func,
		onSelect: PropTypes.func,
		/**
		 * Menu item data.
		 */
		options: PropTypes.array.isRequired,
		placeholder: PropTypes.string,
		required: PropTypes.bool,
		/**
		 * Current selected item.
		 */
		value: PropTypes.node
	},

	getDefaultProps () {
		return {
			constrainToScrollParent: false,
			disabled: false,
			inheritTargetWidth: true,
			modal: true,
			required: false,
			placeholder: 'Select an Option',
			checkmark: true
		};
	},

	getInitialState () {
		return {
			focusedIndex: -1,
			selectedIndex: -1
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();

		window.addEventListener('click', this.closeOnClick, false);

		this.setState({
			selectedIndex: this.getIndexByValue(this.props.value)
		});
	},

	componentWillReceiveProps (nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({
				selectedIndex: this.getIndexByValue(nextProps.value)
			});
		}
	},

	componentWillUnmount () {
		this.isUnmounting = true;

		window.removeEventListener('click', this.closeOnClick, false);
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getClickEventName () {
		return `SLDS${this.getId()}ClickEvent`;
	},

	getIndexByValue (value) {
		let foundIndex = -1;

		if (this.props.options && this.props.options.length) {
			this.props.options.some((element, index) => {
				if (element && element.value === value) {
					foundIndex = index;
					return true;
				}

				return false;
			});
		}

		return foundIndex;
	},

	getValueByIndex (index) {
		return this.props.options[index];
	},

	getListItemRenderer () {
		return this.props.listItemRenderer ? this.props.listItemRenderer : ListItemLabel;
	},

	handleSelect (index) {
		this.setState({ selectedIndex: index });
		this.handleClose();
		this.setFocus();

		if (this.props.onSelect) {
			this.props.onSelect(this.getValueByIndex(index));
		}
	},

	handleClose () {
		this.setState({ isOpen: false });
	},

	handleClick (event) {
		if (event) {
			event.nativeEvent[this.getClickEventName()] = true;
		}

		if (!this.state.isOpen) {
			this.setState({ isOpen: true });
			this.setFocus();

			if (this.props.onClick) {
				this.props.onClick();
			}
		} else {
			this.handleClose();
		}
	},

	handleMouseDown (event) {
		if (event) {
			EventUtil.trapImmediate(event);
			event.nativeEvent[this.getClickEventName()] = true;
		}
	},

	setFocus () {
		if (!this.isUnmounting && this.button) {
			ReactDOM.findDOMNode(this.button).focus();
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP) {
				EventUtil.trap(event);
			}

			this.handleKeyboardNavigate({
				isOpen: this.state.isOpen || false,
				keyCode: event.keyCode,
				onSelect: this.handleSelect,
				toggleOpen: this.toggleOpen
			});
		}
	},

	handleCancel () {
		this.setFocus();
	},

	closeOnClick (event) {
		if (!event[this.getClickEventName()] && this.state.isOpen) {
			this.handleClose();
		}
	},

	toggleOpen () {
		this.setState({ isOpen: !this.state.isOpen });
	},

	saveRefToList (list) {
		this.list = list;
	},

	saveRefToListItem (listItem, index) {
		if (!this.listItems) {
			this.listItems = {};
		}

		this.listItems[index] = listItem;

		if (index === this.state.focusedIndex) this.handleKeyboardFocus(this.state.focusedIndex);
	},

	getMenu () {
		return ReactDOM.findDOMNode(this.list);
	},

	getMenuItem (index) {
		if (index !== undefined && this.listItems) {
			return ReactDOM.findDOMNode(this.listItems[index]);
		}

		return undefined;
	},

	renderDropdownContent () {
		return (
			<List
				checkmark={this.props.checkmark}
				getListItemId={this.getListItemId}
				itemRefs={this.saveRefToListItem}
				itemRenderer={this.getListItemRenderer()}
				onCancel={this.handleCancel}
				onSelect={this.handleSelect}
				options={this.props.options}
				ref={this.saveRefToList}
				selectedIndex={this.state.selectedIndex}
				triggerId={this.getId()}
			/>
		);
	},

	renderSimpleMenu () {
		return (
			!this.props.disabled && this.state.isOpen
			? <div
				className="slds-dropdown slds-dropdown--left"
				// inline style override
				style={{
					maxHeight: '20em',
					overflowX: 'hidden',
					minWidth: '100%'
				}}
			>
				{this.renderDropdownContent()}
			</div>
			: null
		);
	},

	renderDialog () {
		return (
			!this.props.disabled && this.state.isOpen && this.button
			? <Dialog
				className="slds-dropdown slds-dropdown--left"
				closeOnTabKey
				constrainToScrollParent={this.props.constrainToScrollParent}
				flippable
				onClose={this.handleCancel}
				onKeyDown={this.handleKeyDown}
				targetElement={this.button}
				inheritTargetWidth={this.props.inheritTargetWidth}
			>
				{this.renderDropdownContent()}
			</Dialog>
			: null
		);
	},

	renderPlaceholder () {
		const option = this.props.options[this.state.selectedIndex];
		return (option && option.label) ? option.label : this.props.placeholder;
	},

	renderTrigger () {
		return (
			<div
				aria-expanded={this.state.isOpen}
				className={classNames(
						'slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click',
						{ 'slds-is-open': this.state.isOpen },
						this.props.className
					)}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.handleMouseDown}
			>
				<button
					aria-haspopup="true"
					aria-activedescendant=""
					className="slds-button slds-button--neutral slds-picklist__label"
					id={this.getId()}
					disabled={this.props.disabled}
					onClick={this.handleClick}
					ref={(component) => { this.button = component; }}
					tabIndex={this.state.isOpen ? -1 : 0}
				>
					<span className="slds-truncate">{this.renderPlaceholder()}</span>
					<Icon name="down" category="utility" />
				</button>
				{this.props.modal ? this.renderDialog() : this.renderSimpleDropdown()}
			</div>
		);
	},

	render () {
		if (this.props.label) {
			const required = this.props.required ? <span style={{ color: 'red' }}>* </span> : null;

			return (
				<div className="slds-form-element">
					<label
						className="slds-form-element__label"
						htmlFor={this.getId()}
						// inline style override
						style={{ width: '100%' }}
					>
						{required}{this.props.label}
					</label>
					{this.renderTrigger()}
				</div>
			);
		}

		return this.renderTrigger();
	}
});

module.exports = MenuPicklist;
module.exports.ListItemLabel = ListItemLabel;
