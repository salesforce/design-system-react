import React from 'react';
import BreadCrumb from '~/components/bread-crumb'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'BreadCrumbExample',

	render () {
		const trail = [
			(<a href="#">Parent Entity</a>)
		];

		return (
			<BreadCrumb trail={trail} />
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
