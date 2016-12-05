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
			 <Button label="Open Alert" onClick={this.toggleOpen.bind(this)} variant="brand" />
			 <Notification
				 content={["Your new contact ", <a href="#" key="0123">Sara Smith</a>, " was successfully created."]}
				 iconName="notification"
				 isOpen={this.state.isOpen}
				 onDismiss={this.toggleOpen.bind(this)}
				 texture={true}
				 theme="success"
				 variant="alert" />
			</div>
		);
	}

});

ReactDOM.render(<NotificationExample />, mountNode);
