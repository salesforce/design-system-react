import React from 'react';
import Popover from './index';

// SAMPLE CONTROL CODE -->

const PopoverExample = React.createClass({
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
		let popover = null;
		if (this.state.target) {
			popover = (<Popover
					alignmentTarget={this.state.target}
					isOpen={this.state.isOpen}
					modal={this.props.modal}
					positionedTargetHorizontalAttachment="left">
					<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>
				</Popover>);
		}
		return (
			<div className="react-popover-example-wrap">
				<button id="popover-react-toggle" className="slds-button slds-button--neutral slds-button--small" ref={this._buttonRendered} onClick={this._handleClick}>Toggle</button>
				{popover}
			</div>
		);
	},

	_handleClick () {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}


});

// <-- SAMPLE CONTROL CODE

export default PopoverExample;
