import React from 'react';
import Badge from './badge';

export default function () {
	React.render(<Badge text="label1" />, document.getElementById('badge'));
	React.render(<Badge text="label2" theme="default" />, document.getElementById('badge-default'));
	React.render(<Badge text="label3" theme="shade" />, document.getElementById('badge-shade'));
	React.render(<Badge text="label4" theme="inverse" />, document.getElementById('badge-inverse'));
}
