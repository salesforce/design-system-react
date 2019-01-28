import React from 'react';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import PopoverEditDialog from '~/components/popover/popover-edit-dialog';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            inputValue1: null, // stores firstName in edit input field
            inputValue2: null, // stores lastName in edit input field
            fullName: "John Smith"
        };
    }

    onChange = (inputName) => (event, {value}) => {
        if (inputName === 'input1') {
            this.setState({inputValue1: value});
        } else {
            this.setState({inputValue2: value});
        }
    }

	handleOpen = () => {
		this.setState({ isOpen: true });
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
    handleSave = (event, data) => {
        this.setState({fullName: `${this.state.input1} ${this.state.input2}`, isOpen: false});
    };

	render() {
        // Content of EditDialogPopover that is shown when clicking on edit (pencil icon)
        const editDialogPopoverBody =
            <div className="slds-col_padded">
                <Input id="first-name" label="First Name" value={this.state.inputValue1} onChange={this.onChange('input1')}/>
                <Input id="last-name" label="Last Name" value={this.state.inputValue2} onChange={this.onChange('input2')}/>
            </div>;

		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Inline Edit
				</h1>
				<Input
                    id="inline-edit"
                    editDialogPopover={
                        <PopoverEditDialog
                            body={editDialogPopoverBody}
                            heading="Edit First Name"
                            isOpen={this.state.isOpen}
                            onCancel={this.handleRequestClose}
                            onClose={this.handleClose}
                            onRequestClose={this.handleRequestClose}
                            onSave={this.handleSave}
                            position='absolute'
                        />}
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
