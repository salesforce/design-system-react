import React from 'react';
import ReactDOM from 'react-dom';
import Badge from './badge';

export default function () {
	ReactDOM.render(<Badge text="badge" />, document.getElementById('badge'));
	ReactDOM.render(<Badge text="default" theme="default" />, document.getElementById('badge-default'));
	ReactDOM.render(<Badge text="shade" theme="shade" />, document.getElementById('badge-shade'));
	ReactDOM.render(<Badge text="inverse" theme="inverse" />, document.getElementById('badge-inverse'));
}
