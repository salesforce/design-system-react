import React from 'react';
import ReactDOM from 'react-dom';
import Popover from './popover';

export default function (element) {
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
				<button type="button" className="slds-button slds-button--neutral" ref="trigger" onClick={this._handleClick}>
					trigger popover
					<Popover placement="right" header={this.state.header} content={this.state.content} isOpen={this.state.isOpen} target={this.refs.trigger}/>
				</button>
			);
		},

		_handleClick () {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	});

	ReactDOM.render(<PopoverExample />, element);
}
