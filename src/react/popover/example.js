import React from 'react';
import ReactDOM from 'react-dom';
import Popover from './popover';

export default function () {
	const PopoverExample = React.createClass({
		getInitialState () {
			return {
				header: 'Popover Heading',
				isOpen: false
			};
		},

		render () {
			return (
				<div className="react-popover-example-wrap" ref="container">
					<button id="popover-react-toggle" className="slds-button slds-button--neutral slds-button--x-small" ref="target" onClick={this._handleClick}>Toggle</button>
					<Popover placement="right" header={this.state.header} align={this.refs.target} container={this.refs.container} isOpen={this.state.isOpen}>
						<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>
					</Popover>
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
