// CHECKBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import SearchCore, {CONTROL} from '../../core/search';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

export const SearchObject = {
	mixins: [State, Events],

	_defaultState: {
		activeSearch: '',
		input: ''
	},

	_change (e) {
		this.setState({input: e.target.value});
	},

	_keydown (e) {
		if (e.which === 13) {
			e.preventDefault();
		}
	},

	_keyup (e) {
		if (e.which === 13) {
			e.preventDefault();
			this._action();
		} else if (e.which === 9) {
			e.preventDefault();
		} else if (this.getState('input').length === 0 && this.getProperty('clearOnEmpty')) {
			this.clear();
		}
	},

	_clicked (e) {
		e.preventDefault();

		if (this.getProperty('disabled')) {
			return;
		}

		this._action();
	},

	_search (text) {
		this.setState({activeSearch: text});
		this.trigger('search', text);
	},

	_clear () {
		this.setState({input: '', activeSearch: ''});
		this.trigger('cleared');
	},

	_action () {
		const val = this.getState('input');
		const search = this.getState('activeSearch');
		const inputEmptyOrUnchanged = (val === '' || val === search);

		if (search.length > 0 && inputEmptyOrUnchanged) {
			this._clear();
		} else {
			this._search(val);
		}
	},

	render () {
		const input = this.getState('input');
		const activeSearch = this.getState('activeSearch');

		const classes = {icon: {}, search: {}};
		classes.search[this.cssClasses.SEARCH] = true;
		classes.search[this.cssClasses.INPUT_GROUP] = true;
		classes.search[this.cssClasses.SEARCHED] = (activeSearch.length > 0 || (input !== activeSearch && input.length > 0));
		classes.icon[this.cssClasses.ICON] = true;
		classes.icon[this.cssClasses.SEARCH_ICON] = (activeSearch === '' || input !== activeSearch || input.length === 0);
		classes.icon[this.cssClasses.REMOVE_ICON] = !classes.icon[this.cssClasses.SEARCH_ICON];

		return (
			<div className={classNames(classes.search)} role="search">
				<input ref="input" type="search" disabled={this.props.disabled} className="form-control" placeholder="Search" onChange={this._change} onKeyDown={this._keydown} onKeyUp={this._keyup} value={this.getState('input')}/>
				<span className="input-group-btn">
					<button className="btn btn-default" disabled={this.props.disabled} type="button" onClick={this._clicked}>
						<span className={classNames(classes.icon)}></span>
						<span className="sr-only">Search</span>
					</button>
				</span>
			</div>
		);
	}
};

let Search = Lib.merge({}, SearchCore, SearchObject);

Search = Lib.runHelpers('react', CONTROL, Search);
Search = React.createClass(Search);

export default Search;
