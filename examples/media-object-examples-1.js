const SLDSMediaObjectExample = React.createClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<SLDSMediaObject
				body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda."
				figure={<SLDSIcon category="standard" name="user" size="medium" />}
				verticalCenter
			/>
		);
	}
});

ReactDOM.render(<SLDSMediaObjectExample />, mountNode);
