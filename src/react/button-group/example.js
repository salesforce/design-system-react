import React from 'react';
import Button from './button';

export default function () {
	const ButtonGroup = React.createClass({
		getInitialState () {
			return {
				selected: false
			};
		},

		render () {
			const self = this;
			return (
				<div className="slds-button-group" role="group">
				<span className="left" onClick={self.handleClick}>Left</span>
				        <button className="right" onClick={function() {alert("right")}}>Right</button>
				        <span className="middle" onClick={function() {alert("middle")}}>Test</span>
					<Button theme="neutral" onClick2={function() {alert("left")}}>Refresh</Button>
					<Button theme="neutral" onClick2={self.handleClick}>Edit</Button>
					<Button theme="neutral">Save</Button>
					<Button iconStyle="icon-border" assistiveText="Selected" stateful><span className="slds-text-not-selected">
						<svg aria-hidden="true" className="slds-button__icon">
							<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
						</svg></span>
					<span className="slds-text-selected">
						<svg aria-hidden="true" className="slds-button__icon">
							<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
						</svg></span>
					<span className="slds-text-selected-focus">
						<svg aria-hidden="true" className="slds-button__icon">
							<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
						</svg></span>
					</Button>
					<Button iconStyle="icon-border-filled" assistiveText="More Actions"><svg aria-hidden="true" className="slds-button__icon">
							<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
						</svg>
					</Button>
				</div>
			);
		},

		handleClick () {
			console.log(this.state.selected);
			this.setState({selected: !this.state.selected});
		}
	});

	React.render(<ButtonGroup/>, document.getElementById('slds-button-group'));
}


// <div className="slds-button-group" role="group">
// 						<Button theme="neutral">Refresh</Button>
// 						<Button theme="neutral">Edit</Button>
// 						<Button theme="neutral">Save</Button>
// 						<Button iconStyle="icon-border" assistiveText="Selected" selected onClick={clickHandler}><span className="slds-text-not-selected">
// 							<svg aria-hidden="true" className="slds-button__icon">
// 								<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
// 							</svg></span>
// 						<span className="slds-text-selected">
// 							<svg aria-hidden="true" className="slds-button__icon">
// 								<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
// 							</svg></span>
// 						<span className="slds-text-selected-focus">
// 							<svg aria-hidden="true" className="slds-button__icon">
// 								<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#filterList"></use>
// 							</svg></span>
// 						</Button>
// 						<Button iconStyle="icon-border-filled" assistiveText="More Actions"><svg aria-hidden="true" className="slds-button__icon">
// 								<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
// 							</svg>
// 						</Button>
// 					</div>
