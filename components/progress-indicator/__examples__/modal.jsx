import React from 'react';

import { action } from '@storybook/addon-actions';

import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime
import Modal from '~/components/modal';

import Button from '~/components/button';

import log from '../../../utilities/log';

const steps = [
	{
		id: 0,
		label: <i>tooltip label #1</i>,
		assistiveText: 'This is custom text in the assistive text key - Completed',
	},
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: <strong>tooltip label #3</strong> },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const handleStepEvent = function handleStepEventFunction(event, data) {
	log({
		action,
		event,
		eventName: 'On Step Click',
		data,
	});
};

const getModal = (props) => <Modal {...props} />;

const modalFooter = () => [
	<Button key="modalBCancel" label="Cancel" />,
	<ProgressIndicator
		key="modal-progress-indicator"
		variant="modal"
		steps={steps}
		selectedStep={steps[2]}
		completedSteps={steps.slice(0, 2)}
		disabledSteps={steps.slice(3, 5)}
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

class Example extends React.Component {
	static displayName = 'ProgressIndicatorModal';

	render() {
		return (
			<div style={{ height: '640px' }}>
				{getModal({
					isOpen: true,
					title: 'Modal Header',
					children: modalContent,
					onRequestClose: action('modal closed'),
					footer: modalFooter(),
					size: 'large',
					footerClassNames: 'slds-grid slds-grid_align-spread',
				})}
			</div>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
