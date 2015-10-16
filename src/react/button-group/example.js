import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/button';
import Svg from '../svg/svg';

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
							<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.add"/>Follow</span>
						<span className="slds-text-selected">
								<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.check"/>Following</span>
						<span className="slds-text-selected-focus">
							<Svg className="slds-button__icon--stateful slds-button__icon--left" icon="utility.close"/>Unfollow</span>
					</Button>
					<Button iconStyle="icon-border-filled" assistiveText="More Actions">
						<Svg className="slds-button__icon--stateful" icon="utility.down"/>
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
