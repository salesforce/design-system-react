import Notification from 'design-system-react/components/notification';
import Modal from 'design-system-react/components/modal';
import Button from 'design-system-react/components/button';

const NotificationExample = React.createClass({
	getInitialState () {
		return {
			modalOpen: false,
			isOpen: false
		};
	},

	toggleModal(){
		this.setState({ modalOpen: !this.state.modalOpen });
	},

	toggleToast(){
		this.setState({ toastOpen: !this.state.toastOpen });
	},

	render(){
		return (
			<div>
				<Button label="Open Modal" onClick={this.toggleModal.bind(this)} variant="brand" />
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={this.toggleModal.bind(this)}
					title="Lightning Design System: Style with Ease"
					toast={
						<Notification
							content="Oops, you've missed some required form inputs."
							iconName="warning"
							isOpen={this.state.toastOpen}
							onDismiss={this.toggleToast.bind(this)}
							theme="warning"
							variant="toast" />
					}>
						<div className="slds-m-around--medium">
							<p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
							<p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
							<Button
								label="Open Toast"
								onClick={this.toggleToast.bind(this)}
								variant="brand" />
							<p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
							<p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
							<p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
						</div>

				</Modal>
			</div>
		);
	}

});

ReactDOM.render(<NotificationExample />, mountNode);
