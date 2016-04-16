import React from 'react';
import Button from './index';
import ButtonView from './view';

// SAMPLE COMPONENT CODE -->

const ButtonExample = React.createClass({
	displayName: 'ButtonExample',

	getInitialState () {
		return {
			buttonStatefulSelected: false,
			buttonStatefulInverseSelected: false,
			buttonIconStateful: false
		};
	},

	render () {
		/* eslint-disable max-len */
		return (
			<div className="slds-grid slds-grid--vertical">

				<div className="slds-col | slds-m-bottom--small">
					<Button text="Base" />
					<Button text="Disabled" disabled />
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Button text="Neutral" theme="neutral" />
					<Button text="Disabled" theme="neutral" disabled />
					<Button text="Small" theme="neutral" size="small" />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button text="Download" theme="neutral" iconCategory="utility" iconName="download" iconPosition="left" />
					<Button text="Download" theme="neutral" iconCategory="utility" iconName="download" iconPosition="right" />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button text="Button Brand" theme="brand" />
					<Button text="Disabled" theme="brand" disabled />
					<Button text="Button Small" theme="brand" size="small" />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button text="Button Destructive" theme="destructive" />
					<Button text="Disabled" theme="destructive" disabled />
					<Button text="Button Small" theme="destructive" size="small" />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<Button text="Button Inverse" theme="inverse" />
						<Button text="Disabled" theme="inverse" disabled />
						<Button text="Button Small" theme="inverse" size="small" />
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-button-stateful" role="group">
						<Button theme="neutral" iconCategory="utility" iconName="add" text="Follow" selected={this.state.buttonStatefulSelected} onClick={this.handleClickButtonStateful}>
							<ButtonView text="Following" view="selected" iconCategory="utility" iconName="check" />
							<ButtonView text="Unfollow" view="selectedHover" iconCategory="utility" iconName="close" />
						</Button>
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<div className="slds-button-stateful" role="group">
							<Button theme="inverse" iconCategory="utility" iconName="add" text="Follow" selected={this.state.buttonStatefulInverseSelected} onClick={this.handleClickButtonStatefulInverse}>
								<ButtonView text="Following" view="selected" iconCategory="utility" iconName="check" />
								<ButtonView text="Unfollow" view="selectedHover" iconCategory="utility" iconName="close" />
							</Button>
						</div>
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Extra Small" iconStyle="icon-bare" iconSize="x-small" />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Small" iconStyle="icon-bare" iconSize="small" />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon" iconStyle="icon-bare" />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Large" iconStyle="icon-bare" iconSize="large" />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Extra Small" iconStyle="icon-bare" iconSize="x-small" disabled />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Small" iconStyle="icon-bare" iconSize="small" disabled />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon" iconStyle="icon-bare" disabled />
					<Button iconCategory="utility" iconName="close" assistiveText="Icon: Large" iconStyle="icon-bare" iconSize="large" disabled />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button iconCategory="utility" iconName="table" assistiveText="Icon: Container" iconStyle="icon-container" />
					<Button iconCategory="utility" iconName="table" assistiveText="Icon: Container (disabled)" iconStyle="icon-container" disabled />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button iconCategory="utility" iconName="table" assistiveText="Icon: Border" iconStyle="icon-border" />
					<Button iconCategory="utility" iconName="table" assistiveText="Icon: Border (disabled)" iconStyle="icon-border" disabled />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-box slds-box--x-small | slds-theme--success">
						<Button iconCategory="utility" iconName="table" assistiveText="Icon: Border Filled" iconStyle="icon-border-filled" />
						<Button iconCategory="utility" iconName="table" assistiveText="Icon: Border Filled (disabled)" iconStyle="icon-border-filled" disabled />
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<Button iconCategory="utility" iconName="table" assistiveText="Filter" iconStyle="icon-more" />
					<Button iconCategory="utility" iconName="table" assistiveText="Filter (disabled)" iconStyle="icon-more" disabled />
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-button-icon-stateful" role="group">
						<Button selectable iconCategory="utility" iconName="like" iconStyle="icon-border" assistiveText="Like" selected={this.state.buttonIconStateful} onClick={this.handleClickIconStateful} />
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-inverse" />
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-inverse" disabled />
					</div>
				</div>
				<div className="slds-col | slds-m-bottom--small">
					<div className="slds-box slds-box--x-small | slds-hint-parent">
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-bare-hint" />
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-border-hint" />
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-border-filled-hint" />
						<Button iconCategory="utility" iconName="close" assistiveText="Close" iconStyle="icon-container-hint" />
					</div>
				</div>
			</div>
		);
		/* eslint-enable max-len */
	},

	handleClickButtonStateful () {
		this.setState({ buttonStatefulSelected: !this.state.buttonStatefulSelected });
	},

	handleClickButtonStatefulInverse () {
		this.setState({ buttonStatefulInverseSelected: !this.state.buttonStatefulInverseSelected });
	},

	handleClickIconStateful () {
		this.setState({ buttonIconStateful: !this.state.buttonIconStateful });
	}
});

// <-- SAMPLE COMPONENT CODE

export default ButtonExample;
