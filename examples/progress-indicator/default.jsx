import React from 'react';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ProgressIndicatorDefault',

	render () {
		return (
			<div
				data-reactroot=""
				className="demo-only"
				style={{ padding: '2rem 1rem 0px', background: this.props.variant === 'modal' ? 'rgb(244, 246, 249)' : '' }}
			>
				<ProgressIndicator {...this.props} />
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
