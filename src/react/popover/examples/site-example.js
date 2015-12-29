import React from 'react';
import {Popover} from 'design-system-react';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},
	
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
			<div className="react-popover-example-wrap" ref={this._containerRendered}>
				<button id="popover-react-toggle" className="slds-button slds-button--neutral slds-button--x-small" ref={this._buttonRendered} onClick={this._handleClick}>Toggle</button>
				<Popover
					modal={this.props.modal}
					positionedTargetHorizontalAttachment="right"
					alignmentTarget={this.state.target}
					container={this.state.container}
					isOpen={this.state.isOpen}>
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
