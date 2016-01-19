import React from 'react';
import {Button, ButtonView} from 'design-system-react';

export default React.createClass({
	getInitialState () {
		return {
			buttonStatefulSelected: false,
			buttonStatefulInverseSelected: false,
			buttonIconStateful: false
		};
	},

	render () {
		return (
	<div>
		<div className="slds-col example">
			<div className="slds-grid slds-grid--vertical">
				<div className="slds-col row">
					<Button text="Base"/>
					<Button text="Disabled" disabled/>
				</div>
				<div className="slds-col row">
					<Button text="Neutral" theme="neutral" />
					<Button text="Disabled" theme="neutral" disabled />
					<Button text="Small" theme="neutral" size="small" />
				</div>
				<div className="slds-col row">
					<Button text="Download" theme="neutral" icon="utility.download" iconPosition="left" />
					<Button text="Download" theme="neutral" icon="utility.download" iconPosition="right" />
				</div>
				<div className="slds-col row">
					<Button text="Button Brand" theme="brand" />
					<Button text="Disabled" theme="brand" disabled />
					<Button text="Button Small" theme="brand" size="small" />
				</div>
				<div className="slds-col row">
					<Button text="Button Destructive" theme="destructive" />
					<Button text="Disabled" theme="destructive" disabled />
					<Button text="Button Small" theme="destructive" size="small" />
				</div>
				<div className="slds-col row">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<Button text="Button Inverse" theme="inverse" />
						<Button text="Disabled" theme="inverse" disabled />
						<Button text="Button Small" theme="inverse" size="small" />
					</div>
				</div>
				<div className="slds-col row">
					<div className="slds-button-stateful" role="group">
						<Button theme="neutral" icon="utility.add" text="Follow" selected={this.state.buttonStatefulSelected} onClick={this.handleClickButtonStateful}>
							<ButtonView text="Following" view="selected" icon="utility.check"/>
							<ButtonView text="Unfollow" view="selectedHover" icon="utility.close"/>
						</Button>
					</div>
				</div>
				<div className="slds-col row">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<div className="slds-button-stateful" role="group">
							<Button theme="inverse" icon="utility.add" text="Follow" selected={this.state.buttonStatefulInverseSelected} onClick={this.handleClickButtonStatefulInverse}>
								<ButtonView text="Following" view="selected" icon="utility.check"/>
								<ButtonView text="Unfollow" view="selectedHover" icon="utility.close"/>
							</Button>
						</div>
					</div>
				</div>
				<div className="slds-col row">
					<Button icon="utility.close" assistiveText="Icon: Extra Small" iconStyle="icon-bare" iconSize="x-small" />
					<Button icon="utility.close" assistiveText="Icon: Small" iconStyle="icon-bare" iconSize="small" />
					<Button icon="utility.close" assistiveText="Icon" iconStyle="icon-bare" />
					<Button icon="utility.close" assistiveText="Icon: Large" iconStyle="icon-bare" iconSize="large" />
				</div>
				<div className="slds-col row">
					<Button icon="utility.close" assistiveText="Icon: Extra Small" iconStyle="icon-bare" iconSize="x-small" disabled />
					<Button icon="utility.close" assistiveText="Icon: Small" iconStyle="icon-bare" iconSize="small" disabled />
					<Button icon="utility.close" assistiveText="Icon" iconStyle="icon-bare" disabled />
					<Button icon="utility.close" assistiveText="Icon: Large" iconStyle="icon-bare" iconSize="large" disabled />
				</div>
				<div className="slds-col row">
					<Button icon="utility.table" assistiveText="Icon: Container" iconStyle="icon-container"/>
					<Button icon="utility.table" assistiveText="Icon: Container (disabled)" iconStyle="icon-container" disabled/>
				</div>
				<div className="slds-col row">
					<Button icon="utility.table" assistiveText="Icon: Border" iconStyle="icon-border"/>
					<Button icon="utility.table" assistiveText="Icon: Border (disabled)" iconStyle="icon-border" disabled/>
				</div>
				<div className="slds-col row">
					<div className="slds-box slds-box--x-small | slds-theme--success">
						<Button icon="utility.table" assistiveText="Icon: Border Filled" iconStyle="icon-border-filled"/>
						<Button icon="utility.table" assistiveText="Icon: Border Filled (disabled)" iconStyle="icon-border-filled" disabled/>
					</div>
				</div>
				<div className="slds-col row">
				</div>
				<div className="slds-col row">
					<Button icon="utility.table" assistiveText="Filter" iconStyle="icon-more" />
					<Button icon="utility.table" assistiveText="Filter (disabled)" iconStyle="icon-more" disabled />
				</div>
				<div className="slds-col row">
					<div className="slds-button-icon-stateful" role="group">
						<Button selectable icon="utility.like" iconStyle="icon-border" assistiveText="Like" selected={this.state.buttonIconStateful} onClick={this.handleClickIconStateful}/>
					</div>
				</div>
				<div className="slds-col row">
					<div className="slds-box slds-box--x-small | slds-theme--inverse">
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-inverse" />
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-inverse" disabled />
					</div>
				</div>
				<div className="slds-col row">
					<div className="slds-box slds-box--x-small | slds-hint-parent">
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-bare-hint" />
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-border-hint" />
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-border-filled-hint" />
						<Button icon="utility.close" assistiveText="Close" iconStyle="icon-container-hint" />
					</div>
				</div>
			</div>

			<div className="slds-col row">
			</div>

		</div>
	</div>
		);
	},

	handleClickButtonStateful () {
		this.setState({buttonStatefulSelected: !this.state.buttonStatefulSelected});
	},

	handleClickButtonStatefulInverse () {
		this.setState({buttonStatefulInverseSelected: !this.state.buttonStatefulInverseSelected});
	},

	handleClickIconStateful () {
		this.setState({buttonIconStateful: !this.state.buttonIconStateful});
	}
});
