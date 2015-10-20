import React from 'react';
import ReactDOM from 'react-dom';
import Popover from './popover';

export default function () {
	const PopoverExample = React.createClass({
		getInitialState () {
			return {
				header: 'Test Header',
				isOpen: false
			};
		},

		render () {
			return (
				<div className="react-popover-example-wrap">
					<button id="popover-react-toggle" className="slds-button slds-button--neutral slds-button--x-small" ref="target" onClick={this._handleClick}>Toggle</button>
					<Popover placement="right" header={this.state.header} isOpen={this.state.isOpen} align={this.state.align}>
						<span>This is test content for the popover</span>
					</Popover>
				</div>
			);
		},

		_handleClick () {
			this.setState({
				isOpen: !this.state.isOpen,
				align: this.refs.target
			});
		}
	});

	ReactDOM.render(<PopoverExample />, document.getElementById('popover-react-control'));
}
