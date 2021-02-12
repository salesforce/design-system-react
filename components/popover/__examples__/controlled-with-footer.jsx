import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	state = {
		isOpen: false,
	};

	handleOpen = () => {
		this.setState({ isOpen: true });
	};

	handleCancel = () => {
		this.setState({ isOpen: false });
	};

	handleApply = () => {
		this.setState({ isOpen: false });
	};

	handleRequestClose = (event, data) => {
		if (this.props.log) {
			this.props.log('onRequestClose');
		}
		this.setState({ isOpen: false });
	};

	handleClose = (event, data) => {
		if (this.props.log) {
			this.props.log('onClose')(event, data);
		}
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Popover
						isOpen={this.state.isOpen}
						body="Are you sure you want to continue with your action?"
						footer={
							<div className="slds-text-align_right">
								<Button label="Cancel" onClick={this.handleCancel} />
								<Button
									variant="brand"
									label="Apply"
									onClick={this.handleApply}
								/>
							</div>
						}
						heading="Confirmation"
						id="popover-controlled-with-footer"
						onClose={this.handleClose}
						onRequestClose={this.handleRequestClose}
					>
						<Button label="Trigger Popover" onClick={this.handleOpen} />
					</Popover>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
