import React from 'react';
import {Badge} from '../../dist';

export default React.createClass({
	render () {
		return (
		<div>
			<Badge>Label</Badge>
			<Badge theme="default">Label</Badge>
			<Badge theme="shade">Label</Badge>
			<Badge theme="inverse">Label</Badge>
		</div>
		);
	}
});
