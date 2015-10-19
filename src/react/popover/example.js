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
				<div className="react-popover-example-wrap">
					<button id="popover-react-toggle" className="slds-button slds-button--neutral slds-button--xsmall" ref="target" onClick={this._handleClick}>Toggle</button>
					<Popover placement="right" header={this.state.header} content={this.state.content} isOpen={this.state.isOpen} target={this.refs.target}/>
				</div>
			);
		},

		_handleClick () {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	});

	ReactDOM.render(<PopoverExample />, document.getElementById('popover-react-control'));
}
