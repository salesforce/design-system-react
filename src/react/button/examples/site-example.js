import React from 'react';
import {Button} from 'design-system-react';
import {ButtonView} from 'design-system-react';

export default React.createClass({
	getInitialState () {
		return {
			selected: false
		};
	},

	render () {
		return (
	<div>
		<div className="slds-col example">
			<div className="slds-grid slds-grid--vertical">
				<div className="slds-col row">
					<Button text="Neutral" theme="neutral" />
					<Button text="Brand" theme="brand" />
					<Button text="Inverse" theme="inverse" />
					<Button text="Bare Button"/>
				</div>
				<div className="slds-col row">
					<Button text="Small" theme="neutral" size="small" />
					<Button text="Small" theme="brand" size="small" />
					<Button text="Small" theme="inverse" size="small" />
				</div>

				<div className="slds-col row">
					<Button text="Neutral" theme="neutral" icon="utility.table" iconPosition="left" />
					<Button text="Neutral" theme="neutral" icon="utility.table" iconPosition="right" />
					<Button text="Bare & disabled" icon="utility.table" iconPosition="right" iconStyle="icon-bare" disabled />
				</div>
				<div className="slds-col row">
					<Button text="Small" theme="neutral" icon="utility.table" iconPosition="left" size="small" />
					<Button text="Small" theme="neutral" icon="utility.table" iconPosition="right" size="small" />
					<Button text="Small & disabled" icon="utility.table" iconPosition="right" iconStyle="icon-bare" size="small" disabled />
				</div>
				<div className="slds-col row">
					<Button icon="utility.table" assistiveText="Icon More" iconStyle="icon-more" />
					<Button icon="utility.table" assistiveText="Icon More Disabled" iconStyle="icon-more" disabled />
				</div>
				<div className="slds-col row">
					<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container"/>
					<Button icon="utility.table" assistiveText="Icon-container" iconStyle="icon-container" disabled/>

					<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border"/>
					<Button icon="utility.table" assistiveText="Icon-border" iconStyle="icon-border" disabled/>

					<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled"/>
					<Button icon="utility.table" assistiveText="Border-filled" iconStyle="icon-border-filled" disabled/>

					<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small"/>
					<Button icon="utility.table" assistiveText="Icon-small" iconStyle="icon-small" disabled/>
				</div>
			</div>

			<div className="slds-col row">
				<div className="slds-button-stateful" role="group">
					<Button theme="neutral" icon="utility.add" text="Follow" selected={this.state.selected} onClick={this.handleClick}>
						<ButtonView text="Following" view="selected" icon="utility.check"/>
						<ButtonView text="Unfollow" view="selectedHover" icon="utility.close"/>
					</Button>
				</div>
			</div>

		</div>
	</div>
		);
	},

	handleClick () {
		this.setState({selected: !this.state.selected});
	}
});
