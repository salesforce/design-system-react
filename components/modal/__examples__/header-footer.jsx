import React from 'react';

import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		noHeaderIsOpen: false,
		noFooterIsOpen: false,
	};

	toggleNoHeaderIsOpen = () => {
		this.setState({ noHeaderIsOpen: !this.state.noHeaderIsOpen });
	};

	toggleNofooterIsOpen = () => {
		this.setState({ noFooterIsOpen: !this.state.noFooterIsOpen });
	};

	render() {
		const modal = this.state.noHeaderIsOpen ? (
			<Modal
				assistiveText={{ dialogLabel: 'Modal no header' }}
				isOpen={this.state.noHeaderIsOpen}
				onRequestClose={this.toggleNoHeaderIsOpen}
			>
				<section className="slds-p-around_medium">
					<p>
						Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
						ullamco deserunt aute id consequat veniam incididunt duis in sint
						irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
						officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
						ipsum magna exercitation reprehenderit magna. Tempor cupidatat
						consequat elit dolor adipisicing.
					</p>
					<p>
						Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
						officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
						incididunt nisi consectetur esse laborum eiusmod pariatur proident.
						Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
						est. Labore esse esse cupidatat amet velit id elit consequat minim
						ullamco mollit enim excepteur ea.
					</p>
				</section>
			</Modal>
		) : (
			<Modal
				isOpen={this.state.noFooterIsOpen}
				onRequestClose={this.toggleNofooterIsOpen}
				heading="Modal Header"
			>
				<section className="slds-p-around_medium">
					<p>
						Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
						ullamco deserunt aute id consequat veniam incididunt duis in sint
						irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
						officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
						ipsum magna exercitation reprehenderit magna. Tempor cupidatat
						consequat elit dolor adipisicing.
					</p>
					<p>
						Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
						officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
						incididunt nisi consectetur esse laborum eiusmod pariatur proident.
						Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
						est. Labore esse esse cupidatat amet velit id elit consequat minim
						ullamco mollit enim excepteur ea.
					</p>
				</section>
			</Modal>
		);
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button label="Open no header" onClick={this.toggleNoHeaderIsOpen} />
					<Button label="Open no footer" onClick={this.toggleNofooterIsOpen} />
					{modal}
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
