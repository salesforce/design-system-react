import React from 'react';

import IconSettings from '~/components/icon-settings';
import EditDialogPopover from '~/components/popover/edit-dialog'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const DEFAULT_FIRST_NAME = 'John';
const DEFAULT_LAST_NAME = 'Smith';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	constructor(props) {
		super(props);
		const defaultFirstName = 'John';
		const defaultLastName = 'Smith';
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
			<div className="slds-col_padded">
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
				<EditDialogPopover
					body={editDialogPopoverBody}
					heading="Edit First Name"
					isModified={
						this.state.firstName !== this.state.prevFirstName ||
						this.state.lastName !== this.state.prevLastName
					}
					onCancel={this.handleRequestClose}
					onClose={this.handleClose}
					onRequestClose={this.handleRequestClose}
					onSave={this.handleSave}
					handleOpen={this.handleOpen}
					position="absolute"
					align="top left"
					id="popover-error"
					isOpen={this.state.isOpen}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
