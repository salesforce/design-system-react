import React from 'react';
import createReactClass from 'create-react-class';
import MediaObject from '~/components/media-object'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';

const Example = createReactClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<MediaObject
				body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
				figure={<Icon category="standard" name="user" size="large" />}
				verticalCenter
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
