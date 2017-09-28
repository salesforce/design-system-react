import React from 'react';
import createReactClass from 'create-react-class';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Example = createReactClass({
	displayName: 'PopoverExample',

	getInitialState () {
		return {
			isOpen: false
		};
	},

	handleOpen () {
		this.setState({ isOpen: true });
	},

	handleCancel () {
		this.setState({ isOpen: false });
	},

	handleApply () {
		this.setState({ isOpen: false });
	},

	handleRequestClose (event, data) {
		if (this.props.log) { this.props.log('onRequestClose')(event, data); }
		this.setState({ isOpen: false });
	},

	handleClose (event, data) {
		if (this.props.log) { this.props.log('onClose')(event, data); }
	},

	render () {
		return (
			<div>
				<Popover
					isOpen={this.state.isOpen}
					body="Are you sure you want to continue with your action?"
					footer={
						<div className="slds-text-align--right">
							<Button label="Cancel" onClick={this.handleCancel} />
							<Button variant="brand" label="Apply" onClick={this.handleApply} />
						</div>}
					heading="Confirmation"
					onClose={this.handleClose}
					onRequestClose={this.handleRequestClose}
				>
					<Button label="Trigger Popover" onClick={this.handleOpen} />
				</Popover>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
