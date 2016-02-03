import React       from 'react';
import { Tooltip } from 'design-system-react';

// SAMPLE CONTROL CODE -->

const TooltipExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		const collection = [
			{
				content: 'I should show myself on click.',
				trigger: 'click',
				position: 'right',
				isOpen: false,
				modal: false,
				container: document.querySelector('body')
			},
			{
				content: 'I should show up on hover.',
				trigger: 'hover',
				position: 'bottom',
				isOpen: false,
				modal: false,
				container: document.querySelector('body')
			},
			{
				content: 'I will appear on focus.',
				trigger: 'focus',
				position: 'left',
				isOpen: false,
				modal: false,
				container: document.querySelector('body')
			}
		];

		const tooltipSampleData = {
			collection: collection
		};

		const tooltips = new Map();

		function populateTooltips ( element, index ) {
			tooltips.set('tooltip__' + (index + 1), element);
		}
		tooltipSampleData.collection.forEach(populateTooltips);
		return { tooltips };
	},

	_buttonRendered1 (element) {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__1').target = element;
		this.setState(tooltipsState);
	},
	_buttonRendered2 (element) {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__2').target = element;
		this.setState(tooltipsState);
	},
	_buttonRendered3 (element) {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__3').target = element;
		this.setState(tooltipsState);
	},

	render () {
		let Components = null;
		const tooltipsState = this.state.tooltips;
		if (tooltipsState.get('tooltip__1').target && tooltipsState.get('tooltip__2').target && tooltipsState.get('tooltip__3').target) {
			Components = ([
				<Tooltip
					key={'tooltip__1'}
					alignmentTarget={tooltipsState.get('tooltip__1').target}
					isOpen={tooltipsState.get('tooltip__1').isOpen}
					modal={tooltipsState.get('tooltip__1').modal}
					positionedTargetHorizontalAttachment={tooltipsState.get('tooltip__1').position}>
					<span>{tooltipsState.get('tooltip__1').content}</span>
				</Tooltip>,
				<Tooltip
					key={'tooltip__2'}
					alignmentTarget={tooltipsState.get('tooltip__2').target}
					isOpen={tooltipsState.get('tooltip__2').isOpen}
					modal={tooltipsState.get('tooltip__2').modal}
					positionedTargetHorizontalAttachment={tooltipsState.get('tooltip__2').position}>
					<span>{tooltipsState.get('tooltip__2').content}</span>
				</Tooltip>,
				<Tooltip
					key={'tooltip__3'}
					alignmentTarget={tooltipsState.get('tooltip__3').target}
					isOpen={tooltipsState.get('tooltip__3').isOpen}
					modal={tooltipsState.get('tooltip__3').modal}
					positionedTargetHorizontalAttachment={tooltipsState.get('tooltip__3').position}>
					<span>{tooltipsState.get('tooltip__3').content}</span>
				</Tooltip>
			]);
		}
		return (
			<div className="react-tooltip-example-wrap">
				<button id="tooltip-react-toggle-1" className="slds-button slds-button--neutral slds-button--small" ref={this._buttonRendered1} onClick={this._handleClick1}>Toggle on click</button>
				<button id="tooltip-react-toggle-2" className="slds-button slds-button--neutral slds-button--small" ref={this._buttonRendered2} onMouseOver={this._handleMouseOver2} onMouseOut={this._handleMouseOut2}>Toggle on hover</button>
				<button id="tooltip-react-toggle-3" className="slds-button slds-button--neutral slds-button--small" ref={this._buttonRendered3} onMouseDown={this._handleFocus3} onMouseUp={this._handleBlur3}>Toggle on focus</button>
				{Components}
			</div>
		);
	},

	_handleClick1 () {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__1').isOpen = !(tooltipsState.get('tooltip__1').isOpen);
		this.setState(tooltipsState);
	},
	_handleMouseOver2 () {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__2').isOpen = !(tooltipsState.get('tooltip__2').isOpen);
		this.setState(tooltipsState);
	},
	_handleMouseOut2 () {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__2').isOpen = !(tooltipsState.get('tooltip__2').isOpen);
		this.setState(tooltipsState);
	},
	_handleFocus3 () {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__3').isOpen = !(tooltipsState.get('tooltip__3').isOpen);
		this.setState(tooltipsState);
	},
	_handleBlur3 () {
		const tooltipsState = this.state.tooltips;
		tooltipsState.get('tooltip__3').isOpen = !(tooltipsState.get('tooltip__3').isOpen);
		this.setState(tooltipsState);
	}
});

// <-- SAMPLE CONTROL CODE

export default TooltipExample;
