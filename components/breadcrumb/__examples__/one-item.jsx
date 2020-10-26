import React from 'react';

import IconSettings from '~/components/icon-settings';
import BreadCrumb from '~/components/breadcrumb'; // `~` is replaced with design-system-react at runtime

function Example() {
	const trail = [<a href="javascript:void(0);">Parent Entity</a>];

	return (
		<IconSettings iconPath="/assets/icons">
			<BreadCrumb trail={trail} />
		</IconSettings>
	);
}

Example.displayName = 'BreadCrumbExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
