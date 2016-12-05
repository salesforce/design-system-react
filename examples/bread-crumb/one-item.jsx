import React from 'react';
import BreadCrumb from '~/components/bread-crumb';

class BreadCrumbExample extends React.Component {
	render () {
		const trail = [
			(<a href="#">Parent Entity</a>)
		];

		return (
			<BreadCrumb trail={trail} />
			);
	}
}

export default BreadCrumbExample;
