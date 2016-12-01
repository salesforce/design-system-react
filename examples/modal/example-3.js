import Modal from 'design-system-react/components/modal';
import Button from 'design-system-react/components/button';

const ModalExample = React.createClass({
	getInitialState () {
		return {
			isOpen: false
		};
	},

	toggleOpen(){
		this.setState({ isOpen: !this.state.isOpen });
	},

	render(){
		return (
			<div>
				<Button label="Open Prompt" onClick={this.toggleOpen.bind(this)} variant="brand" />
					<Modal
						dismissible={false}
						footer={[ <Button key="promptBtn" label="Got it" onClick={this.toggleOpen.bind(this)} /> ]}
						isOpen={this.state.isOpen}
						onRequestClose={this.toggleOpen.bind(this)}
						prompt="error"
						size="medium"
						title={<span>Service Unavailable</span>}>
							<div className="slds-m-around--medium">
								The service you're trying to reach is unavailable due to limited conectivity. Please restart the application or contact your system administrator for assistance.
							</div>
					</Modal>
			</div>
		);
	}
});

ReactDOM.render(<ModalExample />, mountNode);
