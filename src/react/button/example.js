import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';
import ButtonView from './button-view';
import ButtonStateful from './button-stateful';

export default function () {
	ReactDOM.render(<Button text="Button"/>, document.getElementById('slds-button'));
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

	ReactDOM.render(<div className="slds-button-group" role="group">
			<Button text="Refresh" theme="neutral"/>
			<Button text="Edit" theme="neutral"/>
			<Button text="Save" theme="neutral"/>
		</div>, document.getElementById('slds-button-group'));

	const ButtonStatefulExample = React.createClass({
		getInitialState () {
			return {
				selected: false
			};
		},

		render () {
			return (
				<ButtonStateful theme="neutral" icon="utility.add" text="Follow" selected={this.state.selected} onClick={this.handleClick}>
					<ButtonView text="Following" view="selected" icon="utility.check"/>
					<ButtonView text="Unfollow" view="selectedHover" icon="utility.close"/>
				</ButtonStateful>
			);
		},

		handleClick () {
			this.setState({selected: !this.state.selected});
		}
	});

	ReactDOM.render(<ButtonStatefulExample/>, document.getElementById('slds-button' + '-stateful'));
}
