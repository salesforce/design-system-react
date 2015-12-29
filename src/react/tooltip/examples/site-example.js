import React from 'react';
import {Tooltip} from 'design-system-react';

export default React.createClass({
	getInitialState () {
		return {
			isOpen: false
		};
	},

	_containerRendered (element) {
		this.setState({container: element});
	},

	_buttonRendered (element) {
		this.setState({target: element});
	},

	render () {
		return (
			<div className="react-tooltip-example-wrap" ref={this._containerRendered}>
				<button id="tooltip-react-toggle" className="slds-button slds-button--neutral slds-button--x-small" ref={this._buttonRendered} onClick={this._handleClick}>Toggle</button>
				<Tooltip
					positionedTargetHorizontalAttachment="right"
					isOpen={this.state.isOpen}
					alignmentTarget={this.state.target}
					container={this.state.container}>
					<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>
				</Tooltip>
			</div>
		);
	},

	_handleClick () {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
});
