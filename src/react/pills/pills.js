// PILLS CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PillsCore, {CONTROL} from '../../core/pills';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Provides the default renderer for pills
import DefaultRenderer from './pills-default-renderer';

// Children
import Pill from './pill';

let Pills = Lib.merge({}, PillsCore, {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		autoFocusOnNewItems: React.PropTypes.bool,
		bare: React.PropTypes.bool,
		onDeselect: React.PropTypes.func,
		renderer: React.PropTypes.func,
		selection: React.PropTypes.any.isRequired
	},

	getDefaultProps () {
		return DefaultRenderer;
	},

	componentWillMount () {
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	render () {
		const selectedItems = this._getDataAdapter(this.props.selection);
		
		return (
			<div className="slds-pill-container">
				{selectedItems.map((item, index) => {
					return (
						<Pill
							key={index}
							item={item}
							onDeselect={this._handleDeselect}
							renderer={this.props.renderer}
							strings={this.state.strings}
							autoFocus={this.props.autoFocusOnNewItems}
							bare={this.props.bare}
						/>
					);
				})}
			</div>
		);
	},
	
	// The [multiselectable trait](../../traits/multiselectable.html) is used to maintain the collection of selected items. When this event handler is called, it should defer to the trait to deselect either the single item passed in or all of them if no item is provided.
	_handleDeselect (item) {
		if (item) {
			Multiselectable.deselectItem(this, item._item, this.props.selection);
		} else {
			Multiselectable.deselectAll(this, this.props.selection);
		}
	},

	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
});

Pills = Lib.runHelpers('react', CONTROL, Pills);
Pills = React.createClass(Pills);

export default Pills;
