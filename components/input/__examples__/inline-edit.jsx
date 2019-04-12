import React from 'react';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import EditDialog from '~/components/popover/edit-dialog';

class Example extends React.Component {
	constructor(props) {
		super(props);
		const defaultFirstName = 'John';
		const defaultLastName = 'Smith';
		this.state = {
			isOpen: false,
			input1: defaultFirstName, // stores firstName in edit input field
			input2: defaultLastName, // stores lastName in edit input field
			prevInput1: '',
			prevInput2: '',
			fullName: `${defaultFirstName} ${defaultLastName}`, // concatenated to facilitate code example - up to the consumer to have this or not.
		};
	}

	onChange = (inputName) => (event, { value }) => {
		if (inputName === 'first-name') {
			this.setState({ input1: value });
		} else {
			this.setState({ input2: value });
		}
	};

	handleOpen = () => {
		this.setState({
			isOpen: true,
			prevInput1: this.state.input1,
			prevInput2: this.state.input2,
		});
	};

	handleRequestClose = (event, data) => {
		if (this.props.log) {
			this.props.log('handleRequestClose');
		}
		this.setState({
			isOpen: false,
			input1: this.state.prevInput1,
			input2: this.state.prevInput2,
		});
	};

	handleClose = (event, data) => {
		if (this.props.log) {
			this.props.log('onClose')(event, data);
		}
	};
	handleSave = (event, data) => {
		this.setState({
			fullName: `${this.state.input1} ${this.state.input2}`,
			isOpen: false,
		});
	};

	render() {
		// Content of EditDialogPopover that is shown when clicking on edit (pencil icon)
		const editDialogPopoverBody = (
			<div className="slds-col_padded">
				<Input
					id="first-name"
					label="First Name"
					value={this.state.input1}
					onChange={this.onChange('first-name')}
				/>
				<Input
					id="last-name"
					label="Last Name"
					value={this.state.input2}
					onChange={this.onChange('last-name')}
				/>
			</div>
		);

		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Inline Edit
				</h1>
				<Input
					id="inline-edit"
					editDialogPopover={
						<EditDialog
							body={editDialogPopoverBody}
							heading="Edit First Name"
							isOpen={this.state.isOpen}
							onCancel={this.handleRequestClose}
							onClose={this.handleClose}
							onRequestClose={this.handleRequestClose}
							onSave={this.handleSave}
							position="absolute"
						/>
					}
					onClickEditButton={this.handleOpen}
					label="Full Name"
					value={this.state.fullName}
					variant="edit-dialog"
				/>
			</div>
		);
	}
}

Example.displayName = 'InlineEditInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
