import React from 'react';
import Avatar from '~/components/avatar'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/iconSettings';

const Example = React.createClass({
	displayName: 'AvatarExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Avatar
					assistiveText="Account icon avatar"
					title="Avatar entity icon"
					variant="entity"
				/>
			</IconSettings>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
