import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/button';

// FIXME: We don't want to ask people to include SVGs or specially classed / formatted elements in order to make the buttons work
export default function () {
	const ButtonGroupExample = React.createClass({
		getInitialState () {
			return {
				selected: false
			};
		},

		render () {
			return (
				<div className="slds-button-group" role="group">
					<Button theme="neutral">Refresh</Button>
					<Button theme="neutral">Edit</Button>
					<Button theme="neutral">Save</Button>

					<Button theme="neutral" stateful selected={this.state.selected} onClick={this.handleClick}>
						<span className="slds-text-not-selected">
							<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
								<use xlinkHref="/assets/design-system/icons/utility-sprite/svg/symbols.svg#add"></use>
							</svg>Follow</span>
						<span className="slds-text-selected">
							<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
								<use xlinkHref="/assets/design-system/icons/utility-sprite/svg/symbols.svg#check"></use>
							</svg>Following</span>
						<span className="slds-text-selected-focus">
							<svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
								<use xlinkHref="/assets/design-system/icons/utility-sprite/svg/symbols.svg#close"></use>
							</svg>Unfollow</span>
					</Button>
					<Button iconStyle="icon-border-filled" assistiveText="More Actions"><svg aria-hidden="true" className="slds-button__icon">
							<use xlinkHref="/assets/design-system/icons/utility-sprite/svg/symbols.svg#down"></use>
						</svg>
					</Button>
				</div>
			);
		},

		handleClick () {
			this.setState({selected: !this.state.selected});
		}
	});

	ReactDOM.render(<ButtonGroupExample/>, document.getElementById('slds-button-group'));
}
