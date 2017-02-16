import React from 'react';
import BreadCrumb from '~/components/breadcrumb'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'BreadCrumbExample',

	render () {
		const trail = [
			(<a href="javascript:void(0);">Parent Entity</a>),
			(<a href="javascript:void(0);">Parent Record Name</a>)
		];

		return (
			<BreadCrumb trail={trail} />
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
