import React from 'react';
import IconSettings from '~/components/icon-settings';
import BreadCrumb from '~/components/breadcrumb'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'BreadCrumbExample';

	render () {
		const trail = [
			<a id="parent-entity" href="javascript:void(0);">
				Parent Entity
			</a>,
			<a href="javascript:void(0);">Parent Record Name</a>,
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<BreadCrumb trail={trail} />
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
