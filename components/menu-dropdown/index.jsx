/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Component

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React.

// ### React
// React is an external dependency of the project.

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// ### Children
import Popover from '../popover';
import Button from '../button';
import List from '../menu-list/list';
import ListItem from '../menu-list/list-item';
import ListItemLabel from '../menu-list/list-item-label';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

import { KEYS, EventUtil } from '../../utilities';
import { MENU_DROPDOWN } from '../../utilities/constants';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component.
 */
const MenuDropdown = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_DROPDOWN,

	// ### Prop Types
	propTypes: {
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
		 */
		assistiveText: PropTypes.string,
		/**
		 * CSS classes to be added to triggering button.
		 */
		buttonClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
		 */
		buttonVariant: PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon', 'inverse', 'icon-inverse']),
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		/**
		 * CSS classes to be added to dropdown menu container. By default, It will be added to the `Popover` component.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/**
		 * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint: PropTypes.bool,
		/**
		 * Delay on menu closing in milliseconds.
		 */
		hoverCloseDelay: PropTypes.number,
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory: React.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: React.PropTypes.string,
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant: React.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
		* This prop is passed onto the triggering `Button`. Text within the trigger button.
		*/
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Renders menu within an absolutely positioned container at an elevated z-index.
		 */
		modal: PropTypes.bool,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
		 */
		onBlur: PropTypes.func,
		/**
		 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
		 */
		onFocus: PropTypes.func,
		/**
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn: PropTypes.oneOf(['hover', 'click']),
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseEnter: PropTypes.func,
		/**
		 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		onSelect: PropTypes.func,
		/**
		 * An array of menu item.
		 */
		options: PropTypes.array.isRequired,
		/**
		 * An object of CSS styles that are applied to the triggering button
		 */
		style: PropTypes.object,
		/**
		 * Current selected menu item.
		 */
		value: PropTypes.string,
		/**
		 * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
		 */
		tooltip: PropTypes.node
	},

	getDefaultProps () {
		return {
			align: 'left',
			buttonVariant: 'neutral',
			checkmark: false,
			disabled: false,
			hoverCloseDelay: 300,
			id: shortid.generate(),
			modal: true,
			openOn: 'click'
		};
	},

	getInitialState () {
		return {
			highlightedIndex: 0,
			isClosing: false,
			isFocused: false,
			isHover: false,
			isOpen: false,
			lastBlurredIndex: -1,
			lastBlurredTimeStamp: -1,
			selectedIndex: this.getIndexByValue(this.props.value)
		};
	},

	close () {
		this.setState({ isOpen: false });
	},

	componentDidUpdate (prevProps, prevState) {
		if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
			if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
				this.handleClose();
			}
		}

		if (this.state.isOpen && !prevState.isOpen) {
			this.state.isClosing = false;
		}

		if (this.state.selectedIndex !== prevState.selectedIndex) {
			this.handleClose();
		} else if (this.state.isFocused && !prevState.isFocused) {
			this.close();
		} else if (!this.state.isFocused && prevState.isFocused) {
			if (this.refs.list) {
				if (!this.isUnmounting && this.refs.list) {
					if (!ReactDOM.findDOMNode(this.refs.list).contains(document.activeElement)) {
						this.close();
					}
				}
			}
		} else if (this.state.isClosing && !prevState.isClosing) {
			setTimeout(() => {
				if (this.state.isClosing) {
					this.close();
				}
			}, this.props.hoverCloseDelay);
		}

		if (this.props.value !== prevProps.value) {
			this.handleSelect(this.getIndexByValue(this.props.value));
		}
	},

	componentWillUnmount () {
		this.isUnmounting = true;
	},

	getButtonNode () {
		return ReactDOM.findDOMNode(this.refs.button);
	},

	getIndexByValue (value) {
		let foundIndex = -1;
		if (this.props.options && this.props.options.length) {
			this.props.options.some((element, index) => {
				// unused parameter: array
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
		let value;
		const option = this.props.options[index];
		if (option) {
			value = this.props.options[index];
		}
		return value;
	},

	getListItemRenderer () {
		return this.props.listItemRenderer ? this.props.listItemRenderer : ListItemLabel;
	},

	handleBlur (e) {
		this.setState({ isFocused: false });
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	},

	handleClose () {
		this.setState({
			isOpen: false,
			isHover: false
		});
	},

	handleFocus () {
		this.setState({
			isFocused: true,
			isHover: false
		});
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	},

	handleMouseEnter () {
		this.state.isClosing = false;
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				isHover: true
			});
		}
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter();
		}
	},

	handleMouseLeave () {
		this.setState({ isClosing: true });
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave();
		}
	},

	handleClick () {
		if (!this.state.isOpen) {
			this.setState({ isOpen: true });
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
		}

		if (this.props.onMouseDown) {
			this.props.onMouseDown();
		}
	},

	handleSelect (index) {
		this.setState({ selectedIndex: index });
		this.setFocus();
		if (this.props.onSelect) {
			this.props.onSelect(this.getValueByIndex(index));
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP) {
				EventUtil.trap(event);
				this.setState({
					isOpen: true,
					highlightedIndex: 0
				});
			}

			if (this.props.onKeyDown) {
				this.props.onKeyDown();
			}
		}
	},

	handleUpdateHighlighted (nextIndex) {
		this.setState({ highlightedIndex: nextIndex });
	},

	handleListBlur () {
		this.setState({ isOpen: false });
	},

	handleListItemBlur (index) {
		this.setState({
			lastBlurredIndex: index,
			lastBlurredTimeStamp: Date.now()
		});
	},

	handleCancel () {
		if (!this.state.isHover) {
			this.setFocus();
		}
	},

	setFocus () {
		if (!this.isUnmounting) {
			ReactDOM.findDOMNode(this.getButtonNode()).focus();
		}
	},

	renderPopoverContent () {
		return (
			<List
				checkmark={this.props.checkmark}
				highlightedIndex={this.state.highlightedIndex}
				isHover={this.state.isHover}
				itemRenderer={this.getListItemRenderer()}
				onListBlur={this.handleListBlur}
				onListItemBlur={this.handleListItemBlur}
				onCancel={this.handleCancel}
				onSelect={this.handleSelect}
				onUpdateHighlighted={this.handleUpdateHighlighted}
				options={this.props.options}
				ref="list"
				selectedIndex={this.state.selectedIndex}
				triggerId={this.props.id}
			/>
		);
	},

	renderSimplePopover () {
		return (
			!this.props.disabled && this.state.isOpen ?
				<div
					className={classnames('slds-dropdown', 'slds-dropdown--menu', 'slds-dropdown--left', this.props.className)}
					onMouseEnter={(this.props.openOn === 'hover') ? this.handleMouseEnter.bind(this) : null}
					onMouseLeave={(this.props.openOn === 'hover') ? this.handleMouseLeave.bind(this) : null}
				>
					{this.renderPopoverContent()}
				</div> : null
		);
	},

	renderModalPopover () {
		return (
			!this.props.disabled && this.state.isOpen ?
				<Popover
					className={classnames('slds-dropdown',
						'slds-dropdown--menu',
						`slds-dropdown--${this.props.align}`,
						this.props.className)}
					closeOnTabKey
					dropClass="slds-picklist" // TODO: in next SLDS release, remove slds-picklist class because slds-dropdown--length-5 will be active.
					horizontalAlign={this.props.align}
					flippable
					onClose={this.handleCancel}
					targetElement={this.refs.button}
				>
					{this.renderPopoverContent()}
				</Popover> : null
		);
	},

	render () {
		return (
			<Button
				aria-haspopup="true"
				assistiveText={this.props.assistiveText}
				className={this.props.buttonClassName}
				disabled={this.props.disabled}
				hint={this.props.hint}
				iconName={this.props.iconName}
				iconVariant={this.props.iconVariant}
				id={this.props.id}
				label={this.props.label}
				onBlur={this.props.openOn === 'hover' ? this.handleBlur : null}
				onClick={this.props.openOn === 'click' ? this.handleClick : null}
				onFocus={this.props.openOn === 'hover' ? this.handleFocus : null}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.props.openOn === 'click' ? this.handleMouseDown : null}
				onMouseEnter={this.props.openOn === 'hover' ? this.handleMouseEnter : null}
				onMouseLeave={this.props.openOn === 'hover' ? this.handleMouseLeave : null}
				ref="button"
				style={this.props.style}
				tabIndex={this.state.isOpen ? '-1' : '0'}
				variant={this.props.buttonVariant}
				tooltip={this.props.tooltip}
			>
				{this.props.modal ? this.renderModalPopover() : this.renderSimplePopover()}
			</Button>
		);
	}

});

module.exports = MenuDropdown;
module.exports.ListItem = ListItem;
module.exports.ListItemLabel = ListItemLabel;
