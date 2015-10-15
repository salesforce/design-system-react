import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';

// FIXME: We don't want to ask people to include SVGs or specially classed / formatted elements in order to make the buttons work
// TODO: There should be a sample React "app" here (it can be really small) that makes these controls work for the examples
export default function () {
	ReactDOM.render(<Button >Button</Button>, document.getElementById('slds-button'));
	ReactDOM.render(<Button theme="neutral">Neutral</Button>, document.getElementById('slds-button--neutral'));
	ReactDOM.render(<Button theme="neutral" size="small">Small</Button>, document.getElementById('slds-button--small'));
	ReactDOM.render(<Button theme="brand">Brand</Button>, document.getElementById('slds-button--brand'));
	ReactDOM.render(<Button theme="inverse">Inverse</Button>, document.getElementById('slds-button--inverse'));

	ReactDOM.render(<Button iconStyle="icon-bare"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-bare'));
	ReactDOM.render(<Button iconStyle="icon-bare" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-bare' + '-disabled'));


	ReactDOM.render(<Button assistiveText="Icon-container" iconStyle="icon-container"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-container'));
	ReactDOM.render(<Button assistiveText="Icon-container" iconStyle="icon-container" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-container' + '-disabled'));


	ReactDOM.render(<Button assistiveText="Icon-border" iconStyle="icon-border"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border'));
	ReactDOM.render(<Button assistiveText="Icon-border" iconStyle="icon-border" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border' + '-disabled'));


	ReactDOM.render(<Button assistiveText="Border-filled" iconStyle="icon-border-filled"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border-filled'));
	ReactDOM.render(<Button assistiveText="Border-filled" iconStyle="icon-border-filled" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border-filled' + '-disabled'));


	ReactDOM.render(<Button assistiveText="Icon-small" iconStyle="icon-small"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-small'));
	ReactDOM.render(<Button assistiveText="Icon-small" iconStyle="icon-small" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-small' + '-disabled'));

	// TODO: icon component with props
	ReactDOM.render(<Button theme="neutral" stateful>
		<span className="slds-text-not-selected">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
			</svg>Follow</span>
		<span className="slds-text-selected">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
			</svg>Following</span>
		<span className="slds-text-selected-focus">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
			</svg>Unfollow</span>
		</Button>, document.getElementById('slds-button' + '-stateful'));
	ReactDOM.render(<Button theme="neutral" stateful selected>
		<span className="slds-text-not-selected">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
			</svg>Follow</span>
		<span className="slds-text-selected">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
			</svg>Following</span>
		<span className="slds-text-selected-focus">
			<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
				<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
			</svg>Unfollow</span>
		</Button>, document.getElementById('slds-button' + '-stateful-selected'));
}
