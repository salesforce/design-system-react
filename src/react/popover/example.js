import React from 'react';
import ReactDOM from 'react-dom';
import Popover from './popover';

export default function () {
	const PopoverExample = React.createClass({
		getInitialState () {
			return {
				header: 'Test Header',
				content: <span>This is test content for the popover</span>,
				isOpen: false
			};
		},

		render () {
			return (
				<button type="button" className="slds-button slds-button--neutral" ref="target" onClick={this._handleClick}>
					trigger popover
					<Popover placement="right" header={this.state.header} content={this.state.content} isOpen={this.state.isOpen} target={this.refs.target}/>
				</button>
			);
		},

		_handleClick () {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	});

	ReactDOM.render(<PopoverExample />, document.getElementById('popover'));
}
