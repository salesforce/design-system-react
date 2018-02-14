import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';

import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime
import Modal from '~/components/modal';

import Button from '~/components/button';

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

const getModal = (props) => <Modal {...props} />;

const modalFooter = (props) => [
	<Button key="modalBCancel" label="Cancel" />,
	<ProgressIndicator
		key="modal-progress-indicator"
		variant="modal"
		steps={steps}
		selectedStep={steps[2]}
		completedSteps={steps.slice(0, 2)}
		errorSteps={steps.slice(2, 3)}
		onStepClick={handleStepEvent}
	/>,
	<Button key="modalBSave" label="Save" variant="brand" />,
];
const modalContent = (
	<div
		className="slds-modal__content slds-grow slds-p-around_medium"
		id="modal-content-id-1"
		style={{ height: '640px' }}
	/>
);

const Example = createReactClass({
	displayName: 'ProgressIndicatorModal',

	render () {
		return (
			<div style={{ height: '640px' }}>
				{getModal({
					isOpen: true,
					title: 'Modal Header',
					children: modalContent,
					onRequestClose: action('modal closed'),
					footer: modalFooter(this.props),
					size: 'large',
					footerClassNames: 'slds-grid slds-grid_align-spread',
				})}
			</div>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
