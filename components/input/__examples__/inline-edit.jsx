import React from 'react';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import PopoverEditDialog from '~/components/popover/popover-edit-dialog';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: "My editable input"
        };
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
        this.setState({value: "new value", isOpen: false});
    };
	render() {
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Inline Edit
				</h1>
				<Input
                    id="inline-edit"
                    editDialogPopover={
                        <PopoverEditDialog
                            body="Lorem ipsum dolor sit amet, consectetur adipisici"
                            onCancel={this.handleRequestClose}
                            onClose={this.handleClose}
                            onRequestClose={this.handleRequestClose}
                            onSave={this.handleSave}
                            heading="Edit First Name"
                            isOpen={this.state.isOpen}
                            position='absolute'
                            // onCancel={closeThePopover}
                            // onSave={changeParentStateAndUpdateInputValue}
                        />}
                    onClickEditButton={this.handleOpen}
                    label="My Label"
                    value={this.state.value}
                    variant="edit-dialog"
				/>
			</div>
		);
	}
}

Example.displayName = 'InlineEditInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
