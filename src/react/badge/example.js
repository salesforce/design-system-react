import React from 'react';
import ReactDOM from 'react-dom';
import Badge from './badge';

export default function () {
	ReactDOM.render(<Badge text="label1" />, document.getElementById('badge'));
	ReactDOM.render(<Badge text="label2" theme="default" />, document.getElementById('badge-default'));
	ReactDOM.render(<Badge text="label3" theme="shade" />, document.getElementById('badge-shade'));
	ReactDOM.render(<Badge text="label4" theme="inverse" />, document.getElementById('badge-inverse'));
}
