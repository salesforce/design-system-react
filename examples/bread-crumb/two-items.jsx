import React from 'react';
import BreadCrumb from '~/components/bread-crumb';

const BreadCrumbExample = React.createClass({
	displayName: 'BreadCrumbExample',

	render () {
		const trail = [
			(<a href="#">Parent Entity</a>),
			(<a href="#">Parent Record Name</a>)
		];

		return (
			<BreadCrumb trail={trail} />
			);
	}
});

export default BreadCrumbExample;
