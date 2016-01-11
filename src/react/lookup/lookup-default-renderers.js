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
	menuHeaderRenderer (options) {
		let output;
		
		if (options.numResults <= 0) {
			// TODO: Internationalize
			output = (
				<div>0 Results</div>
			);
		} else {
			// TODO: Make string replacement a template function so that it can be configured
			output = (
				<span>
					<Svg className="slds-icon slds-icon-text-default slds-icon--small" icon="utility.search" />
					{options.strings.THIS_IN_THAT && options.strings.THIS_IN_THAT.replace('%this%', options.searchString).replace('%that%', options.label)}
				</span>
			);
		}
		
		return output;
	},
	menuFooterRenderer (options) {
		return (
			<span>
				<Svg className="slds-icon slds-icon-text-default slds-icon--small" icon="utility.add" />
				{options.strings.ADD}
			</span>
		);
	}
};
