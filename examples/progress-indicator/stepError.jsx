import React from 'react';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ProgressIndicatorStepError',

	render () {
		return (
			<div data-reactroot="" className="demo-only" 
                style={{ "padding": "2rem 1rem 0px" }}>
				<ProgressIndicator steps={this.props.steps} currentStep={1} hasError 
								   onStepClick={this.props.onStepClick} onStepFocus={this.props.onStepFocus} />
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
