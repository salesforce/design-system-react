/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// CHECKBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import SearchCore, {CONTROL} from '../../core/search';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';

export const SearchObject = {
	displayName: CONTROL,

	propTypes: {
		disabled: React.PropTypes.bool,
		onDisabled: React.PropTypes.func,
		onEnabled: React.PropTypes.func
	},

	mixins: [State, Events],

	render () {
		return (
			<div className="search input-group" role="search">
				<input type="search" disabled={this.props.disabled} className="form-control" placeholder="Search" />
				<span className="input-group-btn">
					<button className="btn btn-default" disabled={this.props.disabled} type="button">
						<span className="glyphicon glyphicon-search"></span>
						<span className="sr-only">Search</span>
					</button>
				</span>
			</div>
		);
	},

	componentDidMount () {
		this._getElements(this.getDOMNode());
		this._addEventListeners();
	},

	componentWillUnmount () {
		this._removeEventListeners();
	}
};

let Search = Lib.merge({}, SearchCore, SearchObject);

Search = Lib.runHelpers('react', CONTROL, Search);
Search = React.createClass(Search);

export default Search;
