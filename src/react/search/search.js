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
