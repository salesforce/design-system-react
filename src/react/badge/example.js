import React from 'react';
import ReactDOM from 'react-dom';
import Badge from './badge';

export default function () {
	ReactDOM.render(<Badge>badge</Badge>, document.getElementById('badge'));
	ReactDOM.render(<Badge theme="default">default</Badge>, document.getElementById('badge-default'));
	ReactDOM.render(<Badge theme="shade">shade</Badge>, document.getElementById('badge-shade'));
	ReactDOM.render(<Badge theme="inverse">inverse</Badge>, document.getElementById('badge-inverse'));
}
