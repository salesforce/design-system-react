import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';
import Svg from '../svg/svg';

// FIXME: We don't want to ask people to include SVGs or specially classed / formatted elements in order to make the buttons work

// TODO: icon component with props
	// <ButtonState icon={Icons.utility.add} text="Follow" assistive_text="Follow" />
	// <Button icon={Icons.utility.add} text="Follow" assistive_text="Follow" hoverState={myHoverButtonState} selectedState={mySelectedState} />
	//

	// <Button icon={Button.icons.utility.add} text="Follow">
	// 	<ButtonView view={Button.view.selected} icon={Button.icons.utility.check} text="Following" />
	// 	<ButtonView view={Button.view.selectedHover} icon={Button.icons.utility.close} text="Unfollow" />
	// </Button>
	//

export default function () {
	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<Button >Button</Button>
				<Button text="Neutral" icon="utility.table" theme="neutral"/>
				<Button text="Small" icon="utility.table" iconPosition="right" theme="neutral" size="small"/>
				<Button text="Brand" theme="brand"/>
				<Button text="Inverse" theme="inverse"/>

				<Button assistiveText="icon-bare" iconStyle="icon-bare"/>
				<Button text="Icon Bare & disabled" icon="utility.table" iconPosition="right" iconStyle="icon-bare" disabled/>

				<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container"/>
				<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container" disabled/>

				<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border"/>
				<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border" disabled/>

				<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled"/>
				<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled" disabled/>

				<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small"/>
				<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small" disabled/>
			</div>
			<div className="slds-col demo-controls">
				<Button theme="neutral" stateful>
					<span className="slds-text-not-selected">
						<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.add"/>Follow</span>
					<span className="slds-text-selected">
							<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.check"/>Following</span>
					<span className="slds-text-selected-focus">
						<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.close"/>Unfollow</span>
				</Button>

				<Button theme="neutral" stateful selected>
					<span className="slds-text-not-selected">
						<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.add"/>Follow</span>
					<span className="slds-text-selected">
							<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.check"/>Following</span>
					<span className="slds-text-selected-focus">
						<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.close"/>Unfollow</span>
				</Button>
			</div>
		</div>
	, document.getElementById('button-react-control'));
}
