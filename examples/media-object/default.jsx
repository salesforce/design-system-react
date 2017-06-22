import React from 'react';
import MediaObject from '~/components/media-object'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';

const Example = React.createClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<MediaObject
				body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
				figure={<Icon category="standard" name="user" size="large" />}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
