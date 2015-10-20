import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip';

export default function () {
	const TooltipExample = React.createClass({
		getInitialState () {
			return {
				isOpen: false
			};
		},

		render () {
			return (
				<div className="react-tooltip-example-wrap">
					<button id="tooltip-react-toggle" className="slds-button slds-button--neutral slds-button--x-small" ref="target" onClick={this._handleClick}>Toggle</button>
					<Tooltip placement="right" isOpen={this.state.isOpen} align={this.state.align}>
						<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>
					</Tooltip>
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

	ReactDOM.render(<TooltipExample />, document.getElementById('tooltip-react-control'));
}
