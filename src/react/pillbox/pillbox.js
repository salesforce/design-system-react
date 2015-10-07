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

	propTypes: {
		selection: React.PropTypes.any
	},

	render () {
		const items = this._generatePills();

		return (
			<div className="pillbox">
				<ul className="clearfix pill-group">
					{items}
					<li className="pillbox-input-wrap btn-group">
						<input type="text" onKeyUp={this._handleKeyUp} className="form-control pillbox-add-item" placeholder="add item"/>
					</li>
				</ul>
			</div>
		);
	},

	_generatePills () {
		return this._getSelectedItems().map((item, index) => {
			return (
				<PillboxItem key={index} item={item} onClick={this._handleItemClick}/>
			);
		});
	},

	_handleKeyUp (e) {
		if (e.keyCode === 13) {
			this.selectItem({
				text: e.target.value
			});

			e.target.value = '';
		}
	},

	_handleItemClick (item) {
		this._deselectItem(item);
	}

});

Pillbox = Lib.runHelpers('react', CONTROL, Pillbox);
Pillbox = React.createClass(Pillbox);

export default Pillbox;
