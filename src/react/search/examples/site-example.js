import React      from 'react';
import ReactDOM   from 'react-dom';
import { Search } from 'design-system-react';

export default function () {
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

	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<SearchExample />
			</div>
			<div className="slds-col demo-controls"></div>
		</div>
	, document.getElementById('search-react-control'));
}
