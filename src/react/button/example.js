import React from 'react';
import Button from './button';

export default function () {
	React.render(<Button >Button</Button>, document.getElementById('slds-button'));
	React.render(<Button theme="neutral">Neutral</Button>, document.getElementById('slds-button--neutral'));
	React.render(<Button theme="neutral" size="small">Small</Button>, document.getElementById('slds-button--small'));
	React.render(<Button theme="brand">Brand</Button>, document.getElementById('slds-button--brand'));
	React.render(<Button theme="inverse">Inverse</Button>, document.getElementById('slds-button--inverse'));

	React.render(<Button iconStyle="icon-bare"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-bare'));
	React.render(<Button iconStyle="icon-bare" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-bare' + '-disabled'));


	React.render(<Button assistiveText="Icon-container" iconStyle="icon-container"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-container'));
	React.render(<Button assistiveText="Icon-container" iconStyle="icon-container" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-container' + '-disabled'));


	React.render(<Button assistiveText="Icon-border" iconStyle="icon-border"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border'));
	React.render(<Button assistiveText="Icon-border" iconStyle="icon-border" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border' + '-disabled'));


	React.render(<Button assistiveText="Border-filled" iconStyle="icon-border-filled"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border-filled'));
	React.render(<Button assistiveText="Border-filled" iconStyle="icon-border-filled" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-border-filled' + '-disabled'));


	React.render(<Button assistiveText="Icon-small" iconStyle="icon-small"><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-small'));
	React.render(<Button assistiveText="Icon-small" iconStyle="icon-small" disabled><svg aria-hidden="true" className="slds-button__icon">
						<use xlinkHref="/examples/assets/icons/utility-sprite/svg/symbols.svg#table"></use>
					</svg>
		</Button>, document.getElementById('slds-button--icon-small' + '-disabled'));

	// TODO: icon component with props
	React.render(<Button theme="neutral" stateful>
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
	React.render(<Button theme="neutral" stateful selected>
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
