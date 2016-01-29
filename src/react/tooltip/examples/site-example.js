import React       from 'react';
import { Tooltip } from 'design-system-react';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
			isOpen: false
		};
	},

	_buttonRendered (element) {
		this.setState({target: element});
	},

	render () {
		let tooltip = null;
		if (this.state.target) {
			tooltip = (<Tooltip
					alignmentTarget={this.state.target}
					isOpen={this.state.isOpen}
					modal={this.props.modal}
					positionedTargetHorizontalAttachment="right">
					<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>
				</Tooltip>);
		}

		return (
			<div className="react-tooltip-example-wrap">
				<button id="tooltip-react-toggle" className="slds-button slds-button--neutral slds-button--small" ref={this._buttonRendered} onClick={this._handleClick}>Toggle</button>
					{tooltip}
			</div>
		);
	},

	_handleClick () {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
});
