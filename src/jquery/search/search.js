// SEARCH CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import SearchCore, {CONTROL} from '../../core/search';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template import
import template from './search-template';

let Search = function Search (element, options) {
	this.eventSuffix = 'fu.search';
	this.options = Lib.extend({}, options);
	this._initializeState();
	this._initialize(this.options);
	this.setState({activeSearch: ''});
	element.innerHTML = template;
	this._getElements(element);
	this.elements.wrapper = $(element);
	this._addEventListeners();
};

const SearchObject = {
	destroy () {
		this._removeEventListeners();
		return this.elements.root.outerHTML;
	}
};

Lib.merge(Search.prototype, SearchCore, Events, State, SearchObject);

Search = Lib.runHelpers('jquery', CONTROL, Search);

export default Search;
