import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime
import Modal from '../../components/modal';

import Button from '../../components/button';

const getModal = (props) => (
	<Modal {...props} />
);

const modalFooter = (props) => [
	<Button key="modalBCancel" label="Cancel" />,
	<ProgressIndicator key="modal-progress-indicator" variant="modal" {...props} />,
	<Button key="modalBSave" label="Save" variant="brand" />
];
const modalContent = (
	<div className="slds-modal__content slds-grow slds-p-around_medium" id="modal-content-id-1" style={{ height: '640px' }} />
);

const Example = React.createClass({
	displayName: 'ProgressIndicatorModal',

	render () {
		return (
			<div data-reactroot="" className="demo-only" style={{ height: '640px' }} >
				{
					getModal({
						isOpen: true,
						title: 'Modal Header',
						children: modalContent,
						onRequestClose: action('modal closed'),
						footer: modalFooter(this.props),
						size: 'large',
						footerClassNames: 'slds-grid slds-grid_align-spread'
					})
				}
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
