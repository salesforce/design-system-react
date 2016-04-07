import React from 'react';
import Badge from './index';

// SAMPLE CONTROL CODE -->

const BadgeExample = () => (
	<div className="slds-grid slds-grid--vertical">
		<div className="slds-col | slds-m-bottom--medium">
			<Badge>Base</Badge>
			<Badge theme="default">Default</Badge>
			<Badge theme="shade">Shade</Badge>
			<Badge theme="inverse">Inverse</Badge>
		</div>
		<div className="slds-col | slds-m-bottom--medium">
			<Badge theme="alt-inverse">Alt Inverse</Badge>
			<Badge theme="info">Info</Badge>
			<Badge theme="success">Success</Badge>
		</div>
		<div className="slds-col | slds-m-bottom--medium">
			<Badge theme="warning">Warning</Badge>
			<Badge theme="error">Error</Badge>
			<Badge theme="offline">Offline</Badge>
			<Badge theme="shade-alert-texture">Shade - Alert Texture</Badge>
		</div>
	</div>
);

BadgeExample.displayName = 'BadgeExample';

// <-- SAMPLE CONTROL CODE

export default BadgeExample;
