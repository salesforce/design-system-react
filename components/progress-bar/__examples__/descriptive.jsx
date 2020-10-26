import React from 'react';
import ProgressBar from '~/components/progress-bar';

function Example() {
	return (
		<div>
			<ProgressBar
				id="setup-progress-bar"
				value={90}
				labels={{ label: 'Einstein Setup Assistant' }}
			/>
		</div>
	);
}

Example.displayName = 'ProgressBarDescriptive';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
