/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Input from '~/components/input';
import Button from '~/components/button';
import InputIcon from '~/components/icon/input-icon';
import Popover from '~/components/popover';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: false,
			savedInputValue: 'Astro',
			currentInputValue: '',
		};
	}

	handleOpen = () => {
		this.setState({
			isOpen: true,
			currentInputValue: this.state.savedInputValue,
		});
	};

	handleCancel = () => {
		this.setState({ isOpen: false });
	};

	handleApply = () => {
		this.setState({
			isOpen: false,
			savedInputValue: this.state.currentInputValue,
		});
	};

	handleRequestClose = () => {
		this.setState({ isOpen: false });
	};

	handleCurrentInputValue = (event) => {
		this.setState({ currentInputValue: event.target.value });
	};

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '400px' }}>
					<Input
						iconRight={
							<Popover
								align="bottom right"
								isOpen={this.state.isOpen}
								body={
									<Input
										onChange={this.handleCurrentInputValue}
										value={this.state.currentInputValue}
									/>
								}
								footer={
									<div className="slds-text-align--right">
										<Button label="Cancel" onClick={this.handleCancel} />
										<Button
											variant="brand"
											label="Save"
											onClick={this.handleApply}
										/>
									</div>
								}
								heading="Edit First Name"
								onClose={this.handleClose}
								onRequestClose={this.handleRequestClose}
							>
								<InputIcon
									// 									className="slds-button__icon_hint"
									onClick={this.handleOpen}
									category="utility"
									name="edit"
								/>
							</Popover>
						}
						label="First Name"
						isStatic
						value={this.state.savedInputValue}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
