import React from 'react';
import ProgressBar from '~/components/progress-bar';

class Example extends React.Component {
	render() {
		return (
			<div>
				<span>Radius: circular</span>
				<ProgressBar id="progress-bar-circular" value={75} radius="circular" />
			</div>
		);
	}
}
Example.displayName = 'ProgressBarRadius';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
