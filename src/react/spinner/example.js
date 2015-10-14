import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './spinner';

export default function (element) {
	ReactDOM.render(<Spinner size="medium" theme="base" />, element);
}
