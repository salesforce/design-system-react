// SAMPLE COMPONENT CODE -->
import React from 'react';

import Input from 'slds-for-react/input';

const InputExample = () => (
	<div className="slds-grid slds-grid--vertical">
		<div className="slds-col | slds-m-bottom--medium">
			<Input id="search-input-example" placeholder="Search" iconCategory="utility" iconName="search" label="Search" />
		</div>
	</div>
);

InputExample.displayName = 'InputExample';

// <-- SAMPLE COMPONENT CODE

export default InputExample;
