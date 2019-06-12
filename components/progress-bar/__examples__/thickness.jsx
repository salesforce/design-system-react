import React from 'react';
import ProgressBar from '~/components/progress-bar';

class Example extends React.Component {
	render() {
		return (
			<div>
				<span>Thickness: x-small</span>
				<ProgressBar value={90} id="progress-bar-x-small" thickness="x-small" />
				<hr />
				<span>Thickness: small</span>
				<ProgressBar value={75} id="progress-bar-small" thickness="small" />
				<hr />
				<span>Thickness: medium</span>
				<ProgressBar value={50} id="progress-bar-medium" thickness="medium" />
				<hr />
				<span>Thickness: large</span>
				<ProgressBar value={25} id="progress-bar-large" thickness="large" />
			</div>
		);
	}
}
Example.displayName = 'ProgressBarThickness';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
