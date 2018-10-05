import React from 'react';

import IconSettings from '~/components/icon-settings';
import MediaObject from '~/components/media-object'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'MediaObjectExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<MediaObject
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
					figure={<Icon category="standard" name="user" size="large" />}
					verticalCenter
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
