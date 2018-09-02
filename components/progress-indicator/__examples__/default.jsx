import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const steps = [
	{
		id: 0,
		label: <i>tooltip label #1</i>,
		assistiveText: 'This is custom text in the assistive text key',
	},
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: <strong>tooltip label #3</strong> },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const handleStepEvent = function (event, data) {
	console.log(data);
};

const Example = createReactClass({
	displayName: 'ProgressIndicatorDefault',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					style={{
						padding: '2rem 1rem 0px',
						background:
							this.props.variant === 'modal' ? 'rgb(244, 246, 249)' : '',
					}}
				>
					<ProgressIndicator
						steps={steps}
						selectedStep={steps[0]}
						onStepClick={handleStepEvent}
						// tooltipIsOpenSteps={stepsBasic.slice(0, 2)}
					/>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
