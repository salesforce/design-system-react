import React from 'react';

import IconSettings from '~/components/icon-settings';
import EditDialog from '~/components/popover/edit-dialog'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

const DEFAULT_FIRST_NAME = 'John';
const DEFAULT_LAST_NAME = 'Smith';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			firstName: DEFAULT_FIRST_NAME, // stores firstName in edit input field
			lastName: DEFAULT_LAST_NAME, // stores lastName in edit input field
			prevFirstName: DEFAULT_FIRST_NAME,
			prevLastName: DEFAULT_LAST_NAME,
		};
	}

	onChange = (inputName) => (event, { value }) => {
		if (inputName === 'first-name') {
			this.setState({ firstName: value });
		} else {
			this.setState({ lastName: value });
		}
	};

	handleClose = (event, data) => {
		if (this.props.log) {
			this.props.log('onClose')(event, data);
		}
	};

	handleRequestClose = (event, data) => {
		if (this.props.log) {
			this.props.log('handleRequestClose');
		}
		this.setState({
			isOpen: false,
			firstName: this.state.prevFirstName,
			lastName: this.state.prevLastName,
		});
	};

	handleSave = (event, data) => {
		this.setState({
			prevFirstName: this.state.firstName,
			prevLastName: this.state.lastName,
			isOpen: false,
		});
	};

	handleOpen = () => {
		this.setState({
			isOpen: true,
		});
	};

	render() {
		// Body of Edit Dialog that is shown when clicking on edit button (pencil icon)
		const editDialogPopoverBody = (
			<div className="slds-form slds-form_stacked slds-p-top_medium slds-p-right_small slds-p-left_small">
				<h2 id="edit-name" className="slds-assistive-text">
					Edit Name
				</h2>
				<Input
					id="first-name"
					label="First Name"
					value={this.state.firstName}
					onChange={this.onChange('first-name')}
				/>
				<Input
					id="last-name"
					label="Last Name"
					value={this.state.lastName}
					onChange={this.onChange('last-name')}
				/>
			</div>
		);
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<span className="slds-p-right_x-small">
						{this.state.prevFirstName} {this.state.prevLastName}
					</span>
					<EditDialog
						ariaLabelledby="edit-name"
						body={editDialogPopoverBody}
						isModified={
							this.state.firstName !== this.state.prevFirstName ||
							this.state.lastName !== this.state.prevLastName
						}
						disabled={this.props.disabled}
						onCancel={this.handleRequestClose}
						onClose={this.handleClose}
						onRequestClose={this.handleRequestClose}
						onSave={this.handleSave}
						handleOpen={this.handleOpen}
						position="absolute"
						align="top left"
						id="edit-dialog-popover"
						isOpen={this.state.isOpen}
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
