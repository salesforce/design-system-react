
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

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

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
import Dialog from '../utilities/dialog';
import Icon from '../icon';
import List from '../utilities/menu-list';
import ListItemLabel from '../utilities/menu-list/item-label';

// ### Traits

// #### KeyboardNavigable
import KeyboardNavigable from '../../utilities/keyboard-navigable-menu';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';
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
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef: PropTypes.func,
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
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
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
			inheritTargetWidth: true,
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
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(MENU_PICKLIST, this.props);

		this.generatedId = shortid.generate();

		window.addEventListener('click', this.closeOnClick, false);

		this.setState({
			selectedIndex: this.getIndexByValue(this.props)
		});
	},

	componentWillReceiveProps (nextProps) {
		if (this.props.value !== nextProps.value || this.props.options.length !== nextProps.length) {
			this.setState({
				selectedIndex: this.getIndexByValue(nextProps)
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

	getIndexByValue ({ value, options } = this.props) {
		let foundIndex = -1;

		if (options && options.length) {
			options.some((element, index) => {
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
				this.props.onClick(event);
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
			this.button.focus();
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

			if (event.keyCode !== KEYS.TAB) {
				// The outer div with onKeyDown is overriding button onClick so we need to add it here.
				const openMenuKeys = event.keyCode === KEYS.ENTER || event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP;
				const isTrigger = event.target.tagName === 'BUTTON';
				if (openMenuKeys && isTrigger && this.props.onClick) {
					this.props.onClick(event);
				}

				this.handleKeyboardNavigate({
					isOpen: this.state.isOpen || false,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
					toggleOpen: this.toggleOpen
				});
			} else {
				this.handleCancel();
			}
		}
	},

	handleCancel () {
		this.setFocus();
		this.handleClose();
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

	// Trigger opens, closes, and recieves focus on close
	saveRefToTrigger (trigger) {
		this.button = trigger;
		if (this.props.buttonRef) {
			this.props.buttonRef(this.button);
		}
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

	renderMenuContent () {
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

	renderInlineMenu () {
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
				{this.renderMenuContent()}
			</div>
			: null
		);
	},

	renderDialog () {
		return (
			!this.props.disabled && this.state.isOpen && this.button
			? <Dialog
				closeOnTabKey
				constrainToScrollParent={this.props.constrainToScrollParent}
				contentsClassName="slds-dropdown slds-dropdown--left"
				flippable
				onClose={this.handleCancel}
				onKeyDown={this.handleKeyDown}
				targetElement={this.button}
				inheritTargetWidth={this.props.inheritTargetWidth}
			>
				{this.renderMenuContent()}
			</Dialog>
			: null
		);
	},

	renderPlaceholder () {
		const option = this.props.options[this.state.selectedIndex];
		return (option && option.label) ? option.label : this.props.placeholder;
	},

	renderTrigger () {
		let isInline;
		/* eslint-disable react/prop-types */
		if (this.props.isInline) {
			isInline = true;
		} else if (this.props.modal !== undefined) {
			isInline = !this.props.modal;
		}
		/* eslint-enable react/prop-types */

		// TODO: make use of <Button>
		return (
			<div
				className={classNames(
						'slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click',
						{ 'slds-is-open': this.state.isOpen },
						this.props.className
					)}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.handleMouseDown}
			>
				<button
					aria-expanded={this.state.isOpen}
					aria-haspopup="true"
					className="slds-button slds-button--neutral slds-picklist__label"
					disabled={this.props.disabled}
					id={this.getId()}
					onClick={!this.props.disabled && this.handleClick}
					ref={this.saveRefToTrigger}
					tabIndex={this.state.isOpen ? -1 : 0}
				>
					<span className="slds-truncate">{this.renderPlaceholder()}</span>
					<Icon name="down" category="utility" />
				</button>
				{isInline ? this.renderInlineMenu() : this.renderDialog()}
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
