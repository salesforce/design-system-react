import React from 'react';
import ProgressBar from '~/components/progress-bar';

class Example extends React.Component {
	render() {
		return (
			<div>
				<ProgressBar
					id="progress-bar-vertical"
					value={60}
					orientation="vertical"
				/>
			</div>
		);
	}
}
Example.displayName = 'ProgressBarVertical';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
