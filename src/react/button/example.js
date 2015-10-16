import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';
import Svg from '../svg/svg';

// FIXME: We don't want to ask people to include SVGs or specially classed / formatted elements in order to make the buttons work
// TODO: There should be a sample React "app" here (it can be really small) that makes these controls work for the examples
export default function () {
	ReactDOM.render(<Button >Button</Button>, document.getElementById('slds-button'));
	ReactDOM.render(<Button text="Neutral" icon="utility.table" theme="neutral"/>, document.getElementById('slds-button--neutral'));
	ReactDOM.render(<Button text="Small" icon="utility.table" iconPosition="right" theme="neutral" size="small"/>, document.getElementById('slds-button--small'));
	ReactDOM.render(<Button text="Brand" theme="brand"/>, document.getElementById('slds-button--brand'));
	ReactDOM.render(<Button text="Inverse" theme="inverse"/>, document.getElementById('slds-button--inverse'));

	ReactDOM.render(<Button assistiveText="icon-bare" iconStyle="icon-bare"/>, document.getElementById('slds-button--icon-bare'));
	ReactDOM.render(<Button text="Icon Bare & disabled" icon="utility.table" iconPosition="right" iconStyle="icon-bare" disabled/>, document.getElementById('slds-button--icon-bare' + '-disabled'));

	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container"/>, document.getElementById('slds-button--icon-container'));
	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container" disabled/>, document.getElementById('slds-button--icon-container' + '-disabled'));

	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border"/>, document.getElementById('slds-button--icon-border'));
	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border" disabled/>, document.getElementById('slds-button--icon-border' + '-disabled'));

	ReactDOM.render(<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled"/>, document.getElementById('slds-button--icon-border-filled'));
	ReactDOM.render(<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled" disabled/>, document.getElementById('slds-button--icon-border-filled' + '-disabled'));


	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small"/>, document.getElementById('slds-button--icon-small'));
	ReactDOM.render(<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small" disabled/>, document.getElementById('slds-button--icon-small' + '-disabled'));

	// TODO: icon component with props
	// <ButtonState icon={Icons.utility.add} text="Follow" assistive_text="Follow" />
	// <Button icon={Icons.utility.add} text="Follow" assistive_text="Follow" hoverState={myHoverButtonState} selectedState={mySelectedState} />
	//
	
	// <Button icon={Button.icons.utility.add} text="Follow">
	// 	<ButtonView view={Button.view.selected} icon={Button.icons.utility.check} text="Following" />
	// 	<ButtonView view={Button.view.selectedHover} icon={Button.icons.utility.close} text="Unfollow" />
	// </Button>
	//
	ReactDOM.render(<Button theme="neutral" stateful>
			<span className="slds-text-not-selected">
				<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.add"/>Follow</span>
			<span className="slds-text-selected">
					<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.check"/>Following</span>
			<span className="slds-text-selected-focus">
				<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.close"/>Unfollow</span>
		</Button>, document.getElementById('slds-button' + '-stateful'));
	ReactDOM.render(<Button theme="neutral" stateful selected>
			<span className="slds-text-not-selected">
				<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.add"/>Follow</span>
			<span className="slds-text-selected">
					<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.check"/>Following</span>
			<span className="slds-text-selected-focus">
				<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.close"/>Unfollow</span>
		</Button>, document.getElementById('slds-button' + '-stateful-selected'));
}
