// PILLBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PillboxCore, {CONTROL} from '../../core/pillbox';

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
		return this._getSelectedItems().map((item, index) => {
			return (
				<PillboxItem key={index} item={item} onClick={this._deselectItem} strings={this.state.strings}/>
			);
		});
	}
});

Pillbox = Lib.runHelpers('react', CONTROL, Pillbox);
Pillbox = React.createClass(Pillbox);

export default Pillbox;
