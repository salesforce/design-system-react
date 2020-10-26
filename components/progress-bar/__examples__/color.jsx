import React from 'react';
import ProgressBar from '~/components/progress-bar';

function Example() {
	return (
		<div>
			<span>Color: success</span>
			<ProgressBar id="progress-bar-success" value={75} color="success" />
		</div>
	);
}

Example.displayName = 'ProgressBarColor';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
