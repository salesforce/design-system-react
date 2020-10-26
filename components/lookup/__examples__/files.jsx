import React from 'react';

import IconSettings from '~/components/icon-settings';
import Lookup from '~/components/lookup'; // `~` is replaced with design-system-react at runtime

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Lookup
				emptyMessage="No Files found"
				hasError={false}
				iconCategory="utility"
				iconInverse={false}
				iconName="open_folder"
				label="Files"
				onSelect={(item) => {
					console.log(item, ' Selected');
				}}
				options={[
					{ label: 'File 1' },
					{ label: 'File 2' },
					{ label: 'File 3' },
					{ label: 'File 4' },
				]}
				silenceDeprecationWarning
			/>
		</IconSettings>
	);
}

Example.displayName = 'LookupExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
