import React from 'react';

import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		isLargeOpen: false,
		isMediumOpen: false,
		isSmallOpen: false,
	};

	toggleOpenLarge = () => {
		this.setState({ isLargeOpen: !this.state.isLargeOpen });
	};

	toggleOpenMedium = () => {
		this.setState({ isMediumOpen: !this.state.isMediumOpen });
	};

	toggleOpenSmall = () => {
		this.setState({ isSmallOpen: !this.state.isSmallOpen });
	};

	render() {
		const content = (
			<section className="slds-p-around_medium">
				<p>
					Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
					deserunt aute id consequat veniam incididunt duis in sint irure nisi.
					Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor
					esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna
					exercitation reprehenderit magna. Tempor cupidatat consequat elit
					dolor adipisicing.
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
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button label="Open small modal" onClick={this.toggleOpenSmall} />
					<Button label="Open medium modal" onClick={this.toggleOpenMedium} />
					<Button label="Open large modal" onClick={this.toggleOpenLarge} />
					<Modal
						isOpen={this.state.isSmallOpen}
						onRequestClose={this.toggleOpenSmall}
						size="small"
						heading="Modal Header Small"
					>
						{content}
					</Modal>
					<Modal
						isOpen={this.state.isMediumOpen}
						onRequestClose={this.toggleOpenMedium}
						size="medium"
						heading="Modal Header Medium"
					>
						{content}
					</Modal>
					<Modal
						isOpen={this.state.isLargeOpen}
						onRequestClose={this.toggleOpenLarge}
						size="large"
						heading="Modal Header Large"
					>
						{content}
					</Modal>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
