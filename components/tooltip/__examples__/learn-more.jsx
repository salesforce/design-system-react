import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';

class Example extends React.Component {
	handleClick = (event) => {
		console.log(event, 'clicked');
	};

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Tooltip
					align="top left"
					content="This is the exciting content of this tooltip. The content is so exciting that we cannot contain all we need to say within this tooltip."
					onClickTrigger={this.handleClick}
					variant="learnMore"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'TooltipExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
