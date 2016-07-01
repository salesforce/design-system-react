import Button from 'slds-for-react/button';
import Dropdown from 'slds-for-react/dropdown';
import DropdownTrigger from 'slds-for-react/dropdown/button-trigger';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';

class HeaderTool extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<Dropdown
				collection={this.props.collection}
				selection={this.props.collection[0]}
				nubbinPosition="top right"
				position="top left"
				iconPosition="left"
				id={'slds-global-nav__header__tool-' + new Date().getTime()}
				onChange={this.props.onChange}
			>
				<DropdownTrigger>
					<Button
						className="slds-global-nav__header__shortcut"
						iconCategory={this.props.iconCategory}
						iconName={this.props.iconName}
						iconStyle="icon-container"
						iconSize="large"
						assistiveText="{this.props.assistiveText}"
					/>
				</DropdownTrigger>
			</Dropdown>
		);
	}
}

HeaderTool.displayName = 'HeaderTool';

reactMixin(HeaderTool.prototype, PureRenderMixin);

export default HeaderTool;
