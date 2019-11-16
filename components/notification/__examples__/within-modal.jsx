import React from 'react';

import IconSettings from '~/components/icon-settings';
import Notification from '~/components/notification'; // `~` is replaced with design-system-react at runtime
import Modal from '~/components/modal';
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'NotificationExample';

	state = {
		isOpen: false,
		modalOpen: false,
		toastOpen: true,
	};

	toggleModal = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	};

	toggleToast = () => {
		this.setState({ toastOpen: !this.state.toastOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button
						label="Open Modal with notification"
						onClick={this.toggleModal}
					/>
					<Modal
						footer={[
							<Button
								key="toggleToast"
								label="Toggle Toast"
								onClick={this.toggleToast}
								variant="brand"
							/>,
						]}
						isOpen={this.state.modalOpen}
						onRequestClose={this.toggleModal}
						title="Lightning Design System: Style with Ease"
						toast={
							<Notification
								content="Oops, you've missed some required form inputs."
								iconName="warning"
								isOpen={this.state.toastOpen}
								onDismiss={this.toggleToast}
								theme="warning"
								variant="toast"
								silenceDeprecationWarning
							/>
						}
					>
						<section className="slds-p-around_medium">
							<p>
								Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
								ullamco deserunt aute id consequat veniam incididunt duis in
								sint irure nisi. Mollit officia cillum Lorem ullamco minim
								nostrud elit officia tempor esse quis. Cillum sunt ad dolore
								quis aute consequat ipsum magna exercitation reprehenderit
								magna. Tempor cupidatat consequat elit dolor adipisicing.
							</p>
							<p>
								Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis
								sit officia. Lorem aliqua enim laboris do dolor eiusmod officia.
								Mollit incididunt nisi consectetur esse laborum eiusmod pariatur
								proident. Eiusmod et adipisicing culpa deserunt nostrud ad
								veniam nulla aute est. Labore esse esse cupidatat amet velit id
								elit consequat minim ullamco mollit enim excepteur ea.
							</p>
						</section>
					</Modal>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
