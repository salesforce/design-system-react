import React from 'react';
import Svg from '../svg/svg';

function getIcon (icon) {
	if (icon) {
		return (
			<Svg className="slds-icon slds-icon-standard-account | slds-pill__icon" icon={icon} />
		);
	}
}

module.exports = {
	renderer (options) {
		return (
			<span>
				{getIcon(options.icon)}
				<span className="slds-pill__label">{options.text}</span>
			</span>
		);
	}
};
