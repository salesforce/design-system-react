import React from 'react';

import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		isOpen: false,
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button label="Open Prompt Variant" onClick={this.toggleOpen} />
					<Modal
						disableClose
						footer={[
							<Button
								key="promptBtn"
								label="Got it"
								onClick={this.toggleOpen}
							/>,
						]}
						isOpen={this.state.isOpen}
						onRequestClose={this.toggleOpen}
						prompt="error"
						size="medium"
						title={<span>Service Unavailable</span>}
					>
						<div className="slds-m-around_medium">
							The service you&quot;re trying to reach is unavailable due to
							limited conectivity. Please restart the application or contact
							your system administrator for assistance.
						</div>
					</Modal>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
