import React from 'react';

import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		isOpen: false,
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button label="Open Modal with tagline" onClick={this.toggleOpen} />
					<Modal
						isOpen={this.state.isOpen}
						onRequestClose={this.toggleOpen}
						tagline={
							<span>
								Here’s a tagline if you need it. It is allowed to extend across
								mulitple lines, so I’m making up content to show that to you. It
								is allowed to <a href="#">contain links or be a link.</a>
							</span>
						}
						heading="Modal header"
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
