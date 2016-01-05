// PILLBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import PillboxItem from './pillbox-item';

let Pillbox = Lib.merge({}, PillboxCore, {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		selection: React.PropTypes.any
	},

	componentWillMount () {
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	render () {
		const items = this._generatePills();

		return (
			<div className="pillbox slds-pillbox">
				<ul className="slds-pill-group">
					{items}
				</ul>
			</div>
		);
	},

	_generatePills () {
		const selection = this._getDataAdapter(this.props.selection);
		
		return selection.map((item, index) => {
			return (
				<PillboxItem key={index} item={item} onClick={this._handleDeselect} strings={this.state.strings}/>
			);
		});
	},
	
	// The [multiselectable trait](../../traits/multiselectable.html) is used to maintain the collection of selected items. When this event handler is called, it should defer to the trait to deselect either the single item passed in or all of them if no item is provided.
	_handleDeselect (item) {
		if (item) {
			Multiselectable.deselectItem(this, item._item, this.props.selection);
		} else {
			Multiselectable.deselectAll(this, this.props.selection);
		}
	},

	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
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

Pillbox = Lib.runHelpers('react', CONTROL, Pillbox);
Pillbox = React.createClass(Pillbox);

export default Pillbox;
