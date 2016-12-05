import Notification from 'design-system-react/components/notification';
import Button from 'design-system-react/components/button';

const NotificationExample = React.createClass({
	getInitialState () {
		return {
			isOpen: false
		};
	},

	toggleOpen(){
		this.setState({ isOpen: !this.state.isOpen });
	},

	render(){
		return (
			<div>
				<Button label="Open Toast" onClick={this.toggleOpen.bind(this)} variant="brand" />
				<Notification
					content="There was a problem updating the record."
					iconName="notification"
					isOpen={this.state.isOpen}
					onDismiss={this.toggleOpen.bind(this)}
					texture={true}
					theme="error"
					variant="toast"
					/>
			</div>
		);
	}
});

ReactDOM.render(<NotificationExample />, mountNode);
