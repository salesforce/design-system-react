import React from 'react';
import Toast from '~/components/toast'; // `~` is replaced with design-system-react at runtime
import ToastContainer from '~/components/toast/container'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<ToastContainer>
						{this.state.isOpen ? (
							<Toast
								duration={15000}
								labels={{
									heading: '26 potential duplicate leads were found.',
									headingLink: 'Select Leads to Merge',
								}}
								onClickHeadingLink={() => {
									console.log('Link clicked.');
								}}
								onRequestClose={() => {
									this.setState({ isOpen: false });
								}}
							/>
						) : null}
					</ToastContainer>
					<Button
						label="Toggle toast"
						onClick={() => {
							this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
						}}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ToastExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
