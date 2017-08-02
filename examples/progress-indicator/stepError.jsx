import React from 'react';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ProgressIndicatorStepError',

	render () {
		return (
			<div
				style={{ padding: '2rem 1rem 0px' }}
			>
				<ProgressIndicator {...this.props} />
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
