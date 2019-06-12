import React from 'react';

import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'ProgressIndicatorStepError';

	render() {
		return (
			<div style={{ padding: '4rem 1rem 0px' }}>
				<ProgressIndicator {...this.props} />
			</div>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
