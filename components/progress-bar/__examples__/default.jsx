import React from 'react';
import ProgressBar from '~/components/progress-bar';

function Example() {
	return (
		<div>
			<ProgressBar id="progress-bar" value={75} />
		</div>
	);
}

Example.displayName = 'ProgressBarDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
