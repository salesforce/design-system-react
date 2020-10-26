import React from 'react';

import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

function Example(props) {
	return (
		<div style={{ padding: '4rem 1rem 0px' }}>
			<ProgressIndicator {...props} />
		</div>
	);
}

Example.displayName = 'ProgressIndicatorStepError';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
