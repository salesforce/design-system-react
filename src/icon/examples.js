import React from 'react';
import Icon from './index';

// SAMPLE CONTROL CODE -->

const IconExample = React.createClass({
	render () {
		return (
		<div className="slds-grid slds-grid--vertical">
			<div className="slds-col | slds-m-bottom--medium">
				<Icon category="utility" name="email" inverse={false} />
			</div>
		</div>
		);
	}
});

// <-- SAMPLE CONTROL CODE

export default IconExample;
