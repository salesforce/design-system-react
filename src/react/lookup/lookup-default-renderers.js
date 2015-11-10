import React from 'react';
import Svg from '../svg/svg';

module.exports = {
	menuItemRenderer (options) {
		return (
			<span>
				<Svg className="slds-icon slds-icon-standard-account slds-icon--small" icon={options.icon} />
				{options.text}
			</span>
		);
	},
	_menuHeaderRenderer (options) {
		// TODO: Make string replacement a template function so that it can be configured
		return (
			<span>
				<Svg className="slds-icon slds-icon-text-default slds-icon--small" icon="utility.search" />
				{options.strings.THIS_IN_THAT && options.strings.THIS_IN_THAT.replace('%this%', options.searchString).replace('%that%', options.label)}
			</span>
		);
	},
	// TODO: Re-enable this once scopes are in place
	menuHeaderRenderer: false,
	menuFooterRenderer (options) {
		return (
			<span>
				<Svg className="slds-icon slds-icon-text-default slds-icon--small" icon="utility.add" />
				{options.strings.ADD}
			</span>
		);
	},
	pillRenderer (options) {
		// TODO: This is the same as the menu item renderer, should we collapse this down to one item renderer?
		return (
			<span>
				<Svg className="slds-icon slds-icon-standard-account slds-icon--small" icon={options.icon} />
				{options.text}
			</span>
		);
	}
};
