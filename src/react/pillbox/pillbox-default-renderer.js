import React from 'react';
import Svg from '../svg/svg';

module.exports = {
	renderer (options) {
		return (
			<span>
				<Svg className="slds-icon slds-icon-standard-account slds-icon--small" icon={options.icon} />
				{options.text}
			</span>
		);
	}
};
