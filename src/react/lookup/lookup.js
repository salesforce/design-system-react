/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Lookup Control
// ### React Facade

// Implements the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either control.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/lookup.html), which contains logic that is the same in every facade.
import LookupCore, {CONTROL} from '../../core/lookup';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';
import Openable from '../../traits/openable';
import Positionable from '../../traits/positionable';
import KeyboardNavigable from '../../traits/keyboard-navigable';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// React and ReactDOM are external depdencies of the project.
import React from 'react';
import ReactDOM from 'react-dom';

// [State](../mixins/state.html), [Events](../mixins/events.html), and [genericWillMount](../mixins/generic-will-mount.html) are mixins that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Split out some rendering logic, just to make things easier to read.
import Action from './lookup-action';
import MenuItems from './lookup-menu-items';
import Pills from '../pills/pills';

// Provides the default renderers for items, pills, the header, and the footer.
import DefaultRenderers from './lookup-default-renderers';

// The [Svg helper](../svg/svg.html) for React provides a simple wrapper around the markup required for SVGs, and uses `Lib.getSVGPath` to convert strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg/svg';

// Facades **extends objects** by merging them together, rather than via the prototype chain or imititation of object-oriented inheritance. The important thing to remember is that _some methods will be available to the control which are not declared in this file_. These are not magic methods, they're not black box methods, but you do need to trace the depencies of the control to see where they are coming from. In particular, Lookup extends its [core](../../core/lookup.html), which in turn extends the base control and a series of traits.
let Lookup = Lib.merge({}, LookupCore, {
	// The React facade specifically is also extended via React's standard mixin model. These three mixins hook into native React lifecycle events and expose functionality needed for a cross-framework core. For example, some places in the core or traits a `setState` method is used. In React this is built in to the framework, and the other facades simply borrow the idea for their own use. Similarly, a `setProperties` method is available but in React it is actually a `noop` because React expects a one-way data flow, while in other Frameworks it typically does something very similar to `setState`.
	mixins: [State, Events, genericWillMount],

	// Always use the canonical control name (set in the core) as the React display name.
	displayName: CONTROL,
	
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		id: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		labelPlural: React.PropTypes.string,
		menuFooterRenderer: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuHeaderRenderer: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuItemRenderer: React.PropTypes.func,
		modalMenu: React.PropTypes.bool,
		onAddClick: React.PropTypes.func,
		onChanged: React.PropTypes.func,
		onFilter: React.PropTypes.func,
		pillRenderer: React.PropTypes.func,
		searchIcon: React.PropTypes.string,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
	},
	
	// Additional default properties are shared at the core level and get mixed in via the `_defaultProperties` object, but these "default renderers" are unique to React. They provide functions that render the contents of the menu header, footer, and items as well as pills, but can be overridden by custom renderers passed in via props so that application developers have more control.
	getDefaultProps () {
		return DefaultRenderers;
	},

	// If no selection has been made this does nothing, but we don't want docus to abruptly jump to the control if it renders with something pre-selected so on initial state we set the value of `autoFocusOnNewSelectedItems` to `false`. After a selection has been made this can be set to true. Note that this process may need to be updated in the future to work for multiple selected items.
	getInitialState () {
		return {
			autoFocusOnNewSelectedItems: false
		};
	},

	// While `this._collection` is always kept in sync with `this.props.collection`, `this._filteredCollection` may contain only subset of those items based on the current search value. It's important to populate the filtered collection on initial load as well as every time there is a change to the collection. The collection of items which can be reached via keyboard navigation also needs to be kept up-to-date so that it reflects the current filtered collection. Both of the functions called here live in the core.
	/* TODO: Possibly move these both to state. */
	componentWillMount () {
		const searchResults = this._getFilteredCollection(this._collection, this.state.searchString);
		const navigableItems = this._configureKeyboardNavigation(searchResults);
		
		this.setState({
			searchResults,
			navigableItems
		});

		Positionable.setElement(this, Positionable.attachPositionedElementToBody({classes: 'slds-lookup'}));
		
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.collection) {
			const searchResults = this._getFilteredCollection(this._collection, this.state.searchString);
			const navigableItems = this._configureKeyboardNavigation(searchResults);
			
			this.setState({
				searchResults,
				navigableItems
			});
		}
		
		// Right now we simply update `this.state.autoFocusOnNewSelectedItems` to `true` after initial load so that a selection (pill) will be focused immediately.
		this.setState({
			autoFocusOnNewSelectedItems: true
		});
	},

	componentWillUnmount () {
		if (this.props.modalMenu) {
			Positionable.removeEventListeners(this);
		}
		
		Openable.removeEventListeners(this);
	},

	// While some functionality moves into the core or traits, each facade typically provides its own rendering logic so that it can take advantage of the benefits offered by the framework and maintain appropriate patterns for that framework.
	render () {
		// Get ids for individual child controls based on the id that was given to the lookup or the one that was auto-generated for it.
		const inputId = this._getInputId();
		const activeDescendantId = this._getMenuItemId(this.state.focusedIndex);
		
		// Get the current selection (wrapped in a data adapter) and set a boolean based on whether it contains any items.
		const selectedItems = this._getDataAdapter(this.props.selection);
		const hasSelection = selectedItems.length() > 0;
		
		const isOpen = Openable.isOpen(this);

		// Unlike the header and footer, the pills will always be rendered if there is a selection and there is no option to disable them by passing false to `this.props.pillRenderer`. However, it is still possible to override the contents of the pills by passing in a custom render function.
		let pills;
		if (hasSelection) {
			pills = <Pills onDeselect={this._handleDeselect} renderer={this.props.pillRenderer} selection={this.props.selection} autoFocusOnNewItems={this.state.autoFocusOnNewSelectedItems} accessors={this.accessors} bare={!this.props.multiSelect} />;
		}
		
		// This markup should reflect the design system pattern for the control. If the dropdown menu's parent is `body` and is absolutely positioned in order to visually attach the dropdown to the input, then the dropdown menu is not rendered in this function and is rendered in `componentDidUpdate` with `_renderModalMenu`.
		return (
			<div className={classNames('slds-lookup', { 'slds-has-selection': hasSelection })} id={this.state.id} data-select="single" data-scope="single" data-typeahead="true">
				<div className="slds-form-element">
					<label className="slds-form-element__label" htmlFor={inputId}>{this.props.label}</label>
					<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right" onClick={!hasSelection && this._handleClicked}>
						<Svg icon={this.props.searchIcon} className="slds-input__icon" />
						{pills}
						<input id={inputId} className={classNames('slds-input', { 'slds-hidden': hasSelection })} type="text" tabIndex={this.props.tabIndex} aria-autocomplete="list" aria-owns={this._getMenuId()} role="combobox" aria-expanded={isOpen} aria-activedescendant={activeDescendantId} onChange={this._handleChanged} value={this.state.searchString} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed} ref={this._setInputRef} />
					</div>
				</div>
				{this.props.modalMenu ? null : this._renderMenu()}
			</div>
		);
	},
	
	_renderMenu () {
		const activeDescendantId = this._getMenuItemId(this.state.focusedIndex);
		const isOpen = Openable.isOpen(this);
		
		// The menu header can be hidden by passing `false` to `this.props.menuHeaderRenderer`. The scaffolding needed for accessibility and display of the header is defined by the `Action` child control, but the contents of the control may vary based on the renderer passed in. If a render function (that returns React elements) is passed into the props that will be used to render the header, otherwise it will render the default renderer.
		let header;
		if (Lib.isFunction(this.props.menuHeaderRenderer)) {
			header = <Action id={this._getMenuItemId('header')} activeDescendantId={activeDescendantId} label={this.props.label} renderer={this.props.menuHeaderRenderer} searchString={this.state.searchString} strings={this.state.strings} parentProps={this.props} numResults={this.state.searchResults.length()} />;
		}

		// The menu footer works much the same as the menu header and even receives the same options.
		let footer;
		if (Lib.isFunction(this.props.menuFooterRenderer)) {
			footer = <Action id={this._getMenuItemId('footer')} activeDescendantId={activeDescendantId} label={this.props.labelPlural || this.props.label} renderer={this.props.menuFooterRenderer} searchString={this.state.searchString} strings={this.state.strings} parentProps={this.props} numResults={this.state.searchResults.length()} onClick={this.props.onAddClick} />;
		}

		const menu = (
			<div id={this._getMenuId()} className={classNames('slds-lookup__menu', { 'slds-hide': !isOpen })} role="listbox">
				{header}
				<MenuItems activeDescendantId={activeDescendantId} collection={this.state.searchResults} getMenuItemId={this._getMenuItemId} onSelected={this._handleSelect} strings={this.state.strings} ref={this._setMenuRef} />
				{footer}
			</div>
		);

		return menu;
	},

	// Modal dropdown menus' parent is `body` and are absolutely positioned in order to visually attach the dropdown to the input.
	_renderModalMenu () {
		const menu = this._renderMenu();
		
		ReactDOM.render(menu, Positionable.getElement(this));

		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.setTarget(this, this.elements.input);
		Positionable.position(this);
	},

	_onOpened () {
		Positionable.show(this);
	},

	_onClosed () {
		Positionable.hide(this);
	},

	// After the control has rendered, we may need to scroll the currently selected menu item into view. The function which actually peforms the scrolling lives in the core.
	componentDidUpdate () {
		if (this.props.modalMenu) {
			this._renderModalMenu();
		}

		if (this.elements.menu) this._scrollMenuItems();

		// After an item has been deselected we need to return the focus to the input element.
		/* TODO: It'd be nice if we could get rid of this boolean eventually. */
		if (this._focusOnInput) {
			this.elements.input.focus();
			this._focusOnInput = false;
		}

		const isOpen = Openable.isOpen(this);

		if (this.props.modalMenu && isOpen) {
			Positionable.addEventListeners(this);
		} else if (this.props.modalMenu && !isOpen) {
			Positionable.removeEventListeners(this);
		}
	},

	// Save a reference to the input element after it renders. This is primarily used for setting focus. It is also used for positioning the menu.
	_setInputRef (input) {
		this.elements.input = ReactDOM.findDOMNode(input);
	},

	// Save a reference to the menu element after it renders so that we can modify the scroll position in `this._scrollMenuItems` if we need to.
	_setMenuRef (menu) {
		this.elements.menu = ReactDOM.findDOMNode(menu);
	},

	// Update the search string when the value of the input changes.
	_handleChanged (e) {
		this.search(e.target.value);
	},

	// Clicking on the input should open the menu.
	_handleClicked (e) {
		Openable.open(this, e.nativeEvent);
	},
	
	_handleSelect (item) {
		Multiselectable.selectItem(this, item._item, this.props.selection);
	},

	// The [multiselectable trait](../../traits/multiselectable.html) is used to maintain the collection of selected items. When this event handler is called, it should defer to the trait to deselect either the single item passed in or all of them if no item is provided.
	_handleDeselect (items) {
		Multiselectable.deselectItems(this, items, this.props.selection);
	},
	
	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
		
		this.search('');
		Openable.close(this);
	},

	// After the last item has been removed from the selection the focus should return to the input. We have to set a flag for this here, but the actual focus can't occur until after render.
	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
		
		if (selection.length() <= 0) {
			this._focusOnInput = true;
		}
	},

	// Trap up and down arrow, escape, and enter keypresses and send them to the [keyboard navigable trait](../../traits/keyboard-navigable.html). This makes it easy to add accessibility features to controls where the keyboard should be used to navigate through a collection of items. Hitting enter will select the item while hitting escape will close the menu.
	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			e.preventDefault();
			KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this.state.searchResults);
		// Also listen for character key presses an ensure that the menu it open while typing in the input, but don't actually trap them.
		} else if (e.key.length === 1) {
			Openable.open(this);
		}
	}
});

// `Helpers` are a feature of Facades that allows anyone to register code that can manipulate the control before it is encapsulated in a React class. This allows flexibility for adding custom behavior without modifying the original source, or for adding optional behavior. For example, the jQuery facade uses this mechanism to optionally create jQuery plugin versions of each control. Nothing in the control itself should ever depend on the presence of helpers, as they are completely optional.
Lookup = Lib.runHelpers('react', CONTROL, Lookup);

// Once everything has been merged together and all registered helpers have been run we can create the React class and export the result for consumption by our apps.
Lookup = React.createClass(Lookup);

export default Lookup;
