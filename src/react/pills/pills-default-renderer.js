import React from 'react';
import Svg from '../svg/svg';

function getIcon (icon) {
	if (icon) {
		return (
			<Svg className="slds-icon slds-icon-standard-account slds-icon--small" icon={icon} />
		);
	}
}

module.exports = {
	renderer (options) {
		return (
			<span>
				{getIcon(options.icon)}
				{options.text}
			</span>
		);
	}
};
