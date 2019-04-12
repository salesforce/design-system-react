import React from 'react';

import IconSettings from '~/components/icon-settings';
import EditDialog from '~/components/popover/edit-dialog'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
    static displayName = 'PopoverExample';

    constructor(props) {
			super(props);
			const defaultFirstName = 'John';
			const defaultLastName = 'Smith';
			this.state = {
				isOpen: this.props.isOpen,
				input1: defaultFirstName, // stores firstName in edit input field
				input2: defaultLastName, // stores lastName in edit input field
				prevInput1: defaultFirstName,
				prevInput2: defaultLastName,
			};
    }
		onChange = (inputName) => (event, { value }) => {
			if (inputName === 'first-name') {
				this.setState({ input1: value });
			} else {
				this.setState({ prevInput2: this.state.input2, input2: value });
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
					input1: this.state.prevInput1,
					input2: this.state.prevInput2,
				});
    };

    handleSave = (event, data) => {
			this.setState({
				prevInput1: this.state.input1,
				isOpen: false,
			});
		};

		handleOpen = () => {
			this.setState({
				isOpen: true,
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
			<IconSettings iconPath="/assets/icons">
				<EditDialog
					body={editDialogPopoverBody}
					heading="Edit First Name"
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
