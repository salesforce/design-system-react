/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Lookup Component --- SLDS for React

// Implements the [Lookup design pattern](https://www.lightningdesignsystem.com/components/lookups) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either component.

// [![Lookup component example screenshot](/assets/demo-site/images/component-examples/lookup.png "Lookup component example screenshot")](/react/lookup)

// > See a [live example](/react/lookup) of the Lookup component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';
import isFunction from 'lodash/lang/isFunction';

// Use the [shared core](../../core/lookup.html), which contains logic that is
// shared across SLDS for JavaScript.
import LookupCore, { CONTROL } from 'slds-for-js-core-components/lookup';

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

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

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
import Action from './lookup-action';
import MenuItems from './lookup-menu-items';
import Pills from '../pills';

// Provides the default renderers for items, pills, the header, and the
// footer.
import DefaultRenderers from './lookup-default-renderers';

// The [Svg helper](../svg.html) for React provides a simple wrapper
// around the markup required for SVGs, and uses `Lib.getSVGPath` to convert
// strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg';

// ## Lookup

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Lookup extends its [core](../../core/lookup.html),
// which in turn extends the base component and a series of traits.

export const LookupDefinition = {
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
	// > Always use the canonical component name (set in the core) as the
	// > React display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		collection         : React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		id                 : React.PropTypes.string,
		label              : React.PropTypes.string.isRequired,
		labelPlural        : React.PropTypes.string,
		menuFooterRenderer : React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuHeaderRenderer : React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuItemRenderer   : React.PropTypes.func,
		modalMenu          : React.PropTypes.bool,
		onAddClick         : React.PropTypes.func,
		onChanged          : React.PropTypes.func,
		onFilter           : React.PropTypes.func,
		pillRenderer       : React.PropTypes.func,
		searchIcon         : React.PropTypes.string,
		selection          : React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
	},

	// ### Get Default Props
	getDefaultProps () {
		// Additional default properties are shared at the core level and get
		// mixed in via the `_defaultProperties` object, but these "default
		// renderers" are unique to React. They provide functions that render
		// the contents of the menu header, footer, and items as well as
		// pills, but can be overridden by custom renderers passed in via
		// props so that application developers have more component.
		return DefaultRenderers;
	},

	// ### Get Initial State
	getInitialState () {
		// If no selection has been made this does nothing.
		return {
			// However, we do not want focus to abruptly jump to the component
			// if it renders with something pre-selected so on initial state
			// we set the value of `autoFocusOnNewSelectedItems` to `false`.

			// After a selection has been made this can be set to true.

			// > Note that this process may need to be updated in the future
			// > to work for multiple selected items.
			autoFocusOnNewSelectedItems: false
		};
	},

	// ### Component Will Mount

	// > @todo: Possibly move these both to state.
	componentWillMount () {
		// While `this._collection` is always kept in sync with
		// `this.props.collection`, `this._filteredCollection` may contain
		// only subset of those items based on the current search value.

		// It's important to populate the filtered collection on initial load
		// as well as every time there is a change to the collection.

		// The collection of items which can be reached via keyboard
		// navigation also needs to be kept up-to-date so that it reflects the
		// current filtered collection.

		// Both of the functions called here live in the core.
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

	// ### Component Will Receive Props
	componentWillReceiveProps (nextProps) {
		if (nextProps.collection) {
			const searchResults = this._getFilteredCollection(this._collection, this.state.searchString);
			const navigableItems = this._configureKeyboardNavigation(searchResults);

			this.setState({
				searchResults,
				navigableItems
			});
		}

		this.setState({
			// Right now we simply update
			// `this.state.autoFocusOnNewSelectedItems` to `true` after
			// initial load so that a selection (pill) will be focused
			// immediately.
			autoFocusOnNewSelectedItems: true
		});
	},

	// ### Component Will Unmount
	componentWillUnmount () {
		if (this.props.modalMenu) {
			Positionable.removeEventListeners(this);
		}

		Openable.removeEventListeners(this);
	},

	// ### Render
	// While some functionality moves into the SLDS for JS core or traits,
	// SLDS for React components typically provides their own rendering
	// logic so that they can take advantage of the benefits offered by
	// React and maintain appropriate patterns for it.
	render () {
		// Get ids for individual child components based on the id that was
		// given to the lookup or the one that was auto-generated for it.
		const inputId = this._getInputId();
		const activeDescendantId = this._getMenuItemId(this.state.focusedIndex);

		// Get the current selection (wrapped in a data adapter) and set a
		// boolean based on whether it contains any items.
		const selectedItems = this._getDataAdapter(this.props.selection);
		const hasSelection = selectedItems.length() > 0;

		const isOpen = Openable.isOpen(this);

		// Unlike the header and footer, the pills will always be rendered if
		// there is a selection and there is no option to disable them by
		// passing false to `this.props.pillRenderer`. However, it is still
		// possible to override the contents of the pills by passing in a
		// custom render function.
		let pills;
		if (hasSelection) {
			pills = <Pills onDeselect={this._handleDeselect} renderer={this.props.pillRenderer} selection={this.props.selection} autoFocusOnNewItems={this.state.autoFocusOnNewSelectedItems} accessors={this.accessors} bare={!this.props.multiSelect} />;
		}

		// This markup should reflect the design system pattern for the
		// component. If the dropdown menu's parent is `body` and is
		// absolutely positioned in order to visually attach the dropdown to
		// the input, then the dropdown menu is not rendered in this function
		// and is rendered in `componentDidUpdate` with `_renderModalMenu`.
		return (
			<div className={classNames('slds-lookup', { 'slds-has-selection': hasSelection })} id={this.state.id} data-select="single" data-scope="single" data-typeahead="true">
				<div className="slds-form-element">
					<label className="slds-form-element__label" htmlFor={inputId}>{this.props.label}</label>
					<div className="slds-form-element__component slds-input-has-icon slds-input-has-icon--right" onClick={!hasSelection && this._handleClicked}>
						<Svg icon={this.props.searchIcon} className="slds-input__icon" />
						{pills}
						<input id={inputId} className={classNames('slds-input', { 'slds-hidden': hasSelection })} type="text" tabIndex={this.props.tabIndex} aria-autocomplete="list" aria-owns={this._getMenuId()} role="combobox" aria-expanded={isOpen} aria-activedescendant={activeDescendantId} onChange={this._handleChanged} value={this.state.searchString} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed} ref={this._setInputRef} />
					</div>
				</div>
				{this.props.modalMenu ? null : this._renderMenu()}
			</div>
		);
	},

	// ### Render Menu
	_renderMenu () {
		const activeDescendantId = this._getMenuItemId(this.state.focusedIndex);
		const isOpen = Openable.isOpen(this);

		// The menu header can be hidden by passing `false` to
		// `this.props.menuHeaderRenderer`.

		// The scaffolding needed for accessibility and display of the header
		// is defined by the `Action` child component, but the contents of the
		// component may vary based on the renderer passed in.

		// If a render function (that returns React elements) is passed into
		// the props that will be used to render the header, otherwise it will
		// render the default renderer.
		let header;
		if (isFunction(this.props.menuHeaderRenderer)) {
			header = <Action id={this._getMenuItemId('header')} activeDescendantId={activeDescendantId} label={this.props.label} renderer={this.props.menuHeaderRenderer} searchString={this.state.searchString} strings={this.state.strings} parentProps={this.props} numResults={this.state.searchResults.length()} />;
		}

		// The menu footer works much the same as the menu header and even
		// receives the same options.
		let footer;
		if (isFunction(this.props.menuFooterRenderer)) {
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

	// ### Render Modal Menu

	// Modal dropdown menus' parent is `body` and are absolutely positioned in
	// order to visually attach the dropdown to the input.
	_renderModalMenu () {
		const menu = this._renderMenu();

		ReactDOM.render(menu, Positionable.getElement(this));

		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.setTarget(this, this.elements.input);
		Positionable.position(this);
	},

	// ### On Opened
	_onOpened () {
		Positionable.show(this);
	},

	// ### On Closed
	_onClosed () {
		Positionable.hide(this);
	},

	// ### Component Did Update
	componentDidUpdate () {
		if (this.props.modalMenu) {
			this._renderModalMenu();
		}

		// After the component has rendered, we may need to scroll the
		// currently selected menu item into view.

		// The function which actually performs the scrolling lives in the
		// core.
		if (this.elements.menu) this._scrollMenuItems();

		// After an item has been deselected we need to return the focus to
		// the input element.

		// > @todo It'd be nice if we could get rid of this boolean
		// >     eventually.
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

	// ### Set Input Ref
	_setInputRef (input) {
		// Save a reference to the input element after it renders.

		// This is primarily used for setting focus. It is also used for
		// positioning the menu.
		this.elements.input = ReactDOM.findDOMNode(input);
	},

	// ### Set Menu Ref
	_setMenuRef (menu) {
		// Save a reference to the menu element after it renders so that we
		// can modify the scroll position in `this._scrollMenuItems` if we
		// need to.
		this.elements.menu = ReactDOM.findDOMNode(menu);
	},

	// ### Handle Changed
	_handleChanged (e) {
		// Update the search string when the value of the input changes.
		this.search(e.target.value);
	},

	// ### Handle Clicked
	_handleClicked (e) {
		// Clicking on the input should open the menu.
		Openable.open(this, e.nativeEvent);
	},
	// ### Handle Select
	_handleSelect (item) {

		Multiselectable.selectItem(this, item._item, this.props.selection);
	},

	// ### Handle Deselect
	_handleDeselect (items) {
		// The [multiselectable trait](../../traits/multiselectable.html) is
		// used to maintain the collection of selected items.

		// When this event handler is called, it should defer to the trait to
		// deselect either the single item passed in or all of them if no item
		// is provided.
		Multiselectable.deselectItems(this, items, this.props.selection);
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		if (isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}

		this.search('');
		Openable.close(this);
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		if (isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}

		if (selection.length() <= 0) {
			// After the last item has been removed from the selection the
			// focus should return to the input.

			// We have to set a flag for this here, but the actual focus can't
			// occur until after render.
			this._focusOnInput = true;
		}
	},

	// ### Handle Key Pressed
	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			// Trap up and down arrow, escape, and enter keypresses and send
			// them to the [keyboard navigable trait](../../traits/keyboard-
			// navigable.html).

			// This makes it easy to add accessibility features to components
			// where the keyboard should be used to navigate through a
			// collection of items. Hitting enter will select the item while
			// hitting escape will close the menu.
			e.preventDefault();
			KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this.state.searchResults);
		} else if (e.key.length === 1) {
			// Also listen for character key presses an ensure that the menu
			// it open while typing in the input, but don't actually trap
			// them.
			Openable.open(this);
		}
	}
};

let Lookup = Lib.merge(
	{},
	LookupCore,
	LookupDefinition
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
Lookup = Lib.runHelpers('react', CONTROL, Lookup);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Lookup = React.createClass(Lookup);

export default Lookup;
