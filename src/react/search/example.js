import React from 'react';
import Search from './search';

export default function (element) {
	const SearchExample = React.createClass({
		getInitialState () {
			return {
				disabled: false
			};
		},

		render () {
			return (
				<div>
				<div className="example">
					<Search disabled={this.state.disabled} onSearched={this._search} onCleared={this._cleared} />
				</div>
				<div className="btn-panel action">
					<button className="btn btn-default" onClick={this._enable}>enable</button>
					<button className="btn btn-default" onClick={this._disable}>disable</button>
				</div>
				</div>
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
		},

		_disable () {
			this.setState({
				disabled: true
			});
		},

		_enable () {
			this.setState({
				disabled: false
			});
		}
	});

	React.render(<SearchExample />, element);
}
