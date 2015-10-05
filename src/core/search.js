// SEARCH CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'search';

const SearchCore = Lib.merge({}, Base, Disableable, {
	_defaultProperties: {
		clearOnEmpty: false
	},

	cssClasses: {
		ICON: 'glyphicon',
		INPUT_GROUP: 'input-group',
		REMOVE_ICON: 'glyphicon-remove',
		SEARCH: 'search',
		SEARCH_ICON: 'glyphicon-search',
		SEARCHED: 'searched'
	}
});

export default SearchCore;
