import React from 'react';
import createReactClass from 'create-react-class';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
    static displayName = 'IconExample';

    render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Icon
					assistiveText="Description of icon"
					category="standard"
					name="case"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
