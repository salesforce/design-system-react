import React from 'react';

import IconSettings from '~/components/icon-settings';
import ButtonIcon from '~/components/icon/button-icon';
import ButtonStateful from '~/components/button-stateful'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'ButtonStatefulExample';

	state = {
		isActive: false,
	};

	handleOnClick = () => {
		this.setState({
			isActive: !this.state.isActive,
		});
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonStateful
					assistiveText={{ icon: this.state.isActive ? 'liked' : 'not liked' }}
					aria-pressed={this.state.isActive}
					icon={<ButtonIcon name="like" />}
					onClick={this.handleOnClick}
					variant="icon-filled"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
