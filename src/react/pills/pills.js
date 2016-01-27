/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
