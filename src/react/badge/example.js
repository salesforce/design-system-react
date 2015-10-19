import React from 'react';
import ReactDOM from 'react-dom';
import Badge from './badge';

export default function () {
	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<Badge>badge</Badge>
				<Badge theme="default">default</Badge>
				<Badge theme="shade">shade</Badge>
				<Badge theme="inverse">inverse</Badge>
			</div>
			<div className="slds-col demo-controls"></div>
		</div>
	, document.getElementById('badge-react-control'));
}
