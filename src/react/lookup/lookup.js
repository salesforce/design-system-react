// # Lookup Control
// ### React Facade

// Implements the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either control.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/lookup), which contains logic that is the same in every facade.
import LookupCore, {CONTROL} from '../../core/lookup';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// React and ReactDOM are external depdencies of the project.
import React from 'react';
import ReactDOM from 'react-dom';

// [State](../mixins/state), [Events](../mixins/events), and [genericWillMount](../mixins/generic-will-mount) are wrappers that bring some consistency between facades controls.
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Split out some rendering logic, just to make things easier to read.
import Action from './lookup-action';
import MenuItems from './lookup-menu-items';
import Pills from './lookup-pills';

// Provides the default renderers for items, pills, the header, and the footer.
import LookupDefaultRenderers from './lookup-default-renderers';

// The [Svg helper](../svg/svg) for React provides a simple wrapper around the markup required for SVGs, and uses `Lib.getSVGPath` to convert strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg/svg';

/* TODO: Finish documenting the control's methods. */
let Lookup = Lib.merge({}, LookupCore, {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,
	
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		id: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		menuFooterRenderer: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuHeaderRenderer: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		menuItemRenderer: React.PropTypes.func,
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
	
	getDefaultProps () {
		return LookupDefaultRenderers;
	},
	
	getInitialState () {
		return {
			autoFocusOnNewSelectedItems: false
		};
	},

	componentWillMount () {
		this._filteredCollection = this._getFilteredCollection(this._collection, this.state.searchString);
		this._navigableItems = this._configureKeyboardNavigation(this._filteredCollection);
	},
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.collection) this._filteredCollection = this._getFilteredCollection(this._collection, this.state.searchString);
		this._navigableItems = this._configureKeyboardNavigation(this._filteredCollection);
		this.setState({
			autoFocusOnNewSelectedItems: true
		});
	},

	render () {
		const inputId = this._getInputId();
		const activeDescendantId = this._getMenuItemId(this.state.focusedIndex);
		const selectedItems = this._getSelectedItems();
		const hasSelection = selectedItems.length() > 0;
		let pills;
		let header;
		let footer;
		
		if (Lib.isFunction(this.props.menuHeaderRenderer)) {
			header = <Action id={this._getMenuItemId('header')} activeDescendantId={activeDescendantId} label={this.props.label} renderer={this.props.menuHeaderRenderer} searchString={this.state.searchString} strings={this.state.strings} />;
		}
		
		if (Lib.isFunction(this.props.menuFooterRenderer)) {
			footer = <Action id={this._getMenuItemId('footer')} activeDescendantId={activeDescendantId} label={this.props.label} renderer={this.props.menuFooterRenderer} searchString={this.state.searchString} strings={this.state.strings} onClick={this.props.onAddClick} />;
		}
		
		if (hasSelection) {
			pills = <Pills onDeselect={this._handleDeselect} renderer={this.props.pillRenderer} selectedItems={selectedItems} strings={this.state.strings} autoFocusOnNewItems={this.state.autoFocusOnNewSelectedItems}/>;
		}
		
		return (
		<div className={classNames('slds-lookup', { 'slds-has-selection': hasSelection })} id={this.state.id} data-select="single" data-scope="single" data-typeahead="true">
			<div className="slds-form-element">
				<label className="slds-form-element__label" htmlFor={inputId}>{this.props.label}</label>
				<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right" onClick={!hasSelection && this._handleClicked}>
					<Svg icon={this.props.searchIcon} className="slds-input__icon" />
					{pills}
					<input id={inputId} className={classNames('slds-input', { 'slds-hide': hasSelection })} type="text" tabIndex={this.props.tabIndex} aria-autocomplete="list" aria-owns={this._getMenuId()} role="combobox" aria-expanded={this.state.isOpen} aria-activedescendant={activeDescendantId} onChange={this._handleChanged} value={this.state.searchString} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed} ref={this._setInputRef} />
				</div>
			</div>
			<div id={this._getMenuId()} className={classNames('slds-lookup__menu', { 'slds-hide': !this.state.isOpen })} role="listbox">
				{header}
				<MenuItems activeDescendantId={activeDescendantId} collection={this._filteredCollection} getMenuItemId={this._getMenuItemId} onSelected={this._selectItem} strings={this.state.strings} ref={this._setMenuRef} />
				{footer}
			</div>
		</div>
		);
	},
	
	componentDidUpdate () {
		this._scrollMenuItems();
		
		// TODO: This logic probably needs to be cleaned up and will have to be altered to work with multiselect, but it does help make for a smooth experience when navigating by keyboard.
		if (this._focusOnPills) {
//			const deselectPillsButton = this.elements.input[0].parentNode.getElementsByTagName('button');
			
//			if (deselectPillsButton && deselectPillsButton.length === 1) {
//				deselectPillsButton[0].focus();
			this._focusOnPills = false;
//			}
		} else if (this._focusOnInput) {
			this.elements.input[0].focus();
			this._focusOnInput = false;
		}
	},
	
	_setInputRef (input) {
		this.elements.input = Lib.wrapElement(ReactDOM.findDOMNode(input));
	},
	
	_setMenuRef (menu) {
		this.elements.menu = Lib.wrapElement(ReactDOM.findDOMNode(menu));
	},
	
	_handleChanged (e) {
		this.search(e.target.value);
	},
	
	_handleClicked (e) {
		if (e) {
			e.nativeEvent.originator = this;
		}
		
		this.open();
	},
	
	_handleDeselect (item) {
		if (item) {
			this._deselectItem(item);
			if (!this.props.multiSelect) {
				this._focusOnInput = true;
			}
		} else if (!item) {
			this.deselectAll();
			this._focusOnInput = true;
		}
	},

	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			e.preventDefault();
			this._keyboardNav(e.key, this._keyboardSelect);
		} else if (e.key.length === 1) {
			if (!this.state.isOpen) this.open();
			this.elements.input[0].focus();
		}
	}
});

// `Helpers` are a feature of Facades that allows anyone to register code that can manipulate the control before it is encapsulated in a React class. This allows flexibility for adding custom behavior without modifying the original source, or for adding optional behavior. For example, the jQuery facade uses this mechanism to optionally create jQuery plugin versions of each control.
Lookup = Lib.runHelpers('react', CONTROL, Lookup);

// Once everything has been merged together and all registered helpers have been run we can create the React class and export the result for consumption by our apps.
Lookup = React.createClass(Lookup);

export default Lookup;
