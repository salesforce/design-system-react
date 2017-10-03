import React from 'react';
import createReactClass from 'create-react-class';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Example = createReactClass({
	displayName: 'ModalExample',

	getInitialState () {
		return {
			isOpen: false
		};
	},

	toggleOpen () {
		this.setState({ isOpen: !this.state.isOpen });
	},

	render () {
		return (
			<div>
				<Button label="Open Prompt Variant" onClick={this.toggleOpen} />
				<Modal
					dismissible={false}
					footer={[<Button key="promptBtn" label="Got it" onClick={this.toggleOpen} />]}
					isOpen={this.state.isOpen}
					onRequestClose={this.toggleOpen}
					prompt="error"
					size="medium"
					title={<span>Service Unavailable</span>}
				>
					<div className="slds-m-around--medium">The service you&quot;re trying to reach is unavailable due to limited conectivity. Please restart the application or contact your system administrator for assistance.
					</div>
				</Modal>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
