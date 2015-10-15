import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './spinner';

export default function () {
	ReactDOM.render(<Spinner size="medium" theme="base" />, document.getElementById('spinner'));
}
