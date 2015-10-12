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
			<div className="pillbox slds-pillbox">
				<ul className="slds-pill-group">
					{items}
					<li className="slds-pill-input-wrap">
						<input type="text" onKeyUp={this._handleKeyUp} className="slds-pill-add-item" placeholder="add item"/>
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
		let inputValue;

		if (this._isAcceptKeyCode(e.keyCode)) {
			inputValue = e.target.value;

			// If commas are an accepted keycode clean inputValue of commas
			if (e.keyCode === 188 && this._isAcceptKeyCode(188)) {
				inputValue = inputValue.replace(/[ ]*\,[ ]*/, '');
			}

			// TODO: This will need to be updated when typeahead feature is added
			this.selectItem({
				text: inputValue,
				value: inputValue
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
