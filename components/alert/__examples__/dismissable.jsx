import React from 'react';

import Alert from '~/components/alert'; // `~` is replaced with design-system-react at runtime
import AlertContainer from '~/components/alert/container'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
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
				{this.state.isOpen ? (
					<AlertContainer>
						<Alert
							dismissible
							icon={<Icon category="utility" name="user" />}
							labels={{
								heading: 'Logged in as John Smith (johnsmith@acme.com).',
								headingLink: 'Log out',
							}}
							onClickHeadingLink={() => console.log('onClickHeadingLink')}
							onRequestClose={() => {
								console.log('onRequestClose')();
								this.setState({ isOpen: false });
							}}
						/>
					</AlertContainer>
				) : null}
			</IconSettings>
		);
	}
}

Example.displayName = 'AlertExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
