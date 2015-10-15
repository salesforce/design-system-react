import React from 'react';
import ReactDOM from 'react-dom';
import Badge from './badge';

export default function () {
	ReactDOM.render(<Badge>label1</Badge>, document.getElementById('badge'));
	ReactDOM.render(<Badge theme="default">label2</Badge>, document.getElementById('badge-default'));
	ReactDOM.render(<Badge theme="shade">label3</Badge>, document.getElementById('badge-shade'));
	ReactDOM.render(<Badge theme="inverse">label4</Badge>, document.getElementById('badge-inverse'));
}
