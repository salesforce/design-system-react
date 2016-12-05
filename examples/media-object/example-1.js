import MediaObject from 'design-system-react/components/media-object';

const MediaObjectExample = React.createClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<MediaObject
				body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
				figure={<Icon category="standard" name="user" size="medium" />}
				verticalCenter
			/>
		);
	}
});

ReactDOM.render(<MediaObjectExample />, mountNode);
