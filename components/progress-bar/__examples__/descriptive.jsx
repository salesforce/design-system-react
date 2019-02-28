import React from 'react';
import ProgressBar from '~/components/progress-bar';

class Example extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: '4rem 1rem 0px',
					background: 'rgb(244, 246, 249)',
				}}
			>
				<ProgressBar value={90} label="Einstein Setup Assistant" />
			</div>
		);
	}
}
Example.displayName = 'ProgressBarDescriptive';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
