import React from 'react';
import Search from './search';

export default function (element) {
	const SearchExample = React.createClass({
		render () {
			return (
				<Search  onSearch={this._search} onCleared={this._cleared} />
			);
		},

		_search (text) {
			if (console && console.log) {
				console.log('Search: ' + text);
			}
		},

		_cleared () {
			if (console && console.log) {
				console.log('Search box cleared');
			}
		}
	});

	React.render(<SearchExample />, element);
}
