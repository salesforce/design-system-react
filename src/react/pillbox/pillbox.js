// PILLBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

// Traits
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
			Multiselectable.deselectItem.call(this, item._item, this.props.selection);
		} else {
			Multiselectable.deselectAll.call(this, this.props.selection);
		}
	}
});

Pillbox = Lib.runHelpers('react', CONTROL, Pillbox);
Pillbox = React.createClass(Pillbox);

export default Pillbox;
