// SAMPLE COMPONENT CODE -->
import React from 'react';

import Icon from 'slds-for-react/icon';

const IconExample = () => (
	<div className="slds-grid slds-grid--vertical">
		<div className="slds-col | slds-m-bottom--medium">
			<Icon category="utility" name="email" inverse={false} />
			<Icon category="action" name="email" inverse={false} />
			<Icon category="action" name="email" inverse={false} circle={true} />
			<Icon category="action" name="email" inverse={false} circle={true} className="slds-icon-text-warning" />
			<Icon category="standard" name="email" inverse={false} circle={true} className="slds-icon-text-warning" />
		</div>
	</div>
);

IconExample.displayName = 'IconExample';

// <-- SAMPLE COMPONENT CODE

export default IconExample;
