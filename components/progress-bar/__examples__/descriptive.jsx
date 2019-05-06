import React from 'react';
import ProgressBar from '~/components/progress-bar';

class Example extends React.Component {
	render() {
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
}
Example.displayName = 'ProgressBarDescriptive';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
