/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Picklist Component --- SLDS for React

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus#picklist) in React.

// [![Picklist component example screenshot](/assets/demo-site/images/component-examples/picklist.png "Picklist component example screenshot")](/react/picklist)

// > See a [live example](/react/picklist) of the Picklist component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';
import isFunction from 'lodash/lang/isFunction';

// Use the [shared core](../../core/picklist.html), which contains logic that is
// shared across SLDS for JavaScript.
import PicklistCore, { CONTROL } from 'slds-for-js-core/components/picklist';

// ### Traits

// #### Eventable
// [../../traits/eventable](../../traits/eventable.html)
import Eventable from 'slds-for-js-core/traits/eventable';

// #### KeyboardNavigable
// [../../traits/keyboard-navigable.html](../../traits/keyboard-navigable.html)
import KeyboardNavigable from 'slds-for-js-core/traits/keyboard-navigable';

// #### Multiselectable
// [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable from 'slds-for-js-core/traits/multiselectable';

// #### Openable
// [../../traits/openable](../../traits/openable.html)
import Openable from 'slds-for-js-core/traits/openable';

// #### Positionable
// [../../traits/positionable](../../traits/positionable.html)
import Positionable from 'slds-for-js-core/traits/positionable';


// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React from 'react';
import ReactDOM from 'react-dom';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State from '../mixins/state';

// ### Children

// Split out some rendering logic, just to make things easier to read.

// #### Picklist Items
// [./picklist-items](./picklist-items.html)
import PicklistItems from './picklist-items';

// #### Button
// [../button](../button.html)
import Button from '../button';

// The [Svg helper](../svg.html) for React provides a simple wrapper
// around the markup required for SVGs, and uses `Lib.getSVGPath` to convert
// strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg';

const { PropTypes } = React;


// ## Picklist Object
export const PicklistDefinition = {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		disabled: PropTypes.bool,
		id: PropTypes.string,
		menuItemRenderer: PropTypes.func,
		modalMenu: PropTypes.bool,
		selection: PropTypes.object,
		// > @todo Type of collection unknown until parsed by Data Adapter
		collection: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]).isRequired
	},

	// ### Component Will Mount
	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody({ classes: 'slds-picklist' }));

		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	// ### Component Will Unmount
	componentWillUnmount () {
		if (this.props.modalMenu) {
			Positionable.removeEventListeners(this);
		}
	},

	// ### Component Did Update
	componentDidUpdate () {
		if (this.props.modalMenu) {
			this._renderModalMenu();
		}

		const isOpen = Openable.isOpen(this);

		if (this.props.modalMenu && isOpen) {
			Positionable.addEventListeners(this);
		} else if (this.props.modalMenu && !isOpen) {
			Positionable.removeEventListeners(this);
		}
	},

	// ### Render
	render () {
		const triggerId = this._getTriggerId();
		const item = this._getSelection();
		const isOpen = Openable.isOpen(this);
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;
		const styles = {
			width: this.state.width
		};

		return (
			<div
				className     = "slds-picklist"
				id            = {this.state.id}
				aria-expanded = {isOpen}
				onKeyDown     = {this._handleKeyPressed}
				onKeyPress    = {this._handleKeyPressed}
			>
				<Button
					id            = {triggerId}
					className     = "slds-picklist__label"
					disabled      = {this.props.disabled}
					onClick       = {this._handleClicked}
					ref           = {this._onButtonRendered}
					style         = {styles}
					theme         = "neutral"
					aria-haspopup = "true"
				>
					<span className="slds-truncate">{selectionName}</span>
					<Svg className="slds-icon" icon="utility.down" />
				</Button>
				{this.props.modalMenu ? null : this._renderMenu()}
			</div>
		);
	},

	// ### Render Menu
	_renderMenu () {
		const isOpen = Openable.isOpen(this);
		const triggerId = this._getTriggerId();

		const menu = (
			<PicklistItems
				checkmark        = {this.props.checkmark}
				id               = {this._getMenuId()}
				menuItemRenderer = {this.props.menuItemRenderer}
				labelledBy       = {triggerId}
				getMenuItemId    = {this._getMenuItemId}
				collection       = {this._collection}
				selection        = {this.props.selection}
				show             = {isOpen}
				onSelected       = {this._handleMenuItemSelected}
			/>
		);

		return menu;
	},

	// ## Render Modal Menu
	_renderModalMenu () {
		// Modal dropdown menus' parent is `body` and are absolutely positioned in order to visually attach the dropdown to the input.
		const menu = this._renderMenu();
		ReactDOM.render(menu, Positionable.getElement(this));
		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.position(this);
	},

	// ## Handle Menu Item Selected
	_handleMenuItemSelected (selection) {
		Multiselectable.selectItem(this, selection._item);
		Openable.close(this);
	},

	// ## Handle Clicked
	_handleClicked (e) {
		Openable.toggle(this, e.nativeEvent);
	},

	// ## Keyboard Select
	_keyboardSelect (item) {
		Multiselectable.selectItem(this, item._item, [this.props.selection]);
	},

	// ## Handle Key Pressed
	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown|Escape)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			const focusedIndex = KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this._collection);
			if (focusedIndex !== undefined) {
				document.getElementById(this._getMenuItemId(focusedIndex)).getElementsByTagName('a')[0].focus();
			}
		}
	},

	// ## On Button Rendered
	_onButtonRendered (element) {
		this.elements.button = ReactDOM.findDOMNode(element);
		Positionable.setTarget(this, ReactDOM.findDOMNode(element));
	},

	// ## On Opened
	_onOpened () {
		this.elements.control.addClass('slds-is-open');
		Positionable.show(this);
	},

	// ## On Closed
	_onClosed () {
		this.elements.control.removeClass('slds-is-open');
		Positionable.hide(this);
	},

	// ## Get Selection
	_getSelection () {
		let item = this._collection.findWhere(this.props.selection);

		if (!item) {
			item = this._getItemAdapter(this.props.selection);
		}

		return item;
	},

	// ## On Select
	_onSelect (itemsToSelect, selection) {
		if (isFunction(this.props.onSelect)) {
			this.props.onSelect(selection.at(0));
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection.at(0));
		}

		Lib.returnFocusToPopupTrigger(this);
	},

	// ## On Deselect
	_onDeselect (itemsToDeselect, selection) {
		if (isFunction(this.props.onDeselect)) {
			this.props.onDeselect(selection.at(0));
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection.at(0));
		}
	}
};

// ## Picklist

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Picklist extends its [core](../../core/picklist.html),
// which in turn extends the base component.

let Picklist = Lib.merge(
	{},
	PicklistCore,
	PicklistDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Picklist = Lib.runHelpers('react', CONTROL, Picklist);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Picklist = React.createClass(Picklist);

export default Picklist;
